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
  handleUpdate: () => void;
  update: Boolean;
}

function DoneList({ getYear, getMonth, handleUpdate, update }: IProps) {
  const [dones, setdones] = useState<[]>([]);
  const [click, setClick] = useState<Boolean>(false);
  const [id, setId] = useState<Number>(0);

  const [postYear, setPostYear] = useState<Number>(0);
  const [postMonth, setPostMonth] = useState<Number>(0);
  const [postDate, setPostDate] = useState<Number>(0);
  const [title, setTitle] = useState<String>("");
  const [content, setContent] = useState<String>("");

  const [modal, setModal] = useState<Boolean>(false);

  const getDone = async () => {
    try {
      await axios
        .get(`http://localhost:4000/dones${getYear}${getMonth}`)
        .then((res) => {
          res.data.sort(function (a: any, b: any) {
            return a.postDate < b.postDate
              ? -1
              : a.postDate > b.postDate
              ? 1
              : 0;
          });
          setdones(res.data);
          setClick(false);
        });
    } catch (error) {
      if (error) {
        setdones([]);
      }
    }
  };

  const deleteDone = async () => {
    await axios
      .delete(`http://localhost:4000/dones${getYear}${getMonth}/${id}`)
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
          handleUpdate();
          Swal.fire({
            title: "취소 완료",
            timer: 1500,
            confirmButtonColor: "#ffc65d",
          });
        }
      });
  };

  const updateToTodo = () => {
    postToTodo();
    deleteDone();
    getDone();
  };

  useEffect(() => {
    getDone();
  }, [getMonth, id, update]);

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
              setId(id === done.id ? 0 : done.id);
              setClick(!click);
            }}
            key={done.id}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginTop: "25px" }}>
                {done.postYear}년 {done.postMonth}월 {done.postDate}일 할 일
              </div>
            </div>
            {done.id !== id ? (
              <>
                <Ellipsis
                  style={{
                    fontWeight: "bold",
                    wordBreak: "break-all",
                    fontSize: "30px",
                  }}
                >
                  {done.title}
                </Ellipsis>
                <Ellipsis
                  style={{
                    textDecoration: "line-through",
                    marginBottom: "30px",
                  }}
                >
                  {done.content}
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
                  {done.title}
                </div>
                <div
                  style={{
                    wordBreak: "break-all",
                    textDecoration: "line-through",
                  }}
                >
                  {done.content}
                </div>
                <div>
                  <BTN onClick={() => updateToTodo()}>다시하기</BTN>
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
          </DoneBody>
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
                deleteDone();
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
