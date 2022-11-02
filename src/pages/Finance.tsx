import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { format, isSameMonth } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import DatepickerCss from "../components/Datepicker/DatepickerCss";
import { ko } from "date-fns/locale";

import FinanceBody from "../components/FinanceBody/FinanceBody";

function Finance() {
  const navigate = useNavigate();

  const today = new Date();

  const [month, setMonth] = useState<Date>(today);
  const [selected, setSelected] = useState<Date>();

  const postYear = today.getFullYear();
  const postMonth = today.getMonth() + 1;
  const postDate =
    selected === undefined ? today.getDate() : selected.getDate();

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
  return (
    <div>
      <Head>One's Finance</Head>
      <BTN
        onClick={() => {
          navigate("/");
        }}
      >
        메인으로
      </BTN>
      <Body>
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
        <FinanceBody
          postYear={postYear}
          postMonth={postMonth}
          postDate={postDate}
        ></FinanceBody>
      </Body>
    </div>
  );
}

export default Finance;

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
  height: 670px;
  width: 100%;
  margin: auto;
`;

const BTN = styled.button`
  padding: 7px;
  border-radius: 10px;
  background-color: #fdc166;
  width: 150px;
  border: none;
  margin: 10px auto;
  font-weight: bold;
  display: flex;
  justify-content: center;
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
