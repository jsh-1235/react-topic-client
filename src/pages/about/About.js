import styles from "./About.module.css";

import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "./logo.svg";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} alt="logo" />
    </div>
  );
};

export default About;
