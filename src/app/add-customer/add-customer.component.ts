import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customer?: Customer;
  customerId: any;
 

  constructor(private route: ActivatedRoute, private router: Router, private customerService: CustomerService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params.id;
    this.customer = this.customerService.getCustomerById(this.customerId);
  }

  onSubmit(form: NgForm): any{
     const username = form.form.value.firstName;
     const customerId = this.customerService.createCustomer(username);
     this.router.navigate(['/addPurchases', customerId])
     console.log(form);
  }

}
