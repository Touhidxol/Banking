import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getFullUserInfo, getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect} from "next/navigation";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const loggedIn = await getLoggedInUser();
  if(!loggedIn) redirect('/sign-in');
  const user = await getFullUserInfo();

  return (
    <main className="flex w-full h-screen font-inter">
      <Sidebar user={user} />
      <div className="flex size-full flex-col">
        <div className="!root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="Logo" />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
