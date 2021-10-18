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
    let queryString = '?apiKey=9293ae6c24ec4c1c859941bb686c5c19&number=4&ingredients=';

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