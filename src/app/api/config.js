import axios from 'axios'

const API_KEY = 'RGAPI-108b766b-1555-4af4-b46d-2866bdd2cb2a'

const instance = axios.create({
  headers: {
    'X-Riot-Token': API_KEY,
  },
})

export default instance
