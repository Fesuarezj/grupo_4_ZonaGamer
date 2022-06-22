module.exports = (sequelize, dataTypes) => {
    let alias = 'Estados';
    let cols = {
        ID_estado: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            unique: true                     
        } ,
        nombreEstado: {
            type: dataTypes.STRING,
            notNull: true,
            unique: true  
        }
    };
    let config = {
        tableName: 'estado',
        timestamps: false,        
    };

    const Estado = sequelize.define(alias, cols, config)

    Estado.associate = function (models) {
        Estado.hasMany(models.Users, {
            as: 'estadoUsers',
            foreignKey: 'estado_ID_estado'
        });
        Estado.hasMany(models.Products, {
            as: 'estadoProducts',
            foreignKey: 'estado_ID_estado'
        });
    }

    return Estado;
}