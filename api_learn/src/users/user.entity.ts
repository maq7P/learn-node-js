import { hash, compare } from "bcryptjs";

export class User {
	private _password: string;

	constructor(private readonly _name: string, private readonly _email: string, password?: string) {
		password && (this._password = password);
	}

	get name(): string {
		return this._name;
	}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(password: string, salt = 10): Promise<void> {
		this._password = await hash(password, salt);
	}

	public async comparePassword(currentPassHash: string): Promise<boolean> {
		return await compare(currentPassHash, this._password);
	}
}
