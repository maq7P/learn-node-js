import { inject, injectable } from "inversify";
import { UserModel } from "@prisma/client";

import { TYPES } from "./../types";

import { UsersRepository } from "./user.repository";
import { User } from "./user.entity";

import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";

import { IUserService } from "./users.service.interface";

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.UsersRepository) private userRepository: UsersRepository) {}

	public async createUser(dto: UserRegisterDto): Promise<UserModel | null> {
		const { name, email, password } = dto;
		const newUser = new User(name, email);

		await newUser.setPassword(password);
		const existedUser = await this.userRepository.find(newUser);

		if (existedUser) return null;

		return await this.userRepository.create(newUser);
	}

	public async validateUser(user: UserLoginDto): Promise<boolean> {
		return false;
	}
}
