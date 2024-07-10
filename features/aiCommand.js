import Settings from '../Settings';
import { Command } from "../utils/command";
import { staff, loadStaffList } from "../commands/addStaff";
import { request } from "axios";

loadStaffList();

new Command("aichat", (username, args) => {
    let prompt = args.join(" ");
    
    if (staff.includes(username)) {
        request({
            url: "https://ai.spin.rip/chat",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                prompt: prompt,
                name: username
            },
            json: true
        })
        .then(response => {
            if (response.data && response.data.response) {
                ChatLib.command(`gc ${response.data.response}`);
            } else {
                ChatLib.chat(Settings.chatPrefix + "&cError!");
            }
        })
        .catch(error => {
            if (error.isAxiosError) {
                ChatLib.chat(Settings.chatPrefix + "&c" + error.code + ": " + error.response.data);
            } else {
                ChatLib.chat(Settings.chatPrefix + "&c" + error.code + ": " + error.message);
            }
        })
    }
});
