import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // Properties
  // create a user object with default values to bind the form (html) with the user object
  // ---> userForm === user object
  user: User = {
    firstName: '',
    lastName:'',
    email: ''
  };
  // set a property 'form' for form submission
  // @ViewChild('userForm'): the param should match the variable name and onSubmit() param below in html file
  // matches the name in <form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
  @ViewChild('userForm') form: any;

  users: User[];
  // inject UserService as dependency
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  // when form is submitted, invoke the function
  // form validation
  // value = the user object = { userForm input field: value }
  onSubmit({value, valid}: { value: User, valid: boolean }) {
    // if form input is not valid, console the error
    if (!valid) {
      console.log('Form is not valid');
    } else {
      // if the form input is valid (firstName, lastName, email)
      // add other attributes values
      console.log('value', value);
      // value.isActive = true;
      // value.registered = new Date();
      // value.hide = true;
      console.log('value2', value);
      // add value/ userForm object into db
      this.userService.addUser(value as User).subscribe( user => this.users.unshift(user));
      // reset the form
      this.form.reset();
    }
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users.users.map(user => {
        user.hide = true;
        return user;
      })
    })
  }

}
