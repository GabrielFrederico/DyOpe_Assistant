package com.projeto.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import org.springframework.web.bind.annotation.RequestBody;

@Entity
public class PlanilhaCusto {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private float custoMinuto, lucro, gastosOpe, gastos, custoOpe, tempos, lote, precoPecaOpe;

	public float getPrecoPecaOpe() {
		return precoPecaOpe;
	}

	public void setPrecoPecaOpe(float precoPecaOpe) {
		this.precoPecaOpe = precoPecaOpe;
	}

	private int numFunOpe;

	public int getNumFunOpe() {
		return numFunOpe;
	}

	public String descricaoOpe;

	public String getDescricaoOpe() {
		return descricaoOpe;
	}

	public void setDescricaoOpe(String descricaoOpe) {
		this.descricaoOpe = descricaoOpe;
	}

	public void setNumFunOpe(int numFunOpe) {
		this.numFunOpe = numFunOpe;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public float getPrecoMinuto() {
		return custoMinuto;
	}

	public void setPrecoMinuto(float preocoMinuto) {
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

//	@OneToOne(mappedBy = "planilhacusto")
//	private Operacao operacao;

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

		float custoMinuto, custo, lucro, ganho, gastos, gasto;
		// 20 é dias, mudar pra dias
		custoMinuto = planilha.getGastos() / planilha.getNumFunOpe() / 20 / 450;
		planilha.setCustoMinuto(custoMinuto);
		custo = custoMinuto * planilha.getTempos();
		System.out.println("tempos"+planilha.getTempos()+"custo ope" + custo);
		planilha.setCustoOpe(custo);
		ganho = planilha.getPrecoPecaOpe() * planilha.getLote();

		gastos = planilha.getGastos() + planilha.getGastosOpe();
		// gasto = gastos/20*planilha.getOperacao().getDiasUteisNecessarios;
		lucro = ganho - gastos;
		planilha.setLucro(lucro);

		return planilha;

	}

}
