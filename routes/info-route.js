async function getRecipeInfo( ctx ) {
    const axios = require('axios').default;
    const recipeId = ctx.request.query.recipeId;

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=9293ae6c24ec4c1c859941bb686c5c19`);
        // console.log(response);
        // const res = {
        //     image: response.data.image,
        //     summary: response.summary,
        // };
        console.log(response.data);
        return response.data;
    } catch ( err ) {
        console.log(`err: ${err}`);
    }
}

module.exports = getRecipeInfo;