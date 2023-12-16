import { Injectable } from '@angular/core';
import { LocalstorageHelperService } from './localstorage-helper.service';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localstorageService: LocalstorageHelperService) { }

  listUser() {
    let userList = this.localstorageService.getItem("user_list");
    if (!userList) {
      userList = [];
    }
    return userList;
  }

  getUserById(uid: number) {
    let userList = this.localstorageService.getItem("user_list");
    if (!userList) {
      userList = [];
    }
    return userList.find((p: User) => {
      return p.uid == uid;
    });
  }

  addUser(data: User) {
    let userList = this.localstorageService.getItem("user_list");
    if (!userList) {
      userList = [];
    }
    data["uid"] = userList.length + 1;
    userList.push(data);
    this.localstorageService.setItem("user_list", userList);
  }

  deleteUser(uid: number) {
    let userList = this.localstorageService.getItem("user_list");
    if (!userList) {
      userList = [];
    }
    userList = userList.filter((user: User) => user.uid !== uid);
    this.localstorageService.setItem("user_list", userList);
  }

  updateUser(uid: number, data: User) {
    let userList = this.localstorageService.getItem("user_list");
    if (!userList) {
      userList = [];
    }
    let index = userList.findIndex((p: User) => {
      return p.uid == uid;
    })
    data["uid"] = uid
    userList[index] = data;
    this.localstorageService.setItem("user_list", userList);
  }
}
