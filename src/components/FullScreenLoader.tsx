import { LoadingSpinner } from "./LoadingSpinner";

export function FullScreenLoader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}
