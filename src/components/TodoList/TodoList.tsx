import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Swal from "sweetalert2";

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
  const [id, setId] = useState<Number>(0);

  const [postYear, setPostYear] = useState<Number>(0);
  const [postMonth, setPostMonth] = useState<Number>(0);
  const [postDate, setPostDate] = useState<Number>(0);
  const [title, setTitle] = useState<String>("");
  const [content, setContent] = useState<String>("");

  const getTodo = async () => {
    try {
      await axios
        .get(`http://localhost:4000/todos${getYear}${getMonth}`)
        .then((res) => {
          setTodos(res.data);
          setClick(false);
        });
    } catch (error: any) {
      if (error) {
        setTodos([]);
      }
    }
  };

  const deleteTodo = async (e: any) => {
    const ID = e.target.value;
    await axios
      .delete(`http://localhost:4000/todos${getYear}${getMonth}/${ID}`)
      .then((res) => {
        getTodo();
      });
  };

  const postToDone = async () => {
    await axios
      .post(`http://localhost:4000/dones${postYear}${postMonth}`, {
        postYear,
        postMonth,
        postDate,
        title,
        content,
      })
      .then((res) => {
        if (res.statusText === "Created") {
          setTimeout(() => {
            window.location.replace("/");
          }, 500);
          Swal.fire({
            title: "할 일 완료!",
            timer: 1500,
            confirmButtonColor: "#ffc65d",
          });
        }
      });
  };

  const updateToDone = (e: any) => {
    postToDone();
    deleteTodo(e);
    getTodo();
  };

  useEffect(() => {
    getTodo();
  }, [getMonth, id]);

  return (
    <Todo>
      <p
        style={{
          display: "flex",
          margin: "20px auto",
          fontSize: "26px",
          fontWeight: "bold",
        }}
      >
        {getMonth}월 할 일 목록
      </p>
      <div>
        {todos?.map((todo: ITodo) => (
          <TodoBody
            onClick={() => {
              setPostYear(todo.postYear);
              setPostMonth(todo.postMonth);
              setPostDate(todo.postDate);
              setTitle(todo.title);
              setContent(todo.content);
              setId(id === 0 ? todo.id : 0);
              setClick(!click);
            }}
            key={todo.id}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginTop: "25px" }}>
                {todo.postYear}년 {todo.postMonth}월 {todo.postDate}일 할 일
              </div>
              <BTN
                value={todo.id}
                style={{ backgroundColor: "#f98181", color: "white" }}
                onClick={(e) => {
                  deleteTodo(e);
                }}
              >
                삭제하기
              </BTN>
            </div>
            {click === false && todo.id !== id ? (
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
                <BTN
                  value={todo.id}
                  onClick={(e) => updateToDone(e)}
                  style={{
                    display: "flex",
                    margin: "25px auto auto auto",
                    justifyContent: "center",
                  }}
                >
                  완료하기
                </BTN>
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
  height: 700px;
  display: flex;
  margin: auto 5px auto auto;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  border: solid 1px #ffb845;
  border-radius: 7px;
  padding: 5px;
`;

const TodoBody = styled.div`
  width: 90%;
  padding: 10px;
  border: solid 3px #f5f859;
  border-radius: 7px;
  margin-top: 5px;

  div {
    margin-top: 3px;
  }
`;

const Ellipsis = styled.div`
  white-space: nowrap;
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