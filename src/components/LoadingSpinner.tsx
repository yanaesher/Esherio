export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex space-x-2 ${className}`}>
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:150ms]"></div>
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:300ms]"></div>
    </div>
  );
}
