import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../post';
import {environment} from '../../../environments/environment'
const BACKEND_URL = environment.apiUrl + '/posts/'


@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private _http:HttpClient) { }

  getPosts(pageSize,pageIndex){
    let queryParams = `?pageSize=${pageSize}&pageIndex=${pageIndex}`;
    return this._http.get<any>(BACKEND_URL+queryParams)
  }

  addPosts(post:any){
    const postData = new FormData();
    postData.append('title',post.title);
    postData.append('post',post.post);
    postData.append('image',post.image)
    return this._http.post<{message:string,post:any}>(BACKEND_URL,postData)
  }

  deletePost(id){
    return this._http.delete<{message:string}>(BACKEND_URL+id);
  }

  getPostById(id){
    return this._http.get<Post>(BACKEND_URL+id);
  }

  updatePost(id:string,title:string,post:string,image:string | File){
    let postData : Post | FormData;
    if(typeof(image)==='string'){
      postData = {
        id : id,
        title : title,
        post : post,
        imagePath : image
      }
    }else if(typeof(image) === 'object'){
      postData = new FormData();
      postData.append('id',id);
      postData.append('title',title);
      postData.append('post',post);
      postData.append('image',image,title);
    }
    return this._http.put<{status:string}>(BACKEND_URL+id,postData);
  }
}
