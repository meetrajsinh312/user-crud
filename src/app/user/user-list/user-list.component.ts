import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  tableColumns: { name: string, value: string, type?: string }[] = [
    { name: "Name", value: "name", type: "text" },
    { name: "Email", value: "email", type: "text" },
    { name: "Gender", value: "gender", type: "text" },
    { name: "Role", value: "role", type: "text" },
    { name: "Address", value: "address", type: "address" }
  ]

  genderFilter = "";
  roleFilter = "";

  usersData: User[] = [];
  filteredData: User[] = [];
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersData = this.userService.listUser();
    this.filterList();
  }

  editUser(uid: number) {
    this.router.navigate(["/users/edit/" + uid])
  }

  deleteUser(uid: number) {
    this.userService.deleteUser(uid);
    this.getUsers()
  }

  addUser() {
    this.router.navigate(["/users/add"])
  }

  filterList() {
    this.filteredData = this.usersData;
    if (this.genderFilter) {
      this.filteredData = this.filteredData.filter(e => e.gender == this.genderFilter)
    }

    if (this.roleFilter) {
      this.filteredData = this.filteredData.filter(e => e.role.includes(this.roleFilter))
    }
  }

}
