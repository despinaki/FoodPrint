const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/config');
const router = express.Router();

const {getFoodInfoByName, addFoodToDayMeal, getAllFoods, getMealOfToday, showUserMeals, deleteFoodFromToday} = require('../db/queries');
const verifyToken = require('./verifyToken');

router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API"
    })
});
//------------RESTful routes--------------
//get the meal for the day
router.get('/meals/today', (req,res) => {
    const today = new Date().toISOString().slice(0,10);
    db.run(getMealOfToday, [today, req.query.userid])
    .then(resp => {
        if(!resp.rows) {
            res.json({
                status: 404,
                message:"No food added in your daily meal yet."
            })
        } else {
            res.status(200).json(resp.rows)
        }
    })
    .catch(err=> res.status(500).end())
})
//get all meals
router.get('/meals/all', (req,res) =>{
    db.run(showUserMeals, [req.query.userid])
    .then(resp => {
        if (!resp.rows){
            res.json({
                status: 404,
                message:"No meals added yet."
            })
        } else {
            res.status(200).json(resp.rows)
        }
    })
    .catch(err=> res.status(500).end())
})
//get all foods
router.get('/foods/all', (req,res) =>{
    db.run(getAllFoods)
    .then(resp => {
        if (!resp){
            res.json({
                status: 404,
                message:"No foods in our database yet."
            })
        } else {
            res.status(200).json(resp.rows)
        }
    })
    .catch(err=> res.status(500).end())
})
//get food info
router.get('/foods/:foodname', (req,res) =>{
    const foodname = req.params.foodname
    db.run(getFoodInfoByName, [foodname])
    .then(resp => {
        if (!resp.rows[0]){
            res.json({
                status: 404,
                message:"No such food in our database yet."
            })
        } else {
            res.status(200).json(resp.rows[0])
        }
    })
    .catch(err=> res.status(500).end())
})
//add a food to the meal of the day
router.post('/meals/today', (req,res) => {
    const today = new Date().toISOString().slice(0,10);
    db.run(addFoodToDayMeal, [req.body.userid, req.body.foodid, today])
    .then(resp => {
        res.status(201).json(resp.rows[0])
    })
    .catch(err=> res.status(500).end())
})
//delete a food from the meal of the day
router.delete('/meals/today/:foodid',  (req,res) => {
    const today = new Date().toISOString().slice(0,10);
    db.run(deleteFoodFromToday, [req.params.foodid, req.query.userid, today])
    .then(resp => {
        res.status(204).json(resp.rows)
    })
    .catch(err=> res.status(500).end())
})
//mock protected route
router.post("/posts", verifyToken, (req,res) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Post created",
                authData: authData
            })
        }
    })
})

module.exports = router;