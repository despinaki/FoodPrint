const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/config');
const router = express.Router();

const {
    getFoodInfoByName, 
    addFoodToDayMeal, 
    getAllFoods, 
    getMealOfToday, 
    showUserMeals, 
    deleteFoodFromToday,
    getCategories,
    getFoodsByCategory,
    getUserEmissionsGrouped} = require('../db/queries');

const verifyToken = require('./verifyToken');

router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API"
    })
});
//------------RESTful routes--------------
//get the meal for the day
router.get('/:userid/meals/today', (req,res) => {
    const today = new Date().toISOString().slice(0,10);
    db.run(getMealOfToday, [today, req.params.userid])
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
router.get('/:userid/meals/all', (req,res) =>{
    db.run(showUserMeals, [req.params.userid])
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
//get all emissions by user's meals
router.get('/:userid/allemissions', (req,res) =>{
    db.run(getUserEmissionsGrouped, [req.params.userid])
    .then(resp => {
        res.status(200).json(resp.rows)
    })
    .catch(err=> res.status(500).end())
})
//get all foods
router.get('/foods/all', (req,res) =>{
    db.run(getAllFoods)
    .then(resp => {
        res.status(200).json(resp.rows)
    })
    .catch(err=> res.status(500).end())
})
//get all food categories
router.get('/foods/categories', (req,res)=>{
    db.run(getCategories)
    .then(resp => {
        res.status(200).json(resp.rows)
    })
    .catch(err=> res.status(500).end())
})
//get foods by category
router.get('/foods/categories/:category',(req,res) => {
    db.run(getFoodsByCategory,[req.params.category])
    .then(resp => {
        res.status(200).json(resp.rows)
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
router.post('/meals/today', verifyToken, (req,res) => {
    const today = new Date().toISOString().slice(0,10);

    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            db.run(addFoodToDayMeal, [req.body.userid, req.body.foodid, req.body.quantity, today])
            .then(resp => {
                res.status(201).json({data: resp.rows[0], authData: authData})
            })
            .catch(err=> res.status(500).end())
        }
    })
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

module.exports = router;