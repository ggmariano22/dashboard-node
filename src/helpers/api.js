import request from 'request';

export const doGetRequest = (url, headers, dataResolver) => {
    const options = {
        method: 'GET',
        headers,
        json: true,
        url
    }
    
    const promisseCallback = (resolve, reject) => {
        request.get(options, (error, httpResponse, body) => {
            if (error) return reject(error);
            const results = dataResolver(body)
            resolve(results);
        })
    }

    return new Promise(promisseCallback)
}
