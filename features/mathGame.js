import Settings from '../features/Settings';
import { staff, loadStaffList } from "../commands/addStaff";

let mathGameActive = false;
let correctAnswer = 0;

loadStaffList();

function generateMathEquation() {
    const operators = ['+', '-', '*', '/'];
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let equation = `${num1} ${operator} ${num2}`;
    correctAnswer = eval(equation);
    return equation;
}

function stripColorCodes(message) {
    return message.replace(/§[0-9A-FK-ORa-fk-or]/g, '');
}

register("chat", (event) => {
    if (!Settings.enabled || !Settings.mathgame) {
        return;
    }

    const message = ChatLib.getChatMessage(event);
    const cleanMessage = stripColorCodes(message);

    const startRegex = /Guild > (?:(?:\[[^\]]+\]\s)*)(\w+)(?:\s(?:\[[^\]]+\]))?: @math start/;
    const startMatch = cleanMessage.match(startRegex);

    const endRegex = /Guild > (?:(?:\[[^\]]+\]\s)*)(\w+)(?:\s(?:\[[^\]]+\]))?: @math end/;
    const endMatch = cleanMessage.match(endRegex);

    if (startMatch) {
        const username = startMatch[1];
        if (staff.includes(username)) {
            const equation = generateMathEquation();
            ChatLib.command(`gc A math game has started! Solve the expression: ${equation} using @math guess <number>.`);
            mathGameActive = true;
            setTimeout(() => {
                ChatLib.chat(Settings.chatPrefix + "&aThe correct answer is &2" + correctAnswer + "&a.");
            }, 50);
        }
    }

    if (mathGameActive) {
        const guessRegex = /Guild > (?:\[[^\]]+\]\s)?(\w+)(?:\s\[[^\]]+\])?: @math guess (-?\d*\.?\d+)/;
        const guessMatch = cleanMessage.match(guessRegex);

        if (guessMatch) {
            const player = guessMatch[1];
            const guess = parseFloat(guessMatch[2]);

            if (Math.abs(guess - correctAnswer) < 1e-6) {
                ChatLib.command(`gc Congratulations ${player}, you solved the expression correctly! The answer is ${correctAnswer}.`);
                mathGameActive = false;
                correctAnswer = 0;
            }
        }
    }

    if (endMatch) {
        const username = endMatch[1];
        if (staff.includes(username)) {
            setTimeout(() => {
                ChatLib.command(`gc The game was ended. The correct answer was ${correctAnswer}.`);
                mathGameActive = false;
                correctAnswer = 0;
            }, 100);
        }
    }

}).setCriteria("Guild > ").setContains();
