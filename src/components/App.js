import React, { useState, useEffect } from "react"
import Navigation from "./Navigation.js"
import DisplayArea from "./DisplayArea.js"
import styled from "styled-components"
import Login from "./Login.js"
import { useHistory, Route, Switch } from "react-router-dom";

const AppContainer = styled.div`
  height: 90vh;
  padding: 1%;
  border: 1.5px solid black;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 25% 74%;
  grid-column-gap: 1%;
  margin:18px
`

function App() {
  const history = useHistory()
  const [currentUser, setCurrentUser] = useState([])
  const [accountId, setAccountId] = useState("")
  const [taskList, setTaskList] = useState([])
  const [userLists, setUserLists] = useState([])
  const [selectedList, setSelectedList] = useState("")
  const [liSearchEngaged, setLiSearchEngaged] = useState(true)
  const [listInput, setListInput] = useState("")
  const [taskSearchEngaged, setTaskSearchEngaged] = useState(false)
  const [listSearch, setListSearch] = useState("")
  const [taskSearch, setTaskSearch] = useState("")

  useEffect(() => {
    fetch(`http://localhost:9292/users/${accountId}`)
    .then((r) => r.json())
    .then((data) => setUserLists((data.lists).reverse()))
  }, [currentUser, selectedList])

  
  function handleLogin(account) {
    setUserLists((account.lists).reverse())
    const listCopy = userLists[0]
    setSelectedList(listCopy)
    setTaskList((listCopy.tasks).reverse())
    setCurrentUser(account)
    setAccountId(account.id)
    return history.push("/app")
  }

  function handleLogout(){
    setUserLists([])
    setCurrentUser([])
    setSelectedList([])
    setAccountId("")
    setTaskList([])
    return history.push("/Login")
  }

  function handleOpenList(list, tasks){
    setTaskSearchEngaged((taskSearchEngaged) => taskSearchEngaged = false)
    setSelectedList(list)
    fetch(`http://localhost:9292/lists/${list.id}`)
    .then((r) => r.json())
    .then((data) => setTaskList((data.tasks).reverse()))
    setListSearch("")
  }

  function handleListInput() {
    setLiSearchEngaged(!liSearchEngaged)
  }

  function handleListChange(e) {
    setListInput(e.target.value)
  }

  function handleListsubmit(){
    setTaskList([])
    setLiSearchEngaged(!liSearchEngaged)
    const configObj = {
      listname: listInput,
      user_id: accountId,
    }
    fetch("http://localhost:9292/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(configObj)
    })
    .then((r) => r.json())
    .then((data) => setSelectedList(data))
  }


  function handleTaskSubmit(data){
    setTaskList(() => {
      return [data, ...taskList]
    })
  }

  function handleTaskDelete(task) {
    setTaskSearch("")
    fetch(`http://localhost:9292/tasks/${task.id}`, {
      method: "DELETE",
    })
    const postTaskDelete = taskList.filter((taskItem) => {
      return taskItem.id !== task.id
    })
    setTaskList(postTaskDelete)
  }

  function handleListDelete(list) {
    setTaskList([])
    fetch(`http://localhost:9292/lists/${list.id}`, {
      method: "DELETE",
    })
    const postListDelete = userLists.filter((listItem) => {
      return listItem.id !== list.id
    })
    setUserLists(postListDelete)
    setSelectedList("")
  }

  function handleCheckChange(task, e) {
    setTaskSearch("")
    fetch(`http://localhost:9292/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...task, 
        checked: e.target.checked
      })
    })
    .then((r) => r.json())
    .then((data) => {
      const newList = taskList.map((taskItem) => {
        if (taskItem.id === task.id) {
          return data
        } else {
          return taskItem
        }
      })
      setTaskList(newList)
    })
  }

  function handleOpenSearch() {
    setTaskSearchEngaged(!taskSearchEngaged)
  }

  function handleCloseSearch() {
    setTaskSearchEngaged(!taskSearchEngaged)
  }

  function handleListSearch(e) {
    setListSearch(e.target.value)
  }

  function handleTaskSearch(e) {
    setTaskSearch(e.target.value)
  }

  return (
    <Switch>
      <Route exact path="/login">
        <Login handleLogin={handleLogin}/>
      </Route>
      <Route exact path="/app">
        <AppContainer>
          <Navigation listSearch={listSearch} handleListSearch={handleListSearch} handleLogout={handleLogout} handleListDelete={handleListDelete} userLists={userLists} taskList={taskList} handleListsubmit={handleListsubmit} handleListChange={handleListChange} liSearchEngaged={liSearchEngaged} handleListInput={handleListInput} handleOpenList={handleOpenList} accountId={accountId} currentUser={currentUser} />
          <DisplayArea handleTaskSearch={handleTaskSearch} taskSearch={taskSearch} taskSearchEngaged={taskSearchEngaged} handleCloseSearch={handleCloseSearch} handleOpenSearch={handleOpenSearch} handleCheckChange={handleCheckChange} handleTaskDelete={handleTaskDelete} handleTaskSubmit={handleTaskSubmit} selectedList={selectedList} taskList={taskList} />
        </AppContainer>
      </Route>
    </Switch>
  )
}

export default App;
