import { Component, OnInit } from '@angular/core';

import { Movie } from '../_model/Movie';
import { MovieService,MovieGlobals } from '../_service/index';
import { Router } from '@angular/router';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  
  ifMovieSearch :boolean=true;

  constructor(private movieService:MovieService,private movieGlobals:MovieGlobals){}

  ngOnInit(){
    this.movieGlobals.ifsearch.subscribe(res=>this.ifMovieSearch=res);
  }
  
  
}
