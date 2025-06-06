import {ApiService} from "./api.service.js";

export class AuthService {
    #user;
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

    isAdmin() {
        return this.#user && this.#user.role === "admin";
    }

    isAuthenticated() {
        return localStorage.getItem("token") !== null;
    }

    async login(credentials) {
        return ApiService.getInstance().post("login", credentials).then(response => {
            this.#user = response.data.user;
            localStorage.setItem("token", response.data.token.split("|")[1]);
            localStorage.setItem("name", response.data.user.name);
            localStorage.setItem("role", response.data.user.role);
        });

    }

    async logout(onLogout) {
        this.#user = null;
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        onLogout()
    }

    async register(userData) {
        return ApiService.getInstance().post("register", userData).then(response => {
            this.#user = response.data.user;
            localStorage.setItem("token", response.data.token.split("|")[1]);
            localStorage.setItem("name", response.data.user.name);
            localStorage.setItem("role", response.data.user.role);
        })
    }


}