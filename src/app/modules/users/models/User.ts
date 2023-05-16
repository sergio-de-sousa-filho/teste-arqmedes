import { MaritalStatus } from "../../shared/enums/martial-status.enum";

export interface User {
    id: number;
    name: string;
    email: string;
    birth: Date;
    password: string;
    cpf: string;
    profession: string;
    maritalStatus: MaritalStatus;
    state: string;
    city: string;  
}