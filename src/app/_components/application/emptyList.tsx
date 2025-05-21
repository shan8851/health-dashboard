import { TbMoodEmpty } from "react-icons/tb";

export const EmptyList = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <TbMoodEmpty className="text-muted text-6xl" />
      <p className="text-muted-foreground text-lg">Nothing to see here...</p>
    </div>
  );
};
