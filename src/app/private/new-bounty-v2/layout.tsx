export default function NewBountyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100vh_-_76px)] p-5 overflow-y-scroll">
      <div className="max-w-3xl  mx-auto bg-white px-4 py-2 rounded">
        <h2 className="text-3xl text-center font-bold text-[#46515e]">
          Create New Bounty
        </h2>
        {children}
      </div>
    </div>
  );
}
