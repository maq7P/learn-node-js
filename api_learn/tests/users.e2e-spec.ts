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
});

afterAll(() => {
	application.close();
});
