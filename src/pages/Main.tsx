import React from "react";
import styled from "styled-components";

import Datepicker from "../components/Datepicker/Datepicker";
import TodoList from "../components/TodoList/TodoList";

function Main() {
  function handleCallback(date: Date) {
    // console.log(date);
  }

  return (
    <div>
      <Head>로고</Head>
      <Body>
        <Datepicker parentCallback={handleCallback} />
        <TodoList />
        <TodoList />
      </Body>
    </div>
  );
}

export default Main;

const Head = styled.div`
  height: 50px;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
`

const Body = styled.div`
  display: flex;
  height: 750px;
`