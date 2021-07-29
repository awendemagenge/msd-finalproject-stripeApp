import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import {NgxStripeModule} from "ngx-stripe"
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './movies/movies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatVideoModule } from 'mat-video';
import { MatSliderModule } from '@angular/material/slider';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component'; 



const routes: Routes = [
{path:'',component:MoviesComponent},
{path:'payment',component:ProductComponent},
{path:'success',component:SuccessComponent},
{path:'failure',component:FailureComponent},
{path:'cart',component:AddToCartComponent},
{path:'**',component:ProductComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SuccessComponent,
    FailureComponent,
    MoviesComponent,
    AddToCartComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatVideoModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    HttpClientModule,
    MatListModule,
    MatGridListModule,
    MatSliderModule,
    NgxStripeModule.forRoot("pk_test_51JFNZdGw0IYTYfN7M7IIvB8pjQXbFp5r2i5etc1ePWdNv8lnhKzxBz3EVhnhGjWWgPwmRzSI5y0zbNOC1J7iu1Qt000RcvCxeZ"),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
