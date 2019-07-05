import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userForm: FormGroup;
  public contactInformation: FormArray;
  public contactTypes: any[] = ['Email', 'Phone'];

  constructor(private fb: FormBuilder,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this._createForm();
  }

  public createContactInformationGroup(): FormGroup {
    return this.fb.group({
      type: ['Email', [Validators.required]],
      label: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.email]]
    });
  }

  public addContactInformation(): void {
    this.contactInformation = this.userForm.get('contactInformations') as FormArray;
    this.contactInformation.push(this.createContactInformationGroup());
  }

  public removeContactInformation(index: number): void {
    this.contactInformation.removeAt(index);
  }

  public saveUserProfile(): void {
    this.matSnackBar.open('User saved successfully', '', {
      duration: 3000
    });
  }

  public hasError = (controlName: string, errorName: string, groupName?: string, itemIndex?: number) => {
    return groupName && itemIndex > -1 ? this.userForm.controls[groupName]['controls'][itemIndex]['controls'][controlName].hasError(errorName) :
      this.userForm.controls[controlName].hasError(errorName);
  }

  public changeLabelValidation(type, index) {
    const contactInformation = this.userForm.controls.contactInformations['controls'][index];
    if (type.value === 'Phone') {
      contactInformation.get('value')
        .setValidators([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]);
    } else {
      contactInformation.get('value')
        .setValidators([Validators.required, Validators.email]);
    }
  }

  private _createForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      organization: '',
      contactInformations: this.fb.array([this.createContactInformationGroup()])
    });
  }

}
