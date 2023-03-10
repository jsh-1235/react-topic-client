import styles from "./List.module.css";

import React, { useEffect, useMemo, useCallback } from "react";

import { Link, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { read } from "../../store/slices/topicSlice";

export default function List() {
  const location = useLocation();

  const { topics } = useSelector((state) => state.topics);

  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.split("/").length !== 0) {
      const id = location.pathname.split("/")[2];

      console.log("location", location.pathname, id);

      dispatch(read({ id, content: topics.contents.find((content) => content.id === id) }));
    }
  }, [dispatch, location, topics.contents]);

  const color = useMemo(() => {
    return getComputedStyle(document.documentElement).getPropertyValue("--theme-component-selected");
  }, []);

  const include = useCallback(
    (id) => {
      if (location.pathname.split("/").lastIndexOf(id) !== -1) {
        return color;
      } else {
        return null;
      }
    },
    [color, location.pathname]
  );

  return (
    <ul className={styles.container}>
      {topics?.contents?.map((content) => {
        return (
          <li key={content.id} id={content.id} to={`${content.id}`}>
            <Link to={`${content.id}`} style={{ backgroundColor: include(content.id) }}>
              {content.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
