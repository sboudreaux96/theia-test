/**
 * Generated using theia-extension-generator
 */
import { HelloWorldOpenWidgetCommandContribution, HelloWorldOpenWidgetMenuContribution } from './HelloWorldOpenWidget-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";
import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(HelloWorldOpenWidgetCommandContribution);
    bind(MenuContribution).to(HelloWorldOpenWidgetMenuContribution);
});
