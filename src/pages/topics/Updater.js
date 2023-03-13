import styles from "./Updater.module.css";

import React, { useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { update } from "../../store/slices/topicSlice";

import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";

export default function Updater() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const titleRef = useRef();
  const descriptionRef = useRef();

  const dispatch = useDispatch();

  const { topics } = useSelector((state) => state.topics);

  useEffect(() => {
    titleRef.current.focus();

    const id = searchParams.get("id");

    const content = topics.contents.find((content) => content.id === id);

    titleRef.current.value = content.title;
    descriptionRef.current.value = content.description;

    console.log();
  }, [searchParams, topics.contents]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    titleRef.current.focus();

    const id = searchParams.get("id");

    const content = {
      id,
      title,
      description,
      date: new Date().toLocaleString(),
    };

    dispatch(update({ content }));

    navigate(`/topics/${content.id}`, {
      replace: false,
      state: {
        mode: "update",
        content,
      },
    });
  };

  return (
    <div className={styles.container}>
      <form action="/update" method="post" onSubmit={handleSubmit}>
        <Input ref={titleRef} className={styles.input} type="text" name="title" margin={"10px"} placeholder="title" required />
        <Textarea ref={descriptionRef} className={styles.textarea} name="description" margin={"10px"} placeholder="description"></Textarea>
        <Button name="create" margin={"10px"} type="submit">
          create
        </Button>
      </form>
    </div>
  );
}
