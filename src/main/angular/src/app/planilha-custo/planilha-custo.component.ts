import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GerenteService} from '../service/gerente.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {CadastroOperacaoService} from '../service/cadastro-operacao.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-planilha-custo',
  templateUrl: './planilha-custo.component.html'
})
export class PlanilhaCustoComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private gerenteService: GerenteService,
              private etapaService: CadastroOperacaoService, private token: TokenStorageService) {

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
  ope: any;
  opeShow = false;
  showPlanilha = false;
  planilhas: any;
  editarPlanilha = false;

  listacustos = false;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.naoAutenticado();
    this.gerenteService.getGerenteLogado(this.info.username).subscribe(data => {
      this.gerente = data;
    }, error => {
      console.log(error.error);
    });
  }

  editar() {
    this.editarPlanilha = true;
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

  selectOpe() {
  }

  concluirOpe() {
    alert('Operação cadastrada com sucesso!');
    this.router.navigateByUrl('/gerenteindex/homegerente', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/gerenteindex/planilhadecusto/']));
    this.acessovalido = true;
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
      this.gerente.planilhascusto.push(this.planilhaEscolhida);
      this.gerenteService.cadastrarPlanilha(this.gerente).pipe(first()).subscribe(data => {
        this.getdadosCustos();
        this.planilha2 = true;
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

  deletarPlanilha(planilha: any) {
    this.planilhaEscolhida = planilha;
    const i = this.gerente.planilhascusto.indexOf(this.planilhaEscolhida);
    this.planilhaEscolhida.gerente_id = 0;
    this.gerente.planilhascusto.splice(i, 1);
    this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
    }, error => {
      this.mensagemErro = error.error;
    });
    // this.gerenteService.deletePlanilha(this.planilhaEscolhida.id).subscribe(data => {
    // }, error => {
    //   this.mensagemErro = error.error;
    // });
  }

  selectPlanilha(planilha: any) {
    this.planilhaEscolhida = planilha;
  }

  atualizar() {
    this.gerenteService.atualizarPlanilha(this.planilhaEscolhida).pipe(first()).subscribe(data => {
      this.resultadoPlanilha = data;
    }, error => {
      this.mensagemErro = error.error;
    });
  }

  acessar() {
    this.gerenteService.acessarPlanilha(this.gerente).subscribe(data => {
      this.acessovalido = true;
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
