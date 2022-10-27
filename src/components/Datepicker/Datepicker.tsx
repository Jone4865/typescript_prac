import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { format, isSameMonth } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import DatepickerCss from "../Datepicker/DatepickerCss";
import { ko } from "date-fns/locale";

interface IDate {
  parentCallback: (date: Date) => void;
}

function Datepicker({ parentCallback }: IDate) {
  const today = new Date();
  const [month, setMonth] = React.useState<Date>(today);
  const [selected, setSelected] = React.useState<Date>();
  
  const [modal, setModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
console.log(selected)
  
let footer = (
    <Footer>
      날짜를 선택해주세요
      <BTN
        style={{marginTop:"5px"}}
        disabled={isSameMonth(today, month)}
        onClick={() => setMonth(today)}
      >
        이번 달로 가기
      </BTN>
    </Footer>
  );
  if (selected) {
    footer = (
      <Footer>
        선택한 날짜 {format(selected, "PP")}.
        <BTN
          style={{marginTop:"5px"}}
          disabled={isSameMonth(today, month)}
          onClick={() => setMonth(today)}
        >
          이번 달로 가기
        </BTN>
      </Footer>
    );
  }

  const postItems = async () => {
    await axios
      .post(`http://localhost:4000/posts`, { title, content })
      .then((res) => {
        res.statusText === "Created" ? alert("작성 완료") : alert("작성 실패");
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

  return (
    <Calendar>
      <BTN
        onClick={() => {
          setModal(!modal);
        }}
      >
        할일 작성하기
      </BTN>
      <DatepickerCss />
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={footer}
        month={month}
        onMonthChange={setMonth}
        locale={ko}
        onDayClick={parentCallback}
      />
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
            <BTN id="submitBtn">작성하기</BTN>
            <BTN
              type="button"
              id="cancleBtn"
              onClick={() => {
                setModal(!modal);
                setTitle("");
                setContent("");
              }}
            >
              닫기
            </BTN>
          </div>
        </Modal>
      ) : null}
    </Calendar>
  );
}

export default Datepicker;

const Calendar = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

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

const BTN = styled.button`
  padding: 7px;
  border-radius: 10px;
  background-color: #fdc166;
  width: 150px;
  border: none;
  :hover{
    background-color: #ff9900;
    cursor: pointer;
  }
`

const Footer = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
`