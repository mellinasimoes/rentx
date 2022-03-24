import { Connection, createConnection, getConnectionOptions } from "typeorm";

// interface IOptions {
//   host: string;
// }

// getConnectionOptions().then(options => {
//   const newOptions = options as IOptions;
//   newOptions.host = 'database_ignite'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//   createConnection({
//     ...options,

export default async (host="database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions,{
      host: process.env.NODE_ENV === "test"? "localhost":host, //se o process.env.NODE_ENV for igual a "test" tem que passar o host que está sendo usado, no caso localhost
      database: 
      process.env.NODE_ENV === "test"  //se o env.NODE_ENV for igual a "test" usar o banco de dados "rentx_test", do contrario usar o default
        ? "rentx_test"
        : defaultOptions.database,
    })
  );   // se o process.env.NODE_ENV for igual a  "test"
};
