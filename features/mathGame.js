import Settings from "../Settings";
import { GuessingGame } from "../utils/guessingGame";

function generateMathEquation() {
    const operators = ['+', '-', '*', '/'];
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let equation = `${num1} ${operator} ${num2}`;
    correctAnswer = eval(equation);
    return [equation, correctAnswer];
}

new GuessingGame("math",
    (args) => {
        const [equation, correctAnswer] = generateMathEquation();
        setTimeout(() => {
            ChatLib.chat(Settings.chatPrefix + "&aThe correct answer is &2" + correctAnswer + "&a.");
            ChatLib.command(`gc A math game has started! Solve the expression: ${equation} using /gc ${Settings.commandPrefix}math guess <number>.`);
        }, 100);

        return correctAnswer;
    },
    (username, args, answer) => {
        const guess = parseFloat(args[0]);

        if (Math.abs(guess - correctAnswer) < 1e-6) {
            ChatLib.command(`gc Congratulations ${username}, you solved the expression correctly! The answer is ${answer}.`);
            return true;
        }
    },
    (answer) => {
        setTimeout(() => {
            ChatLib.command(`gc The game was ended. The correct answer was ${answer}.`);
        }, 100);
    }
);
