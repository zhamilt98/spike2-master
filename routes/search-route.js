const axios = require('axios').default;

async function searchRecipes( ctx ) {
    const list = JSON.parse(ctx.request.query.list);
    const queryString = generateQueryString( list );
    console.log(`generated qs: ${queryString}`);


    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients${queryString}`);
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

function generateQueryString( ingredients ) {
    console.log(`ingredients in geneerateqsfunc ${ingredients}`);
    console.log(ingredients.length);
    let queryString = '?apiKey=82f2d05fb8a94156b1c26dbde785fb6b&number=2&ingredients=';

    for ( let i = 0; i < ingredients.length; i++ ){
        if ( i > 0 ) {
            queryString += `,+${ingredients[ i ].name}`;
        } else {
            queryString +=  ingredients[ i ].name;
        }
    }
    return queryString;
}

module.exports = searchRecipes;