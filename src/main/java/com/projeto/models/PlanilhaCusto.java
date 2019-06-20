package com.projeto.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.springframework.web.bind.annotation.RequestBody;

@Entity
public class PlanilhaCusto {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private float custoMinuto, lucro, gastosOpe, gastos, custoOpe;

	@ManyToOne(cascade = CascadeType.ALL)
	private Operacao operacao;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public float getPreocoMinuto() {
		return custoMinuto;
	}

	public void setPreocoMinuto(float preocoMinuto) {
		this.custoMinuto = preocoMinuto;
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

	public float getCustoMinuto() {
		return custoMinuto;
	}

	public void setCustoMinuto(float custoMinuto) {
		this.custoMinuto = custoMinuto;
	}

	public float getCustoOpe() {
		return custoOpe;
	}

	public void setCustoOpe(float custoOpe) {
		this.custoOpe = custoOpe;
	}

	public Operacao getOperacao() {
		return operacao;
	}

	public void setOperacao(Operacao operacao) {
		this.operacao = operacao;
	}

	public void setGastos(float gastos) {
		this.gastos = gastos;
	}

	public float getPrecoOpe() {
		return custoOpe;
	}

	public void setPrecoOpe(float custoOpe) {
		this.custoOpe = custoOpe;
	}

	public static PlanilhaCusto calcularCusto(@RequestBody PlanilhaCusto planilha) {
		Operacao operacao = planilha.getOperacao();
		float custoMinuto, custo,lucro, ganho, gastos;
		// 20 é dias, mudar pra dias
		custoMinuto = planilha.getGastos()/operacao.getNumFuncionariosDisponiveis()/20/450;
		planilha.setCustoMinuto(custoMinuto);
		custo = custoMinuto * operacao.getTempos();
		ganho = custo*operacao.getLoteProducao();
		gastos = planilha.getGastos() + planilha.getGastosOpe();
		lucro = ganho - gastos;
		planilha.setLucro(lucro);
		
		return planilha;
		
	}

}
