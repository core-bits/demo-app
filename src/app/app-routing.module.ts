import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';

import { AuthGuard } from './core/auth-guard.service';
import { CanDeactivateGuard } from './core/can-deactivate-guard.service';
import { ParamUtil } from './core/iparam';

import { UserProfileService } from './core/user-profile.service';

/***************************************************************
* Lazy Loading to Eager Loading
*
* 1. Remove the module and NgModule imports in `app.module.ts`
*
* 2. Remove the lazy load route from `app.routing.ts`
*
* 3. Change the module's default route path from '' to 'pathname'
*****************************************************************/

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'layout',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'xtelth',
        loadChildren: './xtelth/xtelth.module#XtelthModule',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path: '**',
        pathMatch: 'full',
        component: PageNotFoundComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule],
    providers: [
        AuthGuard,
        CanDeactivateGuard,
        UserProfileService,
        ParamUtil
    ]
})
export class AppRoutingModule { }