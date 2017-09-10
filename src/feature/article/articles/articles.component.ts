import { ArticleService } from './../../../service/article.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';



@Component({
    selector: 'app-articles-component',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
    articles: any;
    isLoading = false;

    currentIndex = 0;
    hasNext = false;
    hasPrevious = false;
    size = 5;
    maxNumberOfPageButtons = 5;
    total = 0;
    numberOfPages: any = [];

    ngOnInit(): void {

    }
    constructor(private router: Router, private formBuilder: FormBuilder,
        private articleService: ArticleService, private route: ActivatedRoute, private notification: NotificationsService) {
        this.route.queryParams.subscribe(val => {
            this.getArticles();
        });
    }

    getArticles() {
        this.isLoading = true;
        this.size = (+this.route.snapshot.queryParams.size || 5);
        const result = {
            context: this,
            success(e) {
                result.context.articles = e.item.items;
                result.context.paginate(e.item);
                console.log(e);
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

        const q = (this.route.snapshot.queryParams.start) ? +this.route.snapshot.queryParams.start : 0;

        this.articleService.getAll({
            start: q,
            size: this.size
        }, result);
    }

    paginate(data) {
        this.currentIndex = data.currentIndex;
        this.hasNext = data.hasNext;
        this.hasPrevious = data.hasPrevious;
        this.total = data.total;

        if (this.maxNumberOfPageButtons * this.size < this.total) {
            if (this.currentIndex < 3) {
                this.numberOfPages = Array(this.maxNumberOfPageButtons).fill(0).map((x, i) => i + 1 - this.currentIndex);
            } else if ((this.currentIndex + 1) * this.size > this.total) {
                this.numberOfPages = Array(this.maxNumberOfPageButtons).fill(0).map((x, i) => i - 3);
            } else {
                this.numberOfPages = Array(this.maxNumberOfPageButtons).fill(0).map((x, i) => i - 2);
            }
        } else {
            const maxNumberOfButtons = Math.floor(this.total / this.size);
            const margin = (this.total % this.size === 0) ? 0 : 1;
            this.numberOfPages = Array(maxNumberOfButtons + margin).fill(0).map((x, i) => i + 1 - this.currentIndex);
        }

    }
}
