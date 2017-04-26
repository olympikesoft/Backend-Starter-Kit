import { join } from 'path';
import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { routes, listRoutes } from './routes';

const app = express();

// heroku config:set MONGODB_URI=mongodb://backend-go:backend-go@ds113871.mlab.com:13871/backend-go-demo
// export MONGODB_URI=mongodb://localhost/backend-go-demo
// mongoose.connect(process.env.MONGODB_URI)

// process.env.NODE_ENV === 'production'
//   ? mongoose.connect('mongodb://backend-go:backend-go@ds113871.mlab.com:13871/backend-go-demo')
//   : mongoose.connect('mongodb://localhost/backend-go-demo');

mongoose.connect('mongodb://backend-go:backend-go@ds113871.mlab.com:13871/backend-go-demo');

app.set('port', (process.env.PORT || 8000));

app.use(express.static(join(__dirname, '..', 'public')));
app.use(compression());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);
app.use('/list', listRoutes);

app.listen(app.get('port'), () => {
  console.log('Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.once('open', () => console.log('Connection Succeeded.'));
});

export default app;
