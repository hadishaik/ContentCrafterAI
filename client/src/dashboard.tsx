import DashboardLayout from "@/components/dashboard/dashboard-layout";
import PromptSettings from "@/components/dashboard/prompt-settings";
import ContentArea from "@/components/dashboard/content-area";
import DraftHistory from "@/components/dashboard/draft-history";
import { useState } from "react";

interface PromptSettingsState {
  contentType: string;
  tone: string;
  length: number;
  temperature: number;
  maxtokens: number;
}

const promptInitialSetting: PromptSettingsState = {
  contentType: "blog",
  tone: "casual",
  length: 2,
  temperature: 0.5,
  maxtokens: 250,
};

export default function DashboardPage() {
  const [enableDarkMode, setEnableDarkMode] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptSettings, setPromptSettings] = useState(promptInitialSetting);
  // useLayoutEffect(() => {
  //   if(window)
  // }, []);
  console.log(generatedContent);
  return (
    <DashboardLayout
      enableDarkMode={enableDarkMode}
      setEnableDarkMode={setEnableDarkMode}
    >
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[320px_1fr_280px] h-[calc(100vh-64px)] gap-0">
        <PromptSettings
          contentState={setGeneratedContent}
          setIsGenerating={setIsGenerating}
          promptSettings={promptSettings}
          setPromptSettings={setPromptSettings}
        />
        <ContentArea
          data={generatedContent}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          promptSettings={promptSettings}
          contentState={setGeneratedContent}
        />
        <DraftHistory />
      </div>
    </DashboardLayout>
  );
}
