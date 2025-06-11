import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Edit, Save, RefreshCw } from "lucide-react";
import axios from "axios";
// import { useToast } from "@/hooks/use-toast";

export default function ContentArea({
  data,
  isGenerating,
  setIsGenerating,
  promptSettings,
  contentState,
}: any) {
  // const { toast } = useToast();
  const [content, setContent] = useState(data?.content ?? "");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWaitingForContent, setIsWaitingForContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isWaitingForContent) return;
    if (isGenerating && currentIndex < data?.content?.length) {
      const timer = setTimeout(() => {
        setContent(data.content?.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 2);
      return () => clearTimeout(timer);
    } else if (currentIndex >= data?.content?.length) {
      setIsGenerating(false);
    }
  }, [isGenerating, currentIndex, data, content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    // toast({
    //   title: "Content copied",
    //   description: "The content has been copied to your clipboard.",
    // });
  };

  const handleSave = () => {
    // toast({
    //   title: "Draft saved",
    //   description: "Your content has been saved to drafts.",
    // });
  };

  const handleRegenerate = async () => {
    setContent("");
    setCurrentIndex(0);
    setIsGenerating(false); // temporarily stop generating
    setIsWaitingForContent(true); // mark we're waiting for new content

    handleGenerateContent(); // fetch from modal
    setIsWaitingForContent(false);
    setIsGenerating(true); // start generating now that we have new content

    contentRef.current?.scrollTo(0, 0);
  };

  const handleGenerateContent = async () => {
    await axios
      .post(
        `https://content-crafter-lovat.vercel.app/api/generate`,
        promptSettings
      )
      .then((res) => contentState(res.data.content))
      .catch((error) => console.log("object", error));
  };

  function formatContent(content: string | null): string {
    // Format each line, adding spacing
    const lines = content?.split("\n").map((line) => {
      if (/^\s*[^:]+:/.test(line)) {
        const [label, ...rest] = line.split(":");
        return `
          <div style="margin-bottom: 1rem;">
            <strong>${label.trim()}:</strong> ${rest.join(":").trim()}
          </div>
        `;
      }
      return `<div style="margin-bottom: 1rem;">${line.trim()}</div>`;
    });

    // Add AI-generated content note with top margin
    lines?.push(
      `<div style="margin-top: 2rem; font-style: italic;">This is AI-generated content.</div>`
    );

    return (lines ?? []).join("");
  }

  return (
    <div className="flex h-full flex-col bg-gray-50 dark:bg-gray-950">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold">Generated Content</h2>
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="raw">Raw Output</TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-auto p-6" ref={contentRef}>
        <Card className="min-h-[calc(100vh-250px)]">
          <CardContent className="p-6">
            <Tabs defaultValue="preview">
              <TabsContent value="preview" className="mt-0">
                <div
                  className="prose prose-indigo dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: content
                      ? formatContent(content)
                      : isGenerating || isWaitingForContent
                      ? "Generating ..."
                      : "<p>Hit Generate Content</p>",
                  }}
                ></div>
              </TabsContent>
              <TabsContent value="raw" className="mt-0">
                <div className="font-mono whitespace-pre-wrap">{content}</div>
              </TabsContent>
              <TabsContent value="markdown" className="mt-0">
                <div className="font-mono whitespace-pre-wrap">{content}</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save Draft
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setContent("");
              handleRegenerate();
            }}
            disabled={isGenerating}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
            />
            Regenerate
          </Button>
        </div>
      </div>
    </div>
  );
}
