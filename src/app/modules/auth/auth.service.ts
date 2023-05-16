import { Injectable } from '@angular/core';
import { User } from '../users/models/User';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private user: User | null = null;

    constructor() { }

    public setUser(user: User | null) {
        this.user = user;
        if(!user) {
            // Only for testing purposes
            localStorage.removeItem('userData');
            localStorage.removeItem('isAuthenticated');
        }
    }

    public getUser(): User | null {
        return this.user;
    }

    public isAuthenticated(): boolean {
        return !!this.user;
    }

}