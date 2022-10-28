const api = {
  
  get(url) {
    const options = {method: 'GET'};
    
    return fetch(url, options)
      .then(response => response.json())
      .then(response => response)
      .catch(err => err);
  },


  add(url, data) {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}      
    };

    options.body = JSON.stringify(data)
    
    return fetch(url, options)
      .then(response => response.json())
      .then(response => response)
      .catch(err => err);
  },


  wait(time = 5000) {
    return new Promise(resolve => setTimeout(() => resolve('timeout'), time))
  }
  
}

export default api