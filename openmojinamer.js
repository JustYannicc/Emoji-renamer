const fs = require("fs");
const path = require("path");
const openmoji = require("openmoji");

const folderPath = path.join(process.env.USERPROFILE, "Downloads", "openmoji-svg-color");

const convertEmojiUnicodeToName = (fileName) => {
    const emojiHexcode = fileName.split(".")[0];
    const openmojiEmoji = openmoji.openmojis.find((emoji) => emoji.hexcode === emojiHexcode);
    if (openmojiEmoji) {
        return openmojiEmoji.annotation.replace(/[^a-zA-Z0-9]+/g, " ");
    } else {
        return emojiHexcode;
    }
};

fs.readdir(folderPath, (error, fileNames) => {
    if (error) {
        console.error(`Error reading directory ${folderPath}:`, error);
        return;
    }
    fileNames.forEach((fileName) => {
        const emojiName = convertEmojiUnicodeToName(fileName);
        fs.rename(path.join(folderPath, fileName), path.join(folderPath, emojiName + ".svg"), (err) => {
            if (err) {
                console.error(`Error renaming file ${fileName}:`, err);
                return;
            }
            console.log(`${fileName} renamed to ${emojiName}.svg`);
        });
    });
});
