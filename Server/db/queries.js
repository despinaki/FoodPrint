const createUser = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`;
const getUserByEmailOrUsername = `SELECT * FROM users WHERE email = $1 OR username = $2`;
//queries for RESTful routes
const getFoodInfoByName = `SELECT foodid, total_emissions, total_water, landuse, farm, processing, transport, packing, retail, one_serving, serving_weight FROM foods WHERE foodname = $1`;
const addFoodToDayMeal = `INSERT INTO meals(userid, foodid, quantity, date) VALUES ($1, $2, $3, TO_DATE($4,'YYYY-MM-DD')) RETURNING *`;
const getMealOfToday = `SELECT meals.foodid, meals.userid, foods.total_emissions, foods.total_water FROM meals JOIN foods ON meals.foodid = foods.foodid WHERE meals.date=TO_DATE($1, 'yyyy-mm-dd') AND meals.userid=$2`;
const showUserMeals = `SELECT meals.foodid, meals.userid, foods.total_emissions, foods.total_water FROM meals JOIN foods ON meals.foodid = foods.foodid WHERE meals.userid=$1`
const deleteFoodFromToday = `DELETE FROM meals WHERE foodid=$1 AND date=TO_DATE($3,'YYYY-MM-DD') AND userid=$2 RETURNING *`
const getAllFoods = `SELECT foodname FROM foods`
const getCategories = `SELECT DISTINCT category FROM foods`
const getFoodsByCategory = `SELECT foodname FROM foods WHERE category=$1`

module.exports = {
    createUser, 
    getUserByEmailOrUsername, 
    getFoodInfoByName, 
    addFoodToDayMeal, 
    getMealOfToday, 
    showUserMeals, 
    deleteFoodFromToday,
    getAllFoods,
    getCategories,
    getFoodsByCategory
};
