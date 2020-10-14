const express = require('express');
const db = require('../db/config');
const router = express.Router();

const {getFoodInfoByName} = require('../db/queries');

router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API"
    })
});
//RESTful routes
//get the meal for the day
//get all meals
//get food info
router.get('/foods/:foodname', (req,res,next) =>{
    const foodname = req.params.foodname
    db.run(getFoodInfoByName, [foodname])
    .then(resp => {
        res.json(resp.rows[0])
    })
})
//add a food to the meal of the day
//add a meal to all meals??AKIRO NOMIZO
//delete a food from the meal of the day
//delete a meal from all meals

module.exports = router;