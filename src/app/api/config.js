import axios from 'axios'

const API_KEY = 'RGAPI-d64299c2-7a34-42c1-924a-8c67a7c9b260'

export const ITEM_VERSION = '9.13.1'
export const RUNE_VERSION = '7.23.1'
export const MASTERY_VERSION = '7.23.1'
export const SUMMONER_VERSION = '9.13.1'
export const CHAMPION_VERSION = '9.13.1'
export const PROFILEICON_VERSION = '9.13.1'
export const MAP_VERSION = '9.13.1'
export const LANGUAUE_VERSION = '9.13.1'
export const STICKER_VERSION = '9.13.1'
export const VERSION = '9.13.1'

const instance = axios.create({
  headers: {
    'X-Riot-Token': API_KEY,
  },
})

export default instance
