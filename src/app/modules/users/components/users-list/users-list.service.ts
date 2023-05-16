import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, first, delay, tap, map } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UsersListService {
    
    constructor(private http: HttpClient) { }

    public getUsers(): Observable<Array<User>> {
                
        const url = `${environment.url_API}/users`;        
        
        return this.http.get<Array<User>>(url)
            .pipe(                                                
                first(),
                delay(600),
                map(results => results.sort((user1: User, user2: User) => { return user1.name > user2.name ? 1 : user1.name < user2.name ? -1 : 0; })),
                tap((result: Array<User>) => { /*console.log('UsersListService resultado recebido', result);*/ })    
            );
    }

    public postUser(user: User): Observable<any> {
        const url = `${environment.url_API}/users`;
        return this.http.post(url, user).pipe(first(), delay(600));
    }

    public patchUser(userId: number, userFields: any): Observable<any> {
        const url = `${environment.url_API}/users/${userId}`;
        return this.http.patch(url, userFields).pipe(first(), delay(600));
    }

    public deleteUser(userId: number): Observable<any> {
        const url = `${environment.url_API}/users/${userId}`;
        return this.http.delete(url).pipe(first(), delay(600));
    }
}