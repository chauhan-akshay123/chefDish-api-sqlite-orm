const express = require("express");
const cors = require("cors");
const app = express();
let { sequelize } = require("./lib/index");
let { chef } = require("./models/chef.model");
let { dish } = require("./models/dish.model");
let { chefDish } = require("./models/chefDish.model");

app.use(express.json());
app.use(cors());

let dishData = [
    {
      name: 'Margherita Pizza',
      cuisine: 'Italian',
      preparationTime: 20,
    },
    {
      name: 'Sushi',
      cuisine: 'Japanese',
      preparationTime: 50,
    },
    {
      name: 'Poutine',
      cuisine: 'Canadian',
      preparationTime: 30,
    },
  ];

let chefData = [
    { name: 'Gordon Ramsay', birthYear: 1966 },
    { name: 'Masaharu Morimoto', birthYear: 1955 },
    { name: 'Ricardo Larrivée', birthYear: 1967 },
  ];
  
// Defining a route to seed the database
app.get('/seed_db', async (req, res) => {
  try{
    await sequelize.sync({ force: true });

    await dish.bulkCreate(dishData);
    await chef.bulkCreate(chefData);

    return res.status(200).json({ message: "Database seeding successfull." }); 
  } catch(error){
    res.status(500).json({ message: "Error seeding the database.", error: error.message });
  }
});

// function to fetch all the dishes
async function fetchAllDishes(){
    let dishes = await dish.findAll();

    return { dishes };
}

// Endpoint to fetch all the dishes
app.get("/dishes", async (req, res) => {
 try{
    let response = await fetchAllDishes();

    if(response.dishes.length === 0){
        return res.status(404).json({ message: "No dishes found." });
    }
    
    return res.status(200).json(response);
 } catch(error){
    return res.status(500).json({ message: "Error fetching all the dishes", error: error.message });
}
});

// function to fetch all the chefs
async function fetchAllChefs(){
    let chefs = await chef.findAll();

    return { chefs };
}

// Endpoint to fetch all the chefs
app.get("/chefs", async (req, res) => {
 try{
    let response = await fetchAllChefs();

    if(response.chefs.length === 0){
        return res.status(404).json({ message: "No chefs found." });
    }

    return res.status(200).json(response);
 } catch(error){
    return res.status(500).json({ message: "Error fetching all the chefs", error: error.message });
 }
});

// function to create a new Chef
async function addNewChef(newChef){
    let newData = await chef.create(newChef);

    return { newData };
}

// Endpoint to create a new Chef
app.post("/chefs/new", async (req, res) => {
  try{
    let newChef = req.body.newChef;
    let response = await addNewChef(newChef);

    return res.status(200).json(response);
  } catch(error){
    return res.status(500).json({ message: "Error creating a new Chef.", error: error.message });
  }
});

// function to update a chef by Id
async function updateChefById(newData, id){
 let chefDetails = await chef.findOne({ where: { id } });

 if(!chefDetails){
    return {};
 }

 chefDetails.set(newData);
 let updatedChef = await chefDetails.save();

 return { message: "Chef updated successfully.", updatedChef };
}

// Endpoint to update a chef by Id
app.post("/chefs/update/:id", async (req, res) => {
  try{
    let newChefData = req.body;
    let id = parseInt(req.params.id);
    let response = await updateChefById(newChefData, id);

    return res.status(200).json(response);
  } catch(error){
    return res.status(500).json({ message: "Error updating a chef.", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on Port: 3000");
}); 


