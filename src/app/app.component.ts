import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { CustomValidators } from './custom-validator';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    NgIf,
    JsonPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'forms';
  userForm: FormGroup;
  sameasPermanent: boolean = false;
  event: any;
  ngOnInit() {
    this.userForm = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        CustomValidators.noSpecialCharacters(),
        CustomValidators.noNumericCharacters(),
      ]),
      lastname: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        CustomValidators.noSpecialCharacters(),
        CustomValidators.noNumericCharacters(),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contact: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      Cities: new FormControl(null, Validators.required),
      Country: new FormControl(null, Validators.required),
      State: new FormControl(null, Validators.required),
      Pincode: new FormControl(null, Validators.required),
      sameasPermanent: new FormControl(false),
      Streets: new FormControl(null, Validators.required),
      City: new FormControl(null, Validators.required),
      Countries: new FormControl(null, Validators.required),
      States: new FormControl(null, Validators.required),
      Pincodes: new FormControl(null, Validators.required),
      skills: new FormArray([new FormControl(null, Validators.required)]),
      experience: new FormArray([]),
    });
    // this.userForm.valueChanges.subscribe((data)=>{
    //   console.log(data);
    // })
    this.userForm.statusChanges.subscribe((status) => {
      console.log(status);
    });
  }
  AddSkills() {
    (<FormArray>this.userForm.get('skills')).push(
      new FormControl(null, Validators.required)
    );
  }
  DeleteSkills(index: number) {
    const controls = <FormArray>this.userForm.get('skills');
    controls.removeAt(index);
  }
  AddExperience() {
    const formgrp = new FormGroup({
      company: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      totalExp: new FormControl(null, Validators.required),
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
    });

    (<FormArray>this.userForm.get('experience')).push(formgrp);
  }
  DeleteExperience(index: number) {
    const frmArray = <FormArray>this.userForm.get('experience');
    frmArray.removeAt(index);
  }
  onCheckedtarget(event: any) {
    if (event.target.checked) {
      this.userForm.patchValue({
        Streets: this.userForm.value.street,
        City: this.userForm.value.Cities,
        Countries: this.userForm.value.Country,
        States: this.userForm.value.State,
        Pincodes: this.userForm.value.Pincode,
      });
    } else {
      this.userForm.patchValue({
        Streets: '',
        City: '',
        Countries: '',
        States: '',
        Pincodes: '',
      });
    }
  }

  onSubmit() {
    // if(this.userForm.invalid){
    //   console.log(this.userForm.markAllAsTouched())
    // }
    console.log(this.userForm.reset());
    console.log(this.userForm);
  }
}
