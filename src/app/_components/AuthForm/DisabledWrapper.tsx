import { Ban } from "lucide-react";

const DisabledWrapper = () => {
  return (
    <div className="w-full h-full backdrop:blur-xl flex justify-center items-center absolute z-10 top-0 left-0">
      <Ban className="text-red-400" height="24" width="24" />
    </div>
  );
};

export default DisabledWrapper;
