import React, { useState } from "react"
import styled from "styled-components"
import ListItem from "./ListItem.js"
import { VscAdd } from "react-icons/vsc"
import { AiOutlineSearch } from "react-icons/ai"

const ListContainer = styled.div`
  margin: auto;
  width: 50%;
  width: 98%;
  height: 79.5%;
  display: grid;
  grid-auto-rows: 48px;
`

const Header = styled.h3`
margin-top: 12px;
margin-bottom: 3%;
margin-left: 8px;
font-family: Helvetica;
font-size: 16px;
font-weight: 100;
width: 100%;
text-align:left;
height: 25px
`

const AddButton = styled.button`
  margin-left: 64.25%;
  background-color: white;
  border: none;
  height: 20px;
  position: relative;
  top: 2px
`
const Search = styled.input`
  width: 96%;
  height: 25px;
  border: 1px solid black;
  border-radius: 7px;
  margin-bottom: 12px;
  padding-left: 3px;
  outline:none
`

const ListInput = styled.input`
  width: 96%;
  height: 25px;
  border: 1px solid black;
  border-radius: 7px;
  margin-bottom: 12px;
  padding-left: 3px;
  outline:none
`
const Form = styled.form`
  height: 30px;
  margin-bottom: 11px
`

function Lists({listSearch, handleListSearch, handleListDelete, handleListsubmit, handleListChange, liSearchEngaged, handleListInput, handleOpenList, userLists}) {

  const displayedElements = userLists.filter((list) => {
    if (list.listname.toLowerCase().includes(listSearch.toLowerCase()))
      return list
  })

  const listElement = displayedElements.map((list) => {
    return (
      <React.Fragment>
        <div><ListItem handleListDelete={handleListDelete} handleOpenList={handleOpenList} list={list} /></div>
      </React.Fragment>
    )
  })

  function handleClick() {
    handleListInput()
  }

  function searchChange(e){
    handleListSearch(e)
  }

  function listSubmit(e){
    e.preventDefault()
    handleListsubmit()
  }

  function listChange(e) {
    handleListChange(e)
  }

  return (
    <React.Fragment>
      <Header>Your Lists
        {liSearchEngaged
        ? <AddButton onClick={handleClick}><VscAdd size={18}/></AddButton>
        : <AddButton onClick={handleClick}><AiOutlineSearch size={18}/></AddButton>
        }
      </Header>
      {liSearchEngaged
      ? <Search onChange={searchChange} value={listSearch} placeholder="Search Lists..."></Search>
      : <Form onSubmit={listSubmit}><ListInput onChange={listChange} onSubmit={listSubmit} placeholder="Enter New List..."></ListInput></Form>
      }
      <ListContainer>{listElement}</ListContainer>
    </React.Fragment>
  )
}

export default Lists