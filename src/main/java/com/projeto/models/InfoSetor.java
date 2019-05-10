package com.projeto.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
@Entity
public class InfoSetor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idInfosetor;

    private String setor, operacao;
    private char statusSYS;
    private int qtdPecasOpe;
    private String tempoNecessario;
    
    
    public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}

	public Operacao getOperacaoescolhida() {
		return operacaoescolhida;
	}

	public void setOperacaoescolhida(Operacao operacaoescolhida) {
		this.operacaoescolhida = operacaoescolhida;
	}

	@ManyToOne(cascade = CascadeType.ALL)
    private Setor setorescolhido;
    
    @ManyToOne(cascade = CascadeType.ALL)
    private Funcionario funcionario;
    
    @OneToOne(cascade = CascadeType.ALL)
    private Gerente gerenteescolhido;
    
    public Gerente getGerenteescolhido() {
		return gerenteescolhido;
	}

	public void setGerenteescolhido(Gerente gerenteescolhido) {
		this.gerenteescolhido = gerenteescolhido;
	}

	@OneToOne(cascade = CascadeType.ALL)
    private Operacao operacaoescolhida;

    
    public Setor getSetorescolhido() {
		return setorescolhido;
	}

	public void setSetorescolhido(Setor setorescolhido) {
		this.setorescolhido = setorescolhido;
	}

	public Operacao getOperacaescolhida() {
		return operacaoescolhida;
	}

	public void setOperacaescolhida(Operacao operacaescolhida) {
		this.operacaoescolhida = operacaescolhida;
	}

	public long getIdInfosetor() {
        return idInfosetor;
    }

    public void setIdInfosetor(long idInfosetor) {
        this.idInfosetor = idInfosetor;
    }

    public String getSetor() {
        return setor;
    }

    public void setSetor(String setor) {
        this.setor = setor;
    }

    public String getOperacao() {
        return operacao;
    }

    public void setOperacao(String operacao) {
        this.operacao = operacao;
    }

    public char getStatusSYS() {
        return statusSYS;
    }

    public void setStatusSYS(char statusSYS) {
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