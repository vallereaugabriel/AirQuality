export function getJson(url: string) {
  const init = {
    headers: {
      'content-type': 'application/json'
    },
    method: 'GET'
  }
  return fetch(url, init).then(function(response) { return response.json(); });
}
