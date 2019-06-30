package com.projeto.rest;

import java.sql.Date;
import java.text.ParseException;
import java.util.Calendar;
import java.util.ConcurrentModificationException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.Operacao;
import com.projeto.models.Peca;
import com.projeto.repository.OperacaoRepository;
import com.projeto.repository.PecaRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("pecas")
@PreAuthorize("hasRole('GERENTE') or hasRole('ADMIN')")
public class PecaController {

	@Autowired
	PecaRepository pecaRepository;
	@Autowired
	OperacaoRepository operacaoRepository;

	@RequestMapping(method = RequestMethod.POST, value = "/cadastrarpeca")
	public Peca save(@Valid @RequestBody Peca peca) {
		pecaRepository.save(peca);
		return peca;
	}

	@RequestMapping(method = RequestMethod.GET)
	public Iterable<Peca> listAll() {
		return pecaRepository.findAll();
	}

	@RequestMapping(method = RequestMethod.GET, path = "/getByNome/{descricao}")
	public Peca getPecaByNome(@PathVariable("descricao") String descricao) {
		Peca peca = pecaRepository.findByDescricao(descricao);
		return peca;
	}

	@RequestMapping(method = RequestMethod.GET, path = "/{id}")
	public Peca getPecaById(@PathVariable("id") long id) {
		Peca peca = pecaRepository.findById(id);
		return peca;
	}

	@RequestMapping(method = RequestMethod.PUT, value = "addAndamento")
	public Peca addAndamento(@RequestBody Peca peca) {
		long millis = System.currentTimeMillis();
		Date hoje = new Date(millis);
		System.out.println(hoje);
		Operacao operacao = null;
		boolean opeAndamento = false;
		if (!peca.getOperacoesFazer().isEmpty()) {
			for (Operacao operacaoFazer : peca.getOperacoesFazer()) {
				if (hoje.compareTo(operacaoFazer.getDataInicio()) >= 0) {
					operacao = operacaoFazer;
					opeAndamento = true;
					try {
						System.out.println(hoje.compareTo(operacaoFazer.getDataInicio()));
						System.out.println("inicio" + operacaoFazer.getDataInicio());

						peca.getOperacoesFazer().remove(operacaoFazer);
						peca.getOperacoesAndamento().add(operacaoFazer);

					} catch (ConcurrentModificationException concurrentModificationException) {
						concurrentModificationException.getStackTrace();
					}

				}
			}
		}

		if (opeAndamento) {
			peca.getOperacoesFazer().remove(operacao);
			peca.getOperacoesAndamento().add(operacao);

			pecaRepository.save(peca);
		}
		return peca;
	}

	@RequestMapping(method = RequestMethod.PUT)
	public Peca update(@RequestBody Peca peca) {

		Operacao ultima = peca.getOperacoes().get(peca.getOperacoes().size() - 1);
		try {
			Operacao.calcular(ultima);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		pecaRepository.save(peca);
		return peca;
	}

	@Modifying(flushAutomatically = true)
	@RequestMapping(method = RequestMethod.PUT, value = "updatepeca")
	public Peca updatePeca(@RequestBody Peca peca) {
		Calendar inicio = Calendar.getInstance();
		java.util.Date dataini = new java.util.Date();
		Calendar prazo = Calendar.getInstance();
		java.util.Date dataprazo = new java.util.Date();
		if (!peca.getOperacoesFazer().isEmpty()) {
			for (Operacao operacaoFazer : peca.getOperacoesFazer()) {
				System.out.println("opesAndamento gerente" + operacaoFazer.getDataInicio());
				inicio.setTime(operacaoFazer.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoFazer.setDataInicio(iniciodata);

				prazo.setTime(operacaoFazer.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH, 1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoFazer.setPrazo(prazodate);
			}
		}

		if (!peca.getOperacoesAndamento().isEmpty()) {
			for (Operacao operacaoAndamento : peca.getOperacoesAndamento()) {
				System.out.println("opesAndamento gerente" + operacaoAndamento.getDataInicio());
				inicio.setTime(operacaoAndamento.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoAndamento.setDataInicio(iniciodata);

				prazo.setTime(operacaoAndamento.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH, 1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoAndamento.setPrazo(prazodate);
			}
		}
		if (!peca.getOperacoesPrazo().isEmpty()) {
			for (Operacao operacaoPrazo : peca.getOperacoesPrazo()) {
				System.out.println("opesAndamento gerente" + operacaoPrazo.getDataInicio());
				inicio.setTime(operacaoPrazo.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoPrazo.setDataInicio(iniciodata);

				prazo.setTime(operacaoPrazo.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH, 1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoPrazo.setPrazo(prazodate);
			}
		}
		pecaRepository.save(peca);
		return peca;
	}

	@RequestMapping(method = RequestMethod.PUT, value = "operacaoFazer")
	public Peca opesFazer(@RequestBody Peca peca) {

		Calendar inicio = Calendar.getInstance();
		java.util.Date dataini = new java.util.Date();
		Calendar prazo = Calendar.getInstance();
		java.util.Date dataprazo = new java.util.Date();
		Operacao ultima = peca.getOperacoesFazer().get(peca.getOperacoesFazer().size() - 1);
		if (!peca.getOperacoesFazer().isEmpty()) {
			for (Operacao operacaoFazer : peca.getOperacoesFazer()) {
				System.out.println("opesAndamento gerente" + operacaoFazer.getDataInicio());
				if (operacaoFazer != ultima) {
					inicio.setTime(operacaoFazer.getDataInicio());
					inicio.add(Calendar.DAY_OF_MONTH, 1);
					dataini = inicio.getTime();
					Date iniciodata = new Date(dataini.getTime());
					operacaoFazer.setDataInicio(iniciodata);
					prazo.setTime(operacaoFazer.getPrazo());
					prazo.add(Calendar.DAY_OF_MONTH, 1);
					dataprazo = prazo.getTime();
					Date prazodate = new Date(dataprazo.getTime());
					operacaoFazer.setPrazo(prazodate);
				}
			}
		}

		if (!peca.getOperacoesAndamento().isEmpty()) {
			for (Operacao operacaoAndamento : peca.getOperacoesAndamento()) {
				System.out.println("opesAndamento gerente" + operacaoAndamento.getDataInicio());
				if (operacaoAndamento != ultima) {
					inicio.setTime(operacaoAndamento.getDataInicio());
					inicio.add(Calendar.DAY_OF_MONTH, 1);
					dataini = inicio.getTime();
					Date iniciodata = new Date(dataini.getTime());
					operacaoAndamento.setDataInicio(iniciodata);

					prazo.setTime(operacaoAndamento.getPrazo());
					prazo.add(Calendar.DAY_OF_MONTH, 1);
					dataprazo = prazo.getTime();
					Date prazodate = new Date(dataprazo.getTime());
					operacaoAndamento.setPrazo(prazodate);
				}
			}
		}
		if (!peca.getOperacoesPrazo().isEmpty()) {
			for (Operacao operacaoPrazo : peca.getOperacoesPrazo()) {
				if (operacaoPrazo != ultima) {
					System.out.println("opesAndamento gerente" + operacaoPrazo.getDataInicio());
					inicio.setTime(operacaoPrazo.getDataInicio());
					inicio.add(Calendar.DAY_OF_MONTH, 1);
					dataini = inicio.getTime();
					Date iniciodata = new Date(dataini.getTime());
					operacaoPrazo.setDataInicio(iniciodata);

					prazo.setTime(operacaoPrazo.getPrazo());
					prazo.add(Calendar.DAY_OF_MONTH, 1);
					dataprazo = prazo.getTime();
					Date prazodate = new Date(dataprazo.getTime());
					operacaoPrazo.setPrazo(prazodate);
				}
			}
		}
		System.out.println("teste ope" + ultima.getDescricao());
		try {
			Operacao.calcular(ultima);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		pecaRepository.save(peca);
		return peca;
	}

	@RequestMapping(method = RequestMethod.PUT, value = "operacaoAndamento")
	public Peca opesAndamento(@RequestBody Peca peca) {
		Calendar inicio = Calendar.getInstance();
		java.util.Date dataini = new java.util.Date();
		Operacao ultima = peca.getOperacoesAndamento().get(peca.getOperacoesAndamento().size() - 1);
		Calendar prazo = Calendar.getInstance();
		java.util.Date dataprazo = new java.util.Date();
		if (!peca.getOperacoesFazer().isEmpty()) {
			for (Operacao operacaoFazer : peca.getOperacoesFazer()) {
				System.out.println("opesAndamento gerente" + operacaoFazer.getDataInicio());
				if (operacaoFazer != ultima) {
					inicio.setTime(operacaoFazer.getDataInicio());
					inicio.add(Calendar.DAY_OF_MONTH, 1);
					dataini = inicio.getTime();
					Date iniciodata = new Date(dataini.getTime());
					operacaoFazer.setDataInicio(iniciodata);

					prazo.setTime(operacaoFazer.getPrazo());
					prazo.add(Calendar.DAY_OF_MONTH, 1);
					dataprazo = prazo.getTime();
					Date prazodate = new Date(dataprazo.getTime());
					operacaoFazer.setPrazo(prazodate);
				}
			}
		}

		if (!peca.getOperacoesAndamento().isEmpty()) {
			for (Operacao operacaoAndamento : peca.getOperacoesAndamento()) {
				System.out.println("opesAndamento gerente" + operacaoAndamento.getDataInicio());
				if (operacaoAndamento != ultima) {
					inicio.setTime(operacaoAndamento.getDataInicio());
					inicio.add(Calendar.DAY_OF_MONTH, 1);
					dataini = inicio.getTime();
					Date iniciodata = new Date(dataini.getTime());
					operacaoAndamento.setDataInicio(iniciodata);

					prazo.setTime(operacaoAndamento.getPrazo());
					prazo.add(Calendar.DAY_OF_MONTH, 1);
					dataprazo = prazo.getTime();
					Date prazodate = new Date(dataprazo.getTime());
					operacaoAndamento.setPrazo(prazodate);
				}
			}
		}
		if (!peca.getOperacoesPrazo().isEmpty()) {
			for (Operacao operacaoPrazo : peca.getOperacoesPrazo()) {
				if (operacaoPrazo != ultima) {
				System.out.println("opesAndamento gerente" + operacaoPrazo.getDataInicio());
				inicio.setTime(operacaoPrazo.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoPrazo.setDataInicio(iniciodata);

				prazo.setTime(operacaoPrazo.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH, 1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoPrazo.setPrazo(prazodate);
			}}
		}

		try {
			Operacao.calcular(ultima);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		pecaRepository.save(peca);
		return peca;
	}

	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public Peca deletePecaById(@PathVariable("id") long id) {
		Peca peca = pecaRepository.findById(id);
		pecaRepository.delete(peca);
		return peca;
	}
}
