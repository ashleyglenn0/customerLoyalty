import { CustomerService } from '../customer.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Purchases } from '../purchases/purchases.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  customerId: any;
  customer: any;
  uid: any;
  existingLoyaltyPoints: number = 100;
  

  constructor(private router: Router, private route: ActivatedRoute, private customerService: CustomerService, private auth: AuthService) { }

  ngOnInit(): void {
    this.customerId = +this.route.snapshot.params.id;
    this.customer = this.customerService.getCustomerById(this.customerId);
    console.log(this.customer);

    this.auth.getUserState().subscribe(user =>{
      this.uid = user?.uid;
    })
  }

  getLoyaltyPoints(purchaseAmount: number):number{
    let loyaltyPointsOver100 = 0;
    let loyaltyPointsOver50 = 0;
    let totalLoyaltyPoints = 0;
    if(purchaseAmount > 100 && purchaseAmount > 50){
      loyaltyPointsOver100 = (purchaseAmount - 100 ) * 2;
      loyaltyPointsOver50 = 50;
      totalLoyaltyPoints = loyaltyPointsOver100 + loyaltyPointsOver50 + this.existingLoyaltyPoints;
      return totalLoyaltyPoints;
    } else if (purchaseAmount > 50){
      loyaltyPointsOver50 = (purchaseAmount - 50) * 1;
      totalLoyaltyPoints = loyaltyPointsOver50 + this.existingLoyaltyPoints;
      return totalLoyaltyPoints;
    } else{
      totalLoyaltyPoints = this.existingLoyaltyPoints;
      return totalLoyaltyPoints;
    }

  }

  addPurchase(form: NgForm): any {
    const date = form.form.value.date;
    const amount = form.form.value.amount;
    const description = form.form.value.description;
    this.customerService.createPurchases(date, amount, description, this.customer);
    this.getLoyaltyPoints(amount);
    form.resetForm();
    console.log(form);
    console.log(this.existingLoyaltyPoints);
  }
  

  onSubmit(): any{
    this.customerService.saveCustomer(this.customer, this.uid);
    this.router.navigate(['/customerList']);
  }

}
