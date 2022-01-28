const useFetch = (endpoint: string) => {
    const defaultHeader = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'ISS-Tracker-v0',
    };
    const customFetch = (url: string, method = 'GET', body = false, headers = defaultHeader) => {
        // TODO: Remove type casting
        const options: any = {
            method,
            headers,
        };
        if (body) options.body = JSON.stringify(body);
        return fetch(url, options)
            .then((response) => response.json())
            .catch((err) => {
                throw new Error(err);
            });
    };
    const get = (id: string) => {
        const url = `${endpoint}${id ? `/${id}` : ''}`;
        return customFetch(url);
    };
    return {
        get,
    };
};

export default useFetch;
