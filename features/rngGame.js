import Settings from "../Settings";
import { GuessingGame } from "../utils/guessingGame";

new GuessingGame("rng",
    (args) => {
        let answer = Math.floor(Math.random() * parseInt(args[0])) + 1
        setTimeout(() => {
            ChatLib.command(`gc A guessing game has started! Guess a number between 1 and ${args[0]} using /gc ${Settings.commandPrefix}rng guess <number>!`);
            setTimeout(() => {
                ChatLib.chat(Settings.chatPrefix + "&aThe correct number is &2" + answer + "&a.");
            }, 50);
        }, 50);

        return String(answer);
    },
    (username, args, answer) => {
        if (args[0] != answer) return;
        setTimeout(() => {
            ChatLib.command(`gc Congratulations ${username}, you guessed the correct number ${answer}!`);
        }, 100);

        return true;
    },
    (answer) => {
        setTimeout(() => {
            ChatLib.command(`gc The game was ended. The correct number was ${answer}.`);
        }, 100);
    }
);