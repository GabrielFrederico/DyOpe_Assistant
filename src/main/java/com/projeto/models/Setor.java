package com.projeto.models;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Setor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String nomeSetor;
    private String operacao;
    private char statusSYS;
    
    @ManyToOne(cascade = CascadeType.ALL)
	private Gerente gerente;
    
    @OneToMany(mappedBy="setor",cascade = CascadeType.ALL)
	private Set<Funcionario> funcionarios;
    
    @OneToMany(mappedBy="setorescolhido", cascade = CascadeType.ALL)
	private Set<InfoSetor> infosetores;
    
    @OneToOne(cascade = CascadeType.ALL)
	private Operacao operacaoo;
    

    public Setor() {
		super();
	}
    

	public Setor(Funcionario funcionario, InfoSetor infosetor) {
		super();
		this.funcionarios = Stream.of(funcionario).collect(Collectors.toSet());
		this.funcionarios.forEach(x -> x.setSetor(this));
		this.infosetores = Stream.of(infosetor).collect(Collectors.toSet());
		this.infosetores.forEach(x -> x.setSetorescolhido(this));
	}


	public Set<Funcionario> getFuncionario() {
		return funcionarios;
	}

	public void setFuncionario(Set<Funcionario> funcionario) {
		this.funcionarios = funcionario;
	}

	public Operacao getOperacaoo() {
		return operacaoo;
	}

	public void setOperacaoo(Operacao operacaoo) {
		this.operacaoo = operacaoo;
	}

	public Gerente getGerente() {
		return gerente;
	}

	public void setGerente(Gerente gerente) {
		this.gerente = gerente;
	}

	
	public Set<Funcionario> getFuncionarios() {
		return funcionarios;
	}


	public void setFuncionarios(Set<Funcionario> funcionarios) {
		this.funcionarios = funcionarios;
	}


	public Set<InfoSetor> getInfosetores() {
		return infosetores;
	}


	public void setInfosetores(Set<InfoSetor> infosetores) {
		this.infosetores = infosetores;
	}


	public char getStatusSYS() {
        return statusSYS;
    }

    public void setStatusSYS(char statusSYS) {
        this.statusSYS = statusSYS;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNomeSetor() {
        return nomeSetor;
    }

    public void setNomeSetor(String nomeSetor) {
        this.nomeSetor = nomeSetor;
    }

    public String getOperacao() {
        return operacao;
    }

    public void setOperacao(String operacao) {
        this.operacao = operacao;
    }

}
