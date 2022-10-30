import React, { useState } from "react";
import styled from "styled-components";

import Datepicker from "../components/Datepicker/Datepicker";
import TodoList from "../components/TodoList/TodoList";
import DoneList from "../components/DoneList/Donelist";

function Main() {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);

  const [upDate, setUpdate] = useState<Boolean>(false);

  function handleGettodo(day: Date) {
    const getYear = day.getFullYear();
    const getMonth = day.getMonth() + 1;
    setYear(getYear);
    setMonth(getMonth);
  }

  function handleUpdate() {
    setUpdate(!upDate);
  }

  return (
    <div>
      <Head>One's TodoList</Head>
      <Body>
        <Datepicker
          gettodoCallback={handleGettodo}
          handleUpdate={handleUpdate}
        />
        <TodoList
          getYear={year}
          getMonth={month}
          handleUpdate={handleUpdate}
          update={upDate}
        />
        <DoneList
          getYear={year}
          getMonth={month}
          handleUpdate={handleUpdate}
          update={upDate}
        />
      </Body>
    </div>
  );
}

export default Main;

const Head = styled.p`
  width: 50%;
  font-size: 40px;
  font-weight: bold;
  border: solid 3px #ffad50;
  padding: 10px;
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
