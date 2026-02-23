import express from "express";
import UserRoute from "./presentation/routes/user.routes";
import { morgranLogger } from "./infrastructure/logging/morganLogger";
const app = express();

app.use(express.json());

app.use(morgranLogger);

app.use("/user", UserRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
