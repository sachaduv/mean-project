import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostsComponent } from './create-posts/create-posts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsListComponent } from './posts-list/posts-list.component';
import {AngularMaterialModule} from '../angular-material.module'
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CreatePostsComponent,
    PostsListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class PostsModule { }
