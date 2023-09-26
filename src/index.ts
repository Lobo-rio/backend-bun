import { app } from "./external/api/config";
import { MakeUser } from "./external/shared/factories/MakeUser";

MakeUser().findByIdUserController;
MakeUser().findManyUserController;
MakeUser().createUserController;
MakeUser().updateUserController;
MakeUser().deleteUserController;

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
