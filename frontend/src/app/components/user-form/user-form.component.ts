import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Output() newUser: EventEmitter<User> = new EventEmitter();
  @Output() updatedUser: EventEmitter<User> = new EventEmitter();
  @Input() currentUser: User;
  @Input() isEdit: boolean;
  @ViewChild('userForm') form: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  addUser({value, valid}: { value: User, valid: boolean }) {
    if (!valid) {
      console.log('Form is not valid');
    } else {
      this.userService.addUser( value as User).subscribe(user => {
        // console.log('user-form: add new', user);
        this.newUser.emit(user);
      });
      this.form.reset();
    }
  }

  updateUser({value, valid}: { value: User, valid: boolean }) {
    this.userService.updateUser(value as User).subscribe( user => {
      console.log('user-form: update user', user);
      // this.isEdit = false;
      this.updatedUser.emit(user);
      this.form.reset();
    })
  }

}
