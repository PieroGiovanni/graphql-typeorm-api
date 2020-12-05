import "reflect-metadata";
import { startServer } from "./app";
import { connect } from "./config/typeorm";

const main = async () => {
  connect();
  const app = await startServer();
  app.listen(3000);
  console.log("Sever on port: ", 3000);
};

main();
