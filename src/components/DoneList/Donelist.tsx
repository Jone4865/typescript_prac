import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

interface Idone {
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

function DoneList({ getYear, getMonth }: IProps) {
  const [dones, setdones] = useState<[]>([]);
  const [click, setClick] = useState<Boolean>(false);

  const getDone = async () => {
    await axios
      .get(`http://localhost:4000/dones${getYear}${getMonth}`)
      .then((res) => {
        setdones(res.data);
        setClick(false);
      });
  };

  const deleteDone = async (e: any) => {
    const ID = e.target.value;
    await axios
      .delete(`http://localhost:4000/dones${getYear}${getMonth}/${ID}`)
      .then((res) => {
        getDone();
      });
  };

  useEffect(() => {
    getDone();
  }, [getMonth]);

  return (
    <Done>
      <p style={{display:"flex", margin:"20px auto", fontSize:"26px", fontWeight:"bold"}}>{getMonth}월 완료 목록</p>
      <div>
        {dones?.map((done: Idone) => (
          <DoneBody
            onClick={() => {
              setClick(!click);
            }}
            key={done.id}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginTop: "25px" }}>
                {done.postYear}년 {done.postMonth}월 {done.postDate}일 할 일
              </div>
              <BTN
                value={done.id}
                style={{ backgroundColor: "#f98181", color: "white" }}
                onClick={(e) => {
                  deleteDone(e);
                }}
              >
                삭제하기
              </BTN>
            </div>
            {click === false ? (
              <>
                <Ellipsis style={{ fontWeight: "bold" }}>{done.title}</Ellipsis>
                <Ellipsis>{done.content}</Ellipsis>
              </>
            ) : (
              <>
                <div style={{ fontWeight: "bold", wordBreak: "break-all" }}>
                  {done.title}
                </div>
                <div style={{ wordBreak: "break-all" }}>{done.content}</div>
                <BTN
                  style={{
                    display: "flex",
                    margin: "25px auto auto auto",
                    justifyContent: "center",
                  }}
                >
                  취소하기
                </BTN>
              </>
            )}
          </DoneBody>
        ))}
      </div>
    </Done>
  );
}

export default DoneList;

const Done = styled.div`
  width: 33%;
  height: 750px;
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow-y: scroll;
`;

const DoneBody = styled.div`
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
