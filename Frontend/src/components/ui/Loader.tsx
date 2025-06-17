export default function Loader({
  className,
  isContained = false,
}: {
  className?: string;
  isContained?: boolean;
}) {
  return (
    <>
      {isContained ? (
        <div className="absolute w-full h-full">
          <span className="text-transparent">.</span>
          <div className={`w-full h-full flex justify-center items-center`}>
            <span
              className={`${className} absolute top-1/2 left-1/2 -translate-1/2 scale-50 loader`}
            ></span>
          </div>
        </div>
      ) : (
        <div className={`w-full h-full flex justify-center items-center`}>
          <span className={`${className} loader`}></span>
        </div>
      )}
    </>
  );
}
