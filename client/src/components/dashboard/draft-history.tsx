import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Star, StarOff, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import axios from "axios";

export default function DraftHistory() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [activeTab, setActiveTab] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [drafts, setDrafts] = useState<any>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // fetch logic here
        FetchHistory(user.email ?? "");
      } else {
        console.log("Sign Out");
      }
    });
  }, []);

  const FetchHistory = async (email: string) => {
    try {
      const response = await axios.get(
        `https://content-crafter-lovat.vercel.app/api/content/recent?email=${email}`
      );
      const data = await response.data;
      setDrafts(data);
    } catch (error) {}
  };
  const filteredDrafts = drafts
    ?.filter((draft: any) => {
      if (activeTab === "starred") return draft.starred;
      return true;
    })
    .filter((draft: any) => {
      if (!searchQuery) return true;
      return (
        draft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        draft.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  if (isMobile) {
    return null;
  }

  if (!isOpen) {
    return (
      <div className="hidden lg:flex h-full items-center justify-center border-l border-gray-200 dark:border-gray-800">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Open draft history</span>
        </Button>
      </div>
    );
  }
  console.log(drafts);
  return (
    <div className="hidden lg:flex h-full flex-col border-l border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
        <h2 className="text-lg font-semibold">Draft History</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setIsOpen(false)}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Close draft history</span>
        </Button>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search drafts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="px-4">
        <Tabs defaultValue="recent" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recent">
              <Clock className="mr-2 h-4 w-4" /> Recent
            </TabsTrigger>
            <TabsTrigger value="starred">
              <Star className="mr-2 h-4 w-4" /> Starred
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3">
          {filteredDrafts.length > 0 ? (
            filteredDrafts.map((draft: any) => (
              <Card
                key={draft._id}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <CardContent className="p-3">
                  <div className="flex justify-between">
                    <h3 className="font-medium line-clamp-1">Title Here</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 -mr-1 text-yellow-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Toggle star logic would go here
                      }}
                    >
                      {draft.starred ? (
                        <Star className="h-4 w-4 fill-current" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {draft.starred ? "Unstar draft" : "Star draft"}
                      </span>
                    </Button>
                  </div>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    preview
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{draft?.contentType}</span>
                    <span>{draft.createdAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex h-32 items-center justify-center text-center text-gray-500 dark:text-gray-400">
              <div>
                <p>No drafts found</p>
                <p className="text-sm">Try a different search or tab</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
