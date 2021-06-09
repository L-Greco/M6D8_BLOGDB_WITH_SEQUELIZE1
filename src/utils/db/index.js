import s from "sequelize"
import pg from "pg"
const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;
import BlogModel from "../../blogPosts/model.js"
import AuthorModel from "../../authors/model.js"


const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: "postgres",
});
const pool = new pg.Pool();
const test = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

const models = {
    Authors: AuthorModel(sequelize, DataTypes),
    Blogs: BlogModel(sequelize, DataTypes),
    sequelize: sequelize,
    pool: pool,
};

models.Authors.hasMany(models.Blogs);
models.Blogs.belongsTo(models.Authors)

export default models