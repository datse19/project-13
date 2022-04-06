'use strict';

const Sequelize = require ('sequelize');
const bcrypt = require ('bcryptjs');
const sequelize = require('sequelize');

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init( {
        
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'First Name is required.'
                },
                notEmpty: {
                    msg: 'Please provide a First Name.'
                }
            }

        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Last Name is required.'
                },
                notEmpty: {
                    msg: 'Please provide a Last Name.'
                }
            }
        }, 
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false, 
            unique: {
                msg: 'The email address you provided already exists.'
            },
            validate: {
                notNull: {
                    msg: 'Email address is required.'
                },
                isEmail: {
                    msg: 'Please provide a valid Email Address.'
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false, 
            validate: {
                notNull: {
                    msg: 'Please enter a valid Password.'
                },
                notEmpty: {
                    msg: 'Please provide a Password.'
                },
                len: {
                    args: [8, 20],
                    msg: 'The password needs to between 8 and 20 characters'
                },
                set(val) {
                    if(val  === this.password) {
                        const hashedPassword = bcrypt.hashSync(val, 10);
                        this.setDataValue('password', hashedPassword);

                    }
                }
            }

        }
    }, {sequelize});

    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: {
                fieldName: 'userId',
                allNull: false,
            }
        });
    }

    return User;
};