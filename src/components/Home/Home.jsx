import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActivities,
  filterByContinent,
  filterByActivities,
  orderByName,
  orderByPopulation,
} from "../../actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.allActivities);

  const [order, setOrder] = useState("");
  const [filters, setFilters] = useState({
    continent: "",
    population: "",
    name: "",
    activity: "",
  });
  const [initialFilters, setInitialFilters] = useState({
    continent: "",
    population: "",
    name: "",
    activity: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  const handleSorting = (event) => {
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setFilters(event.target.value);
    setOrder(`Arranged ${event.target.value}`);
  };
  const handleSortByPop = (event) => {
    dispatch(orderByPopulation(event.target.value));
    setCurrentPage(1);
    setFilters(event.target.value);
    setOrder(`Arranged ${event.target.value}`);
  };

  const handleContinentFilter = (event) => {
    dispatch(filterByContinent(event.target.value));
    setFilters(event.target.value);
    setCurrentPage(1);
  };

  const handleActivityFilter = (event) => {
    dispatch(filterByActivities(event.target.value));
    setCurrentPage(1);
    setFilters(event.target.value);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    dispatch(getCountries());
    setFilters(initialFilters);
    setOrder("");
  };

  return (
    <>
      <div className={style.searchBarCont}>
        <SearchBar
          setCurrentPage={setCurrentPage}
          className={style.searchBar}
        />
      </div>
      <div className={style.containAll}>
        <div className={style.filtersContainer}>
          <div className={style.filtersAlfabet}>
            Alphabetic order
            <select
              className={style.selectInput}
              onChange={handleSorting}
              value={filters.name}
            >
              <option value="None">None</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
          <div className={style.filtersPop}>
            Population
            <select
              className={style.selectInput}
              onChange={handleSortByPop}
              value={filters.population}
            >
              <option value="dense">low to high</option>
              <option value="sparse">high to low</option>
            </select>
          </div>
          <div className={style.filtersCont}>
            Search by Continent
            <select
              className={style.selectInput}
              onChange={handleContinentFilter}
              value={filters.continent}
            >
              <option value="All">All</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
              <option value="Antarctica">Antarctica</option>
            </select>
          </div>
          <div className={style.filtersAct}>
            Search by Activity
            <select
              className={style.selectInput}
              onChange={(event) => handleActivityFilter(event)}
              value={filters.activity}
            >
              {activities.length === 0 ? (
                <option value="No activities">No activities created yet</option>
              ) : (
                <>
                  <option value="" disabled selected hidden>
                    Select an activity
                  </option>
                  <option value="All">All</option>
                  {activities.map((act) => {
                    return (
                      <option value={act.name} key={act.id}>
                        {act.name}{" "}
                      </option>
                    );
                  })}
                </>
              )}
            </select>
          </div>
        </div>
        <div className={style.filterClear}>
          <button className={style.clearButton} onClick={resetFilters}>
            Clear
          </button>
        </div>

        <div className={style.cardRender}>
          {currentCountries.length ? (
            currentCountries.map((country) => {
              return (
                <div>
                  <Card
                    flag={country.flag}
                    name={country.name}
                    continent={country.continent}
                    key={country.id}
                    id={country.id}
                  />
                </div>
              );
            })
          ) : (
            <h1>No countries</h1>
          )}
        </div>
        <div className={style.paginadoDiv}>
          <Paginado
            className={style.paginado}
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};
export default Home;
