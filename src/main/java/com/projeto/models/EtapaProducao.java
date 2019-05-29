package com.projeto.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
public class EtapaProducao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private long idTipoOpe;
    
    private String etapaProducao;
    
    @OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "etapa_producao_operacoes",
    joinColumns = @JoinColumn(name = "etapa_producao_id"),
    inverseJoinColumns = @JoinColumn(name = "operacao_id"))
	private Set<Operacao> operacoes = new HashSet<>();

    
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
        return etapaProducao;
    }

    public void setTipoOpe(String etapaProducao) {
        this.etapaProducao = etapaProducao;
    }
}
