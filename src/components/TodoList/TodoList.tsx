import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

interface ITodo {
  title: String;
  content: String;
  id: number;
}

function TodoList() {
  
  const [todos, setTodos] = useState<[]>([]);
  const getitems = async () => {
    await axios.get(`http://localhost:4000/posts`).then((res) => {
      setTodos(res.data);
    });
  };

  useEffect(() => {
    getitems();
  }, []);
  
  return (
    <Todo>   
      <div>
        {todos?.map((todo: ITodo, index) => (
          <div>
            <div key={todo.id}>
              {index + 1}. {todo.title}
            </div>
            <div>{todo.content}</div>
          </div>
        ))}
      </div>
    </Todo>
  );
}

export default TodoList;

const Todo = styled.div`
  width:33%;
  height: 750px;
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow-y: scroll;
`