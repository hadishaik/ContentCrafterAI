import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Save } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";

interface PromptSettingsProps {
  isMobile?: boolean;
  contentState: any;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  promptSettings: any;
  setPromptSettings: Dispatch<SetStateAction<any>>;
}

export default function PromptSettings({
  isMobile = false,
  contentState,
  setIsGenerating,
  promptSettings,
  setPromptSettings,
}: PromptSettingsProps) {
  const [useMyStyle, setUseMyStyle] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const lengthLabels = ["Short", "Medium", "Long"];
  const temperatureLabels = ["Precise", "Balanced", "Creative"];

  const handleContentType = (value: string) => {
    setPromptSettings((prev: any) => ({ ...prev, contentType: value }));
  };

  const handleTone = (value: string) => {
    setPromptSettings((prev: any) => ({ ...prev, tone: value }));
  };

  const handleGenerateContent = async () => {
    const payLoad = {
      ...promptSettings,
      email: currentUser?.email,
    };
    setIsGenerating(true);
    await axios
      .post(`https://content-crafter-lovat.vercel.app/api/generate`, payLoad)
      .then((res) => contentState(res.data))
      .catch((error) => console.log("object", error));
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        console.log("Sign Out");
      }
    });
  }, []);

  const renderContent = () => (
    <>
      <CardHeader>
        <CardTitle>Prompt Settings</CardTitle>
        <CardDescription>Configure your AI content generation</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Content Type */}
        <div className="space-y-2">
          <Label htmlFor="content-type">Content Type</Label>
          <Select defaultValue="blog" onValueChange={handleContentType}>
            <SelectTrigger id="content-type">
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel>Content Types</SelectLabel>
                <SelectItem value="blog">Blog Post</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="caption">Social Media Caption</SelectItem>
                <SelectItem value="script">Video Script</SelectItem>
                <SelectItem value="product">Product Description</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Tone */}
        <div className="space-y-2">
          <Label>Tone</Label>
          <Tabs defaultValue={promptSettings.tone} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="casual" onClick={() => handleTone("casual")}>
                Casual
              </TabsTrigger>
              <TabsTrigger
                value="professional"
                onClick={() => handleTone("professional")}
              >
                Professional
              </TabsTrigger>
              <TabsTrigger value="funny" onClick={() => handleTone("funny")}>
                Funny
              </TabsTrigger>
              <TabsTrigger
                value="storytelling"
                onClick={() => handleTone("storytelling")}
              >
                Storytelling
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Length */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Length</Label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {lengthLabels[promptSettings.length]}
            </span>
          </div>
          <Slider
            value={[promptSettings.length]}
            min={1}
            max={3}
            step={1}
            onValueChange={(value) =>
              setPromptSettings((prev: any) => ({ ...prev, length: value[0] }))
            }
            className="py-2"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Short</span>
            <span>Medium</span>
            <span>Long</span>
          </div>
        </div>

        {/* Temperature */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Temperature</Label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {promptSettings.temperature.toFixed(1)} –{" "}
              {temperatureLabels[Math.round(promptSettings.temperature * 2)]}
            </span>
          </div>
          <Slider
            value={[promptSettings.temperature]}
            min={0}
            max={1}
            step={0.5}
            onValueChange={(value) =>
              setPromptSettings((prev: any) => ({
                ...prev,
                temperature: value[0],
              }))
            }
            className="py-2"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Precise</span>
            <span>Balanced</span>
            <span>Creative</span>
          </div>
        </div>

        {/* Max Tokens */}
        <div className="space-y-2">
          <Label htmlFor="max-tokens">Max Tokens</Label>
          <Input
            id="max-tokens"
            type="number"
            value={promptSettings.maxtokens}
            onChange={(e) =>
              setPromptSettings((prev: any) => ({
                ...prev,
                maxtokens: Number.parseInt(e.target.value),
              }))
            }
            min={100}
            max={4000}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Maximum number of tokens to generate (1 token ≈ 4 characters)
          </p>
        </div>

        {/* Use My Style */}
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="use-my-style" className="flex-1">
            Use My Style
            <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
              Apply your saved preferences
            </p>
          </Label>
          <Switch
            id="use-my-style"
            checked={useMyStyle}
            onCheckedChange={setUseMyStyle}
          />
        </div>

        {/* Save Template */}
        <Button variant="outline" className="w-full">
          <Save className="mr-2 h-4 w-4" /> Save as Template
        </Button>
      </CardContent>

      <CardFooter>
        <Button className="w-full" size="lg" onClick={handleGenerateContent}>
          <Sparkles className="mr-2 h-4 w-4" /> Generate Content
        </Button>
      </CardFooter>
    </>
  );

  return isMobile ? (
    <div className="space-y-6 px-2">{renderContent()}</div>
  ) : (
    <div className="h-full border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <Card className="h-full rounded-none border-0 shadow-none">
        {renderContent()}
      </Card>
    </div>
  );
}
