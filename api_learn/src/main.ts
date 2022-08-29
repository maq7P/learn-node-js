import { App } from "./app";
import { userRouter } from "./users/user";

async function bootstrap() {
    const app = new App();
    await app.init();
    app.useRoutes(userRouter)
}

bootstrap();