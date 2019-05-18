package com.projeto.models;

import javax.persistence.*;

@Entity
public class TipoOperacao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private long idTipoOpe;
    
    @OneToOne(mappedBy = "tipoope")
    private Operacao operacao;

    public Operacao getOperacao() {
        return operacao;
    }

    public void setOperacao(Operacao operacao) {
        this.operacao = operacao;
    }

    private String tipoOpe;
    private char statusSYS;

    public char getStatusSYS() {
        return statusSYS;
    }

    public void setStatusSYS(char statusSYS) {
        this.statusSYS = statusSYS;
    }

    public long getIdTipoOpe() {
        return idTipoOpe;
    }

    public void setIdTipoOpe(long idTipoOpe) {
        this.idTipoOpe = idTipoOpe;
    }

    public String getTipoOpe() {
        return tipoOpe;
    }

    public void setTipoOpe(String tipoOpe) {
        this.tipoOpe = tipoOpe;
    }
}
