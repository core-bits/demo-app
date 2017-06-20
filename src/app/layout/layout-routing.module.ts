import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: '../layout/dashboard/dashboard.module#DashBoardModule'
            },
            {
                path: 'users',
                loadChildren: '../layout/user/user.module#UserModule'
            },
            {
                path: 'posts',
                loadChildren: '../layout/post/post.module#PostModule'
            },
            {
                path: 'albums',
                loadChildren: '../layout/album/album.module#AlbumModule'
            },
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class LayoutRoutingModule { }

export const LayoutModuleRoutedComponents = [LayoutComponent];