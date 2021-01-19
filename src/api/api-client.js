const BASE_HOST = 'http://localhost:8000'

export const userApi = (graphqlQuery) => {
    return fetch(
        BASE_HOST + '/user', {
            method: 'POST',
            body: JSON.stringify(graphqlQuery),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
    );
};

export const refreshTokenApi = () => {
    return fetch(
        BASE_HOST + '/refresh-token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
      );
}
