module.exports = (sequelize, dataTypes) => {
    let alias = 'Categorys';
    let cols = {
        ID_category: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            unique: true,
            unsigned: true,
            autoIncrement: true
        },
        nameCategory: {
            type: dataTypes.STRING,
            notNull: true,
            unique: true
        }
    };
    let config = {
        tableName: 'category',
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config)
    
    Category.associate = function (models) {
        Category.hasMany(models.Products, {
            as: 'categoryProducts',
            foreignKey: 'category_ID_category'
        });
    }

    return Category;
}