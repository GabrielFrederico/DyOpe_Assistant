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

	private char statusSYS;
	private int loteProducao;
	private String tempoNecessario;

	public long getIdInfosetor() {
		return idInfosetor;
	}

	public void setIdInfosetor(long idInfosetor) {
		this.idInfosetor = idInfosetor;
	}

	public char getStatusSYS() {
		return statusSYS;
	}

	public void setStatusSYS(char statusSYS) {
		this.statusSYS = statusSYS;
	}

	public int getLoteProducao() {
		return loteProducao;
	}

	public void setLoteProducao(int loteProducao) {
		this.loteProducao = loteProducao;
	}

	public String getTempoNecessario() {
		return tempoNecessario;
	}

	public void setTempoNecessario(String tempoNecessario) {
		this.tempoNecessario = tempoNecessario;
	}
}