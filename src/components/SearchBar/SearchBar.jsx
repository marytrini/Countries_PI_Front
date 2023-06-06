import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCountries, getCountryByName } from "../../actions";
import style from "./SearchBar.module.css";

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleInputChange = (event) => {
    dispatch(getCountryByName(event));
    setCurrentPage(1);
  };

  return (
    <div className={style.grandContain}>
      <div className={style.searchContainer}>
        <div className={style.search}>
          <div className={style.searchTitle}>Find your next destination</div>
          <input
            className={style.searchInput}
            type="text"
            value={name}
            placeholder="What country would you like to visit?"
            onChange={(event) => {
              setName(event.target.value);
              handleInputChange(event.target.value);
            }}
          ></input>
        </div>
        <div className={style.activityContainer}>
          <Link to="/activity">
            <button className={style.buttonAct}>Create Activity</button>
          </Link>
        </div>
        <div className={style.backLanding}>
          <Link to="/">
            <button className={style.landing}>Landing</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
