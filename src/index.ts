import { app } from "./external/api/config";
import { MakeUserInstantiateController } from "./external/shared/factories/MakeUserInstantiateController";
import { MakePostInstantiateController } from "./external/shared/factories/MakePostInstantiateController";

MakeUserInstantiateController(app);
MakePostInstantiateController(app);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
