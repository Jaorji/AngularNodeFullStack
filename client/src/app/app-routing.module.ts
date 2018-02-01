import { Routes , RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { MovieComponent, SearchMovieComponent} from './movie/index';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';


const appRoutes:Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'movie',component:MovieComponent,children:[
    {path:'',component:SearchMovieComponent},
    {path:':id',component:MovieDetailComponent},
  ]},
 
  //otherwise redirect to home
  {path:'**', redirectTo:''}
];
  
export const routing = RouterModule.forRoot(appRoutes);