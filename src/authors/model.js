export default (sequelize, DataTypes) => {
    const Author = sequelize.define("author", {
        author_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false
        }


    },
        {
            timestamps: true,
            createdAt: "created_at",
            updatedAt: false
        })
    return Author
}
