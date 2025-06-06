export class ApiService {
    #baseUrl = import.meta.env.VITE_API_URL;
    static instance;

    constructor() {
        if (ApiService.instance) {
            return ApiService.instance;
        }

        ApiService.instance = this;
    }

    static getInstance() {
        if (!ApiService.instance) {
            this.instance = new ApiService();
        }
        return this.instance;
    }

    async get(url) {
        const token = localStorage.getItem("token");
        const response = await fetch(`${this.#baseUrl}/${url}`, {
            headers: new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    };

    async getById(url, id) {
        const token = localStorage.getItem("token");
        const response = await fetch(`${this.#baseUrl}/${url}/${id}`, {
            headers: new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    };

    async post(url, body) {
        const token = localStorage.getItem("token");
        const response = await fetch(`${this.#baseUrl}/${url}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    };

    async put(url, body) {
        const token = localStorage.getItem("token");
        const response = await fetch(`${this.#baseUrl}/${url}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    };

    async delete(url, id) {
        const token = localStorage.getItem("token");
        const response = await fetch(`${this.#baseUrl}/${url}/${id}`, {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    };
}
