

export default (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: false
        },
        read_time_value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        read_time_unit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    })
    return Blog
}