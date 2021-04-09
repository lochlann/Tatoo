import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Tatoo } from '../models/tatoo'
import { TatooService } from '../services/tatoo.service'
@Component({
  selector: 'app-tatoo-row',
  templateUrl: './tatoo-row.component.html',
  styleUrls: ['./tatoo-row.component.css']
})
export class TatooRowComponent implements OnInit {

  @Input() tatoo: Tatoo;

  constructor(
    private tatooService: TatooService
) {}

ngOnInit() {
    this.loadAllUsers();
}

deleteUser(id: string) {
    this.tatooService.delete(id)
        .pipe(first())
        .subscribe(() => this.loadAllUsers());
}

private loadAllUsers() {
    console.log("Test ::::" + JSON.stringify(this.tatoo))
    this.tatooService.getAll()
        .pipe(first())
        .subscribe(data => { this.tatoo = data['tatoo']; console.log(data['tatoo']) });
}

}
