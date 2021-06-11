import { injectable, inject } from "inversify";
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from "@theia/core/lib/common";
import { CommonMenus, CommonCommands, quickCommand, KeybindingContribution, KeybindingRegistry } from "@theia/core/lib/browser";
import { GettingStartedCommand } from '@theia/getting-started/lib/browser/getting-started-contribution';
import { WorkspaceCommands } from '@theia/workspace/lib/browser/workspace-commands';
import { TerminalCommands } from '@theia/terminal/lib/browser/terminal-frontend-contribution';
import { KeymapsCommands } from '@theia/keymaps/lib/browser/keymaps-frontend-contribution';
import { MonacoMenus } from '@theia/monaco/lib/browser/monaco-menu';
import { EditorMainMenu } from '@theia/editor/lib/browser/editor-menu';
//import { CommonMenus } from '@theia/core/lib/browser/common-frontend-contribution';
//import { WorkspaceCommands } from '@theia';

export const TheiaCustomMenuCommand = {
    id: 'TheiaCustomMenu.command',
    label: "Toggle 'Getting Started' Menu Item"
};

@injectable()
export class TheiaCustomMenuCommandContribution implements CommandContribution, MenuContribution, KeybindingContribution {

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
    protected _command6: Command = KeymapsCommands.OPEN_KEYMAPS;
    protected _command7: Command = WorkspaceCommands.NEW_FOLDER;
    protected _command8: Command = quickCommand
    //protected _command6: Command = TerminalCommands.NEW_ACTIVE_WORKSPACE;
    //protected _command6: Command = MAIN_MENU_BAR;
    //protected _command2: Command = WorkspaceCommands.OPEN;
    //adding a comment to test a commit

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(TheiaCustomMenuCommand, {
            execute: () => {
                this.toggleMenu(this.isEnabled);
                this.isEnabled = !this.isEnabled;
            }
        });
        registry.unregisterCommand(this._command8.id); //unregister the quick command command
    }


    //Currently the toggleMenu function only makes the getting started menu item togglable. 
    //If other menu items want to be togglable, implement changes in the 'else' section
    protected toggleMenu(isEnabled: boolean): void {
        if (isEnabled) {
            this.menuRegistry.unregisterMenuAction(this._command.id);
            this.menuRegistry.unregisterMenuAction(this._command3.id);
            this.menuRegistry.unregisterMenuAction(this._command4.id);
            this.menuRegistry.unregisterMenuAction(this._command5.id);
            this.menuRegistry.unregisterMenuAction(this._command6.id);
        } else {
            this.menuRegistry.registerMenuAction(CommonMenus.HELP, {
                commandId: this._command.id,
                label: this._command.label,
                order: 'a10'
            });
        }
    }

    //Anything we want Custom added/removed from the menu will go in this method
    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: TheiaCustomMenuCommand.id,
            label: TheiaCustomMenuCommand.label
        });

        //Removes whole Main Menu Items 
        this.menuRegistry.unregisterMenuAction(MonacoMenus.SELECTION.slice(-1)[0]); //Removes "Selection" from the Main menu
        this.menuRegistry.unregisterMenuAction(EditorMainMenu.GO.slice(-1)[0]); //Removes "Go" from the Main Menu

        //Removes items from the "file" menu
        this.menuRegistry.unregisterMenuAction(this._command2.id); //remove "new file" from file menu
        this.menuRegistry.unregisterMenuAction(this._command7.id); //remove "new folder" from file menu

        this.menuRegistry.unregisterMenuAction(this._command8.id);//unregister the quick command menu option
    }


    //unregister all keybindings associated with quick command
    registerKeybindings(keybindings: KeybindingRegistry): void {
        keybindings.unregisterKeybinding({
            command: quickCommand.id,
            keybinding: 'f1'
        });
        keybindings.unregisterKeybinding({
            command: quickCommand.id,
            keybinding: 'ctrlcmd+shift+p'
        });
    }
}

/*@injectable()
export class TheiaCustomMenuMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        /* menus.registerMenuAction(CommonMenus.EDIT_FIND, {
             commandId: TheiaCustomMenuCommand.id,
             label: TheiaCustomMenuCommand.label
         });
        menus.unregisterMenuAction(CommonMenus.FILE.slice(-1)[0]);
    }
}*/
