import axios from 'axios'

const API_KEY = 'RGAPI-1fee5177-2856-46d9-9519-7716861487fe'

const instance = axios.create({
  headers: {
    'X-Riot-Token': API_KEY,
  },
})

export default instance
