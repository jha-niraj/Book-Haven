import axios from 'axios';

const BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (query, limit = 10, page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/search.json`, {
            params: {
                q: query,
                limit,
                page
            }
        });
        return response.data.docs;
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
};