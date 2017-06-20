import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumsComponent } from './albums.component';
import { AlbumService } from './shared/album.service';

const routes: Routes = [
  {
    path: '',
    component: AlbumsComponent,
    children: [
      {
        path: '',
        component: AlbumListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }

export const AlbumModuleRoutedComponents = [AlbumDetailComponent, AlbumListComponent, AlbumsComponent];

export const AlbumlModuleRoutedProviders = [AlbumService];
