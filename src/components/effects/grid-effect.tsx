import { cn } from "../../utils";

const GridEffect = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <div
      className={cn(
        "absolute inset-0 size-full bg-[size:14px_24px] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]",
        className
      )}
      {...props}
    />
  );
};
GridEffect.displayName = "GridEffect";

export default GridEffect;
