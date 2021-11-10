async function getlikedRecipes( ctx ) {
    // console.log(`recipe ${JSON.stringify(recipe)}`);
    // console.log(`session info? :${JSON.stringify(ctx.session)}`);
    const db = require('../db');
    const myDb = new db(false);

    return await myDb.getLikes( ctx.session.userId );
}

module.exports = getlikedRecipes;