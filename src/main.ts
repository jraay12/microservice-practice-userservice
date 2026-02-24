import express from "express";
import UserRoute from "./presentation/routes/user.routes";
import { morgranLogger } from "./infrastructure/http/middleware/morganLogger";
import { globalLimiter } from "./infrastructure/http/middleware/rateLimiter";
const app = express();

app.use(express.json());
app.use(morgranLogger);
app.use(globalLimiter);

app.use("/user", UserRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
