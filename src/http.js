class EasyHTTP {

    get(url) {
        
        return new Promise((resolve, reject) => {

            fetch(url, {
                method:'GET'
            })
            .then((res) => { return res.json() })
            .then(data => resolve(data))
            .catch(err => reject(err));

        });

    }

    post(url, data) {

        return new Promise((resolve, reject) => {

            fetch(url, {

                method:'POST',
                headers:{

                    'Content-type':'application/json'

                },
                body: JSON.stringify(data)

            }).then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))

        });

    }

    put(url, data) {

        return new Promise((resolve, reject) => {

            fetch(url, {

                method:'PUT',
                headers:{

                    'Content-type':'application/json'

                },
                body: JSON.stringify(data)

            }).then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))

        });

    }
    
    delete(url) {

        return new Promise((resolve, reject) => {

            fetch(url, {
                method:'DELETE'
            })
            .then((res) => { return res.json() })
            .then(data => resolve('User Deleted...'))
            .catch(err => reject(err));

        });

    }

}

export const http = new EasyHTTP();