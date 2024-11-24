import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
  
  export function RecentSales() {
    return (
      <div className="space-y-8">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>AH</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Ahmed Hassan</p>
            <p className="text-sm text-muted-foreground">ahmed.hassan@gmail.com</p>
          </div>
          <div className="ml-auto font-medium">+85</div>
        </div>
        <div className="flex items-center">
          <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>FM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Fatima Malik</p>
            <p className="text-sm text-muted-foreground">fatima.malik@gmail.com</p>
          </div>
          <div className="ml-auto font-medium">+72</div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>UZ</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Usman Zafar</p>
            <p className="text-sm text-muted-foreground">usman.zafar@gmail.com</p>
          </div>
          <div className="ml-auto font-medium">+50</div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/04.png" alt="Avatar" />
            <AvatarFallback>NK</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Nida Khan</p>
            <p className="text-sm text-muted-foreground">nida.khan@gmail.com</p>
          </div>
          <div className="ml-auto font-medium">+60</div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/05.png" alt="Avatar" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Ali Baig</p>
            <p className="text-sm text-muted-foreground">ali.baig@gmail.com</p>
          </div>
          <div className="ml-auto font-medium">+98</div>
        </div>
      </div>
    );
  }
  