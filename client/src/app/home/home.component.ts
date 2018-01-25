import { Component, OnInit,Input } from '@angular/core';
import { Globals } from '../_service/globals';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  show:boolean;
  isLogin:boolean;

  constructor(private globals:Globals,private router:Router) {}

  ngOnInit() {
    //receive update info
    this.globals.isshow.subscribe(res=>this.show=res);
    this.globals.login.subscribe(res=>this.isLogin=res);
 }

  getUrl(){
     return "url(../assets/background.png)";
  }

  movies(){
    if(this.isLogin){
       this.router.navigate(['./movie']);
    }else{
       alert("please log in!");
    }
  }
}
