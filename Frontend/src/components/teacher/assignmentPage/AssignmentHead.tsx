export const AssignmentHead = () => {
  return (
    <div className="flex text-center border border-b-0 rounded-t-sm overflow-hidden font-semibold bg-zinc-950">
      <div className=" border w-40 py-2 flex justify-center items-center">
        Start
      </div>
      <div className=" border w-40 flex justify-center items-center">
        Deadline
      </div>
      <div className="grow border flex justify-center items-center">Body</div>
      <div className=" border w-32 flex justify-center items-center gap-2">
        Actions
      </div>
    </div>
  );
};
