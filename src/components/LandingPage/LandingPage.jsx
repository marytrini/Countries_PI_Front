import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.contain}>
      <div className={style.central}>
        <span className={style.text}> Welcome on board!</span>
        <div className={style.links}>
          <Link to="/Home">
            <button className={style.buttonStart}>Start</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
