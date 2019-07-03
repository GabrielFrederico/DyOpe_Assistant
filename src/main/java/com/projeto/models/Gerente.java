package com.projeto.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

import org.springframework.web.bind.annotation.RequestBody;

@Entity
public class Gerente extends Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idgerente")
    private long id;

    @Column(name = "nome_gerente")
    private String nome;

    @Column(name = "rg_gerente")
    private String rg;

    private String chaveAcesso;
    private String verificarChaveAcesso;

    public String getVerificarChaveAcesso() {
        return verificarChaveAcesso;
    }

    public void setVerificarChaveAcesso(String verificarChaveAcesso) {
        this.verificarChaveAcesso = verificarChaveAcesso;
    }

    public List<PlanilhaCusto> getPlanilhascusto() {
        return planilhascusto;
    }

    public void setPlanilhascusto(List<PlanilhaCusto> planilhascusto) {
        this.planilhascusto = planilhascusto;
    }

    public String getChaveAcesso() {
        return chaveAcesso;
    }

    public void setChaveAcesso(String chaveAcesso) {
        this.chaveAcesso = chaveAcesso;
    }

    public List<EtapaProducao> getEtapas() {
        return etapas;
    }

    public void setEtapas(List<EtapaProducao> etapas) {
        this.etapas = etapas;
    }

    @Column(name = "cpf_gerente")
    private String cpf;

    private float gastosfixo, gastoOperacional;

    public float getGastoOperacional() {
        return gastoOperacional;
    }

    public void setGastoOperacional(float gastoOperacional) {
        this.gastoOperacional = gastoOperacional;
    }

    public List<CustoFixo> getCustosfixo() {
        return custosfixo;
    }

    public void setCustosfixo(List<CustoFixo> custosfixo) {
        this.custosfixo = custosfixo;
    }

    public float getGastosfixo() {
        return gastosfixo;
    }

    public void setGastosfixo(float gastosfixo) {
        this.gastosfixo = gastosfixo;
    }

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "gerente_custos", joinColumns = @JoinColumn(name = "gerente_id"), inverseJoinColumns = @JoinColumn(name = "custos_id"))
    private List<CustoFixo> custosfixo = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "gerente_etapas", joinColumns = @JoinColumn(name = "gerente_id"), inverseJoinColumns = @JoinColumn(name = "etapa_id"))
    private List<EtapaProducao> etapas = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "gerente_planilhascusto", joinColumns = @JoinColumn(name = "gerente_id"), inverseJoinColumns = @JoinColumn(name = "planilhacusto_id"))
    private List<PlanilhaCusto> planilhascusto = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "gerente_pecas", joinColumns = @JoinColumn(name = "gerente_id"), inverseJoinColumns = @JoinColumn(name = "peca_id"))
    private List<Peca> pecas = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "gerente_setores", joinColumns = @JoinColumn(name = "gerente_id"), inverseJoinColumns = @JoinColumn(name = "setor_id"))
    private List<Setor> setores = new ArrayList<>();

    public static Gerente somarCustos(@RequestBody Gerente gerente) {
        float custototal = 0;
        for (CustoFixo custofixo : gerente.getCustosfixo()) {
            custototal += custofixo.getCusto();
        }
        gerente.setGastosfixo(custototal);
        return gerente;

    }

    public static void validaCpf(@RequestBody String cpf) {
        cpf = cpf.replace('.', ' ');
        cpf = cpf.replace('-', ' ');
        cpf = cpf.replaceAll(" ", "");
        float iRestoDivisao;
        int iDigito1Aux = 0, iDigitoCPF, iDigito2Aux = 0;
        for (int iCont = 1; iCont < cpf.length() - 1; iCont++) {
            iDigitoCPF = Integer.valueOf(cpf.substring(iCont - 1, iCont)).intValue();
            iDigito1Aux = iDigito1Aux + (11 - iCont) * iDigitoCPF;
            iDigito2Aux = iDigito2Aux + (12 - iCont) * iDigitoCPF;
        }

    }

    public List<Peca> getPecas() {
        return pecas;
    }

    public void setPecas(List<Peca> pecas) {
        this.pecas = pecas;
    }

    public List<Setor> getSetores() {
        return setores;
    }

    public void setSetores(List<Setor> setores) {
        this.setores = setores;
    }

    public Gerente() {
        super();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

}
