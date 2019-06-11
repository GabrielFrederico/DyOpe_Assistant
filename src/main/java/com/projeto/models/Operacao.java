package com.projeto.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Operacao {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "operacao_suboperacoes", joinColumns = @JoinColumn(name = "operacao_id"), inverseJoinColumns = @JoinColumn(name = "suboperacao_id"))
	private Set<SubOperacao> suboperacoes = new HashSet<>();

	
	private java.sql.Date dataInicio;
	private float numFuncionarios;
	public float getNumFuncionarios() {
		return numFuncionarios;
	}

	public void setNumFuncionarios(float numFuncionarios) {
		this.numFuncionarios = numFuncionarios;
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

	private float producaoHora;

	public float getProducaoHora() {
		return producaoHora;
	}

	public void setProducaoHora(float producaoHora) {
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

	public void setDataInicio(java.sql.Date dataInicio) {
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
