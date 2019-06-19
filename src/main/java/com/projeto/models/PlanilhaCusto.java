package com.projeto.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class PlanilhaCusto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private float preocoMinuto, lucro, gastosOpe, gastos, precoOpe;
	
	@OneToMany(cascade = CascadeType.ALL)
	private Operacao operacao;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public float getPreocoMinuto() {
		return preocoMinuto;
	}
	public void setPreocoMinuto(float preocoMinuto) {
		this.preocoMinuto = preocoMinuto;
	}
	public float getLucro() {
		return lucro;
	}
	public void setLucro(float lucro) {
		this.lucro = lucro;
	}
	public float getGastosOpe() {
		return gastosOpe;
	}
	public void setGastosOpe(float gastosOpe) {
		this.gastosOpe = gastosOpe;
	}
	public float getGastos() {
		return gastos;
	}
	public void setGastos(float gastos) {
		this.gastos = gastos;
	}
	public float getPrecoOpe() {
		return precoOpe;
	}
	public void setPrecoOpe(float precoOpe) {
		this.precoOpe = precoOpe;
	}
	

}
