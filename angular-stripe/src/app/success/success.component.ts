import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  name: any
  movielists: any;
  url: any;
  movie: any;

  // constructor(private route: Router) { 
  //   this.name=route.getCurrentNavigation()?.extras.state?.name
  // }

  // ngOnInit(): void {
      
  // }
  constructor(private route: Router, private MainServiceService: MainServiceService) {
    this.movie=route.getCurrentNavigation()?.extras.state
    console.log(this.movie)
    this.name=route.getCurrentNavigation()?.extras.state?.name
    console.log(this.name)
   }

  ngOnInit(): void {
    this.MainServiceService.getmovies().subscribe( (data: any) => {
      this.movielists = data
      console.log(this.movielists)
      console.log(this.name)
      console.log(this.movie)
      this.url= this.MainServiceService.geturl(this.movielists,this.name,this.movie.movie)
      console.log(this.url)
       this.name=this.name
      // console.log(this.url)
    })

  }
  

  Home(){
    this.route.navigate([''])
  }
}
