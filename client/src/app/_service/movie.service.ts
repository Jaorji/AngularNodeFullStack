import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'; 
import 'rxjs/add/operator/map';
import { Movie } from"../_model/Movie";

@Injectable()
export class MovieService {

  private apiKey:string = "4d977eee3282130b79ac683bf57b2cb6";
  private baseUrl:string = "https://api.themoviedb.org/3/movie/";
  private searchApiUrl:string="https://api.themoviedb.org/3/search/movie";
  private baseConfigUrl:string="https://api.themoviedb.org/3/configuration";
  private nowPlayingApiUrl:string=this.baseUrl+"now_playing";
  private upComingApiUrl:string=this.baseUrl+"upcoming";
  private topRatedApitUrl:string=this.baseUrl+"top_rated";

  private imageUrl:string="";
  private imageSizeUrl:{backdrop?:string[],poster?:string[]}={};

  private Url:string="";
  private params:HttpParams = new HttpParams().set('api_key',this.apiKey);


  constructor(private http:HttpClient) {
    this.setImageConfigration();
  }


  setImageConfigration(){
    const params = new HttpParams().set('api_key',this.apiKey);
          this.http.get<any>(this.baseConfigUrl,{params})
                   .map(res=>res)
                   .subscribe((config)=>{
                     this.imageUrl = config.images.base_url,
                     this.imageSizeUrl = {
                       backdrop:config.images.backdrop_sizes,
                       poster:config.images.poster_sizes
                     }
                   });
  }
  
  createImageUrl(path:string,isBackdrop:boolean){
    if(!path){
      return""
    }
    const {backdrop,poster} = this.imageSizeUrl
    const imageSize = isBackdrop ? backdrop[0]:poster[poster.length-1];
    return `${this.imageUrl}${imageSize}${path}`
  }

  call(Url,params){
    return this.http.get<any>(Url,{params})
                    .map(res=>res.results.map((result:Movie)=>{
                      return{
                        ...result,
                        backdropUrl:this.createImageUrl(result.backdrop_path,true),
                        posterUrl:this.createImageUrl(result.poster_path,false)
                      }
                    })
                    );

  }

  //Reastful API
  searchMovie(query:string){
    return this.call(this.searchApiUrl,this.params.set("query",query));
  }

  getNowPlaying(){
     return this.call(this.nowPlayingApiUrl,this.params);
  }

  getMovieDetail(index){
    const params = this.params;
    return this.http.get<any>(this.baseUrl+index,{params})
                    .map(res=>{
                      return{
                        ...res,
                        backdropUrl:this.createImageUrl(res.backdrop_path,true),
                        posterUrl:this.createImageUrl(res.poster_path,false)
                      }
                    });
  }


  getUpComing(){
    return this.call(this.upComingApiUrl,this.params);
  }

  getTopRated(){
    return this.call(this.topRatedApitUrl,this.params);
  }
  

}
