import { IsEmail, IsString } from "class-validator";
export class UserRegisterDto {
	@IsEmail({}, { message: "Неверно указан email" })
	email: string;

	@IsString({ message: "Не указан password" })
	password: string;

	@IsString({ message: "Не указан name" })
	name: string;
}
