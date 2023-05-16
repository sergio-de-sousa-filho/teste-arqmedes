import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { UsersListComponent } from './components/users-list/users-list.component';
import { AddOrUpdateComponent } from './components/add-or-update/add-or-update.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: UsersListComponent
    },
    {
        path: 'list',
        component: UsersListComponent
    },
    {
        path: 'add-or-update',
        component: AddOrUpdateComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule {
    static components = [
        UsersListComponent
    ];
}