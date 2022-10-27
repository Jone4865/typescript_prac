import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

interface ITodo {
  title: String;
  content: String;
  id: number;
  postYear: number;
  postMonth: number;
  postDate: number;
}

interface IProps {
  pickYear: Number;
  pickMonth: Number;
  pickDate: Number;
}

function TodoList({ pickYear, pickMonth, pickDate }: IProps) {
  const today = new Date();
  const [todos, setTodos] = useState<[]>([]);
  const [month, setMonth] = useState<Number>(today.getMonth() + 1);
  const getitems = async () => {
    if (pickMonth === 0) {
        await axios.get(`http://localhost:4000/${pickYear}${month}`).then((res) => {
      setTodos(res.data);
    });
    } else {
        await axios.get(`http://localhost:4000/${pickYear}${pickMonth === 0 ? month : pickMonth}`).then((res) => {
      setTodos(res.data);
    });
    }
    console.log(pickMonth)
    
  };

  useEffect(() => {
    getitems();
    console.log("hi")
  }, [pickDate]);
console.log(pickMonth)
  return (
    <Todo>
      <div>
        {todos?.map((todo: ITodo) => (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <div>{todo.content}</div>
            <div>
              {todo.postYear}.{todo.postMonth}.{todo.postDate}
            </div>
          </div>
        ))}
      </div>
    </Todo>
  );
}

export default TodoList;

const Todo = styled.div`
  width: 33%;
  height: 750px;
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow-y: scroll;
`;
