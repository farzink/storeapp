import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StoryService } from './../../../service/story.service';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'app-story-component',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
    storyId;
    isLoading = true;
    story: any;
    hasNext = true;
    hasPrevious = true;
    ngOnInit(): void {


    }
    constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
        private storyService: StoryService, private notification: NotificationsService) {
        this.route.params.subscribe(val => {
            this.storyId = (+this.route.snapshot.params['id'] || 0);
            this.getStory();
        });
    }

    getStory() {
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {
                result.context.story = e.item;
                console.log(e.item);
            },
            error(e) {
                result.context.notification.error(
                    'Error',
                    'There was a problem getting storys, please try again later!',
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
        this.storyService.getById(result.context.storyId, result);
    }

    checkForMore(flag) {
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {
                result.context.hasNext = e.item.hasNext;
                result.context.hasPrevious = e.item.hasPrevious;
                result.context.router.navigate(['/storys/story', e.item.item.id]);
            },
            error(e) {
                result.context.notification.error(
                    'Error',
                    'There was a problem getting storys, please try again later!',
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
        this.storyService.checkForMoreStories({
            id: this.storyId,
            flag: flag
        }, result);
    }
}


