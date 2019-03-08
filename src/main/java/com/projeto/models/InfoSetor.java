package com.projeto.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Time;

@Entity
public class InfoSetor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idInfosetor;

    private String setor, operacao;
    private char statusSYS;
    private int qtdPecasOpe;
    private Time tempoNesc;

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

    public Time getTempoNesc() {
        return tempoNesc;
    }

    public void setTempoNesc(Time tempoNesc) {
        this.tempoNesc = tempoNesc;
    }
}