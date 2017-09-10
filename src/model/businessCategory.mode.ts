import { Profile } from './profile';
export class BusinessCategory {
    name: string;
    description: string;
    profiles: Array<Profile>;

    constructor(data: any) {
        this.name = data.name;
        this.description = data.description;
        this.profiles = data.profiles;
    }
}
