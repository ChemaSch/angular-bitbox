import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  users: User[] = [];
  detail = "detail";

  constructor(private _userService: UserService) { }

  ngOnInit(): void {

    this.getUsers();

  }

  // Get all users.
  getUsers() {
    this._userService.getUsers().subscribe( users => this.users = users );
  }

  // Delele an user.
  deleteUser(user: User) {
    this._userService.deleteUser(user.id).subscribe();
  }

}