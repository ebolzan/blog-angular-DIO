import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import {Post} from '../model/Post'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit{

  listPost: Post[] | undefined;

  post: Post = new Post;

 constructor(private postService: PostService){

 }

  ngOnInit(): void {
    this.findPosts();
  }

  findPosts()
  {
    this.postService.getPosts().subscribe((data: Post[])=> {this.listPost = data;});
  
    }

  cadastrarMensagem()
  {
    this.postService.postMensagem(this.post).subscribe((data: any)=> {
      this.post = data
      location.assign('/feed')
    })
  }

  ver(value:string)
  {
     this.postService.getPostsByNome(value).subscribe((data:Post[])=>{

      let dado: Post[];

      if(data.length == 0)
      {
        dado = [{"id":201, "nome":"Não encontrado", "mensagem":"Nenhum post encontrado"}]
        this.listPost = dado;
      }
      else
        this.listPost = data;
      
     // location.assign('/feed')
     });
  }


}
