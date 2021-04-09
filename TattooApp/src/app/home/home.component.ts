import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService, AuthenticationService } from '../services/index';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser?: User;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: string) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        console.log("Test ::::" + JSON.stringify(this.users))
        this.userService.getAll()
            .pipe(first())
            .subscribe(data => { this.users = data['users']; console.log(data['users']) });
    }
}