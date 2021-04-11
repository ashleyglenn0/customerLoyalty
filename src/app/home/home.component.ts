import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authError: any;

  constructor(private auth: AuthService, private fireAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data
    })
  }
   onSubmit(form: NgForm): any{
    const email = form.value.email;
    const password = form.value.password;
    const storeNumber = form.value.storeNumber;
    this.auth.createStore(email, password, storeNumber);
    this.router.navigate(['/landingPage'])
  }

  login(){
    this.router.navigate(['/login']);
  }

}
