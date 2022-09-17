import { UserLoginDto } from "./dto/user-login.dto";
import { User } from "./user.entity";
import { UserRegisterDto } from "./dto/user-register.dto";

export interface IUserService {
	createUser(dto: UserRegisterDto): Promise<User | null>;

	validateUser(user: UserLoginDto): Promise<boolean>;
}
