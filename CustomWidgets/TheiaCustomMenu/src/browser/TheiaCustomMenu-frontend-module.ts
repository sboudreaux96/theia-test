/**
 * Generated using theia-extension-generator
 */
import { TheiaCustomMenuCommandContribution } from './TheiaCustomMenu-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";
import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(TheiaCustomMenuCommandContribution);
    bind(MenuContribution).to(TheiaCustomMenuCommandContribution);
});
