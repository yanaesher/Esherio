import { Link } from "react-router-dom";
import { Users, MessageCircle, PenSquare } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function WelcomePage() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={`/profile/${user.id}`} replace />;
  }

  return (
    <main className="bg-stone-50">
      <section className="min-h-screen flex items-center justify-center pt-20 pb-10">
        <div className="container flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="md:flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to <span className="text-gradient">Esherio</span>
            </h1>
            <ul className="text-gray-600 mb-8 text-base md:text-lg space-y-5">
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 mt-1 text-[#ff4d4d]" />
                <span>Create your own community</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 mt-1 text-primary" />
                <span>Chat with others</span>
              </li>
              <li className="flex items-start gap-3">
                <PenSquare className="w-5 h-5 mt-1 text-primary" />
                <span>Share posts, ideas, and content</span>
              </li>
            </ul>
            <Link
              to="/auth"
              className="
          bg-primary 
          hover:bg-primary-hover
          text-white 
          px-6 py-3
          rounded 
          shadow-md 
          transition 
          duration-200 
          active:translate-y-1 
          active:shadow-sm
          inline-block
        "
            >
              Get started
            </Link>
          </div>

          {/* Image*/}
          <div className="md:flex-1 w-full max-w-xl relative">
            <div className="relative w-full aspect-[4/3]">
              <div className="absolute inset-0 bg-primary rounded-2xl" />
              <img
                src="/yanawelcome.png"
                alt="welcome character"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="text-center bg-primary py-8 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">
            A platform where you can...
          </h2>
          <div className="grid gap-6 md:grid-cols-3 text-left text-gray-600">
            <div className="flex flex-col items-start p-4 rounded-lg shadow-md border border-gray-200 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-lg">Create communities</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Build your own space, invite others, and shape the vibe of your
                group.
              </p>
            </div>

            <div className="flex flex-col items-start p-4 rounded-lg shadow-md border border-gray-200 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-lg">Chat in real time</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Talk with others instantly — no delays, no limits.
              </p>
            </div>

            <div className="flex flex-col items-start p-4 rounded-lg shadow-md border border-gray-200 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <PenSquare className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-lg">Share your ideas</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Post thoughts, articles, or creative work to inspire and
                connect.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-8 max-w-4xl mx-auto">
            <div className="md:w-1/3 flex justify-center">
              <img
                src="/Yanahappy.png"
                alt="Yanaesher creator"
                className="w-40 sm:w-48 md:w-full h-auto object-contain"
              />
            </div>
            <div className="md:w-2/3 text-gray-700 text-lg leading-relaxed">
              <h2 className="text-center md:text-2xl font-bold mb-8">
                Created by <span className="text-gradient">Yanaesher</span>
              </h2>
              <p>
                I'm passionate about technology and love exploring new tools and
                trends. For me, sincerity and simplicity are the most important
                things in communication.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
