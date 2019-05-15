import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';
import {CadastroOperacaoService, Operacao, TipoOperacao} from '../service/cadastro-operacao.service';
import {Observable} from "rxjs";
import {Gerente, GerenteService} from '../service/gerente.service';
import {PerfilGerenteComponent} from "../perfil-gerente/perfil-gerente.component";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-operacao-risco',
  templateUrl: './operacao-risco.component.html'
})
export class OperacaoRiscoComponent implements OnInit {
  @Input() operacao: Operacao = new Operacao();
  @Input() operacoes: Observable<Operacao[]>;
  @Input() gerente: Gerente;
  @Input() gerentes: Observable<Gerente[]>;
  closeResult: string;
  public info: any;
  private gerenteData: PerfilGerenteComponent;
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

  constructor(private gerenteService: GerenteService, private modalService: NgbModal,private operacaoService: CadastroOperacaoService,private token: TokenStorageService, private router: Router) {
  }


  openCadastro(cadastro) {
    this.modalService.open(cadastro, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openInformacoes(content) {
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private validado: boolean;

  naoAutenticado() {
    if (this.info.authorities.toString() !== 'ROLE_GERENTE') {
      this.validado = false;
      this.router.navigate(['/logingerente']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }
  isReadonly = true;
datareload(){
  this.gerentes = this.gerenteService.getinfoGerentes();

  this.gerentes.forEach((ger) => {
    for (let gerent of ger) {
      if (gerent.nomeUsuario == this.info.username) {
        this.gerente = gerent;
        console.clear();
      }
    }
  })

  this.gerente.operacoes = this.gerenteService.getOperacoes();

}


  cadastrar() {

    this.operacao.gerente = this.gerente;

  this.operacaoService.cadastrarOperacao(this.operacao).subscribe(value => console.log(value), error => console.log(error));
    alert('Operação cadastrada com sucesso!');
    this.gerente.operacoes.forEach((operations)=>{
      operations.push(this.operacao);
    })
    this.gerenteService.atualizarGerente(this.gerente);
  }

  toggleReadonly() {
    this.isReadonly = !this.isReadonly;

  }
}
