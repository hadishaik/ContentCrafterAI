import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Screenshots() {
  const [activeIndex, setActiveIndex] = useState(0);

  const screenshots = [
    {
      title: "Blog Generator",
      description: "Create engaging blog posts with AI assistance",
      image: "/Dashboard snapshot.png",
    },
    {
      title: "Email Writer",
      description: "Craft professional emails in seconds",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Social Media Dashboard",
      description: "Manage all your social content in one place",
      image: "/placeholder.svg?height=600&width=800",
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length
    );
  };

  return (
    <div className="mt-16 relative">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-800">
        <div className="relative">
          <div className="flex h-12 items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 flex-1 rounded-md bg-white px-4 py-1 text-sm dark:bg-gray-800">
              aiwriter.app/dashboard
            </div>
          </div>
          <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800 relative">
            <img
              src={screenshots[activeIndex].image || "/placeholder.svg"}
              alt={screenshots[activeIndex].title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h3 className="text-xl font-bold">
                {screenshots[activeIndex].title}
              </h3>
              <p className="mt-2 text-gray-200">
                {screenshots[activeIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>

        <div className="flex gap-2">
          {screenshots.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === activeIndex
                  ? "bg-indigo"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  );
}
