import { Component } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-current-settings',
  imports: [MatCard, MatIcon],
  templateUrl: './current-settings.component.html',
  styleUrl: './current-settings.component.css'
})
export class CurrentSettingsComponent {

}
