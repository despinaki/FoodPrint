const express = require('express');
const db = require('../db/config');
const router = express.Router();

const {getFoodInfoByName, addFoodToDayMeal, getMealOfToday} = require('../db/queries');

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
//get food info
router.get('/foods/:foodname', (req,res) =>{
    const foodname = req.query.params.foodname
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
//add a meal to all meals??AKIRO NOMIZO
//delete a food from the meal of the day
//delete a meal from all meals

module.exports = router;