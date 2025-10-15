const BASE_URL = "http://localhost:5001";

export const baseApi = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${BASE_URL}/${endpoint}`)
        if (!response.ok) {
            throw new Error("Network response wasnt ok")
        }
        return response.json() as Promise<T>
    },
    // Здесь мы позже добавим методы post, put, delete
}