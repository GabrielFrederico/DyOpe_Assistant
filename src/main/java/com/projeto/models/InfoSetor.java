package com.projeto.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class InfoSetor {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long idInfosetor;
	private String nomeFuncionario;
	private String nomeOperacao;

	public String getNomeOperacao() {
		return nomeOperacao;
	}

	public void setNomeOperacao(String nomeOperacao) {
		this.nomeOperacao = nomeOperacao;
	}

	public String getNomeFuncionario() {
		return nomeFuncionario;
	}

	public void setNomeFuncionario(String nomeFuncionario) {
		this.nomeFuncionario = nomeFuncionario;
	}

	private boolean statusSYS;
	private int qtdPecasOpe;
	private String tempoNecessario;

	public long getIdInfosetor() {
		return idInfosetor;
	}

	public void setIdInfosetor(long idInfosetor) {
		this.idInfosetor = idInfosetor;
	}

	public boolean getStatusSYS() {
		return statusSYS;
	}

	public void setStatusSYS(boolean statusSYS) {
		this.statusSYS = statusSYS;
	}

	public int getQtdPecasOpe() {
		return qtdPecasOpe;
	}

	public void setQtdPecasOpe(int qtdPecasOpe) {
		this.qtdPecasOpe = qtdPecasOpe;
	}

	public String getTempoNecessario() {
		return tempoNecessario;
	}

	public void setTempoNecessario(String tempoNecessario) {
		this.tempoNecessario = tempoNecessario;
	}
}