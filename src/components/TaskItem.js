import React, {useState, useEffect} from "react"
import styled from "styled-components"
import { AiOutlineClose } from "react-icons/ai"
import "../styles.css"

const ItemContainer = styled.div`
  display: grid;
  margin-left: 10px;
  width: 96%;
  height:30%;
  border-radius: 7px;
  padding:1%;
  transition: .3s;
  &&:hover {
    background-color: #f5f5f5;
  }
`

const DeleteButton = styled.button`
  position: relative;
  bottom: 65px;
  left: 98%;
  bottom: 25px;
  background-color: transparent;
  border: none;
`
const DescContainer = styled.span`
`

function TaskItem({handleCheckChange, handleTaskDelete, task}) {
  
  function taskDelete() {
    handleTaskDelete(task)
  }

  function checkChange(e) {
    handleCheckChange(task, e)
  }

 
  const [isShown, setIsShown] = useState(false)
   
   return (
     <ItemContainer onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
       <label class="checkbox">
         <input onChange={checkChange} checked={task.checked} name="checked" type="checkbox" />
         <DescContainer className={task.checked ? "strike" : ""}>{task.description}</DescContainer>
       </label>
       <div>
         {isShown && (<DeleteButton onClick={taskDelete}><AiOutlineClose size={17}/></DeleteButton>)}
       </div>
     </ItemContainer>
   )
}

export default TaskItem