module.exports = (sequelize, dataTypes) => {
    let alias = 'Roles';
    let cols = {
        ID_rol: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            unique: true                     
        } ,
        nombreRol: {
            type: dataTypes.STRING,
            notNull: true,
            unique: true  
        }
    };
    let config = {
        tableName: 'rol',
        timestamps: false        
    };

    const Rol = sequelize.define(alias, cols, config)

    Rol.associate = function (models) {
        Rol.hasMany(models.Users, {
            as: 'rol',
            foreignKey: 'rol_ID_rol'
        });
    }

    return Rol;
}