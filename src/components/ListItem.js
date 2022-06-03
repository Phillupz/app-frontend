import React, {useState} from "react"
import styled from "styled-components"
import { AiOutlineClose } from "react-icons/ai"

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 15% 83%;
  margin-left: 3.5px;
  width: 96%;
  height: 40px;
  border-radius: 7px;
  padding:1%;
  transition: .3s;
  &&:hover {
    background-color: #f5f5f5;
  }
`

const ListNameContainer = styled.p`
  font-family: Helvetica;
  font-size: 14px;
  font-weight: 100;
  height: 30px;
  width: 550%;
  text-align: left;
  display: block;
  margin-left:6px;
  position:relative;
  bottom: 16.5px;
  padding-top:15px;
`

const DeleteButton = styled.button`
  position: relative;
  bottom: 63px;
  left: 17.33rem;
  background-color: transparent;
  border: none;
`

function ListItem({handleListDelete, handleOpenList, list}) {
  const [isShown, setIsShown] = useState(false)

  function handleClick() {
    const tasks = list.tasks
    handleOpenList (list, tasks)
  }

  function listDelete() {
    handleListDelete(list)
  }

   return (
     <ItemContainer onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
       <div>
         <ListNameContainer onClick={handleClick}>{list.listname}</ListNameContainer>
         {isShown && (<DeleteButton onClick={listDelete}><AiOutlineClose size={17}/></DeleteButton>)}
       </div>
     </ItemContainer>
   )
}

export default ListItem