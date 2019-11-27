import http from '../utils/httpClient';

class Commits {
    static getCommits() {
        return http.get('commits/')
    }

    static postRepository(data) {
        return http.post('repositories/', {
            full_name: data,
        })
    }
}

export default Commits;
