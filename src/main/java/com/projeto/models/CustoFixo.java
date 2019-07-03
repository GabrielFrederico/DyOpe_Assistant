package com.projeto.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.web.bind.annotation.RequestBody;

@Entity
public class CustoFixo {
    
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String descricao;
	private float custo;

	public long getId() {
		return id;
	}

	public static Gerente somarCustos(@RequestBody Gerente gerente) {
		float custototal = 0;
	    for (CustoFixo custofixo : gerente.getCustosfixo()) {
			custototal +=custofixo.getCusto();
		}
	    gerente.setGastosfixo(custototal);
		return gerente;
	
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

	public float getCusto() {
		return custo;
	}

	public void setCusto(float custo) {
		this.custo = custo;
	}
}
