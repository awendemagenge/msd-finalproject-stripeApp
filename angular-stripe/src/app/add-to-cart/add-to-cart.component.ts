import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: './add-to-cart.component.scss',
  template: ` 
  <h1>Movies customer choose<h1>
  <ul style="list-style: none;">
  <li *ngFor="let item of movies"><br>
  Title: {{item.Title}}<br>price $ {{item.price}}
  </li>
  <ul><br>
      Total Charge Amount $ {{Total}}<br/><br/>

 <button  type="submit" class="favorite styled" (click)="checkout()">checkout</button>

  `,
  styleUrls: ['./add-to-cart.component.scss']

})


export class AddToCartComponent implements OnInit {
  movies: any
  identifier: any
  allmovies:any=false
  arr: any
  Title: any;
  Price: any;
  array: any;
  Total:any
  

  constructor(private route: Router, private MainServiceService: MainServiceService) {
   this.movies = this.route.getCurrentNavigation()?.extras.state
  // this.Total= this.movies.reduce((a:any, b:any) => a + b, 0)
  this.Total=this.movies.map(this.price).reduce((prev:any,next:any)=>{
   return  prev+next
  });
    
  }

  ngOnInit(): void {
    // this.MainServiceService.getmovies().subscribe((data: any) => {
    //   this.data = data.movies
    //   console.log(this.data)
    // })

  }
  find(array:any,value:any){
    return array.filter((item:any)=>{
      console.log("huuuu")
       return item==value
      
     })
   }



price(item:any){
  return item.price;
}
checkout() {
  localStorage.setItem("totalprice",this.Total)
  this.route.navigate(['payment'])
}







}
