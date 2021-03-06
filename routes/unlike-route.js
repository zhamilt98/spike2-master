function unlikeRecipe( ctx, myDb ) {
    const title = ctx.request.query.title;

    // const db = require('../db');
    // const myDb = new db(false);

    try {
        myDb.unlikeRecipe( ctx.session.userId, title );
        return 200;
    } catch ( err ) {
        console.log(`err: ${JSON.stringify(err)}`);
        return 500;
    }
}

module.exports = unlikeRecipe;