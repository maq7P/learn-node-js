import "reflect-metadata";
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

	public async createUser({ name, email, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(name, email);

		await newUser.setPassword(password);
		const existedUser = await this.userRepository.find(newUser);

		if (existedUser) return null;

		return await this.userRepository.create(newUser);
	}

	public async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.userRepository.find({ email });

		if (!existedUser) return false;

		const newUser = new User(existedUser.email, existedUser.name, existedUser.password);

		return newUser.comparePassword(password);
	}

	public async getUserInfo(email: string): Promise<UserModel | null> {
		return await this.userRepository.find({ email });
	}
}
