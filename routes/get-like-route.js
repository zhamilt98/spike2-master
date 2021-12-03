async function getlikedRecipes( ctx, myDb ) {
    // console.log(`recipe ${JSON.stringify(recipe)}`);
    // console.log(`session info? :${JSON.stringify(ctx.session)}`);
    const query = async function query( id ){
        // const db = require('../db');
        // const myDb = new db(false);
        return await myDb.getLikes( id );
    }

    // return await myDb.getLikes( ctx.session.userId );
    return await query( ctx.session.userId );
}


module.exports = getlikedRecipes;