module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        ID_products: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            unique: true,
            unsigned: true,
            autoIncrement: true
        } ,
        name: {
            type: dataTypes.STRING,
            notNull: true,
        },
        description: {
            type: dataTypes.STRING,
            notNull: true,
        },
        image: {
            type: dataTypes.STRING,
            notNull: true,
        },
        warranty: {
            type: dataTypes.NUMBER,            
            notNull: true,           
        },
        price: {
            type: dataTypes.DECIMAL,
            notNull: true,
        },
        discount: {
            type: dataTypes.NUMBER,
            notNull: true,
        },
        date: {
            type: dataTypes.DATE,
            notNull: true
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config)

    return Product;
}