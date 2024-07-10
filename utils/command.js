import Settings from "../Settings";

const numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
]
function replaceNumbers(word) {
    let replacedWord = word;

    for (let i = 0; i < 10; i++) {
        replacedWord = replacedWord.replaceAll(i, numbers[i]);
    }

    return replacedWord;
}

export class Command {
    constructor (name, behavior) {
        register("chat", (user, args) => {
            if (user.includes(":")) return; // They tried to bypass

            args = args.trim().split(/ +/);
            if (args.shift() != name) return; // Wrong command

            if (!Settings[replaceNumbers(name) + "Enabled"]) return; // Command disabled

            let userRaw = user.match(/^(?:(?:\[[^\]]+\]\s)*)(\w+)(?:\s(?:\[[^\]]+\]))?/)[1]; // Get rid of hypixel/guild ranks

            behavior(userRaw, args);
        }).setCriteria("Guild > ${user}: " + Settings.commandPrefix + "${args}");
    }
}