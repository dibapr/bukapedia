const SkeletonItem = () => {
  return (
    <>
      <div className="border dark:border-slate-600 h-full rounded-2xl w-72">
        <div className="animate-pulse flex flex-col gap-[1.50rem]">
          <div className="bg-slate-200 rounded-t-2xl h-[12rem] w-full"></div>
          <div className="flex-1 mx-7 space-y-6 py-1">
            <div className="h-5 bg-slate-200 rounded-full"></div>
            <div className="space-y-3">
              <div className="h-3 bg-slate-200 rounded-full"></div>
              <div className="h-3 bg-slate-200 rounded-full"></div>
              <div className="h-3 bg-slate-200 rounded-full"></div>
            </div>
            <div className="h-4 bg-slate-200 w-7/12 float-right rounded-full"></div>
          </div>
          <div className="flex flex-wrap items-start justify-center">
            <div className="flex h-12 mb-20 mx-6 flex-row flex-wrap w-full justify-center gap-3">
              <div className="w-full h-12 bg-slate-200 rounded-full"></div>
              <div className=" w-full h-12 bg-slate-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonItem;
