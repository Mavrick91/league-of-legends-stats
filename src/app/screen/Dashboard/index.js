import { connect } from 'react-redux'
import { getSummonerSelector } from 'app/service/summoner/selector'
import { getSummonerId } from 'app/service/summoner/action'
import Dashboard from './Dashboard'

function mapStateToProps(state) {
  return {
    summoner: getSummonerSelector(state),
  }
}

const mapDispatchToProps = {
  fetchSummonerId: getSummonerId,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
