import http from '../utils/httpClient';

class Commits {
  static getCommits(pageUrl = null) {
    if (pageUrl === null) {
      return http.get('commits/');
    }
    const page = pageUrl.split('?')[1];

    return http.get(`commits/?${page}`);
  }
}

export default Commits;
