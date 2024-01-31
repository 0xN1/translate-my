import { LucideProps } from "lucide-react";

const ToolButton = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.FC<LucideProps>;
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="text-zinc-800 px-4 py-2 hover:text-orange-600 text-sm sm:text-lg flex flex-row gap-2 items-center rounded-md"
    >
      {label}
      <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
    </button>
  );
};

export default ToolButton;
