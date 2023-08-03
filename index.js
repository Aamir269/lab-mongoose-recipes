
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const recipesData = require('./data.json'); // Adjust the path as needed

async function main() {
  try {
    // Connect to the database
    await mongoose.connect('mongodb://127.0.0.1:27017/receipe-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database');

    // Iteration 2: Create a recipe
    const newRecipe = {
      title: 'Delicious Pasta Carbonara',
      level: 'Amateur Chef',
      ingredients: ['200g spaghetti', '100g pancetta', '2 large eggs', '50g Pecorino cheese', 'Salt and black pepper'],
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://example.com/pasta-carbonara.jpg',
      duration: 30,
      creator: 'John Doe',
      created: new Date(),
    };

    const createdRecipe = await Recipe.create(newRecipe);
    console.log(`Recipe added: ${createdRecipe.title}`);

    // Iteration 3: Insert multiple recipes
    const insertedRecipes = await Recipe.insertMany(recipesData);
    console.log('Inserted recipes:');
    insertedRecipes.forEach(recipe => {
      console.log(recipe.title);
    });

    // Iteration 4: Update recipe
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
    );
    console.log(`Updated recipe: ${updatedRecipe.title}`);

    // Iteration 5: Remove a recipe
    const deletedRecipe = await Recipe.deleteOne({ title: 'Carrot Cake' });
    console.log('Deleted recipe:', deletedRecipe);

    // Close the database connection
    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
