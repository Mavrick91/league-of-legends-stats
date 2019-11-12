// @flow

import { getAllChampionsSelector } from 'app/service/staticData/selector'
import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'

type Props = {
  setChampId: number => void,
}

const Wrapper = styled.div`
  ${({ theme: { colors } }) => css`
    background: ${colors.white1};
    border: 1px solid ${colors.white3};
    box-shadow: 0 1px ${colors.white2};
    background: ${colors.white1};
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    height: 35px;
    border-bottom: none;
    display: flex;
    justify-content: flex-end;
    position: relative;
  `}
`

const InputStyled = styled.input`
  width: 160px;
  outline: none;
  font-size: 13px;
  padding: 9px 30px 9px 9px;
  background: none;
  border: none;
  border-left: 1px solid #cdd2d2;
  color: #999;
`

const WrapperList = styled.div`
  height: 332px;
  width: 160px;
  position: absolute;
  background-color: rgba(242, 242, 242, 0.9);
  top: 34px;
  border-top: 1px solid #cdd2d2;
`

const HeaderList = styled.div`
  height: 23px;
  margin: 12px;
  padding-bottom: 9px;
  color: #aaa;
  font-size: 11px;
  border-bottom: 1px solid #cdd2d2;
`

const ContainerChamp = styled.div`
  overflow: auto;
  height: 284px;
`

const ItemChamp = styled.div`
  padding: 3px 12px;
  font-size: 13px;
  color: #879292;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #1f8ecd;
  }
`

function Header({ setChampId }: Props) {
  const [champName, setChampName] = React.useState('')
  const [displayList, setDisplayList] = React.useState(false)
  const refInput = React.useRef()
  const refList = React.useRef()
  const allChampions = useSelector(getAllChampionsSelector)

  React.useEffect(() => {
    const copyRef = refInput.current

    function toggleList() {
      if (!displayList) setDisplayList(true)
    }

    // $FlowFixMe
    refInput.current.addEventListener('click', toggleList)
    // $FlowFixMe
    return () => copyRef.removeEventListener('click', toggleList)
  }, [displayList])

  React.useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        refList.current &&
        refInput.current &&
        !refList.current.contains(event.target) &&
        !refInput.current.contains(event.target)
      )
        setDisplayList(false)
    }

    if (displayList) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [displayList])

  function displayAllChamp() {
    const champFiltered = (Object.values(allChampions): any).filter(champ =>
      champ.name.toLowerCase().includes(champName),
    )
    champFiltered.unshift({ name: 'Tous les champions', key: null })

    return (
      <WrapperList ref={refList}>
        <HeaderList>Champion List</HeaderList>
        <ContainerChamp>
          {champFiltered.map(champ => (
            <ItemChamp
              key={champ.name}
              onClick={() => {
                setDisplayList(false)
                setChampId(champ.key)
              }}
            >
              {champ.name}
            </ItemChamp>
          ))}
        </ContainerChamp>
      </WrapperList>
    )
  }

  return (
    <Wrapper>
      <InputStyled
        ref={refInput}
        type="text"
        placeholder="Search a Champion"
        value={champName}
        onChange={e => setChampName(e.currentTarget.value)}
      />
      {displayList && displayAllChamp()}
    </Wrapper>
  )
}

export default React.memo<Props>(Header)
