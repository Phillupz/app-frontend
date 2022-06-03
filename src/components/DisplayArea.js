import { React, useState} from "react"
import styled from "styled-components"
import Tasks from "./Tasks.js"
import { AiOutlineSend } from "react-icons/ai"
import { AiOutlineSearch } from "react-icons/ai"
import { AiOutlineClose } from "react-icons/ai"

const ChatBarCont = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  border-bottom: 1px solid black;
  margin-bottom: 40px
`

const MessageInfoCont = styled.div`
  padding:.25%;
  display: grid;
  grid-template-columns: 6% 93%;
  height: 51.4px;
`

const UserNameCont = styled.p`
  font-family: Helvetica;
  font-size: 14px;
  font-weight: 100;
  height: 20px;
  width:400%;
  margin: auto;
  margin-left: 16px;
`

const TextCont = styled.div`
  position: absolute;
  background-color: white;
  height: 5.5%;
  width: 70%;
  margin: auto;
  margin-top: .35%;
  bottom: 40px;
`
const SendButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 6px;
  background-color: white;
  border: none;
`
const TextInput = styled.input`
  width: 92%;
  height: 30px;
  border: 1px solid black;
  border-radius: 10px;
  outline: none;
  padding-left: 4px;
`

const ChatContainer = styled.div`
  height: 100%;
  width: 100%;
  margin-right: 20px
`

const SearchInputDiv = styled.div`
  margin-top: 4.15px;
  width: 100%;
  display:grid;
  grid-template-columns: 90% 10%;
  border-bottom: 1px solid black;
  margin-bottom: 40px
`

const SearchInput = styled.input` 
  background-color: white;
  border: 0;
  border: 1px solid black;
  border-radius: 7px;
  font-size: 14px;
  height: 30px;
  width: 103%;
  margin-bottom:1.76%;
  outline:none;
  padding-left: 4px;
`
const SearchButton = styled.button`
  margin-left: 84.25%;
  border: none;
  height: 30px;
  position: relative;
  top: 12px;
  background-color: white;
`
const CloseButton = styled.button`
  position: relative;
  left: 27.5px;
  bottom: 4px;
  background-color: transparent;
  border: none;
`

function DisplayArea({handleTaskSearch, taskSearch, taskSearchEngaged,handleCloseSearch, handleOpenSearch, handleCheckChange, handleTaskDelete, handleTaskSubmit, selectedList, taskList}) {
  const [taskInput, setTaskInput] = useState("")

  function taskChange(e) {
    setTaskInput(e.target.value)
  }
  
  function taskSubmit(e) {
    e.preventDefault()
    setTaskInput("")
    const configObj = {
      description: taskInput,
      list_id: selectedList.id
    }
    fetch("http://localhost:9292/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(configObj)
    })
    .then((r) => r.json())
    .then((data) => handleTaskSubmit(data))
  }
  
  function taskSearchInput(e) {
    handleTaskSearch(e)
  }

  function engageTaskSearch() {
    handleOpenSearch()
  }

  function closeSearch () {
    handleCloseSearch()
  }

  return (
    <ChatContainer>
      {taskSearchEngaged
      ? 
      (<SearchInputDiv>
        <SearchInput
          type="text"
          placeholder="Search Tasks..."
          value={taskSearch}
          onChange={taskSearchInput}
         />
         <CloseButton onClick={closeSearch}><AiOutlineClose size={17}/></CloseButton>
        </SearchInputDiv>)
      :
      (<ChatBarCont>
        <MessageInfoCont>
          <UserNameCont>{selectedList.listname}</UserNameCont>
        </MessageInfoCont>
        <SearchButton onClick={engageTaskSearch}><AiOutlineSearch size={18}/></SearchButton>
      </ChatBarCont>)
      }
      <Tasks taskSearch={taskSearch} handleCheckChange={handleCheckChange} handleTaskDelete={handleTaskDelete} taskList={taskList}/>
      <TextCont>
        <form >
          <TextInput placeholder="Enter New Task..." value={taskInput} onChange={taskChange}></TextInput>
          <SendButton onClick={taskSubmit}><AiOutlineSend size={22} /></SendButton>
        </form>
      </TextCont>
    </ChatContainer>
  )
}
 export default DisplayArea