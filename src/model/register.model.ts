export class RegisterModel {
    constructor(
        public rememberMe: Boolean,
        public email: string,
        public password: string
    ) { }
}
