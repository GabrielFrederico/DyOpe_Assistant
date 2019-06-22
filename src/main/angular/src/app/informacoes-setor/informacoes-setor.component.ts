import {Component, OnInit} from '@angular/core';
import {InfosetorService} from '../service/infosetor.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {CadastroSetorService} from '../service/cadastro-setor.service';
import {FuncionarioService} from '../service/funcionario.service';
import {GerenteService} from '../service/gerente.service';
import {CadastroOperacaoService} from '../service/cadastro-operacao.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-informacoes-setor',
  templateUrl: './informacoes-setor.component.html'
})
export class InformacoesSetorComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private http: InfosetorService, private funcionarioService: FuncionarioService, private etapaService: CadastroOperacaoService, private setorService: CadastroSetorService,
              private gerenteService: GerenteService,
              private router: Router, private modalService: NgbModal, private token: TokenStorageService) {
  }

  info: any;
  form: any = {};
  funcionario: any;
  gerente: any;
  setor: any = {};
  public isCollapsed = false;
  gerentes: any;
  peca: any;
  subope: any;
  ope: any;
  showOpe = false;
  etapas: any;
  closeResult: string;
  informacao: any = {};
  showsubope = false;
  public validado: boolean;
  setorShow = false;
  etapa: AnimationPlayState;

  erro = false;
  errorMessage = '';

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.funcionarioService.getFuncionarioLogado(this.info.username)
      .subscribe(data => {
        this.funcionario = data;
      });
    this.gerenteService.getGerentes().subscribe(data => {
      this.gerentes = data;
    });
    this.etapaService.getTiposOperacoes().subscribe(data => {
      this.etapas = data;
    });
    console.clear();
    this.naoAutenticado();
  }

  selectGerente() {
    this.setorShow = true;
  }

  selectPeca() {
    this.showOpe = true;
  }

  selectOpe() {
    this.showsubope = true;
  }

  save() {
    this.funcionario.setor_id = this.setor.id;
    this.setor.funcionarios.push(this.funcionario);
    this.informacao.funcionario_id = this.funcionario.id;
    this.informacao.setor_id = this.setor.id;
    this.informacao.gerente_id = this.gerente.id;
    this.funcionario.infosetores.push(this.informacao);
    this.setor.infosetores.push(this.informacao);
    this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
      alert('Cadastrado com sucesso!');
      this.router.navigateByUrl('/funcionarioindex/homefuncionario', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/funcionarioindex/informacoessetor']));

    }, error => {
      this.erro = true;
      this.errorMessage = error.error;
      console.log(error.error);
    });
    this.funcionarioService.atualizarFuncionario(this.funcionario).pipe(first()).subscribe(data => {
    }, error => {
      this.errorMessage = error.error;
      this.erro = true;
    });

  }

  naoAutenticado() {
    if (this.info.authorities.toString() !== 'ROLE_FUNCIONARIO') {
      this.validado = false;
      this.router.navigate(['/loginfuncionario']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }

}
