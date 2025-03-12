import { UserNav } from "@/components/common/user-nav";

interface HeaderProps {
  pageName: string;
  userName: string;
  userEmail: string;
}

export function Header({ pageName, userName, userEmail }: HeaderProps) {
  return (
    <div className="flex h-16 items-center px-4 border-b">
      <h2 className="text-lg font-semibold">{pageName}</h2>
      <div className="ml-auto flex items-center space-x-4">
        <UserNav userName={userName} userEmail={userEmail} />
      </div>
    </div>
  );
}