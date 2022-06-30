require('express-async-errors')
import express, {
  Express, Request, Response, NextFunction,
} from 'express';
import accountRouter from './routes/account_route';
import transactionsRouter from './routes/transactions_route';
import IApiError from './model/api_error_model';
import IResponse from './model/response_model';

const app: Express = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(accountRouter);
app.use(transactionsRouter);

app.use((err: IApiError, req: Request, res: Response, next: NextFunction) => {
  if (err && err.status) {
    res.status(err.status).send({
      data: err.name,
      message: err.message,
      status: err.status,
    } as IResponse);
  } else {
    console.log(err)
    res.status(500).send({
      data: 'InternalServerError',
      message: 'Something when wrong',
      status: 500,
    } as IResponse);
  }
  next();
});

export default app;
