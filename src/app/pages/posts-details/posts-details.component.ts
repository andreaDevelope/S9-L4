import { Component } from '@angular/core';
import { iJSONresponse, iPosts } from '../../modules/i-posts';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
  styleUrl: './posts-details.component.scss',
})
export class PostsDetailsComponent {
  post!: iPosts;
  variable!: iPosts | undefined;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    // Corretto il blocco del subscribe
    this.route.params.subscribe((params) => {
      // Estrai l'id del post dai parametri della rotta
      const postId = params['id'];

      // Fetch del file JSON
      fetch('../../../assets/allegato/db.json')
        .then((res) => {
          if (res.ok) {
            return res.json() as Promise<iJSONresponse>; // Corretto il tipo di ritorno
          } else {
            throw new Error('Errore nella richiesta');
          }
        })
        .then((data: iJSONresponse) => {
          this.variable = data.posts.find((p) => p.id === parseInt(postId));
          if (this.variable) {
            console.log(this.variable.id);
            this.post = this.variable;
          } else {
            throw new Error('post è undefind');
          }
        })
        .catch((error) => {
          console.error('Errore:', error);
        });
    });
  }
}
