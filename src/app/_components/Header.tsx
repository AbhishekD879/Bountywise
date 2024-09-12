// Define the Header component
const Header: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <header className="px-6 py-4  bg-white shadow-md rounded-r-sm rounded-l-sm flex items-center 2xl:px-[16%]">
      {children}
    </header>
  );
};

export { Header };
