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

export const signoutApi = () => {
    return fetch(
        BASE_HOST + '/refresh-token/signout',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
    );
};

export const profileApi = (graphqlQuery, token) => {
    return fetch(
        BASE_HOST + '/profile',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            credentials: 'include',
            body: JSON.stringify(graphqlQuery),
        }
    )
}
