import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

const TranslateButton = ({
  translate,
  mobile,
}: {
  translate: () => Promise<void>;
  mobile?: boolean;
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        translate();
      }}
      className={cn(
        "text-white hidden min-w-max bg-orange-500 hover:text-white p-2 text-sm sm:text-lg hover:bg-orange-600 focus:ring-none focus:outline-none sm:flex sm:flex-row gap-2 items-center rounded-md px-4 py-2",
        mobile && "sm:hidden flex flex-row"
      )}
    >
      Translate <Languages className="w-4 h-4 sm:w-6 sm:h-6" />
    </button>
  );
};

export default TranslateButton;
