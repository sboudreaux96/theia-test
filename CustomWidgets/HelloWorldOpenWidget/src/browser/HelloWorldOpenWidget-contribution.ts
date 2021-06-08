import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";

export const HelloWorldOpenWidgetCommand = {
    id: 'HelloWorldOpenWidget.command',
    label: "Say Hello"
};

@injectable()
export class HelloWorldOpenWidgetCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(HelloWorldOpenWidgetCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class HelloWorldOpenWidgetMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: HelloWorldOpenWidgetCommand.id,
            label: HelloWorldOpenWidgetCommand.label
        });
    }
}
