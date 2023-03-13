import styles from "./Container.module.css";

import React, { useState, useEffect, Suspense } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { Type, ready, remove } from "../../store/slices/topicSlice";

import List from "./List";
import Creator from "./Creator";
import Updater from "./Updater";
import Content from "./Content";
import Button from "../../components/Button";

export default function Container() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { screen } = useSelector((state) => state.screen);
  const [width, setWidth] = useState("100px");
  const [fontSize, setFontSize] = useState("1rem");

  const { topics } = useSelector((state) => state.topics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ready());
  }, [dispatch]);

  useEffect(() => {
    console.log("topics", topics);
  }, [topics]);

  useEffect(() => {
    setWidth(screen.isMobile ? "48px" : "100px");
    setFontSize(screen.isMobile ? "0.5rem" : "1rem");
  }, [screen]);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  const handleClick = (e) => {
    console.log(e.target.name, topics.current);

    if (e.target.name === "back") {
      navigate(-1);
    } else if (e.target.name === "create") {
      navigate("/topics/create");
    } else if (e.target.name === "update") {
      topics.current && navigate(`/topics/update/?id=${topics.current}`);
    } else if (e.target.name === "remove") {
      topics.current && topics.current !== -1 && dispatch(remove(topics.current));

      navigate("/topics");
    }
  };

  return (
    <div className={styles.container}>
      <List />
      <div className={styles.content}>
        <div className={styles.menu}>
          <Button name="back" width={width} fontSize={fontSize} margin={"0 5px 0 0"} onClick={handleClick}>
            back
          </Button>
          {topics.current !== undefined && (
            <Button name="remove" width={width} fontSize={fontSize} margin={"0 5px 0 0"} onClick={handleClick}>
              remove
            </Button>
          )}
          {topics.current !== undefined && (
            <Button name="update" width={width} fontSize={fontSize} margin={"0 5px 0 0"} onClick={handleClick}>
              update
            </Button>
          )}
          {topics.mode === "read" && (
            <Button name="create" width={width} fontSize={fontSize} margin={"0 0 0 0"} onClick={handleClick}>
              create
            </Button>
          )}
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/*" element={<Content />}>
              <Route path=":title" element={<Content />} />
            </Route>
            <Route path="/create" element={<Creator title="Creator" />} />
            <Route path="/update" element={<Updater title="Updater" />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
