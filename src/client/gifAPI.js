import axios from 'axios';

export var getGIFs = (searchQuery, offset) => {
    return axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
            api_key: 'WoNC0o6dUWKq0o6eDjJ91BIDAxvrD5LK',
            q: searchQuery,
            limit: 10,
            offset: offset,
        },
        timeout: 10000,
    }).then(response => {
        response = response.data.data;
        if(response.length) {
            let gifsFetched = response.map((gif)=>{
                return{
                    originalUrl : gif.images.original.url,
                    fixedHeight : gif.images.fixed_height.url,
                }
            })
            return gifsFetched;
        }
    }).catch(err => {
        return err
    })

}