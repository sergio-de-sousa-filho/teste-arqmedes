import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { AddOrUpdateMode } from './add-or-update-mode.enum';


@Injectable({ providedIn: 'root' })
export class AddOrUpdateService {

    public mode: AddOrUpdateMode = AddOrUpdateMode.Add;
    public user: User | null = null;
    
    constructor() { }

}