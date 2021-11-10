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

    let id = '';

   try {
       console.log(JSON.stringify(body));
       console.log(body.username);
        const res = await myDb.returnAcc(body.username, body.password);
        console.log(`res in loginRouter.js: ${JSON.stringify(res)}`);
        if ( res !== undefined && res[0].id !== undefined ) {
            console.log(JSON.stringify(res));
            id = res[0].id;
            ctx.session.userId = res[0].id;
            console.log(`res: ${JSON.stringify(res)}`);
            console.log(`ctx.session: ${JSON.stringify(ctx.session)}`);
            console.log('loggedin');
        }
   } catch ( err ) {
       console.log('error in login router');
        console.log(err);
   }
   return id;
}
module.exports = loginLogic;