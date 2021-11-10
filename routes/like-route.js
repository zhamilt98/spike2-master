function likeRecipe( ctx ) {
    const recipe = JSON.parse(ctx.request.query.recipe);
    const myEntry = {
        image: recipe.image,
        title: recipe.title,
    };
    console.log(`recipe ${JSON.stringify(recipe)}`);
    console.log(`session info? :${JSON.stringify(ctx.session)}`);

    const db = require('../db');
    const myDb = new db(false);

    try {
        myDb.likeRecipe( ctx.session.userId, JSON.stringify(myEntry) );
    } catch ( err ) {
        console.log(`err: ${JSON.stringify(err)}`);
    }
}

module.exports = likeRecipe;