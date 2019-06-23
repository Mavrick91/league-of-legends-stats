import axios from 'axios'

const API_KEY = 'RGAPI-db47dbe8-a2ce-4ece-855f-fc74c4c106e6'

const instance = axios.create({
  headers: {
    'X-Riot-Token': API_KEY,
  },
})

export default instance
