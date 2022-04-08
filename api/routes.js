'use strict';

const express = require('express');
const {User, Course} = require('./models');
const {authenticateUser} = require('./middleware/auth-user');



//Router
const router = express.Router();


//handler function 
function asyncHandler(cb){
    return async(req, res, next) => {
        try{
            await cb(req, res, next)
        } catch (err) {
            res.status(500).send(err);
            next(err);
        }
    }
}

//User Routes//
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.status(200).json({  
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
}));


router.post('/users', asyncHandler(async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).location('/').end();
      } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors });   
        } else {
          throw error;
        }
      }
}));


//Courses Routes//
router.get('/courses', asyncHandler(async(req, res) => {
    const courses = await Course.findAll({      
        attributes: {exclude: ['createdAt', 'updatedAt']}, 
        
        include: [{
            model: User,
            attributes: ['firstName', 'lastName', 'emailAddress'] 
            }] 
    });
    if (courses) {
        res.status(200).json(courses);
    } else {
        res.status(404).render('error');
    }
    
}));


router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
        attributes: {exclude: ['createdAt', 'updatedAt']}, 
        
        include: [{
            model: User, 
            attributes: ['firstName', 'lastName', 'emailAddress']
        }]
    });
    res.status(200).json(course);
}));


router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.location(`/courses/${course.id}`).status(201).end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });   
          } else {
            throw error;
            }
    }
}));


router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => { 
    try{
        const course = await Course.findByPk(req.params.id);
        if (course) {
            if(course.userId === req.currentUser.id){
                await course.update(req.body);
                res.status(204).end();
            } else {
                res.status(403).json({message: 'Users can only make changes if they created the course'});
            }
        }
    } catch(error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });   
            } else {
                throw error;
            }
    }  
}));


router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (course) {
            if (course.userId === req.currentUser.id) {
                await course.destroy(course);
                res.status(204).end();
            } else {
                res.status(403).json({message: 'Users can only make changes if they created the course'});
            }
        }
    } catch(err){
        res.status(500).json({err})
    }
}));

module.exports = router;