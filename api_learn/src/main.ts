import { UserController } from './users/users.controller';
import { App } from "./app";
import { LoggerService } from "./logger/loger.service";

async function bootstrap() {
    const logger = new LoggerService();
    const app = new App(logger, new UserController(logger));

    await app.init();
}

bootstrap();