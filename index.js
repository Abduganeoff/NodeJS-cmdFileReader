#!/usr/bin/env node

const fs = require('fs');


fs.readdir(process.cwd(), (err, fileNames) =>{
    if(err){
        console.log(err);
    }

    // Very bad code here

    const statsList = Array(fileNames.length).fill(null);
    for (let fileName of fileNames){
        const index = fileNames.indexOf(fileName);

        fs.lstat(fileName, (err, status)=>{
            if(err){
                console.log(err);
            }

            statsList[index] = status;

            const ready = statsList.every((stats)=> {
                return stats;
            });

            if(ready) {
                statsList.forEach((stats, index)=>{
                    console.log(fileNames[index], stats.isFile());
                });
            }

        })
    }
})