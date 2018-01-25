import { Component, OnInit,Input } from '@angular/core';
import {Globals} from '../_service/globals';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'loginModel',
  templateUrl: './loginModel.component.html',
  styleUrls: ['./loginModel.component.css']
})
export class LoginModelComponent implements OnInit {
  
  backdropShow : boolean;
  isLogin : boolean;
  loginForm : FormGroup;
  email:FormControl;
  password:FormControl;
  username:string;
  @Input() emailAddress;

  constructor(private router:Router,private globals:Globals) {}

  ngOnInit() {
    this.globals.isshow.subscribe(res=>this.backdropShow=res);
    this.globals.login.subscribe(res=>this.isLogin=res);
    this.globals.username.subscribe(res=>this.username=res);
    this.createFormControls();
    this.createForm();

  }
  createFormControls(){
      this.email=new FormControl(' ',[
        Validators.required,
        Validators.email
      ]);
      this.password=new FormControl('',[
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.required
      ]);
  }
  createForm(){
    this.loginForm = new FormGroup({
      email:this.email,
      password:this.password
    });
  }

  clicked(){
    if(this.backdropShow){
      this.backdropShow=false;
      this.globals.changeShow(this.backdropShow);
    }else{
      this.backdropShow=true;
      this.globals.changeShow(this.backdropShow);
    }
  }
  
  login(){
    this.username = this.emailAddress;
    this.globals.changeUserName(this.username);
    if(this.backdropShow && !this.isLogin){
      this.backdropShow=false;
      this.globals.changeShow(this.backdropShow);
      this.isLogin = true;
      this.globals.changeLoggedin(this.isLogin);
    }else{
      this.backdropShow=true;
      this.globals.changeShow(this.backdropShow);
      this.isLogin = false;
      this.globals.changeLoggedin(this.isLogin);
    }
    this.router.navigate(['/']);
  }

}
