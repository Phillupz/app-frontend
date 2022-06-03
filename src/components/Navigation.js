import { React, useEffect } from "react"
import styled from "styled-components"
import Lists from "./Lists.js"
import { MdOutlineLogout } from "react-icons/md"

const NavContainer = styled.div`
  justify-items: center;
  padding: .59%;
  text-align:center;
  border-right: 1px solid black;
  padding-right: 5%;
`

const ProfileInfoCont = styled.div`
  display: grid;
  grid-template-columns: 6% 93%;
  height: 51.5px;
  margin-bottom: 12px;
  border-bottom: 1px solid black;
  padding-bottom: .625%;
  margin-left: 5px;
`

const ImageCont = styled.div`
  background-color: none;
  width: 50px;
  height: 50px;
  display: block;
  border-radius: 50%;
  padding-right:1.8%;
  padding-left:1.8%;
  padding-bottom:1.8%;
  padding-top: 1.8%;
  border-radius: 50%;
  background-color:black;
  margin-bottom:3px;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`
const UserNameCont = styled.p`
  font-family: Helvetica;
  font-size: 16px;
  font-weight: 100;
  text-align:left;
  height: 20px;
  width:88%;
  margin: auto;
  position:relative;
  margin-left: 50px
`

const LogoutButtonDiv = styled.div`
  position:absolute;
  right:28px;
  top:0px
`

function Navigation({listSearch, handleListSearch, handleLogout, handleListDelete, userLists, handleListsubmit, handleListChange, liSearchEngaged, handleListInput, handleOpenList, currentUser}) {
  function logout() {
    handleLogout()
  }  

  return (
    <NavContainer>
      <ProfileInfoCont>
        <ImageCont>
          <Image src={currentUser.pic} />
        </ImageCont>
        <UserNameCont>{currentUser.user}<LogoutButtonDiv onClick={logout}><MdOutlineLogout size={19} /></LogoutButtonDiv></UserNameCont>
      </ProfileInfoCont>
      <Lists listSearch={listSearch} handleListSearch={handleListSearch} handleListDelete={handleListDelete} handleListsubmit={handleListsubmit} handleListChange={handleListChange} liSearchEngaged={liSearchEngaged} handleListInput={handleListInput} handleOpenList={handleOpenList} userLists={userLists} />
    </NavContainer>
  )
}

export default Navigation;