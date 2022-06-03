import React, { useState, useEffect } from "react"
import styled from "styled-components"

const LoginCont = styled.div`

`
const InnerLoginCont = styled.div`
  height: 60vh;
  width: 40vh;
  border: 1.5px solid black;
  border-radius: 10px;
  margin-top: 20vh;
  margin-left:auto;
  margin-right:auto;
  padding: 10px;
  position: relative;
`
const Header = styled.p`
  margin-left:auto;
  margin-right:auto;
  padding: 10px;
  position: relative;
  height:50px;
  font-family: Helvetica;
  font-size: 40px;
  font-weight: 400;
  top: 10px;
  margin-bottom: 60px;
`
const LoginInput = styled.input`
  border: 1.5px solid black;
  border-radius: 10px;
  height: 4vh;
  outline:none;
  padding-left: 3%;
  width: 70%;
  margin-left:auto;
  margin-right:auto;
`
const LoginForm = styled.form`
  display: grid;
  grid-auto-rows: 55px;
  height: 90%;
`

const CenterDiv = styled.div`
  display:grid;
  position: relative;
  margin-top: 20px;
`

const Button = styled.button`
  height: 30px;
  width: 30%;
  margin-left:auto;
  margin-right:auto;
  background-color:white;
  border: 1px solid black;
  border-radius: 10px;
`

function Login({handleLogin}) {
  const [userData, setUserData] = useState([])
  const [loginInfo, setLoginInfo] = useState({
      user:"",
      pass:""
  })

  useEffect(() => {
    fetch("http://localhost:9292/users")
    .then((r) => r.json())
    .then((data) => setUserData(data))
  }, [])

  function handleLoginInput(e) {
    const name = e.target.name;
    let value = e.target.value;
    setLoginInfo({
        ...loginInfo,
        [name]: value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault() 
    const currentAccount = userData.find((user) => {
        if ((user.user === loginInfo.user))
          return user
      })
      const account = currentAccount
      fetch(`http://localhost:9292/users/${account.id}`)
      .then((r) => r.json())
      .then((account) => handleLogin(account))
  }

  return (
    <LoginCont>
      <InnerLoginCont>
      <CenterDiv>
        <Header>Minilist</Header>
        <LoginForm onSubmit={handleSubmit}>
          <LoginInput onChange={handleLoginInput} type="text" name="user" placeholder="Enter Login"></LoginInput>
          <LoginInput onChange={handleLoginInput} type="password" name="pass" placeholder="Enter password"></LoginInput>
          <Button>login</Button>
        </LoginForm>
        </CenterDiv>
      </InnerLoginCont>
    </LoginCont>
  )
}

export default Login