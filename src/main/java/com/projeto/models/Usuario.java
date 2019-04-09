package com.projeto.models;

import javax.persistence.*;

@Entity
public abstract class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String nomeUsuario;
    private String senha;
    private String senhaConfirm;
    private boolean statusSYS = true;

    public String getSenhaConfirm() {
        return senhaConfirm;
    }

    public void setSenhaConfirm(String senhaConfirm) {
        this.senhaConfirm = senhaConfirm;
    }


    public boolean getStatusSYS() {
        return statusSYS;
    }

    public void setStatusSYS(boolean statusSYS) {
        this.statusSYS = statusSYS;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
