import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import TypewriterComponent from "./components/typewriter";
import FeatureCard from "./components/feature-card";
import HowItWorks from "./components/how-it-works";
import TechStack from "./components/tech-stacks";
import Screenshots from "./components/screenshots";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase/firebase";
import { useEffect, useState } from "react";

export default function App() {
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

  const handleSignIn = async () => {
    signInWithPopup(auth, provider)
      .then((result: any) => {
        setCurrentUser(result.user);
        handleGenerateToken(result.user);
      })
      .catch((error) => console.log(error.code));
  };

  const handleGenerateToken = async (user: any) => {
    await fetch("https://content-crafter-lovat.vercel.app/api/generate_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user?.email,
      }),
    })
      .then((req) => req.json())
      .then((data) =>
        localStorage.setItem("token", JSON.stringify(data.accesstoken))
      )
      .catch((error) => console.log("object", error));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signout is Done"))
      .catch((error) => console.log(error.code));
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950 items-center">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="container flex h-16 items-center justify-between mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo text-white text-xl text-center font-semibold">
              Cc
            </div>
            <span className="text-xl font-bold ">ContentCrafter</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium hover:text-indigo dark:hover:text-indigo-400"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:text-indigo dark:hover:text-indigo-400"
            >
              How It Works
            </a>
            <a
              href="#demo"
              className="text-sm font-medium hover:text-indigo dark:hover:text-indigo-400"
            >
              Demo
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank">
              {/* <Button variant="outline" size="icon" className="rounded-full"> */}
              <img src="/github.svg" alt="github-icon" className="h-6 w-6" />

              <span className="sr-only">GitHub</span>
            </a>
            {currentUser ? (
              <Button className="p-0 rounded-full cursor-pointer">
                <img
                  src={
                    currentUser?.photoURL ??
                    "https://static.thenounproject.com/png/638636-200.png"
                  }
                  alt={currentUser.displayName}
                  className="w-full h-full object-cover rounded-full"
                  onClick={handleSignOut}
                />
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild></DropdownMenuTrigger>

                <DropdownMenuTrigger asChild>
                  <Button className="bg-indigo text-white">Get Started</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="cursor-pointer flex gap-2"
                    onClick={handleSignIn}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="h-5 w-5"
                    >
                      <path
                        fill="#EA4335"
                        d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                      />
                      <path
                        fill="#4A90E2"
                        d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                      />
                    </svg>
                    Google
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(99,102,241,0.1),transparent)]"></div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Your AI Co-Writer for <br className="hidden sm:inline" />
              <span className="text-indigo dark:text-indigo-400">
                Every Platform
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              <TypewriterComponent />
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to={`${currentUser ? "/dashboard" : "/"}`}>
                <Button size="lg" className="rounded-full px-8">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-full px-8">
                View Demo
              </Button>
            </div>
            <div className="mt-24 w-full max-w-5xl overflow-hidden rounded-t-3xl border border-gray-200 bg-white/50 shadow-xl dark:border-gray-800 dark:bg-gray-900/50">
              <div className="flex h-14 items-center gap-2 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 flex-1 rounded-md bg-gray-100 px-4 py-1 text-sm dark:bg-gray-800">
                  ContentCrafter.app
                </div>
              </div>
              <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Preview Demo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Powerful Features for Every Writing Need
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Generate high-quality content for any platform with our
                AI-powered tools.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Blog Generator"
                description="Create engaging blog posts with AI assistance. Just provide a topic and let our AI do the rest."
                icon="FileText"
              />
              <FeatureCard
                title="Image-to-Caption"
                description="Upload an image and get the perfect caption for social media posts instantly."
                icon="Image"
              />
              <FeatureCard
                title="Email Drafts"
                description="Craft professional emails in seconds. Choose from various tones and styles."
                icon="Mail"
              />
              <FeatureCard
                title="Social Media Posts"
                description="Generate platform-specific content for Twitter, aedIn, Instagram, and more."
                icon="Share2"
              />
              <FeatureCard
                title="Content Rewriter"
                description="Transform existing content with different tones, styles, and lengths."
                icon="RefreshCw"
              />
              <FeatureCard
                title="SEO Optimizer"
                description="Enhance your content with SEO-friendly suggestions and keywords."
                icon="Search"
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Three simple steps to generate perfect content every time.
              </p>
            </div>
            <HowItWorks />
          </div>
        </section>

        {/* Screenshots / Demo */}
        <section id="demo" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                See It In Action
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Explore our intuitive interface and powerful features.
              </p>
            </div>
            <Screenshots />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Powered By
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Built with cutting-edge technologies for the best experience.
              </p>
            </div>
            <TechStack />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo dark:bg-indigo-700">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to transform your writing?
              </h2>
              <p className="mt-4 text-lg text-indigo-100">
                Join thousands of content creators who save time and improve
                quality with ContentCrafter.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="rounded-full bg-white hover:bg-white/80 "
                  >
                    Try It Now <ArrowRight className="ml-1 h-4 w-4 " />
                  </Button>
                </Link>
                <a href="https://github.com" target="_blank">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 bg-transparent text-white border-white hover:bg-white hover:text-indigo"
                  >
                    <Github className="mr-2 h-4 w-4" /> View on GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-950">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-indigo text-white text-xl text-center font-semibold">
                Cc
              </div>
              <span className="text-xl font-bold">ContentCrafter</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <a
                href="#features"
                className="text-sm text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-400"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-400"
              >
                How It Works
              </a>
              <a
                href="#demo"
                className="text-sm text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-400"
              >
                Demo
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-400"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-400"
              >
                Blog
              </a>
            </nav>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <span className="sr-only">aedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} ContentCrafter. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
