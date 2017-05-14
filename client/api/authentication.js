import axios from 'axios'
import { SERVER_BASE_URL } from '../utils/constants/constants'

function authenticate () {
  const url = `${SERVER_BASE_URL}/auth/twitter`
  return axios.get(url).then(response => {
    console.log('In authentication:', response)
    return response.data
  }).catch(err => console.error(err))
}

export { authenticate }

var config = {
  headers: {'Access-Control-Allow-Headers': 'X-Requested-With',
    'Access-Control-Allow-Origin': '*'}
}
