const fs = require("fs");

// See if config file exists
try {
    if (fs.existsSync('Config.json')) {
        console.log("The file exists dont need to make it.");
    } else {
        console.log('The file does not exist so trying to make it.');
        fs.writeFileSync('Config.json', "{\n" +
            "  \"Token\": \"(discord bot token)\",\n" +
            "  \"Your Discord Id\": \"(id)\",\n" +
            "  \"Image Folder Path\": \"(path)\",\n" +
            "  \"OutPut Path\": \"(path)\"\n" +
            "}", function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        })
        console.log(".env file made");
        console.log("\nUse any file editor you want and edit the file called \"Config.json\" and replace the brackets")
        process.exit(1);
    }
} catch (err) {
    console.error(err);
}

const config = JSON.parse(fs.readFileSync("Config.json"));
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    
});

client.login(config.Token);