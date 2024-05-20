import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  lasttrips :any[] =[
    {
      name:"İstanbul",
      gun:3,
      butce:12000
    },
    {
      name:"Ankara",
      gun:5,
      butce:8000
    }
  ]
}
