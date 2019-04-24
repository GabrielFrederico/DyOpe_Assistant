package com.projeto.models;

import java.util.Date;

import javax.persistence.*;


@Entity
public class Operacao {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String descricao;
	
	private java.sql.Date dataInicio;
	
	private int tempoNesc;
	
	private java.sql.Date prazo;
	
	private float custosOpe;
	
	private int loteProducao;
	
	private int numFuncionariosOpe;
	
	private int qtdPecasOpe;
	private char statusSYS;

	private Gerente gerente;

	@ManyToOne
	@JoinColumn(name = "gerente_id")
	public Gerente getGerente() {
		return gerente;
	}


	public void setGerente(Gerente gerente) {
		this.gerente = gerente;
	}

	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idTipoOpe", referencedColumnName = "idTipoOpe")
    private TipoOperacao tipoope;

    public TipoOperacao getTipoope() {
        return tipoope;
    }

    public void setTipoope(TipoOperacao tipoope) {
        this.tipoope = tipoope;
    }

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public char getStatusSYS() {
		return statusSYS;
	}

	public void setStatusSYS(char statusSYS) {
		this.statusSYS = statusSYS;
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

	public void setDataInicio(java.sql.Date dataInicio) {
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
