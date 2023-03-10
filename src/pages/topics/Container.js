import styles from "./Container.module.css";

import React, { useState, useEffect, Suspense } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { ready, remove } from "../../store/slices/topicSlice";

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

  const { topics } = useSelector((state) => state.topics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ready());
  }, [dispatch]);

  useEffect(() => {
    // console.log(topics);
  }, [topics]);

  useEffect(() => {
    setWidth(screen.isMobile ? "64px" : "100px");
  }, [screen]);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  const handleClick = (e) => {
    // console.log(e.target.name, topics.current);

    if (e.target.name === "back") {
      navigate(-1);
    } else if (e.target.name === "create") {
      navigate("/topics/create");
    } else if (e.target.name === "update") {
      navigate(`/topics/update/?id=${topics.current}`);
    } else if (e.target.name === "remove") {
      if (topics.current !== -1) dispatch(remove(topics.current));
    }
  };

  return (
    <div className={styles.container}>
      <List />
      <div className={styles.menu}>
        <Button name="back" width={width} margin={"0 1px 0 0"} onClick={handleClick}>
          back
        </Button>
        <Button name="remove" width={width} margin={"0 1px 0 0"} onClick={handleClick}>
          remove
        </Button>
        <Button name="update" width={width} margin={"0 0 0 0"} onClick={handleClick}>
          update
        </Button>
        <Button name="create" width={width} margin={"0 0 0 0"} onClick={handleClick}>
          create
        </Button>
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
  );
}
