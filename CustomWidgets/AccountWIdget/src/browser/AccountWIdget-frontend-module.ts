import { ContainerModule } from 'inversify';
import { AccountWIdgetWidget } from './AccountWIdget-widget';
import { AccountWIdgetContribution } from './AccountWIdget-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, AccountWIdgetContribution);
    bind(FrontendApplicationContribution).toService(AccountWIdgetContribution);
    bind(AccountWIdgetWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: AccountWIdgetWidget.ID,
        createWidget: () => ctx.container.get<AccountWIdgetWidget>(AccountWIdgetWidget)
    })).inSingletonScope();
});
