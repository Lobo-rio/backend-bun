import Elysia from "elysia";
import { app } from "./external/api/config";
import { MakeUserInstantiateController } from "./external/shared/factories/MakeUserInstantiateController";

MakeUserInstantiateController(app);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
