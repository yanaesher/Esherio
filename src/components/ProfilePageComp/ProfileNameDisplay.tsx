interface ProfileNameDisplayProps {
  nickname: string;
}

export function ProfileNameDisplay({ nickname }: ProfileNameDisplayProps) {
  return (
    <h2 className="text-4xl font-bold text-gradient">
      {nickname || "No name"}
    </h2>
  );
}
