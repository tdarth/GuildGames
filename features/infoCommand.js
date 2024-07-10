import Settings from '../Settings';

const metadata = FileLib.read("GuildGames", "./metadata.json");
const version = JSON.parse(metadata).version;

register("chat", (event) => {
    if (!Settings.enabled) return;
    ChatLib.command(`gc GuildGames ${version} by tdarth.`);
}).setCriteria("Guild > ${user}: " + Settings.commandPrefix + "info");
