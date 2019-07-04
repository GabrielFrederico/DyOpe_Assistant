import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GerenteService } from '../service/gerente.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { CadastroOperacaoService } from '../service/cadastro-operacao.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-planilha-custo',
  templateUrl: './planilha-custo.component.html'
})
export class PlanilhaCustoComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private gerenteService: GerenteService,
    private etapaService: CadastroOperacaoService, private token: TokenStorageService,
    private changeDetectorRefs: ChangeDetectorRef) {

  }

  @ViewChild('closeModal') closeOpeModal: ElementRef;
  @ViewChild('modal') closeModalPeca: ElementRef;
  public info: any;
  gerente: any;
  etapas: any;
  acessovalido = false;
  invalido = false;
  chaveAcesso: string;
  mensagemErro: string;
  planilha: any = {};
  planilhaEscolhida: any;
  resultadoPlanilha: any;
  operacaoEscolhida: any;
  isReadonly = true;
  planilha2 = false;
  valido = true;
  validado: boolean;
  atualizarPlanilha = false;
  peca: any;
  showPlanilha = false;
  planilhas: any;
  custos: any;
  editarPlanilha = false;
  addPrecoPeca = false;
  listacustos = false;
  erro = false;
  precocadastrado = false;
  listacustofixo = false;
  listacadcustofixo = false;
  newcustofixo: any = {};
  editarcusto = false;
  colunapreco: boolean;
  custofixoEscolhido: any;
  custostring: string;
  precoOpestring: string;
  editPrecoPecaOpe = false;
  editPrecoPecaOpeForm = false;
  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.naoAutenticado();
    this.datareload();

  }
  editPreco(planilha: any) {
    this.planilhaEscolhida = planilha;
    this.editPrecoPecaOpeForm = true;
    this.listacustos = false;
  }
  custo(custo: any) {
    this.custostring = custo;
    this.newcustofixo.custo = +this.custostring;
  }

  descricaocusto(descricao: any) {
    this.newcustofixo.descricao = descricao;
  }

  custoedit(custo: any) {
    this.custofixoEscolhido.custo = custo;
  }

  descricaocustoedit(descricao: any) {
    this.custofixoEscolhido.descricao = descricao;
  }

  atualizarCustoFixo() {
    this.gerenteService.cadastrarCustoFixo(this.gerente).pipe(first()).subscribe(ger => {
      this.editarcusto = false;
      this.datareload();
      this.changeDetectorRefs.detectChanges();
    }, error => {
      this.erro = true;
      this.mensagemErro = error.error;
    });
  }

  deletarCustoFixo(custofixo: any) {
    this.custofixoEscolhido = custofixo;
    const index = this.gerente.custosfixo.indexOf(this.custofixoEscolhido, 0);
    this.gerente.custosfixo.splice(index, 1);
    this.atualizarCustoFixo();
  }

  showColunaPreco() {
    this.colunapreco = true;
  }
  hiddenColunaPreco() {
    this.colunapreco = false;
  }
  cadastrarCustoFixo() {
    this.newcustofixo.gerente_id = this.gerente.id;
    this.gerente.custosfixo.push(this.newcustofixo);
    this.gerenteService.cadastrarCustoFixo(this.gerente).pipe(first()).subscribe(ger => {
      this.datareload();
      this.changeDetectorRefs.detectChanges();
    }, error => {
      this.erro = true;
      this.mensagemErro = error.error;
    });

    this.openCustosFixos();
  }

  datareload() {
    this.gerenteService.getGerenteLogado(this.info.username).subscribe(data => {
      this.gerente = data;
    }, error => {
      console.log(error.error);
    });
  }

  openCustosFixos() {
    this.listacustofixo = true;
    this.listacustos = false;
    this.listacadcustofixo = false;
  }

  sairCustosFixos() {
    this.listacustos = true;
    this.listacustofixo = false;
    this.listacadcustofixo = false;
  }

  openCadCustoFixo() {
    this.listacadcustofixo = true;
    this.listacustos = false;
    this.listacustofixo = false;
  }

  cancelar() {
    this.editarPlanilha = false;
  }

  selectPeca() {
    this.planilha.operacao_id = 0;
    if (!this.showPlanilha) {
      this.gerenteService.addPlanilha(this.planilha).subscribe(data => {
        this.planilhaEscolhida = data;
      }, error => {
        this.mensagemErro = error.error;
      });
      this.showPlanilha = true;
    }

  }

  addPreco(planilha: any) {
    this.planilhaEscolhida = planilha;
    this.addPrecoPeca = true;
    this.listacustos = false;
  }

  addPrecoPecaOpe(precoPeca: any) {
    this.precoOpestring = precoPeca;
    this.planilhaEscolhida.precoPecaOpe = +this.precoOpestring;
  }
  editarPrecoOpePeca() {
    this.gerenteService.atualizarPlanilha(this.planilhaEscolhida).pipe(first()).subscribe(data => {
      this.editPrecoPecaOpeForm = false;
      this.datareload();
      this.changeDetectorRefs.detectChanges();
      this.voltarLista();
    }, error => {
      this.erro = true;
      this.mensagemErro = error.error;
    });
  }
  cadastrarPrecoOpePeca() {
    this.gerenteService.atualizarPlanilha(this.planilhaEscolhida).pipe(first()).subscribe(data => {
      this.precocadastrado = true;
      this.datareload();
      this.changeDetectorRefs.detectChanges();
      this.editPrecoPecaOpe = true;
      this.voltarLista();
    }, error => {
      this.erro = true;
      this.mensagemErro = error.error;
    });
  }

  voltarLista() {
    this.addPrecoPeca = false;
    this.listacustos = true;
    this.editPrecoPecaOpeForm = false;
  }

  concluirPla() {
    alert('Planilha cadastrada com sucesso!');
    this.atualizarPlanilha = false;
    this.planilha = {};
    this.peca = {};
    this.operacaoEscolhida = {};
    this.planilha2 = false;
    this.resultadoPlanilha = {};
    this.gerente = {};
    this.showPlanilha = false;
    this.datareload();
    this.acessovalido = true;
  }

  editcusto(custofixo: any) {
    this.custofixoEscolhido = custofixo;
    this.editarcusto = true;
  }

  cancelcusto() {
    this.editarcusto = false;
  }

  cadastrar() {
    if (this.atualizarPlanilha) {
      this.atualizar();
      console.log('planilha ATUALIZADA');
    } else {
      this.planilhaEscolhida.operacao_id = this.operacaoEscolhida.id;
      this.planilhaEscolhida.descricaoOpe = this.operacaoEscolhida.descricao;
      this.planilhaEscolhida.tempos = this.operacaoEscolhida.tempos;
      this.planilhaEscolhida.lote = this.operacaoEscolhida.loteProducao;
      this.planilhaEscolhida.numFunOpe = this.operacaoEscolhida.numFuncionariosDisponiveis;
      this.planilhaEscolhida.gerente_id = this.gerente.id;
      this.planilhaEscolhida.gastos = this.gerente.gastosfixo;
      this.gerente.planilhascusto.push(this.planilhaEscolhida);
      this.gerenteService.cadastrarPlanilha(this.gerente).pipe(first()).subscribe(data => {
        this.getdadosCustos();
        this.planilha2 = true;
        this.atualizarPlanilha = true;
      }, error => {
        this.mensagemErro = error.error;
      });
    }
  }

  getdadosCustos() {
    this.gerenteService.getPlanilhaId(this.planilhaEscolhida.id).subscribe(data => {
      this.resultadoPlanilha = data;
    }, error => {
      this.mensagemErro = error.error;
    });
  }

  listaClosed() {
    this.listacustos = false;
  }

  openLista() {
    this.listacustos = true;
  }

  gastoOpe(gasto: any) {
    this.planilhaEscolhida.gastosOpe = gasto;
  }

  atualizar() {
    this.gerenteService.atualizarPlanilha(this.planilhaEscolhida).pipe(first()).subscribe(data => {
      this.resultadoPlanilha = data;
    }, error => {
      this.mensagemErro = error.error;
    });
  }

  atualizardalista(planilha: any) {
    this.gerenteService.atualizarPlanilha(planilha).pipe(first()).subscribe(data => {
      planilha = data;
      console.log('planilhaupdated');
      this.cancelar();
    }, error => {
      this.mensagemErro = error.error;
    });
  }

  acessar() {
    this.gerente.verificarChaveAcesso = this.chaveAcesso;
    this.gerenteService.acessarPlanilha(this.gerente).subscribe(data => {
      this.acessovalido = true;
      this.listacustos = true;
    }, error => {
      this.invalido = true;
      this.mensagemErro = error.error;
    });
  }

  naoAutenticado() {
    if (this.info.authorities.toString() !== 'ROLE_GERENTE') {
      this.validado = false;
      this.router.navigate(['/logingerente']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }

  toggleReadonly() {
    this.isReadonly = !this.isReadonly;
  }

}
