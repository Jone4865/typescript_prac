import React, { useState } from "react";
import styled from "styled-components";

import Datepicker from "../components/Datepicker/Datepicker";
import TodoList from "../components/TodoList/TodoList";
import DoneList from "../components/DoneList/Donelist";

function Main() {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);

  function handleGettodo(day: Date) {
    const getYear = day.getFullYear();
    const getMonth = day.getMonth() + 1;
    setYear(getYear);
    setMonth(getMonth);
  }

  return (
    <div>
      <Head>로고</Head>
      <Body>
        <Datepicker gettodoCallback={handleGettodo} />
        <TodoList getYear={year} getMonth={month} />
        <DoneList getYear={year} getMonth={month} />
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
`;

const Body = styled.div`
  display: flex;
  height: 750px;
`;
