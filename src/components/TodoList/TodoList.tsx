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
  getYear: number;
  getMonth: number;
}

function TodoList({ getYear, getMonth }: IProps) {
  const [todos, setTodos] = useState<[]>([]);
  const [click, setClick] = useState<Boolean>(false);

  const getTodo = async () => {
    await axios
      .get(`http://localhost:4000/todos${getYear}${getMonth}`)
      .then((res) => {
        setTodos(res.data);
        setClick(false);
      });
  };

  const deleteTodo = async (e: any) => {
    const ID = e.target.value;
    await axios
      .delete(`http://localhost:4000/todos${getYear}${getMonth}/${ID}`).then((res)=>{
        getTodo();
      })
  };

  useEffect(() => {
    getTodo();
  }, [getMonth]);

  return (
    <Todo>
      <p style={{display:"flex", margin:"20px auto", fontSize:"26px", fontWeight:"bold"}}>{getMonth}월 할 일 목록</p>
      <div>
        {todos?.map((todo: ITodo) => (
          <TodoBody
            onClick={() => {
              setClick(!click);
            }}
            key={todo.id}
          >
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div style={{marginTop:"25px"}}>{todo.postYear}년 {todo.postMonth}월 {todo.postDate}일 할 일</div><BTN value={todo.id} style={{backgroundColor:"#f98181", color:"white"}} onClick={(e)=>{deleteTodo(e)}}>삭제하기</BTN>
            </div>
            {click === false ? (
              <>
                <Ellipsis style={{ fontWeight: "bold" }}>{todo.title}</Ellipsis>
                <Ellipsis>{todo.content}</Ellipsis>
              </>
            ) : (
              <>
                <div style={{ fontWeight: "bold", wordBreak: "break-all" }}>
                  {todo.title}
                </div>
                <div style={{ wordBreak: "break-all" }}>{todo.content}</div>
                <BTN style={{display:"flex", margin:"25px auto auto auto", justifyContent:"center"}}>완료하기</BTN>
              </>
            )}
          </TodoBody>
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

const TodoBody = styled.div`
  width: 90%;
  padding: 10px;
  border: solid 3px #f5f859;
  border-radius: 7px;
  
  div {
    margin-top: 3px;
  }

`;

const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;


const BTN = styled.button`
  padding: 7px;
  border-radius: 10px;
  background-color: #fdc166;
  width: 100px;
  border: none;
  margin: 20px;
  font-weight: bold;
  
  :hover {
    background-color: #ff9900;
    cursor: pointer;
  }
`;