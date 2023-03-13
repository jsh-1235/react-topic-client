import styles from "./Header.module.css";

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setURL } from "../store/slices/routerSlice";
import { setExtend } from "../store/slices/screenSlice";

import Linker from "./Linker";
import Menu from "./Menu";
import IconButton from "./IconButton";

import { AiOutlineLogin, AiOutlineMenu, AiFillCaretDown } from "react-icons/ai";

const urls = ["topics", "settings", "about"];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.router);
  const { screen } = useSelector((state) => state.screen);

  const dispatch = useDispatch();

  useEffect(() => {
    const result = urls.filter((url) => location.pathname.includes(url));

    if (result.length) {
      dispatch(setURL({ path: location.pathname, title: result[0] }));
    } else {
      dispatch(setURL({ path: location.pathname, title: "home" }));
    }
  }, [dispatch, location.pathname]);

  const handleExtend = (e) => {
    // navigate("/");

    dispatch(setExtend({ ...screen, extended: !screen.extended }));

    console.log(screen);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <IconButton color={"white"} fontSize={"1.5rem"}>
            {!screen.extended ? <AiOutlineMenu onClick={(e) => handleExtend()} /> : <AiFillCaretDown onClick={(e) => handleExtend()} />}
          </IconButton>
        </div>
        <div>
          <Linker url="/" size={1.5}>
            {/* <AiOutlineCodeSandbox className={styles.icon} /> */}
            {url.title}
          </Linker>
        </div>
        <div>
          <span>jsh</span>
          <IconButton color={"white"} fontSize={"1.5rem"}>
            <AiOutlineLogin />
          </IconButton>
        </div>
      </div>
      <Menu urls={urls} />
    </>
  );
}
