import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];  
  loading: boolean = true;  

  constructor(private _userService: UserService) { }

  ngOnInit(): void {

    this.getUsers();

  }

  // Get all users.
  getUsers() {

    this.loading = true;

    this._userService.getUsers()
      .subscribe( users => this.users = users );

    this.loading = false;
    
  }

  // Get an user.
  getUser(user: User) {    
    this._userService.getUser(user.id).subscribe(users => this.users[0] = users);
  }

  // Register a new user.
  saveUser(user: User) {

    this._userService.saveUser(user)
      .subscribe();

  }

  // Update an existing user.
  updateUser(){}

  // Delele an user.
  deleteUser(user: User) {
    this._userService.deleteUser(user.id).subscribe();
  }


}
