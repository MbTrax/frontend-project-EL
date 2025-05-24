export default new class Api {

    baseUrl = import.meta.env.BACKEND_ENDPOINT ?? 'https://backend.mbtrax.ru/api/';
    async get(url, query = {}) {
        const queryString = new URLSearchParams(query).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        const response = await fetch(this.baseUrl + fullUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        return await this.handleResponse(response);
    }

    async post(url, body = {}) {
        const response = await fetch(this.baseUrl + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        return await this.handleResponse(response);
    }

    async patch(url, body = {}) {
        const response = await fetch(this.baseUrl + url, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        return await this.handleResponse(response);
    }


    async delete(url, query = {}) {
        const queryString = new URLSearchParams(query).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        const response = await fetch(this.baseUrl + fullUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            }
        });

        return await this.handleResponse(response);
    }



    async handleResponse(response) {
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw {
                status: response.status,
                message: error.message || 'Ошибка запроса',
                data: error
            };
        }
        return await response.json();
    }
}
