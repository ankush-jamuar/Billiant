import React from 'react'

const PageContainer = ({children}) => {
  return (
    <main className="flex-1 bg-gray-50 p-6">
      {children}
    </main>
  )
}

export default PageContainer
