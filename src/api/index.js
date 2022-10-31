const api = {

  async get(url) {
    const options = { method: "GET" }
    try {
      const response = await fetch(url, options)
      if (response.ok) return response.json()
      if (!response.ok) throw new Error(response.status)
    } catch (err) {
      throw err
    }
  },

  async add(url, data) {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "text/plain" // it looks like my cors settings dont like app/json
      },
      body: JSON.stringify(data)
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) return response.json()
      if (!response.ok) throw new Error(response.status)
    } catch (err) {
      throw err
    }
  },

  async remove(url, data) {
    const options = {
      // i really dont want to configure preflights on my dev php server so post it is
      // method: process.env.NODE_ENV === 'production' ? 'DELETE' : 'POST',
      method: 'POST',
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "text/plain" // it looks like my cors settings dont like app/json
      },
      body: JSON.stringify(data)
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) return response.json()
      if (!response.ok) throw new Error(response.status)
    } catch (err) {
      throw err
    }
  },

  async edit(url, data) {
    const options = {
      // i really dont want to configure preflights on my dev php server so post it is
      // method: process.env.NODE_ENV === 'production' ? 'PUT' : 'POST',
      method: 'POST',
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "text/plain" // it looks like my cors settings dont like app/json
      },
      body: JSON.stringify(data)
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) return response.json()
      if (!response.ok) throw new Error(response.status)
    } catch (err) {
      throw err
    }
  },

  // timeout for throwing errors to be caught by worker sagas
  async timeout(time = 5000) {
    await new Promise(res => setTimeout(() => res(), time))
    throw new Error('timeout')
  }
}

export default api
