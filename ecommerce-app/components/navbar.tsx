import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import { store } from "@/models/model";
import { auth } from "@clerk/nextjs/server";
import StoreSwitcher from "./store-switcher";

const Navbar = async () => {
    // Authenticate user and get their id
    const { userId } = await auth();
    
    // fetch all stores which have userId
    const stores = await store.find({ userId });

    return (
        <div className="border-b">
            <nav className="flex justify-between items-center p-4">
                <div>
                    <StoreSwitcher items={stores} />
                </div>
                <div>
                    <MainNav className="mx-6" />
                </div>
                <div className="flex items-center">
                    <UserButton afterSwitchSessionUrl="/" />
                </div>
            </nav>
        </div>
    )
}

export default Navbar;