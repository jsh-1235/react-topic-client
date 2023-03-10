import styles from "./App.module.css";

import React, { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "./store/slices/screenSlice";

import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";

const Home = React.lazy(() => import("./pages/home/Home"));
const Topics = React.lazy(() => import("./pages/topics/Container"));
const About = React.lazy(() => import("./pages/about/About"));
const NotFound = React.lazy(() => import("./pages/error/NotFound"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.matchMedia("(max-width: 720px)").addEventListener("change", (e) => {
      dispatch(
        setScreen({
          isMobile: e.matches,
        })
      );
    });

    return () => {};
  }, [dispatch]);

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <Header />
        </header>
        <main className={styles.main}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home title="HOME" />} />
              <Route path="/topics/*" element={<Topics pathname="/topics" />}>
                <Route path=":id" element={<Topics />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/none" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <footer className={styles.footer}>It is ©2018 Created by BT Inc</footer>
      </div>
    </>
  );
}

export default App;
