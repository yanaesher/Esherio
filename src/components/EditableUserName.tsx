type Props = {
  initialName: string;
  isEditing: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
};

export function EditableUserName({
  isEditing,
  inputValue,
  onInputChange,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          className="text-3xl font-semibold text-gradient outline-none border-b border-gray-300 cursor-text"
        />
      ) : (
        <h1 className="text-3xl font-semibold text-gradient">{inputValue}</h1>
      )}
    </div>
  );
}
