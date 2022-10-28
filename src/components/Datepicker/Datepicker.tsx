import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { format, isSameMonth } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import DatepickerCss from "../Datepicker/DatepickerCss";
import { ko } from "date-fns/locale";

interface IDate {
  gettodoCallback: (day: Date) => void;
}

function Datepicker({ gettodoCallback }: IDate) {
  const today = new Date();
  const [month, setMonth] = useState<Date>(today);
  const [selected, setSelected] = useState<Date>();

  const [modal, setModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const postYear =
    selected !== undefined ? selected?.getFullYear() : today.getFullYear();
  const postMonth =
    selected !== undefined ? selected?.getMonth() + 1 : today.getMonth() + 1;
  const postDate =
    selected !== undefined ? selected?.getDate() : today.getDate();

  useEffect(() => {
    gettodoCallback(month);
  }, [month]);

  let footer = (
    <Footer>
      날짜를 선택해주세요
      <BTN
        style={{ marginTop: "5px" }}
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
          style={{ marginTop: "5px" }}
          disabled={isSameMonth(today, month)}
          onClick={() => setMonth(today)}
        >
          이번 달로 가기
        </BTN>
      </Footer>
    );
  }

  const postTodo = async () => {
    await axios
      .post(`http://localhost:4000/todos${postYear}${postMonth}`, {
        postYear,
        postMonth,
        postDate,
        title,
        content,
      })
      .then((res) => {
        res.statusText === "Created" ? alert("작성 완료") : alert("작성 실패");
      });
  };

  const submitHandle = (e: React.FormEvent) => {
    if (title !== "" && content !== "") {
      setModal(false);
      postTodo();
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
      />
      {modal ? (
        <Modal
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            submitHandle(e);
          }}
        >
          <p>
            {postYear}년 {postMonth}월 {postDate}일 할일
          </p>
          <input
            placeholder="제목"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <textarea
            style={{ height: "300px", overflowX: "scroll" }}
            placeholder="내용"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
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
              취소하기
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
`;

const Modal = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-weight: bolder;
    font-size: 36px;
  }

  input {
    padding: 7px;
    border-radius: 6px;
    border: solid 3px #fdc166;
    margin-bottom: 10px;
    margin-top: 30px;
    width: 50%;
  }

  textArea {
    padding: 7px;
    border-radius: 6px;
    border: solid 3px #fdc166;
    margin-bottom: 10px;
    margin-top: 30px;
    width: 50%;
  }
`;

const BTN = styled.button`
  padding: 7px;
  border-radius: 10px;
  background-color: #fdc166;
  width: 150px;
  border: none;
  margin: 20px;
  font-weight: bold;
  :hover {
    background-color: #ff9900;
    cursor: pointer;
  }
`;

const Footer = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
