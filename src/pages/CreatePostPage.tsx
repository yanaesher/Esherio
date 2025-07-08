import { CreatePost } from "../components/CreatePost";

export function CreatePostPage() {
  return (
    <main className="main flex bg-surface items-center justify-center">
      <div className="container max-w-md w-full">
        <CreatePost />
      </div>
    </main>
  );
}
