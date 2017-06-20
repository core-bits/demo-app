import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './posts.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostService } from './shared/post.service';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      {
        path: '', component: PostListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }

export const PostModuleRoutedComponents = [PostsComponent, PostListComponent, PostDetailComponent];

export const PostModuleRoutedProviders = [PostService];
