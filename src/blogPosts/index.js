import { Router } from "express";
import query from "../utils/db/index.js";
import Model from "../utils/model/index.js";

const blogsRouter = Router()

const Blogs = new Model("blogs", "blog_id")

blogsRouter.get("/", async (req, res, next) => {
    try {
        const dbRes = await Blogs.find(req.query)
        res.send(dbRes)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

blogsRouter.get("/withAuthors", async (req, res, next) => {
    try {
        const dbResponse = await query(
            "SELECT author.name as author_name,blog.title,author_id,blog.blog_id FROM blogs as blog LEFT JOIN authors as author ON blog.author=author_id"
        )         // 
        res.send(dbResponse)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

blogsRouter.get("/:id", async (req, res, next) => {
    try {
        const dbResponse = await Blogs.findById(req.params.id);
        res.send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


// below is the query to join the two tables together
// SELECT blog.author,blog.title,blog.blog_id,author.name,author_id FROM blogs as blog LEFT JOIN authors as author ON blog.author=author_id;

blogsRouter.put("/:id", async (req, res, next) => {
    try {
        const dbResponse = await Blogs.update(req.params.id, req.body);
        res.send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

blogsRouter.post("/", async (req, res, next) => {
    try {
        const dbResponse = await Blogs.create(req.body);
        res.send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

blogsRouter.delete("/:id", async (req, res, next) => {
    try {
        const dbResponse = await Blogs.deleteById(req.params.id);
        res.status(204).send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

export default blogsRouter