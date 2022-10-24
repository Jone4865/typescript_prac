import React, { useState } from "react";
import styled from "styled-components";

function Main() {

  const [modal, setModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  console.log(title, content);

  const submitHandle = () => {
    console.log("hi")
  }

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
        <Modal onSubmit={(e: React.FormEvent)=>{e.preventDefault(); submitHandle();}}>
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
            <button
              id="submitBtn"
            >
              작성하기
            </button>
            <button
              type="button"
              id="cancleBtn"
            >
              닫기
            </button>
          </div>
        </Modal>
      ) : null}
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
