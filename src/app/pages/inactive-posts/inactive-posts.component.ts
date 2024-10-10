import { Component } from '@angular/core';
import { iJSONresponse, iPosts } from '../../modules/i-posts';

@Component({
  selector: 'app-inactive-posts',
  templateUrl: './inactive-posts.component.html',
  styleUrl: './inactive-posts.component.scss',
})
export class InactivePostsComponent {
  postsinactArr: iPosts[] = [];
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
          if (!post.active) {
            this.postsinactArr.push(post);
          }
        });
      })
      .catch((e) => console.log(e));
  }
}
