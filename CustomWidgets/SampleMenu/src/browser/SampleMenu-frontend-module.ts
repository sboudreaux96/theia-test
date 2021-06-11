/**
 * Generated using theia-extension-generator
 */
import { ContainerModule } from 'inversify';
import { SampleMenuContribution, SampleCommandContribution } from './SampleMenu-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";

export default new ContainerModule(bind => {

    // Replace this line with the desired binding, e.g. "bind(CommandContribution).to(SampleMenuContribution)
    bind(CommandContribution).to(SampleCommandContribution).inSingletonScope();
    bind(MenuContribution).to(SampleMenuContribution).inSingletonScope();
});
