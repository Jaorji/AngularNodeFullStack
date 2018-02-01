import { Component,OnInit} from '@angular/core';
import { Movie } from '../_model/Movie';
import { MovieService } from '../_service/index';
import { Router } from '@angular/router';

  @Component({
     selector:"upcoming-movie",
     template:`<div class="upcomingMovie-container">
                <p> Up Coming Movies:</p>
                 <div class="row">
                   <div class = "col s5 m3"
                        *ngFor="let upComingMovie of upComingMovies,let i = index"
                        [routerLink]="[upComingMovie.id]" >
                      <div class = "card" *ngIf="i<4">
                        <div class = "card-image">
                          <img [src]="upComingMovie.backdropUrl"> 
                          <span class = "card-title">{{upComingMovie?.title}}</span>
                        </div>
                        <div class="card-content">
                          <p>{{upComingMovie.release_date}}</p>
                          <p>Vote : {{upComingMovie.vote_count}} </p>                               
                       </div>
                    </div>
                  </div>
                </div>
              </div>
     `,
      styleUrls: ['./movie.component.css']
  })
 

export class UpComingMovie  {

  upComingMovies:Movie[];
  
  constructor(private movieService:MovieService,
              private router:Router){}

  ngOnInit(){
    this.movieService.getUpComing().subscribe(res=>{this.upComingMovies=res});
  }
 
   backdropStyle(i){
     return{
      'background':`url(${this.upComingMovies[i].backdropUrl})`,
      'backdround-size':'cover'
     }
  }
}