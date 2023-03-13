import styles from "./Container.module.css";

import React, { useState, useEffect, Suspense } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { load, remove } from "../../store/slices/topicSlice";

import List from "./List";
import Creator from "./Creator";
import Updater from "./Updater";
import Content from "./Content";
import ImageButton from "../../components/ImageButton";

import { AiOutlineArrowLeft, AiFillPlusCircle, AiFillMinusCircle, AiFillEdit } from "react-icons/ai";

export default function Container() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { screen } = useSelector((state) => state.screen);
  const [color, setColor] = useState("red");
  const [fontSize, setFontSize] = useState("1rem");

  const { topics } = useSelector((state) => state.topics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load());
  }, [dispatch]);

  useEffect(() => {
    console.log("topics", topics);
  }, [topics]);

  useEffect(() => {
    setFontSize(screen.isMobile ? "1.5rem" : "2rem");
    setColor(screen.isMobile ? getComputedStyle(document.documentElement).getPropertyValue("--theme-component-color") : "white");
  }, [screen]);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  const handleClick = (name, e) => {
    console.log(name, e.target.parentElement, topics.current);

    if (name === "back") {
      navigate(-1);
    } else if (name === "create") {
      navigate("/topics/create");
    } else if (name === "update") {
      topics.current && navigate(`/topics/update/?id=${topics.current}`);
    } else if (name === "remove") {
      topics.current && topics.current !== -1 && dispatch(remove(topics.current));

      navigate("/topics");
    }
  };

  return (
    <div className={styles.container}>
      <List />
      <div className={styles.content}>
        <div className={styles.menu}>
          <ImageButton name="back" color={color} fontSize={fontSize} onClick={handleClick.bind(this, "back")}>
            <AiOutlineArrowLeft />
          </ImageButton>
          {topics.mode === "read" && (
            <ImageButton name="create" color={color} fontSize={fontSize} onClick={handleClick.bind(this, "create")}>
              <AiFillPlusCircle />
            </ImageButton>
          )}
          {topics.current !== undefined && (
            <ImageButton name="update" color={color} fontSize={fontSize} onClick={handleClick.bind(this, "update")}>
              <AiFillEdit />
            </ImageButton>
          )}
          {topics.current !== undefined && (
            <ImageButton name="remove" color={color} fontSize={fontSize} onClick={handleClick.bind(this, "remove")}>
              <AiFillMinusCircle />
            </ImageButton>
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
