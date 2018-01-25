import { Component } from '@angular/core';
import { Movie } from '../_model/Movie';
import { MovieService,MovieGlobals } from '../_service/index';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';


  @Component({
     selector:"search-movie",
     template:`
       <div class="search-movie">
         <div class = "search">
          <i class="material-icons">search</i>
          <input type="text" 
                   class="search-input" 
                   placeholder="Search a movie"
                   [(ngModel)]="search"
                   (input)="searchMovie.next(search)">
        </div>
          <div *ngIf="searchResults.length===0 else searchMovieShow">
           <h3 *ngIf = "isFetch && searchResults.length===0&&search.length>0" 
               class="result">NO result for {{search}}</h3>
               <nowplaying-movie></nowplaying-movie>
               <upcoming-movie></upcoming-movie>
               <toprated-movie></toprated-movie></div>
               <ng-template #searchMovieShow>
                 <p>Your Search Results:</p>
                  <div class="row">
                   <div class="col s12 m4" 
                        *ngFor="let searchResult of searchResults;let i= index" 
                        (click)="setCurrentMovie(i)">
                    <div class="card blue-grey darken-1" 
                         *ngIf="i<15" [ngStyle]="backdropStyle(i)">
                      <div class="card-content white-text">
                       <span class="card-title">{{searchResult.title}}</span>
                         <div class="movie-year">{{searchResult.release_date}}</div>
                      </div>
                    </div>
                </div>
             </div>
          </ng-template>
    </div>
     `,
      styleUrls: ['./movie.component.css']
  })
 

export class SearchMovieComponent  {

  searchResults:Movie[]=[];
  selectMovie:Movie;
  searchMovie:Subject<string> = new Subject<string>();
  isFetch:boolean = false;
  search:string;
  ifMovieSearch:boolean;
  constructor(private movieService:MovieService,
              private movieGlobals:MovieGlobals,
              private router:Router) {}

  ngOnInit() {
    this.movieGlobals.ifsearch.subscribe(res=>this.ifMovieSearch=res);
    this.movieGlobals.selectmovie.subscribe(res=>this.selectMovie=res);
    this.searchMovie
        .map(query=>{
          this.isFetch = true;
          this.ifMovieSearch = true;
          this.movieGlobals.changeifSearch(this.ifMovieSearch);
          return query
        })
        .subscribe(this.searchQuery.bind(this));
  }

  searchQuery(query:string){
    if(query.length>0){
      this.isFetch = true;
      this.movieService.searchMovie(query).subscribe(res=>this.searchResults = res);
    }else{
      this.isFetch = false;
      this.searchResults=[];
    }    
  }

  setCurrentMovie(index){
    this.selectMovie = this.searchResults[index];
    this.movieGlobals.changeSelectMovie(this.selectMovie);
    this.router.navigate(['./movie-detail']);
  }

  backdropStyle=(i)=>({
    'background':`linear-gradient(180deg,rgba(0,0,0,0.7),transparent),url(${this.searchResults[i].backdropUrl})`,
    'backdround-size':'cover'
  })

}