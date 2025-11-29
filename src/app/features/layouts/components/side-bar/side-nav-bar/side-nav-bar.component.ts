// ...existing code...
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideNavBarHeaderComponent } from '../side-nav-bar-header/side-nav-bar-header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-side-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SideNavBarHeaderComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.css'
})
export class SideNavBarComponent {
  constructor() {
    console.log('SideNavBarComponent instantiated'); // debug
  }

  logout(): void {
    console.log('logout');
  }
}
