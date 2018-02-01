import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routing } from './app-routing.module';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MovieService, Globals} from'./_service/index';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginModelComponent } from './loginModel/loginModel.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { MovieComponent,
         NowPlayingMovie,
         SearchMovieComponent,
         UpComingMovie,
         TopRatedMovie
        } from './movie/index';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    HomeComponent,
    LoginModelComponent,
    MovieComponent,
    NowPlayingMovie,
    UpComingMovie,
    TopRatedMovie, 
    SearchMovieComponent,  
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    Globals,
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
