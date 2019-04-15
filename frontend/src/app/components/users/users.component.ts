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
    _id: '',
    firstName: '',
    lastName:'',
    email: '',
  };
  // set isEdit to manage user form for editing
  // if isEdit is true, show update button and prepopulate the form
  isEdit: boolean = false;

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
  onAddUser({value, valid}: { value: User, valid: boolean }) {
    // if form input is not valid, console the error
    if (!valid) {
      console.log('Form is not valid');
    } else {
      // if the form input is valid (firstName, lastName, email)
      // console.log('value', value);
      // add value/ userForm object into db
      this.userService.addUser(value as User).subscribe( user => {
        console.log('user',user);
        this.users.unshift(user);
      });
      // reset the form
      this.form.reset();
    }
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users.users.map(user => {
        user.hide = true;
        return user;
      });
      console.log('getAllUsers', users);
    })
  }

  removeUser(id: string) {
    if (confirm('Are You Sure?')) {
      this.userService.removeUser(id).subscribe(() => {
        this.users = this.users.filter(user => user._id != id);
      });
    }
  }

  editUser(id: string) {
    this.userService.getUser(id).subscribe(user => { this.user = user.user });
    this.isEdit = true;
  }


  onUpdateUser({value, valid}: { value: User, valid: boolean }) {
    this.users.forEach((cur, index) => {
      value.createdAt = new Date();
      if (value._id === cur._id) {
        this.users.splice(index, 1);
        this.users.unshift(value);
      }
    })
    this.userService.updateUser(value as User).subscribe( user => {
      console.log(user);
    });
    // reset the form
    this.form.reset();
    this.isEdit = false;
  }
}
