import http from '../utils/httpClient';

class Repositories {

    static postRepository(data) {
        return http.post('repositories/', {
            full_name: data,
        })
    }

    static getRepository(id) {
      return http.get(`repositories/${id}/`)
    }
}

export default Repositories;
