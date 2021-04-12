import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-single-customer',
  templateUrl: './single-customer.component.html',
  styleUrls: ['./single-customer.component.scss']
})
export class SingleCustomerComponent implements OnInit {
  panelOpenState = false;
  customer: Customer| undefined;

  
  constructor() { }

  ngOnInit(): void {
  }

}
