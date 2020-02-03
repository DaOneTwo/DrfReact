/**
 * Wrapper around the fetch API built out for communications with the sites primary Backend API service.
 */
class backendService {
    constructor() {
        this.getUserData = this.getUserData.bind(this);
    }

    get token() {
        var cookieValue = null;
        var tokenName = 'csrftoken';
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, tokenName.length + 1) === (tokenName + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(tokenName.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    requestHeaders(headers = null) {
        let baseHeaders = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': this.token,
            'cache-control': 'no-store',
            'pragma': 'no-cache',
        };
        if (headers !== null) {
            return {...baseHeaders, ...headers}
        } else {
            return baseHeaders
        }
    }

    requestOptions(method = 'GET', headers = null, bodyData = null) {
        let options = {
            method: method.toUpperCase(),
            headers: this.requestHeaders(headers),
        };
        if (bodyData !== null) {
            if (typeof bodyData !== 'string') {
                options.body = JSON.stringify(bodyData)
            } else {
                options.body = bodyData
            }
        }

        return options
    }

    call(endpoint, method = 'GET', headers = null, bodyData = null) {
        return fetch(endpoint, this.requestOptions(method, headers, bodyData))
            .then(response => response.json()
                    .then(data => ({
                            ok: response.ok,
                            status: response.status,
                            data: data
                        })
                    )
                    .then(res => {
                        if (res.ok) {
                            console.log(res.data);
                            return res.data;
                        } else {
                            throw ('Response did not include "ok" status')
                        }
                    })
                //    ToDo: add a catch
            );
    }

    getUserData() {
        return this.call('/api/user/');
    }

    getUserFavorites() {
        return this.call('/api/giphy/favorite/');
    }

    saveUserFavorite(giphyId) {
        let body = {giphy_id: giphyId};
        return this.call('api/giphy/favorite/',
            'POST', null, body);
    }

    deleteUserFavorite(favoriteId) {
        let endpoint = 'api/giphy/favorite/' + favoriteId;
        return this.call(endpoint, 'DELETE');
    }
}

export default backendService;