import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';

// reactive form module
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@/material/material.module';

@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ChartsRoutingModule,
  ],
})
export class ChartsModule {}
