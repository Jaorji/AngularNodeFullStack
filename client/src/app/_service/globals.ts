import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class Globals{

  public ifShow = new BehaviorSubject<any>(false);
  isshow = this.ifShow.asObservable();

  public ifLogin = new BehaviorSubject<any>(false);
  login = this.ifLogin.asObservable();

  public userName = new BehaviorSubject<any>('');
  username = this.userName.asObservable();

  changeShow(isshow){
    this.ifShow.next(isshow);
  }

  changeLoggedin(login){
    this.ifLogin.next(login);
  }

  changeUserName(username){
    this.userName.next(username);
  }

}
