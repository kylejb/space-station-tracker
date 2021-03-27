const useFetch = endpoint => {
    const defaultHeader = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "User-Agent": "ISS-Tracker-v0"
    };
    const customFetch = (
      url,
      method = "GET",
      body = false,
      headers = defaultHeader
    ) => {
      const options = {
        method,
        headers
      };
      if (body) options.body = JSON.stringify(body);
      return fetch(url, options)
        .then(response => response.json())
        .catch(err => {
          throw new Error(err);
        });
    };
    const get = id => {
      const url = `${endpoint}${id ? `/${id}` : ""}`;
      return customFetch(url);
    };
    return {
      get,
    };
  };
  export default useFetch;
