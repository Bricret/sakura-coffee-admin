const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export function CardSkeleton() {
    return (
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex p-4">
          <div className="h-5 w-5 rounded-md bg-gray-200" />
          <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
      </div>
    );
  }

export function PrincipalNavbarSkeleton() {
  return (
    <div className={`${ shimmer } flex flex-row justify-between items-center py-2 mb-10 mr-7 md:mr-0`}>
      <div className="h-5 w-1/3 bg-gray-300 rounded-full"></div>
      <div className="flex items-center justify-center mt-4">
        <svg className="w-16 h-16 text-gray-200  me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        <div className="flex flex-col gap-4">
          <div className="w-20 h-2.5 bg-gray-200 rounded-full  me-3"></div>
          <div className="w-24 h-2 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}


  
export function InventorySkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestInventorySkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4 mt-4`}
    >
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InventorySkeleton />
          <InventorySkeleton />
          <InventorySkeleton />
          <InventorySkeleton />
          <InventorySkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function InventoryOptions() {
  return (
    <div className={`${ shimmer } flex flex-row justify-between items-center`}>
      <div className="h-10 w-6/12 bg-gray-300 rounded-lg"></div>
      <div className="h-10 w-24 bg-gray-300 rounded-lg"></div>
    </div>
  );
}