import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Purchases } from '../purchases/purchases.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customer: any = '';
  customerId: any;
  purchases!: Observable<Purchases[]>;
  private customersCollection!: AngularFirestoreCollection<Customer>;
  customers!: Observable<Customer[]>;
  uid: any;


  constructor(private customerService: CustomerService, private router: Router, private auth: AuthService, private afs: AngularFirestore) { }

  ngOnInit(): void {

    //  this.customerId = this.route.snapshot.params.id;
    //  this.customer = this.customerService.getCustomerById(this.customerId);

    this.auth.getUserState().subscribe(user => {
      this.uid = user?.uid

       this.customersCollection = this.afs.collection<Customer>(`Stores/${this.uid}/customers`);
       this.customers = this.customersCollection.valueChanges({ idField: 'id' });
    })
  }

  addPurchase(customer: Customer): any{
    this.router.navigate(['/addPurchases'])

  }

  onViewCustomer(customer: any): any {
    this.router.navigate(['/singleCustomer', customer.id]);
  }

  deleteCustomer(customer: Customer): any {
    confirm('Refund and delete this customer?');
    this.afs.collection(`Stores/${this.uid}/customers`).doc(customer.customerId).delete();
  }

}
