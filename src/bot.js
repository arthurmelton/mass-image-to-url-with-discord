const fs = require("fs");

try {
    if (fs.existsSync('Config.json')) {
        console.log("The file exists dont need to make it.");
    } else {
        console.log('The file does not exist so trying to make it.');
        fs.writeFileSync('Config.json', "{\n" +
            "  \"Token\": \"(discord bot token)\",\n" +
            "  \"Your_Discord_Id\": \"(Your discord id or someone you hate bc it will mass message them)\",\n" +
            "  \"Image_Folder_Path\": \"(File directory path)\",\n" +
            "  \"OutPut_Path\": \"(The file that all the urls will go to)\",\n" +
            "  \"Delete\": \"(True or False)\"\n" +
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
var ProgressBar = require('progress');

if (!fs.existsSync(config.OutPut_Path)) {
    fs.writeFileSync(config.OutPut_Path, "");
}

client.on('ready', () => {
    fs.readdir(config.Image_Folder_Path, (err, files) => {
        var bar = new ProgressBar(` [:bar] :current/:total :percent :etas`, {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: files.length
        });
        var x = 0; 
        files.forEach(file => {
            if (`${config.Image_Folder_Path}/${file}` !== config.OutPut_Path) {
                const attachment = new MessageAttachment(`${config.Image_Folder_Path}/${file}`);
                client.users.cache.get(config.Your_Discord_Id).send(attachment)
                    .then(function(messageSent) {
                        fs.writeFileSync(config.OutPut_Path, `${fs.readFileSync(config.OutPut_Path)}\n${messageSent.attachments.first().url}`);
                        bar.tick(1);
                        if (config.Delete == "true" && `${config.Image_Folder_Path}/${file}` !== config.OutPut_Path) {
                            fs.unlinkSync(`${config.Image_Folder_Path}/${file}`);
                        }
                        x++;
                        if (x == files.length) {
                            console.log("DONE");
                            process.exit(1);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        bar.tick(1);
                        x++;
                        if (x == files.length) {
                            console.log("DONE");
                            process.exit(1);
                        }
                    });
            }
            else {
                bar.tick(1);
                x++;
                if (x == files.length) {
                    console.log("DONE");
                    process.exit(1);
                }
            }
        })
    })
});

client.login(config.Token);