import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMaterialComponent } from './list-material/list-material.component';

export const MaterialManagementRoutedModule = [
    ListMaterialComponent
]
const routes: Routes = [
    {
        path: '',
        redirectTo: 'list-material',
        pathMatch: 'full'
    },
    {
        path: 'list-material',
        component: ListMaterialComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaterialManagementRoutingModule { }
