import type React from "react";
import { Dispatch, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, Sun, Plus, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import PromptSettings from "./prompt-settings";
import { Link } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";

interface DashboardLayoutProps {
  children: React.ReactNode;
  enableDarkMode: boolean;
  setEnableDarkMode: Dispatch<React.SetStateAction<boolean>>;
}

export default function DashboardLayout({
  children,
  enableDarkMode,
  setEnableDarkMode,
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        console.log("Sign Out");
      }
    });
  }, []);

  return (
    <div
      className={`flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950 dark:text-gray-300 ${
        enableDarkMode ? "dark" : "light"
      }`}
    >
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex h-16 items-center border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex w-full items-center justify-between">
          {/* Left: Logo and App Name */}
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo text-white">
                <span className="text-lg font-semibold">Cc</span>
              </div>
              <span className="text-lg font-semibold ">ContentCrafter</span>
            </div>
          </Link>

          {/* Center: Navigation Tabs (hidden on mobile) */}
          <div className="hidden md:block">
            <Tabs defaultValue="dashboard">
              <TabsList>
                <TabsTrigger value="dashboard" className="">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="drafts" className="">
                  My Drafts
                </TabsTrigger>
                <TabsTrigger value="help" className="">
                  Help
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEnableDarkMode(!enableDarkMode)}
              className="rounded-full cursor-pointer "
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Profile Avatar / Auth Status */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-5 w-5 rounded-full"
                >
                  <Avatar className="h-5 w-5">
                    <AvatarImage
                      src={
                        currentUser
                          ? currentUser.photoURL
                          : "https://static.thenounproject.com/png/638636-200.png"
                      }
                      alt="@user"
                      className="cursor-pointer"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-black "
              >
                <DropdownMenuLabel className="">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* New Draft Button */}
            <Button className="hidden md:flex  dark:bg-gray-800">
              <Plus className="mr-2 h-4 w-4 " /> New Draft
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="flex h-16 items-center border-b px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo text-white">
                      <span className="text-lg font-bold">C</span>
                    </div>
                    <span className="text-lg font-semibold">
                      ContentCrafter
                    </span>
                  </div>
                </div>
                <div className="py-4">
                  <div className="px-4 py-2">
                    <Button className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" /> New Draft
                    </Button>
                  </div>
                  <div className="px-2 py-2">
                    <a
                      href="/dashboard"
                      className="flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </a>
                    <a
                      href="/drafts"
                      className="flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Drafts
                    </a>
                    <a
                      href="/help"
                      className="flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Help
                    </a>
                  </div>
                  <div className="border-t px-2 py-2">
                    <PromptSettings
                      isMobile={true}
                      contentState={null} // TODO: Replace with actual contentState
                      setIsGenerating={() => {}} // TODO: Replace with actual setIsGenerating function
                      promptSettings={{}} // TODO: Replace with actual promptSettings object
                      setPromptSettings={() => {}} // TODO: Replace with actual setPromptSettings function
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
