import { inject } from "@angular/core";
import { AuthService } from "../../auth/auth.service";



export const authGuard = () => {
    
    const authService = inject(AuthService);

    return authService.isAuthenticated();

};