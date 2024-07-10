import Settings from '../Settings';
import PogObject from "PogData";

const pogObject = new PogObject("GuildGames", {
  staff: [],
});
// Uncomment to enable autosaving
// pogObject.autosave();

export let staff = pogObject.staff;

export function saveStaffList() {
    pogObject.staff = staff;
    pogObject.save();
}

export function loadStaffList() {
    staff = pogObject.staff;
}

function updateStaffList() {
    saveStaffList();
}

register("command", (player) => {
    if (!player) {
        ChatLib.chat(Settings.chatPrefix + "&cMissing an argument! &4/setstaff <player>");
    } else {
        staff.push(player);
        ChatLib.chat(Settings.chatPrefix + "&aAdded &2" + player + " &ato the staff list.");
        ChatLib.chat("&8└ &7" + staff);
        updateStaffList();
    }
}).setName("setstaff").setAliases("addstaff");

register("command", (player) => {
    if (!player) {
        ChatLib.chat(Settings.chatPrefix + "&cMissing an argument! &4/removestaff <player>");
    } else {
        const index = staff.indexOf(player);
        if (index > -1) {
            staff.splice(index, 1);
            ChatLib.chat(Settings.chatPrefix + "&aRemoved &2" + player + " &afrom the staff list.");
        } else {
            ChatLib.chat(Settings.chatPrefix + "&cPlayer &4" + player + " &cis not in the staff list.");
        }
        ChatLib.chat("&8└ &7" + staff);
        updateStaffList();
    }
}).setName("removestaff").setAliases("staffremove");

register("command", () => {
    ChatLib.chat(Settings.chatPrefix + "&aYou have &2" + staff.length + " &aplayer(s) as staff.");
    ChatLib.chat("&8└ &7" + staff);
}).setName("liststaff").setAliases("stafflist");

register("command", () => {
    staff.length = 0;
    ChatLib.chat(Settings.chatPrefix + "&aThe &2staff&a list was cleared.");
    updateStaffList();
}).setName("clearstaff").setAliases("staffclear");
