// Define the Header component
const Header: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <header className='flex items-center rounded-l-sm rounded-r-sm bg-white px-6 py-4 shadow-md 2xl:px-[16%]'>
      {children}
    </header>
  )
}

export { Header }
