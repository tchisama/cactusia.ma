import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="container p-6">
      <div>
        <h1 className='text-3xl pb-8'>Dashboard</h1>
        <div className='flex gap-4'>
          <div className='p-5 bg-white flex-1 rounded-xl border shadow'>
            <h1 className='text-xl'>todays orders</h1>
            <h1 className='text-6xl'>2</h1>
          </div>
          <div className='p-5 bg-white flex-1 rounded-xl border shadow'>
            <h1 className='text-xl'>confirmed orders</h1>
            <h1 className='text-6xl'>2</h1>
          </div>
          <div className='p-5 bg-white flex-1 rounded-xl border shadow'>
            <h1 className='text-xl'>confirmed profit</h1>
            <h1 className='text-5xl'>195 dh</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
