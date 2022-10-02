import request from "supertest";
import { boot } from "../src/main";
import { App } from "../src/app";

// Для e2e тетов следует создавать тестовое окружение (отедлеьную бд как минимум)

let application: App;

const EXISTED_USER_IN_DB = {
	email: "kol@gamil.com",
	password: "12345",
	name: "Коля",
};

const USER_WITH_WRONG_PASSWORD = {
	...EXISTED_USER_IN_DB,
	password: "WRONG PASSWORD",
};

beforeAll(async () => {
	const { app } = await boot;
	application = app;
	console.log(application);
});

describe("users e2e", () => {
	it("Register - error", async () => {
		const res = await request(application.app).post("/users/register").send(EXISTED_USER_IN_DB);

		expect(res.statusCode).toBe(422);
	});

	it("Login - succes", async () => {
		const res = await request(application.app).post("/users/register").send(EXISTED_USER_IN_DB);

		expect(res.body.jwt).not.toBeUndefined;
	});

	it("Login - error", async () => {
		const res = await request(application.app)
			.post("/users/register")
			.send(USER_WITH_WRONG_PASSWORD);

		expect(res.statusCode).toBe(401);
	});

	it("Info - success", async () => {
		const login = await request(application.app).post("/users/register").send(EXISTED_USER_IN_DB);

		const res = await request(application.app)
			.post("/users/info")
			.set("Authorization", `Bearer: ${login.body.jwt}`);

		expect(res.body.email).toBe(EXISTED_USER_IN_DB.email);
	});

	it("Info - error", async () => {
		const res = await request(application.app)
			.post("/users/info")
			.set("Authorization", `Bearer: no`);

		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
