/*
    Shared module will be imported by many lazy loaded features and because of that
    it should NEVER implement any services (providers: [ ])	and only contain
    declarables (components, directives and pipes) and modules (which only contain declarables).

    The reason for that is that every lazy loaded module would get its own service instance
    which is almost never what we want because in most cases we expect services to be global singletons!
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        // vendor
        CommonModule
    ],
    declarations: [],
    exports: [
        // vendor
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // material
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatCardModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatSliderModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatProgressBarModule,
        MatChipsModule,
        MatDialogModule
    ],
    providers: []
})
export class SharedModule { }
