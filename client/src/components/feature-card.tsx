import { FileText, Mail, RefreshCw, Search, Share2 } from "lucide-react";
import { ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JSX } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  const getIcon = (): JSX.Element => {
    switch (icon) {
      case "FileText":
        return (
          <FileText className="h-10 w-10 text-indigo dark:text-indigo-400" />
        );
      case "Image":
        return (
          <ImageIcon className="h-10 w-10 text-indigo dark:text-indigo-400" />
        );
      case "Mail":
        return <Mail className="h-10 w-10 text-indigo dark:text-indigo-400" />;
      case "Share2":
        return (
          <Share2 className="h-10 w-10 text-indigo dark:text-indigo-400" />
        );
      case "RefreshCw":
        return (
          <RefreshCw className="h-10 w-10 text-indigo dark:text-indigo-400" />
        );
      case "Search":
        return (
          <Search className="h-10 w-10 text-indigo dark:text-indigo-400" />
        );
      default:
        return (
          <FileText className="h-10 w-10 text-indigo dark:text-indigo-400" />
        );
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50 hover:border-indigo-200 dark:hover:border-indigo-800">
      <CardHeader className="p-6">
        <div className="mb-3 rounded-full bg-indigo-100 p-3 w-fit dark:bg-indigo-900/30">
          {getIcon()}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
