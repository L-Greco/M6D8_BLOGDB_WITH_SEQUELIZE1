import express from "express";
import db from "./utils/db/index.js"
// import blogsRouter from "./blogPosts/index.js";
import authorsRouter from "./authors/index.js";
const { PORT } = process.env

const server = express()

server.use(express.json())

// server.use("/blogs", blogsRouter)
server.use("/authors", authorsRouter)

db.sequelize
    .sync({ force: false })
    .then(() => {
        server.listen(PORT, () => console.log("server is listening on Port: " + PORT));
        server.on("error", (error) =>
            console.info(" ❌ Server is not running due to : ", error)
        );
    })
    .catch((e) => {
        console.log(e);
    });