import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { format } from 'date-fns';
// import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/dist/style.css';

import Datepicker from "../components/Datepicker/Datepicker";

function Main() {
  interface ITodo {
    title: String;
    content: String;
    id: number;
  }

  const [modal, setModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [todos, setTodos] = useState<[]>([]);

  const postItems = async () => {
    await axios
      .post(`http://localhost:4000/posts`, { title, content })
      .then((res) => {
        res.statusText === "Created" ? alert("작성 완료") : alert("작성 실패");
      });
  };

  const getitems = async () => {
    await axios.get(`http://localhost:4000/posts`).then((res) => {
      setTodos(res.data);
    });
  };

  const submitHandle = (e: React.FormEvent) => {
    if (title !== "" && content !== "") {
      setModal(false);
      postItems();
      setTitle("");
      setContent("");
    } else if (title === "") {
      alert("제목을 입력해주세요.");
    } else if (content === "") {
      alert("내용을 입력해주세요.");
    }
  };

  useEffect(() => {
    getitems();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setModal(!modal);
        }}
      >
        할일 작성하기
      </button>
      {modal ? (
        <Modal
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            submitHandle(e);
          }}
        >
          <input
            placeholder="제목"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <input
            placeholder="내용"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></input>
          <div>
            <button id="submitBtn">작성하기</button>
            <button
              type="button"
              id="cancleBtn"
              onClick={() => {
                setModal(!modal);
                setTitle("");
                setContent("");
              }}
            >
              닫기
            </button>
          </div>
        </Modal>
      ) : null}
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
      <Datepicker/>
    </div>
  );
}

export default Main;

const Modal = styled.form`
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