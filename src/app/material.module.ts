import { NgModule } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import{MatCardModule} from '@angular/material/card'
import{MatButtonModule} from '@angular/material/button'
import{MatFormFieldModule} from '@angular/material/form-field'
import{MatInputModule} from '@angular/material/input'


@NgModule({
  exports: [
    MatToolbarModule, 
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  
  ],
})
export class MaterialModule {}
