 function signUplogic(ctx){
    //const results = await myDb.queryAll();
    const body = ctx.request.body; 
    const db = require('../db');
    const myDb = new db(false);
    //await myDb.refreshLoginDd()
     myDb.enterUnamePass(body.username,body.password)



}
module.exports = signUplogic;