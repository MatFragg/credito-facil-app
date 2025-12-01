import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-unauthorized-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './unauthorized-page.component.html',
    styleUrls: ['./unauthorized-page.component.css']
})
export class UnauthorizedPageComponent {

}
