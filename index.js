#!/usr/bin/env node

const fs = require('fs');

// Method #2 to wrap the lstat function with promise
const {lstat} = fs.promises;

const chalk = require('chalk');
chalk.enabled = true;
chalk.level = 3;

const path = require('path');

const currentDir = process.argv[2] || process.cwd();


fs.readdir(currentDir, async (err, fileNames) =>{
    if(err){
        console.log(err);
    }

    const allPromises = fileNames.map( filename =>{
        return lstat(path.join(currentDir, filename));
    })

    const allStats = await Promise.all(allPromises);

    for(let stats of allStats){
        const index = allStats.indexOf(stats);

        if(stats.isFile()){
            console.log(fileNames[index], stats.isFile());
        } else {
            console.log(chalk.blue(fileNames[index]));
        }
    }

});
