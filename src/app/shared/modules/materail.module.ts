import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule
    ]
})
export class MaterialModule {}
