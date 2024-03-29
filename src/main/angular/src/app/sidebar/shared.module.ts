import {Directive, Input, NgModule} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {ErroComponent} from '../erro/erro.component';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[readonly],[readOnly]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[attr.readonly]': '_isReadonly ? "" : null'
  }
})
export class ReadonlyDirective {
  // tslint:disable-next-line:variable-name
  _isReadonly = false;

  @Input() set readonly(v) {
    this._isReadonly = coerceBooleanProperty(v);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  // C:\Users\juan.159417\Documents\NODE_PATH; pasta node
}

@NgModule({

  declarations: [
    ReadonlyDirective, ErroComponent
  ],
  imports: [],

  exports: [ReadonlyDirective]
})

export class SharedModule {
}
