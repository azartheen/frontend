console.log(process.env.REACT_APP_BACKENDURL)

// fetching middleware. Resolve fetch responses from JSON to memory objects
export default (method, path, body) => {
    return fetch(`http://${process.env.REACT_APP_BACKENDURL}${path}`, {
        body : JSON.stringify(body),
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json()
        }else{
            return 1;
        }
    });
}