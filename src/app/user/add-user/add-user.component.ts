import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  editId?: number;
  userForm: FormGroup = this.formBuilder.group({});
  user?: User;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.initForm();
  }

  get address() {
    return this.userForm.controls["address"].value;
  }

  isSubmitted: boolean = false;
  public formControlsArray = [
    { label: "Name", formControlName: "name", placeholder: "User name", type: "textField", reqErrMsg: "Please enter user name." },
    { label: "email", formControlName: "email", type: "textField", reqErrMsg: "Please enter email." },
    { label: "gender", formControlName: "gender", options: [{ name: "Male", value: "male" }, { name: "Female", value: "female " }], placeholder: "Select gender", type: "selectField", reqErrMsg: "Please select gender." },
    { label: "role", formControlName: "role", placeholder: "Enter Role", type: "textField", reqErrMsg: "Please enter role." },
    { label: "address", formControlName: "address", type: "addressField", reqErrMsg: "Please enter address." },
  ];

  ngOnInit(): void {
    if (this.route.snapshot.params["id"]) {
      this.editId = this.route.snapshot.params["id"];
      this.user = this.userService.getUserById(Number(this.editId))
      if (this.user) {
        let address: any = this.user.address;
        this.user.address = this.formBuilder.array([]);
        this.userForm.patchValue(this.user);
        for (let i = 0; i < address.length; i++) {
          this.addAddressForm()
        }
        this.address.patchValue(address)
      }
    }
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      role: ["", [Validators.required]],
      address: [this.formBuilder.array([])]
    })
    this.addAddressForm();
  }

  addAddressForm(value: any = "") {
    this.address.push(
      this.formBuilder.group({
        line1: [value],
      })
    )
  }

  updateAddressForm(res: { line1: string }) {
    this.address.push(
      this.formBuilder.group({
        line1: [res.line1 ? res.line1 : ""],
      })
    )
  }

  removeAddressForm(index: number) {
    this.address.removeAt(index)
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      let body = this.userForm.value;
      body.address = body.address.value
      if (!this.editId) {
        this.userService.addUser(this.userForm.value);
      } else {
        this.userService.updateUser(this.editId, this.userForm.value);
      }
      this.router.navigate(["/users"])
    }
  }

}
