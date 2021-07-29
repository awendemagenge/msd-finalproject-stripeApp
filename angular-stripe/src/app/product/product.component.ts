// import { Component, OnInit } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { loadStripe } from '@stripe/stripe-js'

// @Component({
//   selector: 'app-product',
//   template:`
//   <div>
//   <h2> {{product.title}}</h2>
//   <img src="../assets/the breakfastclub.jpg">
//   <h2> {{product.description}}</h2>
//   <h2> {{product.price}}</h2>
//   <button (click)="checkout()">Checkout</button>
//   </div>`
// })
// export class ProductComponent{
//   title="Movie selling Business"
//   priceId="price_1JFXDaGw0IYTYfN77bwpEzez"
//   product={
//     title:"The Breakfast club",
//     description:"Released in 1985",
//     price:"1 usd"
//   }
//   quantity=1
//   stripePromise:any = loadStripe(environment.stripe_key);


//   constructor() { }

//   async checkout(){
//     console.log("checkOut")
//     const stripe=await this.stripePromise
//     const elements = stripe.elements();
//     const {error}=await stripe?.redirectToCheckout({
//     mode: "payment",
//     lineItems: [{ price: this.priceId, quantity: this.quantity }],
//     successUrl: `${window.location.href}/success`,
//     cancelUrl: `${window.location.href}/failure`,
//     })
//     if(error){
//       console.log(error)
//     }
//   }



// }

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   template:`<div>
//   <h1>Buy classic movies</h1>
//   <router-outlet></router-outlet>
//   </div>`
// })
// export class AppComponent {
//   title = 'angular-stripe';
// }





//***************************for posting using checkout session

/* import { Component } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-product',
  template: `<button (click)="checkout()">
  GO TO CHECKOUT
</button>`
})
export class ProductComponent {
  constructor(private mainService:MainServiceService) { }

  checkout() {
    this.mainService.getSessionId().subscribe(console.log)
  }
}
*/


//******************************* using Element Componenet
import { MainServiceService } from '../main-service.service';
import { Component, OnInit, ViewChild } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { StripeService, StripeCardComponent } from "ngx-stripe"
import { StripeCardElementOptions, StripeElementsOptions } from "@stripe/stripe-js"
import { Router } from '@angular/router';
// import { NavigationCancel } from '@angular/router';
// import { Router } from '@angular/router';

@Component({
  selector: `app-product`,
  templateUrl: `./product.component.html`,
  styleUrls: ['./product.component.css']

})
export class ProductComponent implements OnInit {
  submitted = false;
  visiblity: any = false;
  email: any;


  @ViewChild(StripeCardComponent) card: StripeCardComponent | any
  //the Card Element component is used to collection payment information and create a token.

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#DAA520',
        color: '#FFC000',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '21px',
        '::placeholder': {
          color: 'white'
        }
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  myForm: FormGroup | any
  token: any;
  movie: any;
  message: any = null
  Price: any;
  countries: any;
  countryAvailable: any = true
  totalprice: any

  constructor(private fb: FormBuilder, private route: Router, private StripeService: StripeService, private MainServiceService: MainServiceService) {
    this.movie = route.getCurrentNavigation()?.extras.state
    this.totalprice = localStorage.getItem('totalprice')
    if (this.movie === undefined) {
      console.log(parseInt(this.totalprice))
      this.Price = this.totalprice
    } else {
      this.Price = this.movie.price
    }
    this.myForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      country: ['', [Validators.required, Validators.maxLength(2)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required]
    })
  }



  ngOnInit(): void {

  }

  createToken() {
    const firstname = this.myForm?.get('firstname')?.value
    let body = { Kcard: this.card.element, name: { firstname }, price: this.Price }

    //this will go one to stripe to create a token with public key, 
    // then the server will create a charge using the token that it got from the client and secret key
    this.MainServiceService.getToken(body).subscribe(async (token: any) => {
      this.token = await token
      console.log(this.token)
      this.MainServiceService.postToken({ token: this.token, price: this.Price }).subscribe(
        // this.MainServiceService.webHookResponse().subscribe(console.log)
        (success: any) => {
          if (success.success === true) {
            this.route.navigate(['success'], { state: { name: firstname, movie: this.movie } })  //***** */
          } else { this.route.navigate(['failure']) }
        })
    })


  }
  collectBillingInfo() {
    let codeBycustomer = this.myForm.get('country').value
    codeBycustomer = codeBycustomer.toUpperCase()
    this.countries = this.MainServiceService.getcountries()

    if (this.myForm.valid && this.countries.includes(codeBycustomer) === true) {
      this.MainServiceService.getBillingInfo(this.myForm.value).subscribe((response: any) => {
        if (response.status = "success") { this.visiblity = true, this.message = null }
      }
      )
    } else {
      if (this.countries.includes(codeBycustomer) === false) {
        this.message = "please input the your country code correctly"
        return this.message
      }
      this.message = "Fill The Required forms"
    }
  }
  Back() {
    this.route.navigate([''])
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.myForm.invalid) {
      return;
    }

  }


}




