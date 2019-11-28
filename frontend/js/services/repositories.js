import http from '../utils/httpClient';

class Repositories {

    static postRepository(data) {
        return http.post('repositories/', {
            full_name: data,
        })
    }
}

export default Repositories;
