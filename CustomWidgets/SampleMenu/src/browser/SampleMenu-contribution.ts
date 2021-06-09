/********************************************************************************
 * Copyright (C) 2020 TORO Limited and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { Command, CommandContribution, CommandRegistry, MAIN_MENU_BAR, MenuContribution, MenuModelRegistry, MenuNode, SubMenuOptions } from '@theia/core/lib/common';
import { injectable } from '@theia/core/shared/inversify';

const SampleCommand: Command = {
    id: 'sample-command',
    label: 'Widget 1'
};
const SampleCommand2: Command = {
    id: 'sample-command2',
    label: 'Options'
};

const SampleCommand3: Command = {
    id: 'sample-command3',
    label: 'Widget 2'
};

@injectable()
export class SampleCommandContribution implements CommandContribution {
    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(SampleCommand, {
            execute: () => {
                alert('A widget will pop up (Widget 1)');
            }
        });
        commands.registerCommand(SampleCommand2, {
            execute: () => {
                alert('A widget will pop up (Options)');
            }
        });
        commands.registerCommand(SampleCommand3, {
            execute: () => {
                alert('A widget will pop up (Widget 3)');
            }
        });
    }

}

@injectable()
export class SampleMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {
        const subMenuPath = [...MAIN_MENU_BAR, 'sample-menu'];
        menus.registerSubmenu(subMenuPath, 'MD3i', {
            order: '2' // that should put the menu right next to the File menu
        });
        menus.registerMenuAction(subMenuPath, {
            commandId: SampleCommand.id,
            order: '0'
        });
        const subSubMenuPath = [...subMenuPath, 'sample-sub-menu'];
        menus.registerSubmenu(subSubMenuPath, 'Mapper', { order: '2' });
        menus.registerMenuAction(subSubMenuPath, {
            commandId: SampleCommand3.id,
            order: '1'
        });
        menus.registerMenuAction(subSubMenuPath, {
            commandId: SampleCommand2.id,
            order: '2'
        });
        /*const placeholder = new PlaceholderMenuNode([...subSubMenuPath, 'placeholder'].join('-'), 'Placeholder', { order: '0' });
        menus.registerMenuNode(subSubMenuPath, placeholder);*/
    }

}

/**
 * Special menu node that is not backed by any commands and is always disabled.
 */
export class PlaceholderMenuNode implements MenuNode {

    constructor(readonly id: string, public readonly label: string, protected options?: SubMenuOptions) { }

    get icon(): string | undefined {
        return this.options?.iconClass;
    }

    get sortString(): string {
        return this.options?.order || this.label;
    }

}

/*export const bindSampleMenu = (bind: interfaces.Bind) => {
    bind(CommandContribution).to(SampleCommandContribution).inSingletonScope();
    bind(MenuContribution).to(SampleMenuContribution).inSingletonScope();
};*/
