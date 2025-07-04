import { Link } from "react-router-dom";
import { Users, MessageCircle, PenSquare } from "lucide-react";

export function WelcomePage() {
  return (
    <main className="px-4">
      <section className="pt-16 min-h-screen flex justify-center">
        <div className="container flex flex-col md:flex-row items-center gap-20">
          <div className="md:flex-1 text-center md:text-left">
            <h1 className="sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-15">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                Esherio
              </span>
            </h1>
            <ul className="text-gray-600 mb-12 lg:text-lg space-y-6">
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 mt-1 text-[#ff4d4d]" />
                <span>Create your own community</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 mt-1 text-[#ff4d4d]" />
                <span>Chat with others in real time</span>
              </li>
              <li className="flex items-start gap-3">
                <PenSquare className="w-5 h-5 mt-1 text-[#ff4d4d]" />
                <span>Share posts, ideas, and content</span>
              </li>
            </ul>
            <Link
              to="/register"
              className="
            bg-primary 
            hover:bg-primary-hover
            text-white 
            px-7 py-3
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

          {/* Картинка */}
          <div className="md:flex-1 w-full max-w-[600px] relative z-0">
            <div className="relative w-full aspect-[4/3]">
              <div className="absolute inset-0 bg-primary rounded-4xl z-0" />
              <img
                src="/yanawelcome.png"
                alt="welcome character"
                className="absolute inset-0 w-full h-full object-contain rounded-lg shadow-xl z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* О создателе */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">О создательнице</h2>
          <p className="max-w-xl mx-auto text-gray-700">
            Привет! Меня зовут Яна. Я фронтенд-разработчица, и я создала Esherio
            как безопасное и красивое пространство для общения, самовыражения и
            поддержки.
          </p>
        </div>
      </section>
    </main>
  );
}
