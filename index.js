#!/usr/bin/env node

const fs = require('fs');

// Method #2 to wrap the lstat function with promise

// const util = require('util');
// const lstat = util.promisify(fs.lstat);


// Method #2 to wrap the lstat function with promise
const {lstat} = fs.promises;


fs.readdir(process.cwd(), async (err, fileNames) =>{
    if(err){
        console.log(err);
    }

    // Very bad code here

    for (let fileName of fileNames){

        try{
            const stats = await lstat(fileName);

            console.log(fileName, stats.isFile());
        }catch(err) {
            console.log(err);
        } 
    }
});


// Method #1 to wrap the lstat function with promise


// const lstat = fileName => {
//     return new Promise( (resolve, reject) => {
//         fs.lstat(fileName, (err, stats)=>{
//             if(err){
//                 reject(err);
//             }

//             resolve(stats);
//         });
//     });
// };