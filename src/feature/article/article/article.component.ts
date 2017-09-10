import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ArticleService } from './../../../service/article.service';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'app-article-component',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    articleId;
    isLoading = true;
    article: any;
    hasNext = true;
    hasPrevious = true;
    ngOnInit(): void {


    }
    constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
        private articleService: ArticleService, private notification: NotificationsService) {
        this.route.params.subscribe(val => {
            this.articleId = (+this.route.snapshot.params['id'] || 0);
            this.getArticle();
        });
    }

    getArticle() {
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {
                result.context.article = e.item;
            },
            error(e) {
                result.context.notification.error(
                    'Error',
                    'There was a problem getting articles, please try again later!',
                    {
                        showProgressBar: true,
                        pauseOnHover: true,
                        clickToClose: true,
                        timeOut: 3000
                    }
                );
            },
            complete() {
                result.context.isLoading = false;
            }
        };
        this.articleService.getById(result.context.articleId, result);
    }

    checkForMore(flag) {
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {
                result.context.hasNext = e.item.hasNext;
                result.context.hasPrevious = e.item.hasPrevious;
                result.context.router.navigate(['/articles', e.item.item.id]);
            },
            error(e) {
                result.context.notification.error(
                    'Error',
                    'There was a problem getting articles, please try again later!',
                    {
                        showProgressBar: true,
                        pauseOnHover: true,
                        clickToClose: true,
                        timeOut: 3000
                    }
                );
            },
            complete() {
                result.context.isLoading = false;
            }
        };
        this.articleService.checkForMoreArticles({
            id: this.articleId,
            flag: flag
        }, result);
    }
}


