import { Component, OnInit ,Input} from '@angular/core';
import {Router} from '@angular/router';
import { Globals } from '../_service/globals';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  show: boolean;
  isLoggedin:boolean =false;
  username:string;
  registerForm : FormGroup;
  email:FormControl;
  password:FormControl;
  confirmPassword:FormControl;
  @Input() emailAddress;
  @Input() passwordInput;
  @Input() confirmPasswordInput;
  
  
  constructor(private router:Router,private globals:Globals) {}

  ngOnInit() {
    this.globals.isshow.subscribe(res=>this.show=res);
    this.globals.login.subscribe(res=>this.isLoggedin=res);
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
      this.confirmPassword=new FormControl('',[
        Validators.required,
        this.passwordMatch.bind(this)
      ]);
  }
 
  createForm(){
    this.registerForm = new FormGroup({
      email:this.email,
      password:this.password,
      confirmPassword:this.confirmPassword
    });
  }
   
  passwordMatch (){
    return this.passwordInput === this.confirmPasswordInput ? null:{'misMatch':true};
  }

  submit(){
    if(this.registerForm.valid){
      this.isLoggedin = true;
      this.globals.changeLoggedin(this.isLoggedin);
      this.username = this.emailAddress;
      this.globals.changeUserName(this.username);
      this.router.navigate(['./']);
    }
  }
  
}
