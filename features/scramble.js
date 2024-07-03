import { words } from '../utils/words';
import { staff, loadStaffList } from "../commands/addStaff";
import Settings from '../features/Settings';

let currentWord = "";
let scrambledWord = "";
let scrambleGameActive = false;

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function scrambleWord(word) {
    const letters = word.split('');
    for (let i = letters.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
}


function stripColorCodes(message) {
    return message.replace(/§[0-9A-FK-ORa-fk-or]/g, '');
}

loadStaffList();

register("chat", (event) => {
    if (!Settings.enabled || !Settings.scramble) {
        return;
    }

    const message = ChatLib.getChatMessage(event);
    const cleanMessage = stripColorCodes(message);

    const startRegex = /Guild > (?:(?:\[[^\]]+\]\s)*)(\w+)(?:\s(?:\[[^\]]+\]))?: @scramble start/;
    const startMatch = cleanMessage.match(startRegex);

    const endRegex = /Guild > (?:(?:\[[^\]]+\]\s)*)(\w+)(?:\s(?:\[[^\]]+\]))?: @scramble end/;
    const endMatch = cleanMessage.match(endRegex);

    const guessRegex = /Guild > (?:(?:\[[^\]]+\]\s)*)(\w+)(?:\s(?:\[[^\]]+\]))?: @scramble guess (\S+)/;
    const guessMatch = cleanMessage.match(guessRegex);

    if (startMatch) {
        const username = cleanMessage.match(startRegex)[1];
        if (staff.includes(username)) {
            currentWord = getRandomWord();
            scrambledWord = scrambleWord(currentWord);
            scrambleGameActive = true;
            ChatLib.command(`gc A Scramble game has started! Unscramble this word: ${scrambledWord} using /gc @scramble guess <word>.`);
            setTimeout(() => {
                ChatLib.chat(Settings.chatPrefix + "&aThe correct answer is &2" + currentWord + "&a.")
            }, "50");
        }
    }

    if (endMatch) {
        const username = endMatch[1];
        if (staff.includes(username)) {
            setTimeout(() => {
                ChatLib.command(`gc The game was ended. The correct word was ${currentWord}.`);
                currentWord = "";
                scrambledWord = "";
                scrambleGameActive = false;
            }, 100);
        }
    }

    if (guessMatch) {
        const username = cleanMessage.match(guessRegex)[1];
        const guess = cleanMessage.match(guessRegex)[2];
        if (guess.toLowerCase() === currentWord.toLowerCase()) {
            ChatLib.command(`gc Congratulations ${username}, you unscrambled the word correctly! The word was ${currentWord}.`);
            currentWord = "";
            scrambledWord = "";
            scrambleGameActive = false;
        } else {

        }
    }
}).setCriteria("Guild > ").setContains();

register("command", () => {
    currentWord = "";
    scrambledWord = "";
    scrambleGameActive = false;
    ChatLib.chat(Settings.chatPrefix + "&aForce ended game.")
}).setName("forceendscramble").setAliases("endscramble", "scrambleend");