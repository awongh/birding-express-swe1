import pg from 'pg';
const { Pool } = pg;

const pgConnectionConfigs = {
  user: process.env.db_user,
  host: 'localhost',
  database: 'recipes',
  port: 5432, // Postgres server always runs on this port
};

const pool = new Pool(pgConnectionConfigs);

import express from 'express';

const app = express();

const PORT = process.argv[2];

app.get('/recipe/:id', (request, response) => {

  const values = [request.params.id];

  pool.query('select * from recipes WHERE id=$1', values, (error, result)=>{

    if( error ){
      console.log( error );
      response.status(503).send('error');
      return;
    }

    response.send( result.rows );
  });

});

app.listen(PORT);
