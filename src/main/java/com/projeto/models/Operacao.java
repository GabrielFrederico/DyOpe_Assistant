package com.projeto.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Operacao {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String descricao;
	
	private Date dataInicio;
	
	private int tempoNesc;
	
	private Date prazo;
	
	private float custosOpe;
	
	private int loteProducao;
	
	private int numFuncionariosOpe;
	
	private int qtdPecasOpe;
	
	private long idTipoOpe;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	public Date getDataInicio() {
		return dataInicio;
	}

	public void setDataInicio(Date dataInicio) {
		this.dataInicio = dataInicio;
	}

	public int getTempoNesc() {
		return tempoNesc;
	}

	public void setTempoNesc(int tempoNesc) {
		this.tempoNesc = tempoNesc;
	}

	public Date getPrazo() {
		return prazo;
	}

	public void setPrazo(Date prazo) {
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

	public int getNumFuncionariosOpe() {
		return numFuncionariosOpe;
	}

	public void setNumFuncionariosOpe(int numFuncionariosOpe) {
		this.numFuncionariosOpe = numFuncionariosOpe;
	}

	public int getQtdPecasOpe() {
		return qtdPecasOpe;
	}

	public void setQtdPecasOpe(int qtdPecasOpe) {
		this.qtdPecasOpe = qtdPecasOpe;
	}

	public long getIdTipoOpe() {
		return idTipoOpe;
	}

	public void setIdTipoOpe(long idTipoOpe) {
		this.idTipoOpe = idTipoOpe;
	}

	public long getIdGerente() {
		return idGerente;
	}

	public void setIdGerente(long idGerente) {
		this.idGerente = idGerente;
	}

	public float getPrecoPecaOpe() {
		return precoPecaOpe;
	}

	public void setPrecoPecaOpe(float precoPecaOpe) {
		this.precoPecaOpe = precoPecaOpe;
	}

	private long idGerente;
	
	private float precoPecaOpe;
	
	
	
}
