import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tatoo } from '../models/tatoo'
import { TatooService } from '../services/tatoo.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() tatoo: Tatoo;

  @Output() tatooFormClose = new EventEmitter<Tatoo>();

  message: string = '';
  isNewTatooForm: boolean = false;
  form: FormGroup

  constructor(private tatooService: TatooService) { }

  ngOnInit() {
    if (this.tatoo == null) {
      this.tatoo = { name: '', description: '', price: 0, id: 0};
      this.isNewTatooForm = true;
    }

    this.form = new FormGroup({
      name: new FormControl(this.tatoo.name, [Validators.required, Validators.minLength(3), Validators.pattern('[a-z,A-Z]*')]),
      description: new FormControl(this.tatoo.description),
      price: new FormControl(this.tatoo.price),
      
    });
  }

  onSubmit() {
    this.tatooFormClose.emit(this.form.value)
    console.log("the form value:", this.form.value);

    this.tatooService.addTatoo(this.form.value).subscribe({
      next: tatoo => {
        console.log(JSON.stringify(tatoo) + 'has been added');
        this.message = "new tatoo  has been added";
      },
      error: (err) => this.message = err
    });
  }
  closeForm() {
    this.tatooFormClose.emit(null)
  }



  
  get name() { return this.form.get('name') }
  get description() { return this.form.get('description') }
  get prie() { return this.form.get('price') }

}
