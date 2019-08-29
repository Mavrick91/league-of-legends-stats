import axios from 'axios'

const API_KEY = 'RGAPI-1fee5177-2856-46d9-9519-7716861487fe'

export const ITEM_VERSION = '9.15.1'
// export const RUNE_VERSION = '7.23.1'
// export const MASTERY_VERSION = '7.23.1'
export const SUMMONER_VERSION = '9.15.1'
export const CHAMPION_VERSION = '9.15.1'
export const PROFILEICON_VERSION = '9.15.1'
// export const MAP_VERSION = '9.15.1'
// export const LANGUAGE_VERSION = '9.15.1'
// export const STICKER_VERSION = '9.15.1'
// export const VERSION = '9.15.1'

const instance = axios.create({
  headers: {
    'X-Riot-Token': API_KEY,
  },
})

export default instance
