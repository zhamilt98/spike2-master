 function loginLogic(ctx){
    //const results = await myDb.queryAll();
    const body = ctx.request.body; 
    const db = require('../db');
    const myDb = new db(false);
    //await myDb.refreshLoginDd()
    console.log(body.username)
   if( body.pass === myDb.returnAcc(body.username)){
       console.log('loggedin')
   }
   else{
   console.log('you failed')
   }


}
module.exports = loginLogic;