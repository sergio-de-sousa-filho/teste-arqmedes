import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class LoginService {

    constructor(private http: HttpClient) { }

    
    public login(email: string, password: string): Observable<any> {

        email = email.toLowerCase().trim();
        password = password.toLowerCase().trim();

        const url = `${environment.url_API}/users?email=${email}&password=${password}`;

        return this.http.get(url);
    }

}