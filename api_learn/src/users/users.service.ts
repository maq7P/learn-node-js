import { injectable } from "inversify";

import { User } from "./user.entity";

import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";

import { IUserService } from "./users.service.interface";

@injectable()
export class UserService implements IUserService {
	public async createUser(dto: UserRegisterDto): Promise<User | null> {
		const newUser = new User(dto.name, dto.email);
		console.log(dto.name, dto.email);

		await newUser.setPassword(dto.password);

		//check user exist
		//if have - null
		//if haven't - create

		return newUser;
	}

	public async validateUser(user: UserLoginDto): Promise<boolean> {
		return false;
	}
}