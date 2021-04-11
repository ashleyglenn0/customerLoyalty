import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authError: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    })
  }
  login(form: any): any {
    this.auth.login(form.value.email, form.value.password);
    this.router.navigate(['/landingPage']);
  }

}
