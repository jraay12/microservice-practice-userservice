import express from "express";
import UserRoute from "./presentation/routes/user.routes";
import { morgranLogger } from "./infrastructure/http/middleware/morganLogger";
import { globalLimiter } from "./infrastructure/http/middleware/rateLimiter";
import { errorHandler } from "./shared/error/GlobalError";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgranLogger);
app.use(globalLimiter);

app.use("/user", UserRoute);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
