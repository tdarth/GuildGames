import Settings from '../features/Settings';

const metadata = FileLib.read("GuildGames", "./metadata.json");
const version = JSON.parse(metadata).version;

function stripColorCodes(message) {
    return message.replace(/§[0-9A-FK-ORa-fk-or]/g, '');
}

register("chat", (event) => {
    if (!Settings.enabled) {
        return;
    }

    const message = ChatLib.getChatMessage(event);
    const cleanMessage = stripColorCodes(message);

    const startRegex = /Guild > (?:(?:\[[^\]]+\]\s)*)(\w+)(?:\s(?:\[[^\]]+\]))?: @info/;
    const startMatch = cleanMessage.match(startRegex);

    if (startMatch) {
        ChatLib.command(`gc GuildGames ${version} by tdarth.`);
    }

}).setCriteria("Guild > ").setContains();
