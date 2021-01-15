const BASE_HOST = 'http://localhost:8000'

export const userApi = (graphqlQuery) => {
    return fetch(
        BASE_HOST + '/user', {
            method: 'POST',
            body: JSON.stringify(graphqlQuery),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
};
