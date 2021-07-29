import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: `./movies.component.html`,
   styleUrls: ['./movies.component.css']

})
export class MoviesComponent implements OnInit {
  data: any;
  image: any;
  url3: any;
  arr: any = []

  constructor(private route: Router, private MainServiceService: MainServiceService) { }

  ngOnInit(): void {
    this.MainServiceService.getmovies().subscribe((data: any) => {
      this.data = data.movies
      console.log(this.data)
      console.log(this.arr)
    })


  }

  checkout(item: any) {
    this.route.navigate(['payment'], { state: item })
  }
  addingToCart(item: any) {
    this.arr.push(item)
  }

  showCart() {
    console.log(this.arr)
    this.route.navigate(['cart'], { state: this.arr })
  }

}
