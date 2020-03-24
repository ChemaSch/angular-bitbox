import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { Role } from "../../enums/role.enum";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  user = new User();
  roles: any[] = [];

  isDetail: boolean;

  constructor(
    private _userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const detail = this.route.snapshot.paramMap.get("detail");
    this.isDetailView(detail);

    const id = this.route.snapshot.paramMap.get("id");
    this.existUser(id);
    this.Roles();
  }

  isDetailView(detail: string) {
    if (detail === "detail") {
      this.isDetail = true;
    } else {
      this.isDetail = false;
    }
  }

  // Check if the option is new user or update user.
  existUser(id: string) {
    if (id !== "new") {
      this.getUser(id);
    }
  }

  // Register enum role object into a list to use in a select.
  Roles() {
    for (let role in Role) {
      this.roles.push({ text: role, value: Role[role] });
    }
  }

  // Get an user.
  getUser(id: string) {
    this._userService.getUser(id).subscribe(user => (this.user = user));
  }

  // Register a new user.
  saveUser(user: User) {
    this._userService.saveUser(user).subscribe();
  }

  // Update an existing user.
  updateUser(user: User) {
    this._userService.updateUser(user).subscribe(user => (this.user = user));
  }

  saveOrUpdate(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // If exist user, call to updateUser method. If not, call to saveUser.
    if (this.user.id) {
      this.updateUser(this.user);
    } else {
      this.saveUser(this.user);
    }
  }
}
