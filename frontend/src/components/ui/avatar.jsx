import React from "react";
import { Root as AvatarRoot, Image as AvatarImage, Fallback as AvatarFallback } from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarRoot
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const AvatarImg = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarImage
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImg.displayName = "AvatarImage";

const AvatarFallbackComp = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarFallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
AvatarFallbackComp.displayName = "AvatarFallback";

export { Avatar, AvatarImg as AvatarImage, AvatarFallbackComp as AvatarFallback };
