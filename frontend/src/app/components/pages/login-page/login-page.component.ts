import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private location: Location, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid)
      return;

    this.userService.login({email: this.fc['email'].value, password: this.fc['password'].value})
      .subscribe(() => {
        this.location.historyGo(-1)
      });
  }
}
