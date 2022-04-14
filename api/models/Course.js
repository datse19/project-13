'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
    Course.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Valid Course Title is required.'
                },
                notEmpty: {
                    msg: 'Please provide a valid Course Title.'
                }
            },
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false, 
            validate: {
                notNull: {
                    msg: 'Valid Course Description required.'
                },
                notEmpty: {
                    msg: 'Please provide a Course Description.'
                }
            },
        },
        estimatedTime: {
            type: Sequelize.STRING
        },
        materialsNeeded: {
            type: Sequelize.STRING
        },
    }, {sequelize});

    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            foriegnKey: {
                fieldName: 'userId',
                allowNull: false,
            }
        });
    };

    return Course;
}