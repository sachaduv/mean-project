import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from "@angular/forms";
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import {mimeType} from '../_helpers/validators/mime-type-validator';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.css']
})
export class CreatePostsComponent implements OnInit {

  public postTitle = "";
  public postDesc = "";
  public posts : FormGroup;
  public mode = 'create';
  public postId = null;
  public postType = 'Create Posts';
  public isLoading = false;
  public imagePreview : any;
 // @Output() post = new EventEmitter<Post>();

  constructor(private fb: FormBuilder,private postService:PostService,private route : ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getRoutes();
    this.createPostForm();
  }

  getRoutes(){
    this.route.params.subscribe((params)=>{
      let id = params['id'];
      if(id){
        this.mode = 'edit';
        this.postId = id;
        this.postType = 'Update Post';
        this.getPostById(id);
      }else{
        this.mode = 'create';
        this.postId = null;
        this.postType = 'Create Posts'
      }
    });
  }

  getPostById(id){
    this.isLoading = true;
    this.postService.getPostById(id).pipe(delay(5000)).subscribe((post)=>{
      this.isLoading = false;
      this.posts.controls.title.patchValue(post.title);
      this.posts.controls.post.patchValue(post.post);
      this.posts.controls.image.patchValue(post.imagePath);
    })
  }

  resetForm(){
    this.posts.reset();
  }


  createPostForm(){
    this.posts = this.fb.group({
      title: ['',Validators.required],
      post: ['',Validators.required],
      image : [null,{validators : [Validators.required],asyncValidators : [mimeType]}]
    })
  }

  uploadImage(event){
    const file = event.target.files[0] as Blob;
    this.posts.controls.image.patchValue(file);
    this.posts.get('image').updateValueAndValidity();
    const reader  = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }

  savePost(){
      this.isLoading = true;
      if(this.posts.invalid){
        return
      }
      if(this.posts.value){
        // this.post.emit(this.posts.value);
          const post = {
            id : this.postId,
            title : this.posts.value.title,
            post : this.posts.value.post,
            imagePath : this.posts.value.image
          }

        if(this.mode === 'create'){
          this.postService.addPosts(this.posts.value).pipe(delay(5000)).subscribe((data)=>{
            this.isLoading = false;
            this.router.navigate(['/']);
          },(error)=>{
            this.isLoading = false
          });
        }
        else{
          this.postService.updatePost(post.id,post.title,post.post,post.imagePath).subscribe((result)=>{
            this.isLoading = false;
            this.router.navigate(['/']);
          },(error)=>{
            this.isLoading = false
          });
        }
        this.resetForm();
    }
  }

}
