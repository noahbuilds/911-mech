import { App } from "./app";
import configuration from "./configs/configs";

const app = new App(Number(configuration.ENV_PORT), configuration.MONGO_URI!);

app.startListener();
