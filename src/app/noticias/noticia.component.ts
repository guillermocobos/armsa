import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Noticia } from './noticia.model';
import { NoticiasService } from './noticias.service';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html'
})
export class NoticiaComponent implements OnInit, OnDestroy {

  noticia: Noticia;
  slugSubscription: Subscription;
  noticiaSubscription: Subscription;

  constructor(
    private noticiasService: NoticiasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.slugSubscription = this.route.params.subscribe(params => {
      if (params.slug) {
        this.noticiaSubscription = this.noticiasService.getNoticiaBySlug(params.slug)
          .subscribe((noticia: Noticia) => {
            this.noticia = noticia;
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.slugSubscription) {
      this.slugSubscription.unsubscribe();
    }
    if (this.noticiaSubscription) {
      this.noticiaSubscription.unsubscribe();
    }
  }
}
