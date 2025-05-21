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

    async getAll(url, body) {
        const response = await fetch(`${this.#baseUrl}/${url}`, body);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    };

    async getById(url, id, body) {
        const response = await fetch(`${this.#baseUrl}/${url}/${id}`, body);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    };

    async post(url, body) {
        const response = await fetch(`${this.#baseUrl}/${url}`, {
            method: "POST",
            ...body
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    };

    async delete(url, id, body) {
        const response = await fetch(`${this.#baseUrl}/${url}/${id}`, {
            method: 'DELETE',
            ...body
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    };
}
