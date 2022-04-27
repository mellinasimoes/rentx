import { CreateUserController } from "@modules/accounts/UseCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController";
import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "../middlerwares/ensureAuthenticated";
import { ProfileUserController } from "@modules/accounts/UseCases/profileUserUseCase/ProfileUserController";


const usersRoutes = Router ();
const uploadAvatar= multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController= new UpdateUserAvatarController();
const profileUserController= new ProfileUserController();

usersRoutes.post("/", createUserController.handle); 

usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
