import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Swal from "sweetalert2";

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
  const [id, setId] = useState<Number>(0);

  const [postYear, setPostYear] = useState<Number>(0);
  const [postMonth, setPostMonth] = useState<Number>(0);
  const [postDate, setPostDate] = useState<Number>(0);
  const [title, setTitle] = useState<String>("");
  const [content, setContent] = useState<String>("");

  const getDone = async () => {
    try {
      await axios
        .get(`http://localhost:4000/dones${getYear}${getMonth}`)
        .then((res) => {
          setdones(res.data);
          setClick(false);
        });
    } catch (error) {
      if (error) {
        setdones([]);
      }
    }
  };

  const deleteDone = async (e: any) => {
    const ID = e.target.value;
    await axios
      .delete(`http://localhost:4000/dones${getYear}${getMonth}/${ID}`)
      .then((res) => {
        getDone();
      });
  };

  const postToTodo = async () => {
    await axios
      .post(`http://localhost:4000/todos${postYear}${postMonth}`, {
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
            title: "취소 완료",
            timer: 1500,
            confirmButtonColor: "#ffc65d",
          });
        }
      });
  };

  const updateToTodo = (e: any) => {
    postToTodo();
    deleteDone(e);
    getDone();
  };

  useEffect(() => {
    getDone();
  }, [getMonth, id]);

  return (
    <Done>
      <p
        style={{
          display: "flex",
          margin: "20px auto",
          fontSize: "26px",
          fontWeight: "bold",
        }}
      >
        {getMonth}월 완료 목록
      </p>
      <div>
        {dones?.map((done: Idone) => (
          <DoneBody
            onClick={() => {
              setPostYear(done.postYear);
              setPostMonth(done.postMonth);
              setPostDate(done.postDate);
              setTitle(done.title);
              setContent(done.content);
              setId(id === 0 ? done.id : 0);
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
            {click === false && done.id !== id ? (
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
                  value={done.id}
                  onClick={(e) => updateToTodo(e)}
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
  height: 700px;
  display: flex;
  margin: auto 20px auto auto;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  border: solid 1px #ffb845;
  border-radius: 7px;
  padding: 5px;
`;

const DoneBody = styled.div`
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
  overflow: hidden;
  white-space: nowrap;
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
