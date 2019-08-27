// @flow

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { fetchSaga } from 'app/store/action'
import { getChampionsMasteriesSelector } from 'app/service/masteries/selector'
import Champions from './Champions'
import { SummonerContext } from '../Dashboard'

const Wrapper = styled.table`
  ${({ theme: { colors } }) => css`
    margin-top: 10px;
    background: ${colors.white4};
    border-collapse: collapse;
    border: 1px solid ${colors.white3};

    & > thead > tr {
      height: 54px;
      border-bottom: 1px solid ${colors.white3};
      color: ${colors.black19};
      font-size: 12px;
      text-align: center;
      font-weight: bold;
      background-color: ${colors.white1};

      & > th {
        padding: 10px 30px;
      }
    }
  `}
`

function ChampionsContainer() {
  const { summoner } = React.useContext(SummonerContext)
  const dispatch = useDispatch()
  const championsMasteries = useSelector(getChampionsMasteriesSelector)

  React.useEffect(() => {
    dispatch(fetchSaga('masteries', { encryptedSummonerId: summoner.info.id }))
  }, [dispatch, summoner.info.id])

  if (championsMasteries.length === 0) return <div>Charge champions masteries</div>

  return (
    <Wrapper>
      <thead>
        <tr>
          <th>#</th>
          <th>Champion</th>
          <th>Last time played</th>
          <th>Points since last level</th>
          <th>Champion points</th>
          <th>Champion level</th>
        </tr>
      </thead>
      <tbody>
        {championsMasteries.map((champion, index) => (
          <Champions champion={champion} index={index} key={champion.championId} />
        ))}
      </tbody>
    </Wrapper>
  )
}

export default ChampionsContainer
