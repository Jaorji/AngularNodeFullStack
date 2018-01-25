import { Component, OnInit } from '@angular/core';
import { Movie } from '../_model/Movie';
import { MovieService ,MovieGlobals} from '../_service/index';
import { ActivatedRoute }from '@angular/router';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  currentMovie:Movie;
  currentMovies:Movie[];
  movieIndex:any;


  constructor(private movieService:MovieService,
              private route:ActivatedRoute,
              private movieGlobals:MovieGlobals) {

    this.route.params.subscribe(res=>this.movieIndex=res.id);
    this.movieGlobals.selectmovie.subscribe(res=>this.currentMovie=res);
    this.movieService.getNowPlaying().subscribe(res=>this.currentMovies=res);
    
  }

  ngOnInit() {}
  
  getImageUrl(){
    return this.currentMovie.posterUrl;
  }

}
