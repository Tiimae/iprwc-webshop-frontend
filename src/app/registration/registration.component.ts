import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  firstNameField: string = '';
  middleNameField: string = '';
  lastNameField: string = '';

  emailField: string = '';
  passwordField: string = '';
  passwordRepeatField: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
