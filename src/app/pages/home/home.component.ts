import { Component } from '@angular/core';
import { iJSONresponse, iPosts } from '../../modules/i-posts';

@Component({
  selector: '.app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  featuredPost!: iPosts;
  postsArr: iPosts[] = [];
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
            this.featuredPost = post;
            // console.log(this.featuredPost); prende l'ultimo
          } else {
            const shuffle = (array: iPosts[]) => {
              for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
              }
              return array;
            };
            this.postsArr.push(post);
            this.postsArr = shuffle(this.postsArr);
            this.postsArr = this.postsArr.slice(0, 4);

            // console.log(this.postArr);
          }
        });
      })
      .catch((e) => console.log(e));
  }
}
