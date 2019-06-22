package com.projeto.models;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.projeto.seguranca.ResponseMessage;

@Entity
public class Operacao {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "operacao_suboperacoes", joinColumns = @JoinColumn(name = "operacao_id"), inverseJoinColumns = @JoinColumn(name = "suboperacao_id"))
	private Set<SubOperacao> suboperacoes = new HashSet<>();
	private String descricao;
	private Date dataInicio;
	private float minutos, segundos;

	public float getTempos() {
		return minutos;
	}

	public void setTempos(float minutos) {
		this.minutos = minutos;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	private int numFuncionarios;

	public int getNumFuncionarios() {
		return numFuncionarios;
	}

	public void setNumFuncionarios(int numFuncionarios) {
		this.numFuncionarios = numFuncionarios;
	}

	public static Operacao calculosPlanilha(@RequestBody Operacao operacao) {

		return operacao;
	}

	public static Operacao calcular(@RequestBody Operacao operacao) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		String dateString = sdf.format(operacao.getDataInicio());
		java.util.Date inic = sdf.parse(dateString);
		Date ini = new Date(inic.getTime());
		// operacao.setDataInicio(ini);

		Calendar inicio = Calendar.getInstance();
		java.util.Date fim = new java.util.Date();
		java.util.Date dataini = new java.util.Date();
		inicio.setTime(operacao.getDataInicio());
		System.out.println("inicio" + inicio.get(Calendar.DAY_OF_MONTH));
		System.out.println("inicio2" + inic);

		int diasAdded = 0;
		ArrayList<Date> feriados = new ArrayList<>();
		int segundos = 0;
		float segundoscalc = 0, calcseg, min;
		int minutos = 0, diasNece = 0, diasNeceteste = 0, funcionariosNecessários = 0, prodHora = 0, producaoHora,
				prodhoraresult, qtdPecasOpe = 0;
		for (SubOperacao subope : operacao.getSuboperacoes()) {
			minutos += subope.getTempoNesc();
			segundos += subope.getSegundos();

		}
		// calcseg = segundos*1;
		segundoscalc = segundos / 60;
		min = minutos + segundoscalc;

		float result, funcCalc, calcProHora, tempoFun, resultdias;
		tempoFun = operacao.getTempoTrab() * operacao.getNumFuncionariosDisponiveis();

		result = minutos * operacao.getLoteProducao();
		diasNece = Math.round(result / tempoFun);

		resultdias = result / operacao.getNumFuncionariosDisponiveis();
		diasNeceteste = Math.round(resultdias / tempoFun);

		inicio.add(Calendar.DAY_OF_MONTH, 1);
		dataini = inicio.getTime();
		Date iniciodata = new Date(dataini.getTime());
		operacao.setDataInicio(iniciodata);

		for (int i = 1; i <= diasNeceteste; i++) {

			inicio.add(Calendar.DAY_OF_MONTH, 1);
			if (inicio.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY) {
				inicio.add(Calendar.DAY_OF_MONTH, 1);
			}
			if (inicio.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY) {
				inicio.add(Calendar.DAY_OF_MONTH, 1);
			}
			if (feriados.contains((Integer) inicio.get(Calendar.DAY_OF_YEAR))) {
				inicio.add(Calendar.DAY_OF_MONTH, 1);
			}

		}

		// inicio.add(Calendar.DAY_OF_MONTH, diasNece + diasAdded);
		fim = inicio.getTime();

		funcionariosNecessários = Math.round(operacao.getLoteProducao() / operacao.getTempoTrab());
		if (funcionariosNecessários < 1) {
			funcionariosNecessários = 1;
		}
		if (diasNeceteste < 1) {
			diasNeceteste = 1;
		}
		System.out.println("fundispo" + operacao.getNumFuncionariosDisponiveis());
		qtdPecasOpe = Math.round(operacao.getLoteProducao() / operacao.getNumFuncionariosDisponiveis());
		calcProHora = funcionariosNecessários * operacao.getTempoTrab();
		prodHora = Math.round(operacao.getTempoTrab() / (operacao.getTempoTrab() / 60));
		prodhoraresult = 60 * operacao.getNumFuncionariosDisponiveis();
		producaoHora = Math.round(prodhoraresult / minutos);
		operacao.setNumFuncionarios(funcionariosNecessários);
		Date prazo = new Date(fim.getTime());
		operacao.setPrazo(prazo);

		System.out.println("dias: " + diasNeceteste + "  " + tempoFun + ". " + resultdias + ".minutos " + minutos + " "
				+ qtdPecasOpe + " INICIO:" + operacao.getDataInicio());
		operacao.setQtdPecasOpe(qtdPecasOpe);
		operacao.setProducaoHora(producaoHora);
		System.out.println(" Teste prod: " + operacao.getProducaoHora());
		operacao.setTempos(minutos);

		return operacao;

	}

	public Set<SubOperacao> getSuboperacoes() {
		return suboperacoes;
	}

	public void setSuboperacoes(Set<SubOperacao> suboperacoes) {
		this.suboperacoes = suboperacoes;
	}

	private java.sql.Date prazo;

	private float custosOpe;

	private int loteProducao;
	private int tempoTrab;

	public int getTempoTrab() {
		return tempoTrab;
	}

	public void setTempoTrab(int tempoTrab) {
		this.tempoTrab = tempoTrab;
	}

	private int numFuncionariosDisponiveis;

	private int producaoHora;

	public int getProducaoHora() {
		return producaoHora;
	}

	public void setProducaoHora(int producaoHora) {
		this.producaoHora = producaoHora;
	}

	public int getNumFuncionariosDisponiveis() {
		return numFuncionariosDisponiveis;
	}

	public void setNumFuncionariosDisponiveis(int numFuncionariosDisponiveis) {
		this.numFuncionariosDisponiveis = numFuncionariosDisponiveis;
	}

	private int qtdPecasOpe;
	private boolean statusSYS;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public boolean getStatusSYS() {
		return statusSYS;
	}

	public void setStatusSYS(boolean statusSYS) {
		this.statusSYS = statusSYS;
	}

	public Date getDataInicio() {
		return dataInicio;
	}

	public void setDataInicio(Date dataInicio) {
		this.dataInicio = dataInicio;
	}

	public Date getPrazo() {
		return prazo;
	}

	public void setPrazo(java.sql.Date prazo) {
		this.prazo = prazo;
	}

	public float getCustosOpe() {
		return custosOpe;
	}

	public void setCustosOpe(float custosOpe) {
		this.custosOpe = custosOpe;
	}

	public int getLoteProducao() {
		return loteProducao;
	}

	public void setLoteProducao(int loteProducao) {
		this.loteProducao = loteProducao;
	}

	public int getQtdPecasOpe() {
		return qtdPecasOpe;
	}

	public void setQtdPecasOpe(int qtdPecasOpe) {
		this.qtdPecasOpe = qtdPecasOpe;
	}

	public float getPrecoPecaOpe() {
		return precoPecaOpe;
	}

	public void setPrecoPecaOpe(float precoPecaOpe) {
		this.precoPecaOpe = precoPecaOpe;
	}

	private float precoPecaOpe;

}
