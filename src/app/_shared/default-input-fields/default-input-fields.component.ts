import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormControlName, FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-default-input-fields',
  templateUrl: './default-input-fields.component.html',
  styleUrls: ['./default-input-fields.component.scss']
})
export class DefaultInputFieldsComponent implements OnInit {

  public valueFormGroup?: FormGroup;
  public valueFormControl?: FormControl;
  @Input() public name!: string;
  @Input() public type!: string;
  @Input() public value: string | null = null;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private formControlNameDirective: FormControlName
  ) {
  }

  ngOnInit(): void {
    this.valueFormGroup = this.formGroupDirective.form;
    this.valueFormControl = this.formGroupDirective.getControl(this.formControlNameDirective);
    if (this.value != null) {
      setTimeout(() => {
        this.onFocus(this.name);
        this.onChange();
      }, 50)
    }
  }

  public onFocus(name: string): void {
    if (this.valueFormGroup != undefined) {
      const element = document.getElementById(name);
      if (element != null) {
        if (!this.valueFormGroup.controls[name].valid) {
          element.style.borderBottom = "2px solid red"
        } else {
          element.style.borderBottom = "2px solid lightgreen"
        }
      }
    }

    document.querySelectorAll("[data-input]").forEach(type => {
      const value: string | null = type.getAttribute("data-input")
      if (value === name) {
        if (this.valueFormGroup != undefined) {
          if (type.classList.contains("label-up") && this.valueFormGroup.controls[name].value == '') {
            type.classList.remove("label-up")
          } else {
            type.classList.add("label-up")
          }
          return;
        }
      }
    })
  }

  public onChange(): void {
    const element = document.querySelector("[data-submit-button]");
    if (element != null) {
      if (this.valueFormGroup != undefined) {
        if (this.valueFormGroup.valid && element.classList.contains("disabled")) {
          element.classList.remove("disabled");
        } else if (!this.valueFormGroup.valid && !element.classList.contains("disabled")) {
          element.classList.add("disabled");
        }
      }
    }
  }

}
