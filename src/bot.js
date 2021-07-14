const fs = require("fs");

try {
    if (fs.existsSync('Config.json')) {
        console.log("The file exists dont need to make it.");
    } else {
        console.log('The file does not exist so trying to make it.');
        fs.writeFileSync('Config.json', "{\n" +
            "  \"Token\": \"(discord bot token)\",\n" +
            "  \"Your_Discord_Id\": \"(id)\",\n" +
            "  \"Image_Folder_Path\": \"(path)\",\n" +
            "  \"OutPut_Path\": \"(path)\"\n" +
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
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();

fs.writeFileSync(config.OutPut_Path, "")

client.on('ready', () => {
    fs.readdir(config.Image_Folder_Path, (err, files) => {
        files.forEach(file => {
            const attachment = new MessageAttachment(`${config.Image_Folder_Path}/${file}`);
            client.users.cache.get(config.Your_Discord_Id).send(attachment)
                .then(function(messageSent) {
                    console.log(messageSent.attachments.first().url);
                    fs.writeFileSync(config.OutPut_Path, `${fs.readFileSync(config.OutPut_Path)}\n${messageSent.attachments.first().url}`);
                })
                .catch(console.error);
        })
    })
});

client.login(config.Token);