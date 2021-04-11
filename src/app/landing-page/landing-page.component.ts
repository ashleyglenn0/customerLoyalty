import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  user: firebase.User|null|undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private router: Router) {}

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Customer Count', cols: 1, rows: 1 },
          { title: 'Loyalty Point Totals', cols: 1, rows: 1 },
          { title: 'Total Purchases', cols: 1, rows: 1 },
          { title: 'Store Personel', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Customer Count', cols: 2, rows: 1 },
        { title: 'Loyalty Point Totals', cols: 1, rows: 1 },
        { title: 'Total Purchases', cols: 1, rows: 2 },
        { title: 'Store Personel', cols: 1, rows: 1 }
      ];
    })
  );

  ngOnInit(): void {
    this.auth.getUserState()
    .subscribe( user => {
      this.user = user;
    })
  }

  logOut(){
    this.auth.logout();
  }

  
}



