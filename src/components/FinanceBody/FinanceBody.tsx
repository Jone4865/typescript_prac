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
  money: ReactNode;
  id: any;
  postYear: Number;
  postMonth: Number;
  postDate: Number;
  text: string;
}

function FinanceBody({ postYear, postMonth, postDate }: IProps) {
  const [postStart, setPostStart] = useState(0);
  const [start, setStart] = useState(0);
  const [money, setMoney] = useState([]);
  const [text, setText] = useState<string>("");

  const now = money.reduce((prev, cur: any) => {
    return (prev += cur.money);
  }, 0);

  const postStartAxios = async () => {
    await axios
      .post(`http://localhost:4000/financestart${postYear}${postMonth}`, {
        start: postStart,
      })
      .then((res) => {
        if (res.statusText === "Created") {
          getStart();
          setPostStart(0);
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
        postYear,
        postMonth,
        postDate,
        text,
      })
      .then((res) => {
        if (res.statusText === "Created") {
          getMoney();
          setText("");
          setPostStart(0);
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
    try {
      await axios
        .get(`http://localhost:4000/financestart${postYear}${postMonth}`)
        .then((res) => {
          setStart(res.data[res.data.length - 1].start);
        });
    } catch (error) {
      setStart(0);
    }
  };

  const getMoney = async () => {
    await axios
      .get(`http://localhost:4000/finance${postYear}${postMonth}`)
      .then((res) => {
        const Data = res.data.reverse();
        setMoney(Data);
      });
  };
  const deleteFinance = async (e: any) => {
    await axios
      .delete(
        `http://localhost:4000/finance${postYear}${postMonth}/${e.target.value}`
      )
      .then(() => {
        getMoney();
      });
  };

  useEffect(() => {
    getStart();
    getMoney();
  }, [postYear, postMonth, postDate]);

  return (
    <Body>
      <div
        style={{ margin: "10px auto", fontWeight: "bold", fontSize: "30px" }}
      >
        {postMonth}월 가계부
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          fontWeight: "bold",
        }}
      >
        <div>사용처</div>
        <div style={{ marginRight: "20px" }}>금액</div>
      </div>
      <div style={{ display: "flex" }}>
        <input
          value={text !== undefined ? text : undefined}
          placeholder="40글자까지 작성 가능합니다."
          maxLength={39}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <input
          type="number"
          value={postStart === 0 ? "" : postStart}
          placeholder="초기자금 혹은 사용금액을 입력해주세요."
          onChange={(e) => {
            setPostStart(+e.target.value);
          }}
        />
      </div>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontWeight: "bold",
          }}
        >
          <div>
            초기자금 : {start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </div>
          <div>
            총 사용금액 : {now.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </div>
          <div style={{ color: "red" }}>
            잔액 :{" "}
            {(start - now).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
          </div>
        </div>
        <Scroll>
          {money.map((m: IMoney) => (
            <ListBody
              key={m.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>{+m.postDate}일</div>
              <div style={{ width: "300px", overflow: "hidden" }}>{m.text}</div>
              <div>
                {m.money !== null && m.money !== undefined
                  ? m.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : null}
                원
              </div>
              <button
                style={{ color: "red", width: "100px" }}
                value={m.id}
                onClick={(e) => {
                  deleteFinance(e);
                }}
              >
                삭제하기
              </button>
            </ListBody>
          ))}
        </Scroll>
      </GetFinance>
    </Body>
  );
}

export default FinanceBody;

const Body = styled.div`
  width: 800px;
  min-width: 600px;
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
    margin: 3px 5px 10px 5px;
    width: 95%;
    text-align: center;
  }
`;

const GetFinance = styled.div`
  border: solid 1px #fdc166;
  height: 90%;
`;

const ListBody = styled.div`
  border: solid 1px #fdc166;
  border-radius: 7px;
  margin: 3px 5px;
  font-weight: bold;
  div {
    margin: auto auto auto 10px;
  }
`;

const Scroll = styled.div`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
