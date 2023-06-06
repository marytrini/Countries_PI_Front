import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ flag, name, continent, id }) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.imgContainer}>
        <img src={flag} alt="Not available" />
      </div>
      <div className={style.textContainer}>
        <h3>{name}</h3>
        <h5>{continent}</h5>
      </div>
      <div className={style.linkContainer}>
        <Link to={`/countries/${id}`}>
          <button className={style.buttonDetail}>learn more</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
