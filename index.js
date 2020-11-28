#!/usr/bin/env node

const fs = require('fs');

// Method #2 to wrap the lstat function with promise
const {lstat} = fs.promises;


fs.readdir(process.cwd(), async (err, fileNames) =>{
    if(err){
        console.log(err);
    }

    const allPromises = fileNames.map( filename =>{
        return lstat(filename);
    })

    const allStats = await Promise.all(allPromises);

    for(let stats of allStats){
        const index = allStats.indexOf(stats);

        console.log(fileNames[index], stats.isFile());
    }

});
