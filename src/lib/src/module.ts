import { NgModule } from '@angular/core';

import { LibComponent } from './component/lib.component';
import { LibService } from './service/lib.service';
import { RdAngularCoreModule } from './core/core.module';

@NgModule({
  declarations: [LibComponent],
  providers: [LibService],
  exports: [LibComponent, RdAngularCoreModule]
})
export class LibModule { }
