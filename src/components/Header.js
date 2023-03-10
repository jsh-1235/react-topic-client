import styles from "./Header.module.css";

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setURL } from "../store/slices/routerSlice";

import Linker from "./Linker";
import Menu from "./Menu";
import ImageButton from "./ImageButton";

import { AiOutlineLogin, AiOutlineMenu, AiOutlineCodeSandbox } from "react-icons/ai";

const urls = ["topics", "settings", "about"];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.router);
  const dispatch = useDispatch();

  useEffect(() => {
    const result = urls.filter((url) => location.pathname.includes(url));

    if (result.length) {
      dispatch(setURL({ path: location.pathname, title: result[0] }));
    } else {
      dispatch(setURL({ path: location.pathname, title: "home" }));
    }
  }, [dispatch, location.pathname]);

  return (
    <>
      <div className={styles.container}>
        <div>
          <ImageButton color={"white"} fontSize={"1.5rem"}>
            <AiOutlineMenu onClick={(e) => navigate("/")} />
          </ImageButton>
        </div>
        <div>
          <Linker url="/" size={1.5}>
            <AiOutlineCodeSandbox className={styles.icon} />
            {url.title}
          </Linker>
        </div>
        <div>
          <span>jsh</span>
          <ImageButton color={"white"} fontSize={"1.5rem"}>
            <AiOutlineLogin />
          </ImageButton>
        </div>
      </div>
      <Menu urls={urls} />
    </>
  );
}
