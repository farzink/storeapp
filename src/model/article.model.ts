import { Profile } from './profile';
export class Article {
    public id: number;
    public title: string;
    public description: string;
    public url: string;
    public figure: string;
    public figureCaption: string;
    public profile: Profile;
    public fileId: number;
    public updatedDateTime: string;
    public fullName: string;
    public email: string;
    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.url = data.url;
        this.figure = data.figure;
        this.figureCaption = data.figureCaption;
        this.profile = data.profile;
        this.fileId = data.fileId;
        this.updatedDateTime = data.updatedDateTime;
    }
}

