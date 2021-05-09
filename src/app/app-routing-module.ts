import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { CreatePostsComponent } from './posts/create-posts/create-posts.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: PostsListComponent,
    },
    {
      path:'create',
      component : CreatePostsComponent,
      canActivate:[AuthGuardService]
    },
    {
      path:'edit/:id',
      component : CreatePostsComponent,
      canActivate:[AuthGuardService]
    },
    {
      path : 'auth',
      loadChildren : () => import('./auth/auth.module').then(m=>m.AuthModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }
