import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-customer',
  templateUrl: './single-customer.component.html',
  styleUrls: ['./single-customer.component.scss']
})
export class SingleCustomerComponent implements OnInit {
  panelOpenState = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
