import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTableModule} from './modules/vadm-data-table/data-table.module';
import {
  MatButtonModule, MatButtonToggle, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDialogModule,
  MatDivider,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule, MatSelectModule, MatSnackBarModule,
  MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
    DataTableModule,
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule

  ],
  exports: [MatSelectModule, MatDialogModule, MatDividerModule, MatCardModule, MatSnackBarModule, MatTooltipModule,MatToolbarModule, MatIconModule, MatButtonToggleModule,ReactiveFormsModule,MatInputModule, MatTabsModule, DataTableModule, MatTableModule, MatCheckboxModule, MatRadioModule, MatButtonModule,MatFormFieldModule],
  providers: []
})
export class SharedModule { }
