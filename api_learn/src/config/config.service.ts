import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";

import { ILogger } from "./../logger/logger.interface";
import { TYPES } from "../types";

import { IConfigService } from "./config.service.interface";

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const dotenvOut: DotenvConfigOutput = config();

		if (dotenvOut.error) {
			this.logger.error("[ConfigService] Не удалось прочитать файл .env или он отсутствует");
		} else {
			this.config = dotenvOut.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
