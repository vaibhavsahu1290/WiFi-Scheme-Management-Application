  import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-common',
  templateUrl: './home-common.component.html',
  styleUrls: ['./home-common.component.css']
})
export class HomeCommonComponent implements OnInit {

  constructor() { }
  role: string = '';
  ngOnInit() {
    const loginDTO = localStorage.getItem('loginDTO');
    const parsed = loginDTO ? JSON.parse(loginDTO) : null;
    this.role = parsed.userRole;
}




}
