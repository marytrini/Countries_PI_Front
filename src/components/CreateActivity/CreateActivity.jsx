import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, createActivity } from "../../actions";
import axios from "axios";
import validate from "./validation.js";
import style from "./CreateActivity.module.css";

const CreateActivity = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const history = useNavigate();

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleClick = (event) => {
    event.preventDefault();
    history.pushState("/home");
  };
  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };
  const handleSelect = (event) => {
    setInput((estado) => {
      if (event.target.name === "countries") {
        if (!input.countries.includes(event.target.value)) {
          return {
            ...estado,
            countries: [...estado.countries, event.target.value],
          };
        } else {
          alert("Can't add a country twice");
          return {
            ...estado,
            countries: [...estado.countries],
          };
        }
      } else {
        return {
          ...estado,
          [event.target.name]: event.target.value,
        };
      }
    });
  };
  const handleDelete = (event) => {
    setInput({
      ...input,
      countries: input.countries.filter((el) => el !== event),
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !input.name ||
      !input.difficulty ||
      !input.duration ||
      !input.season ||
      !input.countries
    ) {
      return alert("Please complete the form before submitting it");
    }

    try {
      const allActivities = await axios.get(
        "https://medconnectback-production.up.railway.app/activity"
      );
      const activityExist = allActivities.data.some(
        (activity) => activity.name === input.name
      );

      if (activityExist) {
        return alert("An activity with that name already exists");
      }

      dispatch(createActivity(input));
      alert("Activity created");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
      });
      history("/home");
    } catch (error) {
      console.log(error);
      alert("There was an error creating the activity");
    }
  };

  return (
    <div className={style.containAll}>
      <div className={style.divLink}>
        <Link to="/home">
          <button className={style.buttonHome} onChange={handleClick}>
            Home
          </button>
        </Link>
      </div>
      <div className={style.addActivity}>
        <h2>Add one activity</h2>
        <form className={style.formAct} onSubmit={handleSubmit}>
          <div className={style.activityName}>
            <label>Name: </label>
            <input
              className={style.inputAct}
              type="text"
              placeholder="write a name"
              value={input.name}
              name="name"
              onChange={handleInputChange}
            ></input>
            {errors.name && <p>{errors.name} </p>}
          </div>
          <div className={style.activityCountry}>
            <label>Country</label>
            <select
              className={style.selectCountry}
              name="countries"
              id="countries"
              onChange={handleSelect}
            >
              <option value="" disabled>
                Select a country...
              </option>
              {countries
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((el) => (
                  <option value={el.name}>{el.name}</option>
                ))}
            </select>
            {errors.countries && <p>{errors.countries}</p>}
          </div>
          <div className={style.activitySeason}>
            <label>Season</label>
            <select
              className={style.selectSeason}
              name="season"
              id="season"
              placeholder="Select a season..."
              value={input.season}
              onChange={handleSelect}
            >
              <option value={"Select"}>Select</option>
              <option value={"Summer"}>Summer</option>
              <option value={"Autumm"}>Autumm</option>
              <option value={"Winter"}>Winter</option>
              <option value={"Spring"}>Spring</option>
            </select>
            {errors.season && <p>{errors.season}</p>}
          </div>
          <div className={style.activityDiff}>
            <label>Difficulty: </label>
            <input
              className={style.inputDiff}
              type="number"
              value={input.difficulty}
              name="difficulty"
              placeholder="Select difficulty..."
              onChange={handleInputChange}
            ></input>
            {errors.difficulty && <p>{errors.difficulty}</p>}
          </div>
          <div className={style.activityDuration}>
            <label>Duration: </label>
            <input
              className={style.durationInput}
              type="number"
              value={input.duration}
              name="duration"
              placeholder="Select duration..."
              onChange={handleInputChange}
            ></input>
            <label>Hours</label>
            {errors.duration && <p>{errors.duration} </p>}
          </div>
          <div className={style.buttonDiv}>
            <button className={style.buttonSubmit} type="submit">
              Add activity
            </button>
          </div>
        </form>
        {input.countries.map((ele) => (
          <div className={style.countryRender}>
            <p>
              <img
                src={countries.find((country) => country.name === ele).flag}
                alt="Not found!"
              ></img>
              <hr></hr>
              {ele}
            </p>
            <hr></hr>
            <button
              className={style.buttonDelete}
              onClick={() => handleDelete(ele)}
            >
              X {""}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CreateActivity;
