
module.exports = (sequelize, dataTypes) => {

    let alias = 'Users';
    let cols = {
        ID_usuario: {
            type: dataTypes.INTEGER,
            primaryKey: false,
            notNull: true,
            unique: true,
            unsigned: true,
            autoIncrement: true
        } ,
        nombre: {
            type: dataTypes.STRING,
            notNull: true,
        },
        correoElectronico: {
            primaryKey: true,
            type: dataTypes.STRING,
            notNull: true,
        },
        userName: {
            primaryKey: true,
            type: dataTypes.STRING,
            notNull: true,
        },
        contrasenia: {            
            type: dataTypes.STRING,
            notNull: true,
        },
        imagenPerfil: {
            type: dataTypes.STRING,
            notNull: true,
        },      
        rol_ID_rol: {
            type: dataTypes.INTEGER,
            notNull: true,
        }      
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config)

    return User;
}