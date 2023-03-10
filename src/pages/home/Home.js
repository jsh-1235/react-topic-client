import styles from "./Home.module.css";

import React from "react";

import { AiFillQuestionCircle } from "react-icons/ai";

export default function Home() {
  return (
    <div className={styles.container}>
      <AiFillQuestionCircle className="image-button" size="64" />
    </div>
  );
}
