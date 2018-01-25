import { Component ,OnInit} from '@angular/core';
import {Globals} from '../_service/globals';
import { Router } from '@angular/router';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  })
export class HeaderComponent implements OnInit{
   
  isShow :boolean = false;
  isLogged : boolean = false;
  user : string;

  constructor(private globals:Globals,private router:Router){}

  ngOnInit() {
    this.globals.isshow.subscribe(res=>this.isShow=res);
    this.globals.login.subscribe(res=>this.isLogged = res);
    this.globals.username.subscribe(res=>this.user=res);
  }

  login(){
    if(this.isShow){
      this.isShow = false;
      this.globals.changeShow(this.isShow);
    }else{
      this.isShow = true;
      this.globals.changeShow(this.isShow);
    }
  }

  logout(){
    this.isLogged = false;
    this.globals.changeLoggedin(this.isLogged);
    this.router.navigate(['/']);
  }
}
