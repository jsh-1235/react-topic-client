import styles from "./NotFound.module.css";

import React from "react";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.message}>404 Not Found</div>
        <Link className={styles.button} to="/">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
