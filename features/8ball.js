import Settings from '../features/Settings';
import { staff, loadStaffList } from "../commands/addStaff";

loadStaffList();

const responses = [`, it is certain.`, `, it is decidedly so.`, `, without a doubt.`, `, yes - definitely.`, `, you may rely on it.`, `, as I see it, yes.`, `, most likely.`, `, outlook good.`, `, yes.`, `, signs point to yes.`, `, reply hazy, try again.`, `, ask again later.`, `, better not tell you now.`, `, cannot predict now.`, `, concentrate and ask again.`, `, don't count on it.`, `, my reply is no.`, `, my sources say no.`, `, outlook not so good.`, `, very doubtful.`];

function stripColorCodes(message) {
    return message.replace(/§[0-9A-FK-ORa-fk-or]/g, '');
}

register("chat", (event) => {
    if (!Settings.enabled || !Settings.eightball) {
        return;
    }

    const message = ChatLib.getChatMessage(event);
    const cleanMessage = stripColorCodes(message);

    const eightBallRegex = /Guild > (?:(?:\[[^\]]+\]\s)*)(\w+)(?:\s(?:\[[^\]]+\]))?: @8ball (.+)/;
    const eightBallMatch = cleanMessage.match(eightBallRegex);

    if (eightBallMatch) {
        const username = eightBallMatch[1];
        const prompt = eightBallMatch[2];

        ChatLib.command(`gc ${username}` + responses[Math.floor(Math.random() * responses.length)])
    }
}).setCriteria("Guild > ").setContains();