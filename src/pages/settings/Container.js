import styles from "./Container.module.css";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { saveAs } from "file-saver";

import { useSelector, useDispatch } from "react-redux";
import { load } from "../../store/slices/topicSlice";

import Content from "./Content";
import ImageButton from "../../components/ImageButton";
import Input from "../../components/Input";

import { AiOutlineArrowLeft, AiOutlineDownload, AiFillPrinter, AiOutlineSearch } from "react-icons/ai";

export default function Container() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const searchRef = useRef();
  const tableRef = useRef();

  const { screen } = useSelector((state) => state.screen);
  const [color] = useState("white");
  const [fontSize, setFontSize] = useState("1.75rem");

  const { topics } = useSelector((state) => state.topics);
  const [filtered, setFiltered] = useState(topics);

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
    let result = "";

    for (const header of ["ID", "Title", "Description", "Date"]) {
      result += header + ",";
    }

    result += "\n";

    contents.forEach((content) => {
      for (const key in content) {
        // if (key === "id") continue;
        result += content[key] + ",";
      }

      result += "\n";
    });

    console.log(result);

    const blob = new Blob(["\uFEFF" + result], { type: "text/csv; charset=utf-8" });

    saveAs(blob, `topics_${new Date().toLocaleString()}.csv`);
  };

  const print = () => {
    const popup = window.open("", "print", "popup");

    const style = `
      body {
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 0px 0px;
        align-content: stretch;
        justify-content: stretch;
        align-items: stretch;
        justify-items: stretch;
        align-self: stretch;
        justify-self: stretch;
        height: inherit;
        overflow: auto;
        padding: 10px;
      }

      table {
        border: 1px solid #000;
        border-collapse: collapse;
        border-spacing: 0;
      }

      th, td {
        border: 0.5px solid #000;
      }

      th {
        font-size: 1rem;
        text-transform: uppercase;
        padding: 10px;
      }

      td {
        font-size: 0.9rem;
        text-align: center;
        padding: 10px;
      }
    `;

    popup.document.write("<title>Topics</title>");
    popup.document.write(`<style>${style}</style>`);

    console.log(tableRef.current);

    popup.document.writeln(tableRef.current.innerHTML);

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
      print();
    }
  };

  const handleSearch = (e) => {
    console.log(e.target.value);

    setFiltered((prev) => {
      return { ...topics, contents: topics.contents.filter((content) => content.title === e.target.value) };
    });
  };

  return (
    <div className={styles.container}>
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
          <Input ref={searchRef} className={styles.input} type="text" name="title" padding={"4px"} placeholder="search" onChange={handleSearch} />
          <ImageButton name="search" color={color} fontSize={fontSize} onClick={handleClick.bind(this, "search")}>
            <AiOutlineSearch />
          </ImageButton>
        </div>
      </div>
      <Content topics={filtered} ref={tableRef} />
    </div>
  );
}
