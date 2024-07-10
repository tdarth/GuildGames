import { Command } from "./command";
import Settings from "../Settings";
import { staff, loadStaffList } from "../commands/addStaff";

loadStaffList();

export class GuessingGame {
    answer = null;
    status = false;

    constructor (name, start, guess, end) {
        new Command(name, (username, args) => {
            if (args.length < 1) return;

            let operation = args.shift();

            switch (operation) {
                case "start":
                    if (!staff.includes(username)) return; // Player is not staff
                    if (this.status == true) return; // Game is already running

                    this.answer = start(args);
                    this.status = true;
                    break;
                case "end":
                    if (!staff.includes(username)) return; // Player is not staff
                    if (this.status == false) return; // Game is not running

                    end(this.answer);
                    this.status = false;
                    break;
                case "guess":
                    if (this.status == false) return; // Game is not running
                    if (args.length < 1) return; // Not enough args

                    if (guess(username, args, this.answer)) this.status = false;
                    break;
            }
        });
    }
}