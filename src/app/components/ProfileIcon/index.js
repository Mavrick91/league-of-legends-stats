// @flow

import React from 'react'
import styled from 'styled-components'
import { PROFILEICON_VERSION } from 'app/api/config'

type Props = {
  profileIconId: number,
}

const WrapperImage = styled.div`
  width: 120px;
  height: 120px;

  & > img {
    width: 100%;
    height: 100%;
  }
`

function ProfileIcon({ profileIconId }: Props) {
  return (
    <WrapperImage>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${PROFILEICON_VERSION}/img/profileicon/${profileIconId}.png`}
        alt="Profile icon summoner"
      />
    </WrapperImage>
  )
}

export default ProfileIcon
