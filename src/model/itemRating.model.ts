export class ItemRating {
    rating: number;
    reviewers: number;

    constructor(data: any) {
        this.rating = data.rating;
        this.reviewers = data.reviewers;
    }
}