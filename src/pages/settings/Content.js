import styles from "./Content.module.css";

import React, { useState, useEffect, forwardRef } from "react";

import { useParams } from "react-router";

import { useSelector } from "react-redux";

import { AiFillPlusCircle } from "react-icons/ai";

import ImageButton from "../../components/ImageButton";

function Content({ topics }, ref) {
  const { id } = useParams();

  const { screen } = useSelector((state) => state.screen);

  const [fontSize, setFontSize] = useState("1.5rem");

  useEffect(() => {
    console.log("id", id);
  }, [id]);

  useEffect(() => {
    setFontSize(screen.isMobile ? "1rem" : "1.5rem");
  }, [screen]);

  // const { topics } = useSelector((state) => {
  //   return state.topics;
  // });

  const html = topics?.contents?.map((content) => {
    return (
      <tr key={content.id}>
        <td>{content.title}</td>
        <td>{content.description}</td>
        <td>{content.date}</td>
        <td>
          <ImageButton name="create">
            <AiFillPlusCircle color={"white"} fontSize={fontSize} />
          </ImageButton>
        </td>
      </tr>
    );
  });

  console.log(html);

  return (
    <div ref={ref} className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>{html}</tbody>
      </table>
    </div>
  );
}

export default forwardRef(Content);
