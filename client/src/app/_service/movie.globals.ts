import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MovieGlobals{

  public selectMovie = new BehaviorSubject<any>([]);
  selectmovie = this.selectMovie.asObservable();

  public ifSearch = new BehaviorSubject<any>(false);
  ifsearch = this.ifSearch.asObservable();

  changeSelectMovie(selectmovie){
    this.selectMovie.next(selectmovie);
  }

  changeifSearch(ifsearch){
    this.ifSearch.next(ifsearch);
  }

}
