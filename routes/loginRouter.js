async function loginLogic(ctx){
    //const results = await myDb.queryAll();
    const body = ctx.request.body; 
    const db = require('../db');
    const myDb = new db(false);
    //await myDb.refreshLoginDd()
//     console.log(body.username)
//    if( body.pass === myDb.returnAcc(body.username, body.pass)){
//        console.log('loggedin')
//    }
//    else{
//     console.log('you failed')
//    }

   try {
       console.log(JSON.stringify(body));
       console.log(body.username);
        const res = await myDb.returnAcc(body.username, body.password);
        if ( res.length > 0 ) {
            console.log(JSON.stringify(res));
            console.log('loggedin');
        }
   } catch ( err ) {
       console.log('error in login router');
        console.log(err);
   }
}
module.exports = loginLogic;