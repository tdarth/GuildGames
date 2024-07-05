import { @Vigilant, @TextProperty, @ParagraphProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @ColorProperty, @CheckboxProperty, @SelectorProperty, @PercentSliderProperty, @SliderProperty, Color } from 'Vigilance';
const metadata = FileLib.read("GuildGames", "./metadata.json");
const version = JSON.parse(metadata).version;
@Vigilant("GuildGames", `§a§lGuild§r§2Games §f${version} §7by §btdarth`)

class Settings {

    @TextProperty({
        name: "Chat Prefix",
        description: "What do you want the &bChat Prefix&7 to be?",
        category: "Settings",
        placeholder: "Enter Chat Prefix..",
    })
    chatPrefix = "&8[&a&lGuild&2Games&8] &f";

    @ButtonProperty({
        name: "Reload ChatTriggers",
        description: "&7Reloading the module is &crequired&7 for some changes to apply.",
        placeholder: "Reload",
        category: "Settings"
    })
    reloadCT() {
        Client.showTitle('&f', "&a&lReloading...", 8, 50, 8);
        ChatLib.command("chattriggers load", true);
        Client.currentGui.close()
    }

    @ButtonProperty({
        name: "&e&lInformation",
        description: "&7Tells you how to use the &dmodule&7.",
        placeholder: "Click",
        category: "Settings"
    })
    infoButton() {
        Client.currentGui.close()
        ChatLib.chat(this.chatPrefix + "How to use:")
        ChatLib.chat("\n&a #1. Add yourself as a staff. &2/addstaff <Your Username> &a(Case Sensitive!)\n &f \n&a#2 Type &2/gg &aand go to the Toggles category to find all valid commands.\n &f \n&a#3 Type the command in &2guild chat &ato use!\n &f\n &3Bugs or suggestions? &bhttps://discord.gg/4xupsUQt2M&3!")
    }

    @SwitchProperty({
        name: "&a&l&nToggle&r &c&l&nModule&r",
        description: "&aEnables&7 or &cdisables&7 the module.",
        category: "Toggles"
    })
    enabled = true;

    @CheckboxProperty({
        name: "RNG Guessing",
        description: "&7Toggle the RNG Guessing game started via &f@rng start <number>&7 command.",
        category: "Toggles",
        subcategory: "Games"
    })
    rngguess = true;

    @CheckboxProperty({
        name: "Math Game",
        description: "&7Toggle the Math game started via &f@math start&7 command.",
        category: "Toggles",
        subcategory: "Games"
    })
    mathgame = true;

    @CheckboxProperty({
        name: "Word Scramble Game",
        description: "&7Toggle the &f@scramble start &7command.",
        category: "Toggles",
        subcategory: "Games"
    })
    scramble = true;

    @CheckboxProperty({
        name: "AI Command",
        description: "&7Toggle the &f@aichat <prompt> &7command.",
        category: "Toggles",
        subcategory: "Miscellaneous"
    })
    aichat = true;

    @CheckboxProperty({
        name: "8Ball Command",
        description: "&7Toggle the &f@8ball <prompt> &7command.",
        category: "Toggles",
        subcategory: "Miscellaneous"
    })
    eightball = true;

    constructor() {
        this.initialize(this);
        this.setSubcategoryDescription("Toggles", "RNG Guessing", "Games")
        this.setSubcategoryDescription("Toggles", "AI Command", "Miscellaneous")
    }
}

export default new Settings();
