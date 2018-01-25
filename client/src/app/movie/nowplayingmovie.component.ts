import { Component,OnInit} from '@angular/core';
import { Movie } from '../_model/Movie';
import { MovieService,MovieGlobals } from '../_service/index';
import { Router } from '@angular/router';

  @Component({
     selector:"nowplaying-movie",
     template:`<div class="latestMovie-container">
                <p> Now Playing Movies:</p>
                 <div class="row">
                   <div class = "col s5 m3"
                        *ngFor="let nowPlayingMovie of nowPlayingMovies,let i = index"
                        (click)="setCurrentMovie(i)" >
                      <div class = "card" *ngIf="i<4">
                        <div class = "card-image">
                          <img [src]="nowPlayingMovie.backdropUrl"> 
                          <span class = "card-title">{{nowPlayingMovie.title}}</span>
                        </div>
                        <div class="card-content">
                          <p>{{nowPlayingMovie.release_date}}</p>
                          <p>Vote : {{nowPlayingMovie.vote_count}} </p>                                
                       </div>
                    </div>
                  </div>
                </div>
              </div>
     `,
      styleUrls: ['./movie.component.css']
  })
 

export class NowPlayingMovie  {

  nowPlayingMovies:Movie[];
  currentMovie:Movie;
  
  constructor(private movieService:MovieService,
              private router:Router,
              private movieGlobals:MovieGlobals){}

  ngOnInit(){
    this.movieService.getNowPlaying().subscribe(res=>this.nowPlayingMovies=res);
    this.movieGlobals.selectmovie.subscribe(res=>this.currentMovie=res);
  }
 
  setCurrentMovie(index){
    this.currentMovie = this.nowPlayingMovies[index];
    this.movieGlobals.changeSelectMovie(this.currentMovie);
    this.router.navigate(['./movie-detail']);
  }

   backdropStyle=(i)=>({
    'background':`linear-gradient(180deg,rgba(0,0,0,0.7),transparent),url(${this.nowPlayingMovies[i].backdropUrl})`,
    'backdround-size':'cover'
  })
}