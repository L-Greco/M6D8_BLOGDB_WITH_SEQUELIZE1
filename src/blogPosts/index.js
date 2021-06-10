import { Router } from "express";

import Model from "../utils/db/index.js";
import authorModel from "../authors/model.js"
import categoryModel from "../category/model.js"
const blogs = Model.Blogs
const blogsRouter = Router()



blogsRouter.get("/", async (req, res, next) => {
    try {
        const dbRes = await blogs.findAll({
            include: [{ model: authorModel }, { model: categoryModel }]

        })
        res.send(dbRes)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

blogsRouter.get("/:id", async (req, res, next) => {
    try {
        const dbResponse = await blogs.findByPk(req.params.id);
        res.send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

// blogsRouter.get("/:id/withComments")

blogsRouter.put("/:id", async (req, res, next) => {
    try {
        await blogs.update(req.body, {
            where: {
                author_id: req.params.id
            }
        });
        res.status(200).send(`Author with id : ${req.params.id} is successfully updated!`);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

blogsRouter.post("/", async (req, res, next) => {
    try {
        const dbResponse = await blogs.create(req.body);
        res.status(201).send(dbResponse);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

blogsRouter.delete("/:id", async (req, res, next) => {
    try {
        await blogs.destroy({
            where: {
                author_id: req.params.id
            }
        });
        res.status(204).send()
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

export default blogsRouter