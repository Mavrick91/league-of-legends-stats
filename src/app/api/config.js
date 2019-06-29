import axios from 'axios'

const API_KEY = 'RGAPI-d64299c2-7a34-42c1-924a-8c67a7c9b260'

const instance = axios.create({
  headers: {
    'X-Riot-Token': API_KEY,
  },
})

export default instance
