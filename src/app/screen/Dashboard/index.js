import { connect } from 'react-redux'
import { FETCH_SUMMONER_REQUEST } from 'app/service/summoner/reducer'
import { isLoaded } from 'app/service/loader/selector'
import { getSummonerSelector } from 'app/service/summoner/selector'
import { getSummonerId } from 'app/service/summoner/action'
import Dashboard from './Dashboard'

function mapStateToProps(state) {
  const obj = {}
  const isSummonerLoaded = isLoaded(state, FETCH_SUMMONER_REQUEST)

  if (isSummonerLoaded) {
    obj.summoner = getSummonerSelector(state)
  }

  return {
    isSummonerLoaded,
    ...obj,
  }
}

const mapDispatchToProps = {
  fetchSummonerId: getSummonerId,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
