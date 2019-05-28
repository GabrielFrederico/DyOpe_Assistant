package com.projeto.models;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

@Entity
public class Setor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String nomeSetor;
    private char statusSYS;
    
   
    @OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "setor_funcionarios",
    joinColumns = @JoinColumn(name = "setor_id"),
    inverseJoinColumns = @JoinColumn(name = "funcionario_id"))
	private Set<Funcionario> funcionarios  = new HashSet<>();
    
    @OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "setor_etapaproducao",
    joinColumns = @JoinColumn(name = "setor_id"),
    inverseJoinColumns = @JoinColumn(name = "etapaproducao_id"))
	private Set<EtapaProducao> etapaproducao  = new HashSet<>();
    
    @OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "setor_infosetores",
    joinColumns = @JoinColumn(name = "setor_id"),
    inverseJoinColumns = @JoinColumn(name = "infosetor_id"))
	private Set<InfoSetor> infosetores = new HashSet<>();
    


    public Setor() {
		super();
	}
    
    

	public Setor(Funcionario funcionario, InfoSetor infosetor) {
		super();
		this.funcionarios = Stream.of(funcionario).collect(Collectors.toSet());
	}


	public Set<InfoSetor> getInfosetores() {
		return infosetores;
	}



	public void setInfosetores(Set<InfoSetor> infosetores) {
		this.infosetores = infosetores;
	}



	public Set<Funcionario> getFuncionario() {
		return funcionarios;
	}

	public void setFuncionario(Set<Funcionario> funcionario) {
		this.funcionarios = funcionario;
	}

	
	public Set<Funcionario> getFuncionarios() {
		return funcionarios;
	}


	public void setFuncionarios(Set<Funcionario> funcionarios) {
		this.funcionarios = funcionarios;
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



	public Set<EtapaProducao> getEtapaproducao() {
		return etapaproducao;
	}



	public void setEtapaproducao(Set<EtapaProducao> etapaproducao) {
		this.etapaproducao = etapaproducao;
	}



  
}
