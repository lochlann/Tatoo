import { Component, OnInit } from '@angular/core';
import { TatooService} from '../services/tatoo.service';
import { Tatoo} from '../models/tatoo';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tatoo-list',
  templateUrl: './tatoo-list.component.html',
  styleUrls: ['./tatoo-list.component.css']
})
export class TatooListComponent implements OnInit {

  tatooList: Tatoo[];
  message: string;
  showTatooForm: boolean = false;
  data: any;

  currentTatoo? : Tatoo;

  constructor(private tatooService: TatooService) { }

  ngOnInit(): void {


    this.tatooService.getAll().subscribe({
      next: (value: Tatoo[] )=> this.tatooList = value,
      complete: () => console.log('tatoo service finished'),
      error: (mess) => this.message = mess
    })
  }

  clicked(tatoo: Tatoo): void {
    this.currentTatoo = tatoo;
    
  }
  openAddTatoo(): void {
    this.currentTatoo = null;
    this.showTatooForm = true;
  }

  openEditTatoo(): void {
    this.showTatooForm = true;
  }

  openDeleteTatoo(): void{
    this.currentTatoo = null;
  }

  // updateTatoo (id: string, tatoo: Tatoo){
  //   this.tatooService.updateTatoo(id, tatoo)
  //   .subscribe({
  //     next: tatoo => this.message = "tatoo has been modified",
  //     error: (err) => this.message = err
  //   });

  //   this.tatooService.getTatoos().subscribe({
  //     next: (value: Tatoo[]) => this.tatooList = value,
  //     complete: () => console.log('tatoo service finished'),
  //     error: (mess) => this.message = mess
  //   })
  // }

  addNewTatoo(newTatoo: Tatoo): void {
    console.log('adding new tatoo ' + JSON.stringify(newTatoo));
    this.tatooService.addTatoo({ id: '', ...newTatoo })
      .subscribe({
        next: tatoo => {
          console.log(JSON.stringify(tatoo) + ' has been added');
        this.message = "new tatoo has been added";},
        error: (err) => this.message = err
      });
  }

  isSelected(tatoo: Tatoo): boolean{
    if (!tatoo || !this.currentTatoo) {
      return false;
    }
    else {
      return tatoo.id === this.currentTatoo.id;
    }
  }

  tatooFormClose(tatoo: Tatoo): void{
    this.showTatooForm = null;
    console.table(tatoo);
    if (tatoo == null){
      this.currentTatoo = null;
    }
    else if (this.currentTatoo == null){
      this.addNewTatoo(tatoo);
    }
    // else {
    //   console.log('need to update tatoo with id ' + this.currentTatoo.id);
    //   this.updateTatoo(`${this.currentTatoo.id}`, tatoo)
    // }
  }

  deleteTatoo ( id: string){
    this.tatooService.delete(id)
    .pipe(first())
    .subscribe(() => this.loadAllUsers());
  } 
  private loadAllUsers() {
    console.log("Test ::::" + JSON.stringify(this.tatooList))
    this.tatooService.getAll()
        .pipe(first())
        .subscribe(data => { this.tatooList = data['tatoo']; console.log(data['tatoo']) });
}
}
