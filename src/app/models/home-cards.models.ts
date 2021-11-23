import { AccountComponent } from "../home/account/account.component";
import { CashOutComponent } from "../home/cash-out/cash-out.component";
import { ContactUsComponent } from "../home/contact-us/contact-us.component";
import { FindAgentComponent } from "../home/find-agent/find-agent.component";
import { CashInComponent } from "../home/cash-in/cash-in.component";
import { SignOutComponent } from "../home/sign-out/sign-out.component";
import { TermsComponent } from "../home/terms/terms.component";
import { TransactionsComponent } from "../home/transactions/transactions.component";
import { TransferComponent } from "../home/transfer/transfer.component";

export const HomePageCards = [
    {
        icon: "locate-outline",
        name: "search agent",
        component: FindAgentComponent
    },
    {
        icon: "person-outline",
        name: "account",
        component: AccountComponent
    },
    {
        icon: "file-tray-full-outline",
        name: "transactions",
        component: TransactionsComponent
    },
    {
        icon: "wallet-outline",
        name: "cash out",
        component: CashOutComponent
    },
    {
        icon: "cash-outline",
        name: "remit",
        component: TransferComponent
    },
    {
        icon: "card-outline",
        name: "cash in",
        component: CashInComponent
    },
    {
        icon: "document-text-outline",
        name: "terms",
        component: TermsComponent
    },
    {
        icon: "call-outline",
        name: "contact us",
        component: ContactUsComponent
    },
    {
        icon: "log-out-outline",
        name: "sign out",
        component: SignOutComponent
    },
]
