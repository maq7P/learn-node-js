import { UserModel } from "@prisma/client";

import { IConfigService } from "./../config/config.service.interface";

import { IUsersRepository } from "./user.repository.interface";
import { IUserService } from "./users.service.interface";
import { UserService } from "./users.service";
import { User } from "./user.entity";
import { TYPES } from "./../types";
import { Container } from "inversify";

const CONFIG_SERVICE_MOCK: IConfigService = {
	get: jest.fn(),
};

const USERS_REPOSITORY_MOCK: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();

let configService: IConfigService;
let usersRepository: IUsersRepository;
let userService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);

	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(CONFIG_SERVICE_MOCK);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(USERS_REPOSITORY_MOCK);

	userService = container.get<IUserService>(TYPES.UserService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	configService = container.get<IConfigService>(TYPES.ConfigService);
});

let createdUser: UserModel | null;
const USER_MOCK_DATA = {
	email: "a@a.ru",
	name: "Test",
	password: "1",
};

describe("User service", () => {
	const getMockCreateUser = async (): Promise<UserModel | null> => {
		configService.get = jest.fn().mockReturnValue("1");
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);

		return await userService.createUser(USER_MOCK_DATA);
	};

	it("create user", async () => {
		createdUser = await getMockCreateUser();

		expect(createdUser?.id).toBe(1);
		expect(createdUser?.password).not.toBe("1");
	});

	it("validate user - succes", async () => {
		createdUser = await getMockCreateUser();

		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const isValidate = await userService.validateUser({
			email: USER_MOCK_DATA.email,
			password: USER_MOCK_DATA.password,
		});

		expect(isValidate).toBeTruthy;
	});

	it("validate user - wrong password", async () => {
		createdUser = await getMockCreateUser();

		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const isValidate = await userService.validateUser({
			email: USER_MOCK_DATA.email,
			password: "wrong password",
		});

		expect(isValidate).toBeFalsy;
	});

	it("validate user - wrong user", async () => {
		createdUser = await getMockCreateUser();

		usersRepository.find = jest.fn().mockReturnValueOnce(null);

		const isValidate = await userService.validateUser({
			email: USER_MOCK_DATA.email,
			password: USER_MOCK_DATA.password,
		});

		expect(isValidate).toBeFalsy;
	});
});
