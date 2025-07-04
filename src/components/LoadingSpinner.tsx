export function LoadingSpinner() {
  return (
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce animation-delay-150"></div>
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce animation-delay-300"></div>
    </div>
  );
}
