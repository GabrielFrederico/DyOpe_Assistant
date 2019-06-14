package com.projeto.models;

import java.sql.Date;
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

import org.springframework.web.bind.annotation.RequestBody;

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

	public static Operacao calcular(@RequestBody Operacao operacao) {
		Calendar inicio = Calendar.getInstance();
		java.util.Date fim = new java.util.Date();
		inicio.setTime(operacao.getDataInicio());

		int diasAdded = 0;
		ArrayList<Integer> feriados = new ArrayList<>();
		feriados.add(20);

		int tempos = 0, diasNece = 0, funcionariosNecessários = 0, prodHora = 0;
		for (SubOperacao subope : operacao.getSuboperacoes()) {
			tempos = subope.getTempoNesc();
			tempos += tempos;
		}

		float result, funcCalc, calcProHora, tempoFun;
		result = tempos * operacao.getLoteProducao();
		tempoFun = operacao.getTempoTrab() * operacao.getNumFuncionariosDisponiveis();
		diasNece = Math.round(result / tempoFun);

		do {
			inicio.add(Calendar.DAY_OF_MONTH, 1);
			if (inicio.get(Calendar.DAY_OF_WEEK) != Calendar.SATURDAY
					|| inicio.get(Calendar.DAY_OF_WEEK) != Calendar.SUNDAY
					|| !feriados.contains((Integer) inicio.get(Calendar.DAY_OF_YEAR))) {
				++diasAdded;
			}

		} while (diasAdded < diasNece);

		// inicio.add(Calendar.DAY_OF_MONTH, diasNece + diasAdded);
		System.out.println(diasNece+ " . "+ tempoFun +". "+ result+".tempos "+tempos);
		fim = inicio.getTime();

		funcCalc = operacao.getNumFuncionariosDisponiveis() * operacao.getTempoTrab();
		funcionariosNecessários = Math.round(result / funcCalc);
		calcProHora = funcionariosNecessários * operacao.getTempoTrab();
		prodHora = Math.round(operacao.getTempoTrab() / (operacao.getTempoTrab() / 60));
		operacao.setNumFuncionarios(funcionariosNecessários);
		Date prazo = new Date(fim.getTime());
		operacao.setPrazo(prazo);
		operacao.setProducaoHora(prodHora);
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
