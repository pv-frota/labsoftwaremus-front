import store from '@/store'
import { Notify } from 'quasar'
export default class Rest {
  constructor (url, http) {
    this.url = url
    this.http = http
  }

  async list (auth = false) {
    try {
      if(auth) {
        return await this.http.get(this.url, { 
          headers: {
            Authorization: 'Bearer ' + store.state.token
          }
        })
      } else {
        return await this.http.get(this.url)
      }
      
    } catch (error) {
      throw error.response
    }
  }

  async listFilter ($query = {}, auth = false) {
    try {
      let params = ''
      Object.keys($query).map((value) => {
        if ($query[value] != null && $query[value] !== '') {
          params += `;${value}=` + $query[value]
        }
      })
      if(auth) {
        return await this.http.get(`${this.url}/filtros${params}`, { 
          headers: {
            Authorization: 'Bearer' + store.state.token
          }
        })
      } else {
        // return await this.http.get(this.url)
        return this.http.get(`${this.url}/filtros${params}`)
      }
    } catch (error) {
      throw error.response
    }
  }

  async create ($data, $captchaResponse = '') {
    if ($captchaResponse) {
      try {
        return await this.http.post(this.url, $data, {
          headers: {
            'g-recaptcha-response': $captchaResponse,
            Authorization: 'Bearer' + store.state.token
          }
        })
      } catch (error) {
        throw error.response
      }
    }
    try {
      return await this.http.post(this.url, $data, { 
        headers: {
          Authorization: 'Bearer' + store.state.token
        }
      })
    } catch (error) {
      throw error.response
    }
  }

  async read ($id) {
    try {
      return await this.http.get(`${this.url}/${$id}`)
    } catch (error) {
      throw error.response
    }
  }

  async update ($id, $data) {
    try {
      return await this.http.put(`${this.url}/${$id}`, $data)
    } catch (error) {
      throw error.response
    }
  }

  async delete ($id) {
    try {
      return await this.http.delete(`${this.url}/${$id}`)
    } catch (error) {
      console.log('error', error.response.status)
      if (error.response.status === 409) {
        Notify.create({
          message: error.response.data.message,
          icon: 'fas fa-times',
          color: 'negative'
        })
      }
      throw error.response
    }
  }
}
