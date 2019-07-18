import bronze from 'app/ressources/images/emblems/bronze.png'
import challenger from 'app/ressources/images/emblems/challenger.png'
import diamond from 'app/ressources/images/emblems/diamond.png'
import silver from 'app/ressources/images/emblems/silver.png'
import platinum from 'app/ressources/images/emblems/platinum.png'
import master from 'app/ressources/images/emblems/master.png'
import iron from 'app/ressources/images/emblems/iron.png'
import grandmaster from 'app/ressources/images/emblems/grandmaster.png'
import gold from 'app/ressources/images/emblems/gold.png'
import defaultEmblem from 'app/ressources/images/default.png'

import topLane from 'app/ressources/images/lanes/top_lane.png'
import jungleLane from 'app/ressources/images/lanes/jungle_lane.png'
import midLane from 'app/ressources/images/lanes/mid_lane.png'
import bottomLane from 'app/ressources/images/lanes/bottom_lane.png'
import supportLane from 'app/ressources/images/lanes/support_lane.png'

export function getEmblem(tier = '') {
  switch (tier.toLowerCase()) {
    case 'bronze':
      return bronze
    case 'challenger':
      return challenger
    case 'diamond':
      return diamond
    case 'silver':
      return silver
    case 'platinum':
      return platinum
    case 'master':
      return master
    case 'iron':
      return iron
    case 'grandmaster':
      return grandmaster
    case 'gold':
      return gold
    default:
      return defaultEmblem
  }
}

export function getLane(lane = '') {
  switch (lane.toLowerCase()) {
    case 'top':
      return topLane
    case 'jungle':
      return jungleLane
    case 'mid':
      return midLane
    case 'bottom':
      return bottomLane
    case 'support':
      return supportLane
    default:
      return null
  }
}
