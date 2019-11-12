// @flow

import LoaderCustom from 'app/components/LoaderCustom'
import Sort from 'app/ressources/images/svg/sort'
import { getChampionsMasteriesSelector } from 'app/service/masteries/selector'
import { fetchSaga } from 'app/store/action'
import { prop, sortBy } from 'ramda'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { SummonerContext } from '../Dashboard/Dashboard'
import Champions from './Champions'

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
        padding: 20px 30px;
        height: 100%;
      }
    }
  `}
`

const Title = styled.th`
  & > :nth-child(1) {
    margin-right: 5px;
    vertical-align: middle;
  }
  & > :nth-child(2) {
    margin-right: 5px;
    vertical-align: middle;
    cursor: pointer;
  }
`

function ChampionsContainer() {
  const { summoner } = React.useContext(SummonerContext)
  const dispatch = useDispatch()
  const tmpChampionsMasteries = useSelector(getChampionsMasteriesSelector)
  const [championsMasteries, setChampionsMasteries] = React.useState(null)

  React.useEffect(() => {
    dispatch(fetchSaga('masteries', { encryptedSummonerId: summoner.info.id }))
  }, [dispatch, summoner.info.id])

  if (tmpChampionsMasteries.length === 0) return <LoaderCustom />

  function sortChampionsBy(index) {
    let baseKey = ''

    if (index === 1) baseKey = 'name'
    else if (index === 2) baseKey = 'lastPlayTime'
    else if (index === 3) baseKey = 'championPointsSinceLastLevel'
    else if (index === 4) baseKey = 'championPoints'
    else if (index === 5) baseKey = 'championLevel'

    const tmpChampions = sortBy(prop(baseKey))(tmpChampionsMasteries)

    if (baseKey !== 'name') tmpChampions.reverse()
    setChampionsMasteries(tmpChampions)
  }
  return (
    <Wrapper>
      <thead>
        <tr>
          {[
            '#',
            'Champions',
            'Last time played',
            'Points since last level',
            'Champions points',
            'Champions level',
          ].map((text, index) => (
            <Title key={text}>
              <span>{text}</span>
              {index !== 0 && (
                <Sort
                  height={12}
                  width={12}
                  fill="#777777"
                  onClick={() => sortChampionsBy(index)}
                />
              )}
            </Title>
          ))}
        </tr>
      </thead>
      <tbody>
        {(championsMasteries || tmpChampionsMasteries).map((champion, index) => (
          <Champions champion={champion} index={index} key={champion.championId} />
        ))}
      </tbody>
    </Wrapper>
  )
}

export default ChampionsContainer
