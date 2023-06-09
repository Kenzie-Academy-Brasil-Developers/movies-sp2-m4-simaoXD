import { NextFunction, Request, Response } from "express";

interface IMovies {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}
type TRequestExpress = (req: Request, res: Response) => Promise<Response>;

type TMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;

type TMoviesRequest = Omit<IMovies, "id">;

type TFormat = (text: string, listKeys: string[], listValues: any[]) => string;

export { IMovies, TMoviesRequest, TRequestExpress, TMiddleware, TFormat };
