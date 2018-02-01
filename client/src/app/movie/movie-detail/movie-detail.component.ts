import { Component, OnInit,Input } from '@angular/core';
import { Movie } from '../../_model/Movie';
import { MovieService } from '../../_service/index';
import { ActivatedRoute }from '@angular/router';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  currentMovie:Movie;
  currentMovies:Movie[];
  movieID:string;
  curent:string;

  constructor(private movieService:MovieService,
              private route:ActivatedRoute) {}

  ngOnInit() {
      this.route.params.subscribe(res=>{this.movieID=res.id});
      this.movieService.getMovieDetail(this.movieID).subscribe(res=>{this.currentMovie=res});
  }
      
}
