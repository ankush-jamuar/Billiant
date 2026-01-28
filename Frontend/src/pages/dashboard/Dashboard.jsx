import React from 'react'
import Sidebar from '../../components/layout/Sidebar'
import PageContainer from '../../components/layout/PageContainer'

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <PageContainer>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </PageContainer>
    </div>
  )
}

export default Dashboard
