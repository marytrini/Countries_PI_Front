import React from "react";
import style from "./Paginado.module.css";

const Paginado = ({
  countriesPerPage,
  allCountries,
  paginado,
  currentPage,
}) => {
  const totalPages = Math.ceil(allCountries / countriesPerPage);

  return (
    <nav className={style.contpag}>
      <div>
        <button
          className={`${style.buttonPag} ${
            currentPage === 1 ? style.disabled : ""
          }`}
          onClick={() => paginado(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<prev"}
        </button>

        <button
          className={`${style.pageNumber} ${
            totalPages === 1 ? style.disabled : ""
          }`}
        >
          {currentPage}
        </button>

        <button
          className={`${style.buttonPag} ${
            currentPage === totalPages ? style.disabled : ""
          }`}
          onClick={() => paginado(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {"next>"}
        </button>
      </div>
    </nav>
  );
};

export default Paginado;
