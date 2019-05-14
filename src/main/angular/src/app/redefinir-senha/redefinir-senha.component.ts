import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html'
})
export class RedefinirSenhaComponent implements OnInit {
  @ViewChild("inputNewPassword") newsenhainput: ElementRef;
  @ViewChild("inputPasswordConfirm") confirmasenhainput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  foconewsenha() {
    this.newsenhainput.nativeElement.focus();
  }

  fococonfirmarsenha() {
    this.confirmasenhainput.nativeElement.focus();
  }

}
