function likeRecipe( ctx ) {
    const recipe = JSON.parse(ctx.request.query.recipe);
    console.log(`recipe ${JSON.stringify(recipe)}`);
    console.log(`session info? :${JSON.stringify(ctx.session)}`)
}

module.exports = likeRecipe;