// 4. Editar el usuario

const fs = require('fs');


const User = {
    fileName: ('./data/usersData.json'),
    
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function () {
        const todosLosUsuarios = this.findAll();
        const ultimoUsuario = todosLosUsuarios.pop();
        if (ultimoUsuario) {
            return ultimoUsuario.id + 1;
        }
        return 1;         
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function (id) {
        const todosLosUsuarios = this.findAll();
        const usuarioBuscado = todosLosUsuarios.find(oneUser => oneUser.id === id);
        return usuarioBuscado;
    },

    findByField: function (field, text) {
        const todosLosUsuarios = this.findAll();
        const usuarioBuscado = todosLosUsuarios.find(oneUser => oneUser[field] === text);
        return usuarioBuscado;
    },
    
    create: function (userData) {
        const todosLosUsuarios = this.findAll();
        const nuevoUsuario = {
            id: this.generateId(),
            ...userData
        }
        todosLosUsuarios.push(nuevoUsuario);
        fs.writeFileSync(this.fileName, JSON.stringify(todosLosUsuarios, null, ' '));
        return nuevoUsuario;
    },
    
    delete: function (id) {
        const todosLosUsuarios = this.findAll();
        const usuarioFinal = todosLosUsuarios.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(usuarioFinal, null, ' '));
        return true;
    }
}

module.exports = User;