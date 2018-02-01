import { Component,OnInit} from '@angular/core';
import { Movie } from '../_model/Movie';
import { MovieService } from '../_service/index';
import { Router } from '@angular/router';

  @Component({
     selector:"toprated-movie",
     template:`<div class="topratedMovie-container">
                <p> Top Rated Movies:</p>
                 <div class="row">
                   <div class = "col s5 m3"
                        *ngFor="let topRatedMovie of topRatedMovies,let i = index"
                        [routerLink]="[topRatedMovie.id]" >
                      <div class = "card" *ngIf="i<4">
                        <div class = "card-image">
                          <img [src]="topRatedMovie.backdropUrl"> 
                          <span class = "card-title">{{topRatedMovie.title}}</span>
                        </div>
                        <div class="card-content">
                          <p>{{topRatedMovie.release_date}}</p> 
                          <p>Vote : {{topRatedMovie.vote_count}} </p>                                
                       </div>
                    </div>
                  </div>
                </div>
              </div>
     `,
      styleUrls: ['./movie.component.css']
  })
 

export class TopRatedMovie  {

  topRatedMovies:Movie[];
  
  constructor(private movieService:MovieService,
              private router:Router){}

  ngOnInit(){
    this.movieService.getTopRated().subscribe(res=>this.topRatedMovies=res);
  }

  backdropStyle(i){
     return{
      'background':`linear-gradient(180deg,rgba(0,0,0,0.7),transparent),url(${this.topRatedMovies[i].backdropUrl})`,
      'backdround-size':'cover'
    }
  }
}