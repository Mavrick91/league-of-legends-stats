// @flow

import ChampName from 'app/components/DisplayMatches/ChampName'
import {
  getChampionById,
  getSummonerSpellsById,
  getVersionsSelector,
} from 'app/service/staticData/selector'
import { getSummonerEntitySelector } from 'app/service/summoner/selector'
import { getTeamEnemyTotalDeath } from 'app/utils'
import { capitalize } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  BarDamage,
  EmptyItem,
  Fill,
  TdAvatar,
  TdDamage,
  TdItems,
  TdKda,
  TdMinion,
  TdName,
  TdRank,
  TdWards,
  Wrapper,
} from './ArrayOverviewRow.styled'

type Props = {
  participant: {
    summonerName: string,
  } & ParticipantsType,
  matchDetail: MatchDetailType,
  maxDamageDealt: number,
  isWin: boolean,
}

const ArrayOverviewRow = ({ participant, matchDetail, maxDamageDealt, isWin }: Props) => {
  const {
    championId,
    spell1Id,
    spell2Id,
    stats,
    highestAchievedSeasonTier,
    summonerName,
    teamId,
  } = participant
  const {
    kills,
    assists,
    deaths,
    visionWardsBoughtInGame,
    wardsPlaced,
    wardsKilled,
    totalMinionsKilled,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
  } = stats
  const items = [item0, item1, item2, item3, item4, item5, item6].reduce((acc, key) => {
    const index = Object.keys(acc).length
    acc[index] = key

    return acc
  }, {})
  const summoner = useSelector(getSummonerEntitySelector)
  const champion = useSelector(state => getChampionById(state, championId))
  const versions = useSelector(getVersionsSelector)
  const summonerSpell1 = useSelector(state => getSummonerSpellsById(state, spell1Id))
  const summonerSpell2 = useSelector(state => getSummonerSpellsById(state, spell2Id))
  const killParticipation = ((kills + assists) / getTeamEnemyTotalDeath(matchDetail, teamId)) * 100
  const kda = ((kills + assists) / deaths).toFixed(2)
  const kdaDisplay = kda === 'Infinity' ? 'Perfect ' : `${kda}:1 `
  let color = 'black12'

  if (parseInt(kda, 10) >= 4) color = 'blue'
  if (parseInt(kda, 10) >= 5) color = 'orange'

  return (
    <Wrapper isMe={summoner.info.name === summonerName} isWin={isWin}>
      <TdAvatar>
        <ChampName
          championVersion={versions.champion}
          summonerVersion={versions.summoner}
          championImage={champion.image.full}
          summonerSpell1Image={summonerSpell1.image.full}
          summonerSpell2Image={summonerSpell2.image.full}
          champLevel={stats.champLevel}
        />
      </TdAvatar>
      <TdName>
        <Link to={`/dashboard/${summonerName}`}>{summonerName}</Link>
      </TdName>
      <TdRank>{capitalize(highestAchievedSeasonTier) || 'Unknow'}</TdRank>
      <TdKda textColor={color}>
        <div>{kdaDisplay}</div>
        <span>
          <span>{`${kills}/`}</span>
          <span>{deaths}</span>
          <span>{`/${assists}`}</span>
          <span>{` (${Math.round(killParticipation)}%)`}</span>
        </span>
      </TdKda>
      <TdDamage>
        <div>{stats.totalDamageDealtToChampions}</div>
        <BarDamage>
          <Fill width={(stats.totalDamageDealtToChampions * 100) / maxDamageDealt} />
        </BarDamage>
      </TdDamage>
      <TdWards>
        <div>{visionWardsBoughtInGame}</div>
        <span>{`${wardsPlaced} / ${wardsKilled}`}</span>
      </TdWards>
      <TdMinion>
        <div>{totalMinionsKilled}</div>
        <div>{`${(totalMinionsKilled / (matchDetail.gameDuration / 60)).toFixed(1)}/m`}</div>
      </TdMinion>
      <TdItems>
        {Object.keys(items).map(key => {
          if (items[key] === 0) return <EmptyItem key={`${summonerName}-${key}`} />
          return (
            <div key={`${summonerName}-${key}`}>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/${versions.item}/img/item/${items[key]}.png `}
                alt="item"
              />
            </div>
          )
        })}
      </TdItems>
    </Wrapper>
  )
}

export default ArrayOverviewRow
