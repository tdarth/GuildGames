import Settings from "./features/Settings";

// Commands
import './commands/addStaff';

// Features
import './features/rngGame';
import './features/mathGame';
import './features/aiCommand';
import './features/8ball';
import './features/scramble';
import './features/infoCommand';

// Utils
import './utils/words';

register("command", () => Settings.openGUI()).setName('guildgames').setAliases('gamesguild', 'gg');

ChatLib.chat('\n' + Settings.chatPrefix + "&aLoaded! &8(&7/gg&8) \n &8└ &7a Guild Mod by &btdarth&7. \n")