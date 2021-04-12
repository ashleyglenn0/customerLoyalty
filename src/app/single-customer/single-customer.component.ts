import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { AuthService } from '../auth.service';
import { Purchases } from '../purchases/purchases.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-customer',
  templateUrl: './single-customer.component.html',
  styleUrls: ['./single-customer.component.scss']
})
export class SingleCustomerComponent implements OnInit {
  panelOpenState = false;
  customer: Customer| undefined;
  purchases: Purchases | undefined;
  customers!: Observable<Customer[]>;
  private customersCollection!: AngularFirestoreCollection<Customer>;
  uid: any;

  
  constructor(private auth: AuthService, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.auth.getUserState().subscribe(user => {
      this.uid = user?.uid

       this.customersCollection = this.afs.collection<Customer>(`Stores/${this.uid}/customers`);
       this.customers = this.customersCollection.valueChanges({ idField: 'id' });

        
    })
  }

}
