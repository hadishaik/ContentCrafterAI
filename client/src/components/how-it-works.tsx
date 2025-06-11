import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Palette, Sparkles, Type } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="mt-16 grid gap-8 md:grid-cols-3">
      <div className="relative">
        <Card className="relative z-10 h-full border-2 border-indigo dark:border-indigo-500">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo text-white">
              <Type className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold">1. Choose content type</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Select from blog posts, social media captions, emails, and more.
            </p>
          </CardContent>
        </Card>
        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block z-20">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg dark:bg-gray-800">
            <ArrowRight className="h-5 w-5 text-indigo dark:text-indigo-400" />
          </div>
        </div>
      </div>
      <div className="relative">
        <Card className="relative z-10 h-full">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              <Palette className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold">2. Tweak tone</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Adjust the tone, style, and length to match your brand voice.
            </p>
          </CardContent>
        </Card>
        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block z-20">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg dark:bg-gray-800">
            <ArrowRight className="h-5 w-5 text-indigo dark:text-indigo-400" />
          </div>
        </div>
      </div>
      <div>
        <Card className="h-full">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold">3. Generate & save</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Get instant results and save them to your library for future use.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
