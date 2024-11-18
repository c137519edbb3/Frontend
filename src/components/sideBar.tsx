import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Sidebar, SidebarBody,  SidebarLink, SidebarProvider} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface Link {
label: string;
href: string;
icon: JSX.Element;
}


export function SideBarWidget({
    children,
    links,
  }: Readonly<{
    children: React.ReactNode;
    links: Link[];
  }>) {
    
    const [open, setOpen] = useState(false);
    return (
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto  dark:border-neutral-700 overflow-hidden",
          "h-screen"
        )}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10  ">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Manu Arora",
                  href: "#",
                  icon: (
                    <img
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50} 
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        {children}
      </div>
    );
  }
  
  const Logo = () => {
    return (
      <Link
        href="#"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      >
        <Image
          src="/favicon-96x96.png"
          alt="Logo Icon"
          width={24}
          height={24}
          className="rounded-xl"
        />
        
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-black dark:text-white whitespace-pre"
        >
          Eyecon AI
        </motion.span>
      </Link>
    );
  };
  const LogoIcon = () => {
    return (
      <Link
        href="#"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      >
        <Image
          src="/favicon-96x96.png"
          alt="Logo Icon"
          width={24}
          height={24}
          className="rounded-xl"
        />
      </Link>
    );
  };
   