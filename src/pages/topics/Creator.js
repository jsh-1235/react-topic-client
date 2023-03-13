import styles from "./Creator.module.css";

import { v4 as uuid } from "uuid";

import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { create } from "../../store/slices/topicSlice";

import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";

export default function Creator() {
  const navigate = useNavigate();

  const titleRef = useRef();
  const descriptionRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    titleRef.current.focus();

    const content = {
      id: uuid().slice(0, 8),
      title,
      description,
      date: new Date().toLocaleString(),
    };

    dispatch(create({ content }));

    navigate(`/topics/${content.id}`, {
      replace: false,
      state: {
        mode: "create",
        content,
      },
    });
  };

  return (
    <div className={styles.container}>
      <form action="/create" method="post" onSubmit={handleSubmit}>
        <Input ref={titleRef} className={styles.input} type="text" name="title" margin={"10px"} placeholder="title" required />
        <Textarea ref={descriptionRef} className={styles.textarea} name="description" margin={"10px"} placeholder="description"></Textarea>
        <Button name="create" margin={"10px"} type="submit">
          create
        </Button>
      </form>
    </div>
  );
}
