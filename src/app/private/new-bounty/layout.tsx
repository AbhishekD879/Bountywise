export default function NewBountyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-[#ff5722] h-[calc(100%_-_76px)] to-[#ff9800] p-4 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl h-[90%] p-8 w-full transition-all duration-500 ease-in-out transform flex flex-col justify-between">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-[#46515e]">
            Create New Bounty
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}
