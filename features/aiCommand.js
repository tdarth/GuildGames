import Settings from '../features/Settings';
import { staff, loadStaffList } from "../commands/addStaff";
import { request } from "axios";

loadStaffList();

function stripColorCodes(message) {
    return message.replace(/§[0-9A-FK-ORa-fk-or]/g, '');
}

register("chat", (event) => {
    if (!Settings.enabled || !Settings.aichat) {
        return;
    }

    const message = ChatLib.getChatMessage(event);
    const cleanMessage = stripColorCodes(message);

    const aiChatRegex = /Guild > (?:(?:\[[^\]]+\]\s)*)(\w+)(?:\s(?:\[[^\]]+\]))?: @aichat (.+)/;
    const aiChatMatch = cleanMessage.match(aiChatRegex);

    if (aiChatMatch) {
        const username = aiChatMatch[1];
        const prompt = aiChatMatch[2];

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
    }
}).setCriteria("Guild > ").setContains();
