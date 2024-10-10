import { Component } from '@angular/core';
import { iJSONresponse, iPosts } from '../../modules/i-posts';

@Component({
  selector: 'app-active-posts',
  templateUrl: './active-posts.component.html',
  styleUrl: './active-posts.component.scss',
})
export class ActivePostsComponent {
  postsActArr: iPosts[] = [];
  ngOnInit() {
    fetch('../../../assets/allegato/db.json')
      .then((res) => {
        if (res.ok) {
          return <Promise<iJSONresponse>>res.json();
        } else {
          throw new Error('errore nella richiesta');
        }
      })
      .then((res) => {
        console.log(res);
        res.posts.forEach((post) => {
          if (post.active) {
            this.postsActArr.push(post);
          }
        });
      })
      .catch((e) => console.log(e));
  }
}
