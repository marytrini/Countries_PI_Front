const validate = (input) => {
  let errors = {};
  let difficulty = Number(input.difficulty);
  let duration = Number(input.duration);

  if (!input.name) errors.name = "Required field";
  else if (/[^A-Za-z0-9 ]+/g.test(input.name))
    errors.name = "Name cannot contain special characters or written accents"; // may, min,num,  no carac.espec, tildes

  if (!input.difficulty) errors.difficulty = "Required field";
  else if (difficulty <= 0 || difficulty > 5)
    errors.difficulty = "Difficulty must a number between 1 and 5";

  if (!input.duration) errors.duration = "Required field";
  else if (duration <= 0 || duration > 24)
    errors.duration = "Duration must be a number between 1 and 24";

  if (!input.season || input.season === "vacio")
    errors.season = "Required field";

  if (!input.countries || input.countries.length === 0)
    errors.countries = "Required field";

  return errors;
};

export default validate;
