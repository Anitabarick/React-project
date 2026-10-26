import React from 'react'

const Navbar = ({theme, setTheme}) => {
  return (
    <div className= 'flex justify-between items-center p-4  sm:px-12 lg:px24 xl:px- py-4 sticky top-0 z-20 backdrop-blur-xl font-medium  bg-white/50 dark:bg-gray-900/70' >
      <img
        src={theme === 'dark' ? ass}/>"/path/to/logo.png"
        alt="Logo"
        className="h-10 w-auto"
      />
    </div>
  )
}

export default Navbar
