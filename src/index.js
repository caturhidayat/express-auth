import {app} from "./app/app.js";
import 'dotenv/config'
import {logger} from "./app/logger.js";

const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`)
})
