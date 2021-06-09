import { injectable, inject } from "inversify";
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from "@theia/core/lib/common";
import { CommonMenus, CommonCommands } from "@theia/core/lib/browser";
import { GettingStartedCommand } from '@theia/getting-started/lib/browser/getting-started-contribution';
import { WorkspaceCommands } from '@theia/workspace/lib/browser/workspace-commands';
import { TerminalCommands } from '@theia/terminal/lib/browser/terminal-frontend-contribution';
//import { CommonMenus } from '@theia/core/lib/browser/common-frontend-contribution';
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
    protected _command: Command = GettingStartedCommand;
    protected _command2: Command = WorkspaceCommands.NEW_FILE;
    protected _command3: Command = WorkspaceCommands.OPEN;
    protected _command4: Command = TerminalCommands.NEW;
    protected _command5: Command = CommonCommands.OPEN_PREFERENCES;
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
            this.menuRegistry.unregisterMenuAction(this._command2.id);
            this.menuRegistry.unregisterMenuAction(this._command3.id);
            this.menuRegistry.unregisterMenuAction(this._command4.id);
            this.menuRegistry.unregisterMenuAction(this._command5.id);
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
