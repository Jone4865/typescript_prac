import React, {useState} from "react";
import styled from "styled-components";

import Datepicker from "../components/Datepicker/Datepicker";
import TodoList from "../components/TodoList/TodoList";

function Main() {
  const [pickYear, setPickYear] = useState<Number>(0);
  const [pickMonth, setPickMonth] = useState<Number>(0);
  const [pickDate, setPickDate] = useState<Number>(0);

  function handleCallback(date: Date) {
    setPickYear(date.getFullYear());
    setPickMonth(date.getMonth()+1);
    setPickDate(date.getDate());
    console.log(date)
  }

  return (
    <div>
      <Head>로고</Head>
      <Body>
        <Datepicker parentCallback={handleCallback} />
        <TodoList pickYear={pickYear} pickMonth={pickMonth} pickDate={pickDate}/>
        <TodoList pickYear={pickYear} pickMonth={pickMonth} pickDate={pickDate}/>
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