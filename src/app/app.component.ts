import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  EMAIL_REGEX = "^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$";
  registrationForm: FormGroup;
  hobbies: FormArray = new FormArray([]);
  countries: {key: string, value: string}[];
  constructor(private formBuilder: FormBuilder) { }
 
  ngOnInit() {
    this.countries=[{key:'IND', value:'INDIA'},{key:'JPN', value:'JAPAN'},{key:'US', value:'USA'}]
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      country:this.formBuilder.group(this.countries),
      address: this.formBuilder.group({
        street: ['', Validators.required],
        address2: this.formBuilder.group({
          street:['',Validators.required]
        })
         }),
      hobbies: this.formBuilder.array([
        this.initHobby()
      ])
        });
        }
    initHobby() {
      return this.formBuilder.group({
        name:['',Validators.required],
        desc:['',Validators.required]
        
      })
    }

    addHobbies(): void {
      this.hobbies = this.registrationForm.get('hobbies') as FormArray;
      this.hobbies.push(this.initHobby());
    }
    removeHobbies(index: number){
      this.hobbies = this.registrationForm.get('hobbies') as FormArray;
      this.hobbies.removeAt(index);
    }
    key:any='';
    onSelect(value:any){
      this.key=value;
      console.log(this.key);
    }

        onSubmit(formvalue)
        {
          console.log(formvalue);
          console.log(this.registrationForm.value);
          
        }
      
  }