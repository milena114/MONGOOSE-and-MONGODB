require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8000;

// Connect to MongoDB
mongoose
.connect(process.env.MONGO_URI, {})
.then(() => console.log('MongoDB Connected'))
.catch((err) => {
    console.error('MongoDB Connection Error: ', err);
});


// Person Schema
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: [String]
});

// Person Model
const Person = mongoose.model('Person', personSchema);

// Creating a Person
const person = new Person({
    name: 'John',
age: 37,
    favoriteFoods: ['Pizza', 'Burger']
});

person
.save()
.then(() => console.log('Person Created'))
.catch((err) => console.error(err));


// Creating Array of People
const arrayOfPeople = [
   {name: 'Jane', age: 27, favoriteFoods: ['Pasta', 'Salad']},
    {name: 'Jim', age: 47, favoriteFoods: ['Steak', 'Chicken']},
    {name: 'Jill', age: 57, favoriteFoods: ['Fish', 'Rice']}
];

Person
.insertMany(arrayOfPeople)
.then(() => console.log('Array of People Created'))
.catch((err) => console.error(err));


// // Getting All People
Person
.find()
.then((people) => console.log('All People: ', people))
.catch((err) => console.error(err));

// //Getting By favorite food
Person
.find({favoriteFoods: 'Pizza'})
.then((people) => console.log('People with favorite food pizza: ', people))
.catch((err) => console.error(err));

// // Getting By ID

Person
.findById('66fe89f8f311f26f59b8f119')
.then((person) => console.log('Person by ID: ', person))
.catch((err) => console.error(err));

// // Updating Favoritefood by ID
Person
.findById('66fe89f8f311f26f59b8f119')
.then((person) => {
   person.favoriteFoods.push('Hamburger');
person
    .save()
    .then(() => console.log('Favorite Food Updated'))
    .catch((err) => console.error(err));
})
.catch((err) => console.error(err));

// // Find by Name and Update AGe
Person
.findOneAndUpdate({name: 'Jane'}, {age: 20}, {new: true})
.then((person) => console.log('Person Updated: ', person))
.catch((err) => console.error(err));

// // Delete by ID
Person
.findByIdAndDelete('66fe88849dd60212ef6e7ddf')
.then(() => console.log('Person Deleted'))
.catch((err) => console.error(err));

//Supprimer des personnes
// Person
// .deleteMany()


// // Port Confg

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
