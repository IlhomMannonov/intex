import { SetMetadata } from "@nestjs/common";
import { UserRoleEnum } from "../enums/UserRoleEnum";

export const ROLES_KEY = "roles";
export const Roles = (...roles: UserRoleEnum[]) => SetMetadata(ROLES_KEY, roles);