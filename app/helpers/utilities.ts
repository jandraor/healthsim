/**
* Convenience method to fetch and decode JSON.
*/
export const fetchJSON = async (url, method = 'GET', body = '') => {
try {
  if(method === 'GET') {
    const response = await fetch(url, {method, credentials: 'same-origin'});
    return response.json();
  }
  if(method === 'POST') {
    console.log(body);
    const response = await fetch(url,
      {
        method,
        credentials: 'same-origin',
        body: body,
        headers:{'Content-Type': 'application/json'}
      });
    return response.json();
  }

} catch (error) {
  return {error};
}
};
