import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tatoo } from '../models/tatoo';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './index';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TatooService {
    constructor(private http: HttpClient,
        private authenticationService: AuthenticationService) { }
    private dataUri = `${environment.apiUrl}/tatoo`

    getAll() {
        return this.http.get<Tatoo[]>(this.dataUri);
    }

    addTatoo(tatoo: Tatoo) {
        return this.http.post<Tatoo>(`${environment.apiUrl}/tatoo/add`, tatoo);
    }

    getTatoobyId(id: string) {
        return this.http.get<Tatoo>(`${environment.apiUrl}/tatoo/${id}`);
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/tatoo/${id}`);
    }

    // updateTatoo(id: string){

    //     return this.http.put<Tatoo>(`${environment.apiUrl}/tatoos/${id}`);
    // }
      
}