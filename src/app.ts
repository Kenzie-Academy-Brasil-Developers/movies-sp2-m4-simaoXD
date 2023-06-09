import express, { Application, json } from "express";

import { verifyNameMovieExist, verifyMovieExist, filterCategoryMovies } from "./middlewares";

import { startDataBase } from "./database";
import { createMovie, deleteMovie, findMovie, readMoviesAll, updateMovie } from "./logics";

const app: Application = express();
app.use(json());

const PORT: number = 3000;
const sendMsg: string = `Server running on http://localhost:${PORT}`;

app.get("/movies", filterCategoryMovies, readMoviesAll);
app.get("/movies/:id", verifyMovieExist, findMovie);
app.post("/movies", verifyNameMovieExist, createMovie);
app.patch("/movies/:id", verifyMovieExist, verifyNameMovieExist, updateMovie);
app.delete("/movies/:id", verifyMovieExist, deleteMovie);

app.listen(PORT, async () => {
  await startDataBase();
  console.log(sendMsg);
});
