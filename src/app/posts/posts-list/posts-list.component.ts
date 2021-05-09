import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { delay, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../post';
import { PostService } from '../services/post.service';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  isLoading  = false;
  posts = [];
  totalPosts = 0;
  pageSize = 1;
  pageIndex = 1;
  isAuthenticated = false;
  userId : string;
  constructor(private postsService:PostService,private auth : AuthService) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.userId = this.auth.getUserId();
    this.getPosts();
    this.isAuthenticated = this.auth.isAuthenticated();
    this.getAuthStatus();

  }

  ngAfterViewInit(){
  }

  getAuthStatus(){
      this.auth.getAuthStatus().subscribe((authStatus)=>{
        this.isAuthenticated = authStatus;
        this.userId = this.auth.getUserId();
      })
  }

  onPageChange(pageData : PageEvent){
    this.pageSize = pageData.pageSize;
    this.pageIndex = pageData.pageIndex + 1;
    this.getPosts();
  }

  getPosts(){
    this.isLoading = true;
    this.postsService.getPosts(this.pageSize,this.pageIndex).subscribe((posts)=>{
      this.totalPosts = posts.totalPosts;
      this.isLoading = false;
      this.posts = posts.posts;
    });
  }

  onDelete(id : string){
    this.isLoading = true;
    this.postsService.deletePost(id).subscribe((data)=>{
      this.isLoading = false;
        this.getPosts();
      },(error)=>{
        this.isLoading = false
      })
  }
  //@Input('posts') posts : Post[] = [];
}
