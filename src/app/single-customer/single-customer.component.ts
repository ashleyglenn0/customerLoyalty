import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../customer.model';
import { AuthService } from '../auth.service';
import { Purchases } from '../purchases/purchases.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-customer',
  templateUrl: './single-customer.component.html',
  styleUrls: ['./single-customer.component.scss']
})
export class SingleCustomerComponent implements OnInit {
  panelOpenState = false;
  customerId: any;
  // customer: Customer| undefined;
  purchases: Purchases | undefined;
  // customers!: Observable<Customer[]>;
  private customersCollection!: AngularFirestoreCollection<Customer>;
  private customerDoc!: AngularFirestoreDocument<Customer>;
  customer$: Observable<Customer| undefined> | undefined;
  customerSubscriptionRef: Subscription | undefined;
  uid: any;
  Today = new Date()

  
  constructor(private auth: AuthService, private afs: AngularFirestore, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.customerId = params.id;
      this.auth.getUserState().subscribe(user => {
        this.uid = user?.uid
        this.customerDoc = this.afs.doc<Customer>(`Stores/${this.uid}/customers/${this.customerId}`);
        this.customer$ = this.customerDoc.valueChanges();
      });
    });
  }

  ngOnInit(): void {
   
        
  }

  // getTotalLoyaltyPoints(customer: any): any{
  //   for(let i = 0; i < this.customerId.purchases.loyaltyPoints.length; i++){

  //   }

  // }
  

  ngOnDestroy(): void {
    
  // this.customerSubscriptionRef?.unsubscribe()  

  }

}
