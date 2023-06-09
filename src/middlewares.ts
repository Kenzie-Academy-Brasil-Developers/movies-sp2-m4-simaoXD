import { QueryConfig, QueryResult } from "pg";
import { IMovies, TMiddleware } from "./interface";
import { client } from "./database";

const verifyNameMovieExist: TMiddleware = async (req, res, next) => {
  const { body: data } = req;
  const queryText: string = `
SELECT *
FROM movies
WHERE name ILIKE $1;
`;
  const queryConfig: QueryConfig = {
    text: queryText,
    values: [data.name],
  };
  try {
    const response: QueryResult<IMovies> = await client.query(queryConfig);
    const movie = response.rows[0];

    const message = `The movie called '${movie?.name}' already exists`;

    return !movie ? next() : res.status(409).json({ error: message });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const filterCategoryMovies: TMiddleware = async (req, res, next) => {
  const { query } = req;
  const queryText: string = `
  
  SELECT *
  FROM movies
  WHERE category ILIKE $1
  `;

  const queryConfig: QueryConfig = {
    text: queryText,
    values: [query.categoy],
  };

  try {
    const response: QueryResult<IMovies> = await client.query(queryConfig);
    const listMovies = response.rows;

    return response.rowCount > 0 ? res.status(200).json(listMovies) : next();
  } catch (error) {
    return res.status(500).send();
  }
};

const verifyMovieExist: TMiddleware = async (req, res, next) => {
  const { params } = req;

  const queryText: string = `

  SELECT *
  FROM movies
  WHERE id = $1;
  `;
  const queryConfig = {
    text: queryText,
    values: [params.id],
  };

  try {
    const response: QueryResult<IMovies> = await client.query(queryConfig);
    const movie = response.rows[0];

    if (movie) {
      res.locals.movie = movie;
      return next();
    }

    return res.status(404).json({ error: "Movie not found" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { verifyNameMovieExist, filterCategoryMovies, verifyMovieExist };
