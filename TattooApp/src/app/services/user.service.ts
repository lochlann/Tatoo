import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './index';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,
        private authenticationService: AuthenticationService) { }
    private dataUri = `${environment.apiUrl}/users`

    getAll() {
        return this.http.get<User[]>(this.dataUri);
    }

    register(user: User) {
        return this.http.post<User>(`${environment.apiUrl}/users/register`, user);
    }

    login(user: User) {
        return this.http.post<User>(`${environment.apiUrl}/users/login`, user);
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}