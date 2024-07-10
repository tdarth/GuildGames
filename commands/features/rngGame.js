import Settings from '../features/Settings';
import { staff, saveStaffList, loadStaffList } from "../commands/addStaff";

let guessinggame = false;
let targetNumber = 0;

loadStaffList();

function stripColorCodes(message) {
    return message.replace(/§[0-9A-FK-ORa-fk-or]/g, '');
}

register("chat", (event) => {

    if (!Settings.enabled || !Settings.rngguess) {
        return;
    }

    const message = ChatLib.getChatMessage(event);
    const cleanMessage = stripColorCodes(message);

    const startRegex = /Guild > (?:(?:\[[^\]]+\]\s)*)(\w+)(?:\s(?:\[[^\]]+\]))?: @rng start (\d+)/;
    const startMatch = cleanMessage.match(startRegex);

    const endRegex = /Guild > (?:(?:\[[^\]]+\]\s)*)(\w+)(?:\s(?:\[[^\]]+\]))?: @rng end/;
    const endMatch = cleanMessage.match(endRegex);

    if (startMatch) {
        const username = startMatch[1];
        const maxNumber = parseInt(startMatch[2], 10);

        if (staff.includes(username)) {
            setTimeout(() => {
                targetNumber = Math.floor(Math.random() * maxNumber) + 1;
                ChatLib.command(`gc A guessing game has started! Guess a number between 1 and ${maxNumber} using /gc @rng guess <number>!`);
                guessinggame = true;
                setTimeout(() => {
                    ChatLib.chat(Settings.chatPrefix + "&aThe correct number is &2" + targetNumber + "&a.");
                }, 50);
            }, 50);
        }
    }

    if (endMatch) {
        const username = endMatch[1];
        if (staff.includes(username)) {
            setTimeout(() => {
                ChatLib.command(`gc The game was ended. The correct number was ${targetNumber}.`);
                guessinggame = false;
                targetNumber = 0;
            }, 100);
        }
    }

    if (guessinggame) {
        const guessRegex = /Guild > (?:(?:\[[^\]]+\]\s)*)(\w+)(?:\s(?:\[[^\]]+\]))?: @rng guess (\d+)/;
        const guessMatch = cleanMessage.match(guessRegex);

        if (guessMatch) {
            const player = guessMatch[1];
            const guess = parseInt(guessMatch[2], 10);

            if (guess === targetNumber) {
                setTimeout(() => {
                    ChatLib.command(`gc Congratulations ${player}, you guessed the correct number ${targetNumber}!`);
                    guessinggame = false;
                    targetNumber = 0;
                }, 100);
            }
        }
    }
}).setCriteria("Guild > ").setContains();