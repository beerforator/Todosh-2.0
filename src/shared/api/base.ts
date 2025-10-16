const BASE_URL = "http://localhost:5001";

export const baseApi = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${BASE_URL}/${endpoint}`)
        if (!response.ok) {
            throw new Error("Network response wasnt ok")
        }
        return response.json() as Promise<T>
    },
    patch: async <T>(endpoint: string, payload: Partial<T>): Promise<T> => {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            throw new Error("Patch request failed")
        }
        return response.json() as Promise<T>
    },
    post: async<T>(endpoint: string, payload: Omit<T, 'id'>): Promise<T> => {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            throw new Error("Post request failed")
        }
        return response.json() as Promise<T>
    },
    delete: async (endpoint: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Delete request failed")
        }
    }
}