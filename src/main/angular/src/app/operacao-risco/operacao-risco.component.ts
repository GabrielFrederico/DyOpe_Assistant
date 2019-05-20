import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { CadastroOperacaoService, Operacao, TipoOperacao } from '../service/cadastro-operacao.service';
import { Observable } from "rxjs";
import { Gerente, GerenteService } from '../service/gerente.service';
import { map, first } from "rxjs/operators";

@Component({
  selector: 'app-operacao-risco',
  templateUrl: './operacao-risco.component.html'
})
export class OperacaoRiscoComponent implements OnInit {
  @Input() operacao: Operacao = new Operacao();
  @Input() gerente: Gerente;
  @Input() gerenteObjeto: Observable<Gerente>;
  @Input() gerentes: Observable<Gerente[]>;
  public erro: boolean;
  public errorMessage = '';
  closeResult: string;
  public info: any;

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

  constructor(private gerenteService: GerenteService, private modalService: NgbModal, private operacaoService: CadastroOperacaoService, private token: TokenStorageService, private router: Router) {
  }


  openCadastro(cadastro) {
    this.modalService.open(cadastro, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openInformacoes(content) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
 private cadastrado: boolean;
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

  datareload() {

    this.gerenteObjeto = this.gerenteService.getGerenteLogado(this.info.username);
    this.gerenteObjeto.subscribe(data=>{
      this.gerente = data;
      console.clear();
    })

  }


  cadastrar() {

      this.operacao.gerente_id = this.gerente.id;
      this.gerente.operacoes.push(this.operacao);
      this.gerenteService.cadastrarOperacao(this.gerente).pipe(first()).subscribe(data => { alert("Operação cadastrada com sucesso!")

      this.getDismissReason(ModalDismissReasons.BACKDROP_CLICK); }, error => { alert(error) });


  }

  toggleReadonly() {
    this.isReadonly = !this.isReadonly;

  }
}
