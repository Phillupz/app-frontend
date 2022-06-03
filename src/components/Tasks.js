import React from "react"
import styled from "styled-components"
import TaskItem from "./TaskItem.js"

const TaskDisplay = styled.div`
  position: absolute;
  padding-left:px;
  height: 70%;
  width: 70%;
  margin: auto;
  display: grid;
  grid-auto-rows: 60px;
  overflow-x: hidden;
  overflow-y: scroll; 
  scroll-behavior: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

function Tasks({taskSearch, handleCheckChange, handleTaskDelete, taskList}) {

  const displayedElements = taskList.filter((task) => {
    if (task.description.toLowerCase().includes(taskSearch.toLowerCase()))
      return task
  })

  const tasks = displayedElements.map((task) => {
    return <TaskItem handleCheckChange={handleCheckChange} handleTaskDelete={handleTaskDelete} task={task}/>
  
  })

  return (
    <TaskDisplay>{tasks}</TaskDisplay>
  )
}

export default Tasks