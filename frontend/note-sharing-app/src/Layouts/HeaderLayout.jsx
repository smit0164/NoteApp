import React from 'react'

const HeaderLayout = () => {
  return (
    <>
     <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight">Note Sharing App</h1>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-right hidden sm:block">
                            <p className="font-semibold">{user?.name || 'User'}</p>
                            <p className="text-xs text-blue-100">{user?.email || 'email@example.com'}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
    </>
  )
}

export default HeaderLayout