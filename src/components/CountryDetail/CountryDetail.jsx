import { React, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteActivity } from "../../actions";
import style from "./CountryDetail.module.css";

const CountryDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const country = useSelector((state) => state.detail);

  const handleDeleteActivity = (activityId) => {
    console.log(activityId);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (confirmDelete) {
      dispatch(deleteActivity(activityId));
    }
  };

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);
  return (
    <div className={style.generalContainer}>
      <div className={style.moreInfo}>
        <h2>Detailed information</h2>
      </div>
      <div className={style.linkDiv}>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
      <div className={style.detailContainer}>
        <div className={style.countryDiv}>
          {country ? (
            <div className={style.countryCard}>
              <div className={style.image}>
                <img src={country.flag} alt="Unable to load"></img>
              </div>
              <div className={style.text}>
                <h2>{country.name}</h2>
                <h4>{country.continent}</h4>
                <h4>{country.id}</h4>
                <h4>Capital : {country.capital}</h4>
                <h4>Sub region : {country.subregion}</h4>
                <h4>Area : {country.area} km2</h4>
                <h4>Population : {country.population} hab</h4>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className={style.activityDiv}>
          <h3>Activities to do in this country</h3>
          {country.Activities && country.Activities.length ? (
            country.Activities.map((activity) => {
              return (
                <div className={style.insideAct} key={activity.id}>
                  <h4>{activity.name}</h4>
                  <p>Difficulty : {activity.difficulty}</p>
                  <p>Duration : {activity.duration}</p>
                  <p>Season : {activity.season}</p>
                  <button
                    className={style.deleteAct}
                    onClick={() => handleDeleteActivity(activity.id)}
                  >
                    Delete
                  </button>
                  <Link to={"/activity"}>
                    <button className={style.editAct}>Edit</button>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>No activities for this country</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
