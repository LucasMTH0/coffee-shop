import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {

  @Input() variant: "register" | "login" = "login";
  @Output() submitUserForm = new EventEmitter();
  userForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  handleSubmitUserForm(){
    this.submitUserForm.emit(this.userForm.value);
  }
}
