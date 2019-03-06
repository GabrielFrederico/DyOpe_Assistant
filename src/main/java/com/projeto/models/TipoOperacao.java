package com.projeto.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TipoOperacao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idTipoOpe;

    private String tipoOpe;

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
