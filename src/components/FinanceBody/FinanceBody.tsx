import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Swal from "sweetalert2";

interface IProps {
  postYear: ReactNode;
  postMonth: ReactNode;
  postDate: ReactNode;
}

interface IMoney {
  money: ReactNode,
  id: any
}

function FinanceBody({ postYear, postMonth, postDate }: IProps) {
  const [postStart, setPostStart] = useState(0);
  const [start, setStart] = useState(0);
  const [money, setMoney] = useState([]);

  const postStartAxios = async () => {
    await axios
      .post(`http://localhost:4000/financestart${postYear}${postMonth}`, {
        start: postStart,
      })
      .then((res) => {
        if (res.statusText === "Created") {
          getStart();
          Swal.fire({
            title: "초기자금 설정 완료!",
            timer: 1500,
            confirmButtonColor: "#ffc65d",
          });
        } else {
          Swal.fire({
            title: "실패했습니다.",
            timer: 1500,
            confirmButtonColor: "#ffc65d",
          });
        }
      });
  };

  const postMoney = async () => {
    await axios
      .post(`http://localhost:4000/finance${postYear}${postMonth}`, {
        money: postStart,
      })
      .then((res) => {
        if (res.statusText === "Created") {
          getMoney();
          Swal.fire({
            title: "내역 추가 완료!",
            timer: 1500,
            confirmButtonColor: "#ffc65d",
          });
        } else {
          Swal.fire({
            title: "실패했습니다.",
            timer: 1500,
            confirmButtonColor: "#ffc65d",
          });
        }
      });
  };

  const getStart = async () => {
    await axios
      .get(`http://localhost:4000/financestart${postYear}${postMonth}`)
      .then((res) => {
        setStart(res.data[res.data.length - 1].start);
      });
  };

  const getMoney = async () => {
    await axios
      .get(`http://localhost:4000/finance${postYear}${postMonth}`)
      .then((res) => {
        setMoney(res.data);
      });
  };

  useEffect(() => {
    getStart();
    getMoney();
  }, []);

  return (
    <Body>
      <div style={{ margin: "10px auto" }}>
        {postYear}년 {postMonth}월 {postDate}일 <span>가계부 작성하기</span>
      </div>
      <input
        type="number"
        value={postStart}
        onChange={(e) => {
          setPostStart(+e.target.value);
        }}
      ></input>
      <div style={{ display: "flex", margin: "auto" }}>
        <button
          onClick={() => {
            postMoney();
          }}
        >
          내역 추가하기
        </button>
        <button
          onClick={() => {
            postStartAxios();
          }}
        >
          초기자금으로 설정하기
        </button>
      </div>
      <GetFinance>
        <div style={{ textAlign: "center", fontWeight: "bold" }}>
          초기자금 {start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </div>
        {money.map((m:IMoney)=>(
          <div key={m.id}>{m.money}</div>
        ))}
      </GetFinance>
    </Body>
  );
}

export default FinanceBody;

const Body = styled.div`
  width: 450px;
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

  button {
    padding: 7px;
    border-radius: 10px;
    background-color: #fdc166;
    width: 180px;
    border: none;
    margin: 20px 10px;
    font-weight: bold;
    :hover {
      background-color: #ff9900;
      cursor: pointer;
    }
  }

  input {
    padding: 7px;
    border-radius: 6px;
    border: solid 3px #fdc166;
    margin-bottom: 10px;
    margin-top: 30px;
    width: 95%;
    text-align: center;
  }
`;

const GetFinance = styled.div`
  border: solid 1px #fdc166;
  height: 90%;
`;
