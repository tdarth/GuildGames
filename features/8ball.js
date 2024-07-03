import Settings from '../features/Settings';
import { staff, loadStaffList } from "../commands/addStaff";

loadStaffList();

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
    
        const random = Math.floor(Math.random() * 20) + 1;
    
        switch(random) {
            case 1:
                ChatLib.command(`gc ${username}, it is certain.`);
                break;
            case 2:
                ChatLib.command(`gc ${username}, it is decidedly so.`);
                break;
            case 3:
                ChatLib.command(`gc ${username}, without a doubt.`);
                break;
            case 4:
                ChatLib.command(`gc ${username}, yes - definitely.`);
                break;
            case 5:
                ChatLib.command(`gc ${username}, you may rely on it.`);
                break;
            case 6:
                ChatLib.command(`gc ${username}, as I see it, yes.`);
                break;
            case 7:
                ChatLib.command(`gc ${username}, most likely.`);
                break;
            case 8:
                ChatLib.command(`gc ${username}, outlook good.`);
                break;
            case 9:
                ChatLib.command(`gc ${username}, yes.`);
                break;
            case 10:
                ChatLib.command(`gc ${username}, signs point to yes.`);
                break;
            case 11:
                ChatLib.command(`gc ${username}, reply hazy, try again.`);
                break;
            case 12:
                ChatLib.command(`gc ${username}, ask again later.`);
                break;
            case 13:
                ChatLib.command(`gc ${username}, better not tell you now.`);
                break;
            case 14:
                ChatLib.command(`gc ${username}, cannot predict now.`);
                break;
            case 15:
                ChatLib.command(`gc ${username}, concentrate and ask again.`);
                break;
            case 16:
                ChatLib.command(`gc ${username}, don't count on it.`);
                break;
            case 17:
                ChatLib.command(`gc ${username}, my reply is no.`);
                break;
            case 18:
                ChatLib.command(`gc ${username}, my sources say no.`);
                break;
            case 19:
                ChatLib.command(`gc ${username}, outlook not so good.`);
                break;
            case 20:
                ChatLib.command(`gc ${username}, very doubtful.`);
                break;
            default:
                ChatLib.command(`gc ${username}, Error: Invalid response.`);
                break;
        }
    } 
}).setCriteria("Guild > ").setContains();
