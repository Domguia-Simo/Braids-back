const Sequelize = require('sequelize');

const sequelize = new Sequelize('braids', 'root', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = {
    // User model
    Admin: sequelize.define('users', {
        _id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: Sequelize.STRING,
        token: Sequelize.STRING,
        account_type: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        passwordstring: Sequelize.STRING
    }, {
        timestamps: false
    }),
    BooK: sequelize.define('books', {
        _id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        // name: Sequelize.STRING,
        ForDate: Sequelize.STRING,
        design_id: Sequelize.INTEGER,
        client_id: Sequelize.INTEGER,
    }, {
        timestamps: false
    }),
    Design: sequelize.define('designs', {
        design_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: Sequelize.STRING,
        desc: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.REAL,
        // images: Sequelize.ARRAY,
    }, {
        timestamps: false
    }),
    Client: sequelize.define('clients', {
        clients_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
    }, {
        timestamps: false
    }),
}
