import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  reminder: boolean = false;

  constructor(private router: Router,
    private _userService: UserService) { }

  ngOnInit(): void {

    if(sessionStorage.getItem('name')) {
      this.user.name = sessionStorage.getItem('name');  
      this.reminder = true;
    }

  }

  login (f: NgForm) {

    if(f.invalid) { return; }

    this._userService.login(this.user, f.value.remember)
      .subscribe( response => {
        this.router.navigateByUrl('/items'); 
    });

  }

}
