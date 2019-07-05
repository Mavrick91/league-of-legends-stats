import axios from 'axios'

const API_KEY = 'RGAPI-9317601f-08cf-4aa9-b6f6-6fa7617e85ef'

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
