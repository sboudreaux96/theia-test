import { injectable, inject } from "inversify";
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";
//import { GettingStartedCommand } from '@theia/getting-started/lib/browser/getting-started-contribution';
import { WorkspaceCommands } from '@theia/workspace/lib/browser/workspace-commands';
//import { WorkspaceCommands } from '@theia';

export const TheiaCustomMenuCommand = {
    id: 'TheiaCustomMenu.command',
    label: "Toggle 'Getting Started' Menu Item"
};

@injectable()
export class TheiaCustomMenuCommandContribution implements CommandContribution, MenuContribution {

    constructor(
        // @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    @inject(MenuModelRegistry)
    menuRegistry: MenuModelRegistry;

    protected isEnabled: boolean = true;
    //protected _command: Command = GettingStartedCommand;
    protected _command: Command = WorkspaceCommands.NEW_FILE;
    //protected _command2: Command = WorkspaceCommands.OPEN;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(TheiaCustomMenuCommand, {
            execute: () => {
                this.toggleMenu(this.isEnabled);
                this.isEnabled = !this.isEnabled;
            }
        });
    }

    protected toggleMenu(isEnabled: boolean): void {
        if (isEnabled) {
            this.menuRegistry.unregisterMenuAction(this._command.id);
        } else {
            this.menuRegistry.registerMenuAction(CommonMenus.HELP, {
                commandId: this._command.id,
                label: this._command.label,
                order: 'a10'
            });
        }
    }
    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: TheiaCustomMenuCommand.id,
            label: TheiaCustomMenuCommand.label
        });
    }
}

/*@injectable()
export class TheiaCustomMenuMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: TheiaCustomMenuCommand.id,
            label: TheiaCustomMenuCommand.label
        });
    }
}*/
