import { CreatePost } from "../components/CreatePost";

export function CreatePostPage() {
  return (
    <main className="main flex items-center justify-center h-screen">
      <div className="container max-w-md w-full">
        <CreatePost />
      </div>
    </main>
  );
}
