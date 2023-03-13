import styles from "./List.module.css";
import classnames from "classnames";

import React, { useEffect, useMemo, useCallback, useRef } from "react";

import { Link, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { Type, read } from "../../store/slices/topicSlice";

export default function List() {
  const location = useLocation();

  const { screen } = useSelector((state) => state.screen);
  const { topics } = useSelector((state) => state.topics);

  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.split("/").length !== 0) {
      const pathname = location.pathname.split("/")[2];

      console.log("location", location.pathname, pathname);

      if (pathname) {
        const content = topics.contents.find((content) => content.id === pathname);

        if (content) {
          dispatch(read({ mode: Type.READ, id: pathname, content }));
        } else {
          dispatch(read({ mode: pathname }));
        }
      } else {
        dispatch(read({ mode: Type.READ }));
      }
    }
  }, [dispatch, location, topics.contents]);

  const ref = useRef();

  useEffect(() => {
    // ref.current.style.width = screen.extended ? "0px" : "auto";

    console.log(screen.extended);
  }, [screen]);

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
    <ul ref={ref} className={classnames(styles.container, { [styles.extended]: screen.extended })}>
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
