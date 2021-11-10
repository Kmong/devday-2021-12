/* eslint-disable no-useless-escape */
export const WELCOME_TEXTS = {
    KMONG: [
        " __  ___ .___  ___.   ______   .__   __.   _______                          \r\n",
        "|  |/  / |   \/   |  /  __  \  |  \ |  |  /  _____|                         \r\n",
        "|  '  /  |  \  /  | |  |  |  | |   \|  | |  |  __                           \r\n",
        "|    <   |  |\/|  | |  |  |  | |  . \`  | |  | |_ |                          \r\n",
        "|  .  \  |  |  |  | |  \`--'  | |  |\   | |  |__| |                          \r\n",
        "|__|\__\ |__|  |__|  \______/  |__| \__|  \______|                          \r\n"
    ],
    DEVDAY: [
        "       _______   ___________    ____       _______       ___   ____    ____ \r\n",
        "      |       \ |   ____\   \  /   /      |       \     /   \  \   \  /   / \r\n",
        "      |  .--.  ||  |__   \   \/   / ______|  .--.  |   /  ^  \  \   \/   /  \r\n",
        "      |  |  |  ||   __|   \      / |______|  |  |  |  /  /_\  \  \_    _/   \r\n",
        "      |  '--'  ||  |____   \    /         |  '--'  | /  _____  \   |  |     \r\n",
        "      |_______/ |_______|   \__/          |_______/ /__/     \__\  |__|     \r\n",
        "                                                                            \r\n",
    ],
};

export const RESET_COLOR = '\u001b[0m';
export const colors = {
    red: '\x1b[1;31m',
    white: '\x1b[37m',
};
export const NOT_FOUND = (command: string) => `${colors.red} Usage Error ${RESET_COLOR} Command "${command}" not found.\r\n\r\nUsage: devday <command>\r\n\r\nwhere <command> is one of:\n\r    start, readme, exit`;
export const SHOW_HELP = 'devday --help     display full usage info';

export const HELP_LIST = [{
    command: 'start',
    description: ' join devday',
    url: 'https://gather.town/app/AncfUoSib6cE7E1i/kmong',
}, {
    command: 'readme',
    description: 'visit notion',
    url: 'https://kmong.com'
}, {
    command: 'exit',
    description: '  join devday',
    url: '',
}] as const;

export const WITH_PROMPT = '\r\n$ ';
