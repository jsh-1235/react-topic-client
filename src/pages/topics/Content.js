import styles from "./Content.module.css";

import React, { useEffect } from "react";

import { useParams } from "react-router";

import { useSelector } from "react-redux";

export default function Content() {
  const { id } = useParams();

  useEffect(() => {
    console.log("id", id);
  }, [id]);

  const { topics } = useSelector((state) => {
    return state.topics;
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>{topics?.content?.title}</div>
      <div className={styles.description}>{topics?.content?.description}</div>
      <div className={styles.date}>{topics?.content?.date}</div>
    </div>
  );
}
