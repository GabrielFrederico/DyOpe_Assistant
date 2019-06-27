package com.projeto.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.web.bind.annotation.RequestBody;

@Entity
public class PlanilhaCusto {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private float custoMinuto, lucro, gastosOpe, gastos, custoOpe, tempos, lote;
	private int numFunOpe;
	public int getNumFunOpe() {
		return numFunOpe;
	}

	public void setNumFunOpe(int numFunOpe) {
		this.numFunOpe = numFunOpe;
	}

	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="operacao_id", nullable =false)
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

	public float getTempos() {
		return tempos;
	}

	public void setTempos(float tempos) {
		this.tempos = tempos;
	}

	public float getLote() {
		return lote;
	}

	public void setLote(float lote) {
		this.lote = lote;
	}

	public static PlanilhaCusto calcularCusto(@RequestBody PlanilhaCusto planilha) {

		float custoMinuto, custo, lucro, ganho, gastos;
		// 20 é dias, mudar pra dias
		custoMinuto = planilha.getGastos() / planilha.getNumFunOpe() / 20 / 450;
		planilha.setCustoMinuto(custoMinuto);
		// custo = custoMinuto * planilha.getOperacao().getTempos();
		// ganho = custo * planilha.getOperacao().getLoteProducao();
		custo = custoMinuto * planilha.getTempos();
		System.out.println("custo ope"+ custo);
		planilha.setCustoOpe(custo);
	    ganho = custo * planilha.getLote();
		gastos = planilha.getGastos() + planilha.getGastosOpe();
		lucro = ganho - gastos;
		planilha.setLucro(lucro);

		return planilha;

	}

}
