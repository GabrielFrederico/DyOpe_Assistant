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
    private long id_infosetor;

    private String setor, operacao;
    private char status_sys;
    private int qtdPecasOpe;
    private Time tempoNesc;

    public long getId_infosetor() {
        return id_infosetor;
    }

    public void setId_infosetor(long id_infosetor) {
        this.id_infosetor = id_infosetor;
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

    public char getStatus_sys() {
        return status_sys;
    }

    public void setStatus_sys(char status_sys) {
        this.status_sys = status_sys;
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