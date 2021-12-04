function likeRecipe( ctx, myDb ) {
    const recipe = JSON.parse(ctx.request.query.recipe);
    const myEntry = {
        image: recipe.image,
        title: recipe.title,
        recipeId: recipe.id,
    };
    console.log(`recipe ${JSON.stringify(recipe)}`);
    console.log(`session info? :${JSON.stringify(ctx.session)}`);

    // const db = require('../db');
    // const myDb = new db(false);

    try {
        myDb.likeRecipe( ctx.session.userId, JSON.stringify(myEntry) );
        return 200;
    } catch ( err ) {
        console.log(`err: ${JSON.stringify(err)}`);
        return 500;
    }
}

module.exports = likeRecipe;