import styles from "./Container.module.css";

import React, { useState, useEffect, Suspense } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import { saveAs } from "file-saver";

import { useSelector, useDispatch } from "react-redux";
import { load, remove, clear } from "../../store/slices/topicSlice";

import List from "./List";
import Creator from "./Creator";
import Updater from "./Updater";
import Content from "./Content";
import ImageButton from "../../components/ImageButton";

import { AiOutlineArrowLeft, AiFillPlusCircle, AiFillMinusCircle, AiFillEdit, AiOutlineDownload, AiFillPrinter } from "react-icons/ai";

export default function Container() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { screen } = useSelector((state) => state.screen);
  const [color] = useState("white");
  const [fontSize, setFontSize] = useState("1.75rem");

  const { topics } = useSelector((state) => state.topics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load());
  }, [dispatch]);

  useEffect(() => {
    console.log("topics", topics);
  }, [topics]);

  useEffect(() => {
    setFontSize(screen.isMobile ? "1.5rem" : "1.75rem");
  }, [screen]);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  const download = (contents) => {
    const blob = new Blob([JSON.stringify(contents)], { type: "text/plain; charset=utf-8" });

    saveAs(blob, `topics_${new Date().toLocaleString()}.json`);
  };

  const print = (contents) => {
    const popup = window.open("", "print", "popup");

    popup.document.write("<title>Topics</title>");

    popup.document.writeln(`<pre>${JSON.stringify(topics.contents, null, 2)}</pre>`);

    popup.document.close();

    popup.focus();

    popup.print();

    popup.close();
  };

  const handleClick = (name, e) => {
    console.log(name, e.target.parentElement, topics.current);

    if (name === "back") {
      navigate(-1);
    } else if (name === "download") {
      download(topics.contents);
    } else if (name === "print") {
      print(topics.contents);
    } else if (name === "create") {
      navigate("/topics/create");
    } else if (name === "update") {
      topics.current && navigate(`/topics/update/?id=${topics.current}`);
    } else if (name === "remove") {
      topics.current && topics.current !== -1 && dispatch(remove(topics.current));

      navigate("/topics");
    } else if (name === "clear") {
      dispatch(clear());
      navigate("/topics");
    }
  };

  return (
    <div className={styles.container}>
      <List />
      <div className={styles.content}>
        <div className={styles.menu}>
          <div>
            <ImageButton name="back" color={color} fontSize={fontSize} onClick={handleClick.bind(this, "back")}>
              <AiOutlineArrowLeft />
            </ImageButton>
            <ImageButton name="download" color={color} fontSize={fontSize} onClick={handleClick.bind(this, "download")}>
              <AiOutlineDownload />
            </ImageButton>
            <ImageButton name="print" color={color} fontSize={fontSize} onClick={handleClick.bind(this, "print")}>
              <AiFillPrinter />
            </ImageButton>
          </div>
          <div>
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
