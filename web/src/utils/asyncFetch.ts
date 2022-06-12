export default async function asyncFetch(...args) {
    // TODO: refactor and add types
    const [url, ...options] = args;
    const res = await fetch(url, ...options);
    const data = await res.json();
    return data;
}
