import http from '../utils/httpClient';

class Commits {
  static getCommits() {
    return http.get('commits/');
  }
}

export default Commits;
