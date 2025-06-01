import {ApiService} from "./api.service.js";

export class AuthService {
    #user
    #token
    static instance;


    constructor() {
        if (AuthService.instance) {
            return AuthService.instance;
        }

        AuthService.instance = this;
    }

    static getInstance() {
        if (!AuthService.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }

    isAuthenticated() {
        return localStorage.getItem("token") !== null;
    }

    async login(credentials) {
        ApiService.getInstance().post("login", credentials).then(response => {
            console.log(response);
            this.user = response.data.user;
            this.token = response.data.token;
            localStorage.setItem("token", response.data.token.split("|")[1]);
        });

    }

    async logout(onLogout) {
        this.token = null;
        this.user = null;
        localStorage.removeItem("token");
        onLogout()
    }

    async register(userData) {
        ApiService.getInstance().post("register", userData).then(response => {
            this.user = response.data.user;
            this.token = response.data.token;
            localStorage.setItem("token", response.data.token.split("|")[1]);
        })
    }

    getUser() {
        return this.#user;
    }

    getToken() {
        return this.#token;
    }


}