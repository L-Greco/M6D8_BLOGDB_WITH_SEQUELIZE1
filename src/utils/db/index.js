import s from "sequelize"
import pg from "pg"
const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;
import BlogModel from "../../blogPosts/model.js"
import AuthorModel from "../../authors/model.js"
import CategoryModel from "../../category/model.js"
import CommentModel from "../../comments/model.js"


const pool = new pg.Pool();
const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: "postgres",
});

// here i create the instance of Postgre


const models = {
    Authors: AuthorModel(sequelize, DataTypes),
    Blogs: BlogModel(sequelize, DataTypes),
    Comments: CommentModel(sequelize, DataTypes),
    Categories: CategoryModel(sequelize, DataTypes),
    sequelize: sequelize,
    pool: pool,
};

models.Authors.hasMany(models.Blogs, { foreignKey: { allowNull: false } });   //many
models.Blogs.belongsTo(models.Authors); //one

// one to many association with Comments and Blogs
models.Categories.hasMany(models.Blogs, { foreignKey: { allowNull: false } });
models.Blogs.belongsTo(models.Categories);

// comments with authors is one ( Author) to many (Comments)

models.Authors.hasMany(models.Comments);   //many
models.Comments.belongsTo(models.Authors); //a comment has one Author

// comments with blogs

models.Blogs.hasMany(models.Comments, { foreignKey: { allowNull: false } });   //many
models.Comments.belongsTo(models.Blogs); //a comment has one Author




// 
// user.belongsToMany(Product,Product,{through:{model:Cart,unique:false}})
// alliws tha legame model:"Cart"
// we created a Cart model before to create a primary key , otherwise
// it would create a Cart table kai tha evaze san primary key tou Cart
// to athroisma tou product id kai tou user id 
// kai de tha epetrepe duplicates ( giati tha eixe to idio ahtroisma )
// through actually says that the Join table is the Cart 
// when we create many to many it cretes a key by adding the two keys together
// and give us the sum 
// so by saying unique :false we say create a new key cause we will
// have duplicates 


const test = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
export default models