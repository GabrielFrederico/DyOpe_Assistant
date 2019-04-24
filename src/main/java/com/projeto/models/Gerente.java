package com.projeto.models;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "gerentes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
            "email"
        })
})
public class Gerente extends Usuario {


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String nome;
	private String rg;
	private String cpf;
    private Set<Operacao> operacao;

    @OneToMany(mappedBy = "gerente", cascade = CascadeType.ALL)
    public Set<Operacao> getOperacao() {
        return operacao;
    }

    public void setOperacao(Set<Operacao> operacao) {
        this.operacao = operacao;
    }

	private String email;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
