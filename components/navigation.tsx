import Link from "next/link";
import { Button } from "./ui/button";
import { Github, Coffee } from "lucide-react";
import ThemeSwitcher from "./theme-switcher";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const Navigation = () => {
  return (
    <nav className="fixed left-0 top-0 z-20 mx-auto flex h-[88px] w-full items-center border-b-4 border-border bg-bg px-5 m500:h-16 ">
      <div className="mx-auto w-full flex text-text max-w-7xl items-center justify-between">
        <div className="flex items-center gap-10 text-xl">
          <Link className="hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="hover:underline underline-offset-4" href="/sets">
            Sets
          </Link>
          <Link className="hover:underline underline-offset-4" href="/blog">
            Blog
          </Link>
          <Link className="hover:underline underline-offset-4" href="/contact">
            Contact Us
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="neutral" disabled>
            Sign In (coming soon!)
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="neutral" size="icon">
                  <Github />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Star on Github</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="neutral" size="icon">
                  <Coffee />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Buy me a coffee</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
