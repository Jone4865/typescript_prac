import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Swal from "sweetalert2";
import { Bool } from "reselect/es/types";

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
  handleUpdate: () => void;
  update: Boolean;
}

function TodoList({ getYear, getMonth, handleUpdate, update }: IProps) {
  const [todos, setTodos] = useState<[]>([]);
  const [click, setClick] = useState<Boolean>(false);
  const [id, setId] = useState<Number>(0);

  const [postYear, setPostYear] = useState<Number>(0);
  const [postMonth, setPostMonth] = useState<Number>(0);
  const [postDate, setPostDate] = useState<Number>(0);
  const [title, setTitle] = useState<String>("");
  const [content, setContent] = useState<String>("");
  const [deleteId, setDeleteId] = useState<Number>(0);

  const [modal, setModal] = useState<Boolean>(false);

  const getTodo = async () => {
    try {
      await axios
        .get(`http://localhost:4000/todos${getYear}${getMonth}`)
        .then((res) => {
          res.data.sort(function (a: any, b: any) {
            return a.postDate < b.postDate
              ? -1
              : a.postDate > b.postDate
              ? 1
              : 0;
          });
          setTodos(res.data);
          setClick(false);
        });
    } catch (error: any) {
      if (error) {
        setTodos([]);
      }
    }
  };

  const deleteTodo = async () => {
    await axios
      .delete(`http://localhost:4000/todos${getYear}${getMonth}/${deleteId}`)
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
          handleUpdate();
          Swal.fire({
            title: "할 일 완료!",
            timer: 1500,
            confirmButtonColor: "#ffc65d",
          });
        }
      });
  };

  const updateToDone = () => {
    postToDone();
    deleteTodo();
    getTodo();
  };

  useEffect(() => {
    getTodo();
  }, [getMonth, id, update]);

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
              setDeleteId(todo.id);
              setPostYear(todo.postYear);
              setPostMonth(todo.postMonth);
              setPostDate(todo.postDate);
              setTitle(todo.title);
              setContent(todo.content);
              setId(id === todo.id ? 0 : todo.id);
              setClick(!click);
            }}
            key={todo.id}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginTop: "25px" }}>
                {todo.postYear}년 {todo.postMonth}월 {todo.postDate}일 할 일
              </div>
            </div>
            {todo.id !== id ? (
              <>
                <Ellipsis
                  style={{
                    fontWeight: "bold",
                    wordBreak: "break-all",
                    fontSize: "30px",
                  }}
                >
                  {todo.title}
                </Ellipsis>
                <Ellipsis style={{ marginBottom: "30px" }}>
                  {todo.content}
                </Ellipsis>
              </>
            ) : (
              <>
                <div
                  style={{
                    fontWeight: "bold",
                    wordBreak: "break-all",
                    fontSize: "30px",
                  }}
                >
                  {todo.title}
                </div>
                <div style={{ wordBreak: "break-all" }}>{todo.content}</div>
                <div>
                  <BTN onClick={(e) => updateToDone()}>완료하기</BTN>
                  <DeleteBTN
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    삭제하기
                  </DeleteBTN>
                </div>
              </>
            )}
          </TodoBody>
        ))}
      </div>
      {modal ? (
        <DeleteModal>
          <DeleteModalBody>
            <div style={{ fontSize: "36px" }}>{title}</div>{" "}
            <div style={{ color: "red" }}>삭제하시겠습니까?</div>
          </DeleteModalBody>
          <div>
            <DeleteBTN
              onClick={() => {
                deleteTodo();
              }}
            >
              삭제하기
            </DeleteBTN>
            <BTN
              type="button"
              onClick={() => {
                setModal(false);
              }}
            >
              취소하기
            </BTN>
          </div>
        </DeleteModal>
      ) : null}
    </Todo>
  );
}

export default TodoList;

const Todo = styled.div`
  width: 33%;
  height: 650px;
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
  margin: 5px auto auto auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const DeleteBTN = styled.button`
  padding: 7px;
  border-radius: 10px;
  background-color: #f98181;
  width: 100px;
  border: none;
  margin: 20px;
  font-weight: bold;

  :hover {
    background-color: #f35555;
    cursor: pointer;
  }
`;

const DeleteModal = styled.form`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DeleteModalBody = styled.div`
  width: 500px;
  height: 200px;
  border: none;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-direction: column;
  font-weight: bold;
`;
