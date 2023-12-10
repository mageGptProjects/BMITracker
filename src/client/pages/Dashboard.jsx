import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getRecords from '@wasp/queries/getRecords';
import createRecord from '@wasp/actions/createRecord';

export function DashboardPage() {
  const { data: records, isLoading, error } = useQuery(getRecords);
  const createRecordFn = useAction(createRecord);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateRecord = () => {
    createRecordFn({ bmi: 25 });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>BMI Tracker</h1>

      <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
        {/* Chart component goes here */}
      </div>

      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl'>Records</h2>
        <button
          onClick={handleCreateRecord}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Record
        </button>
      </div>

      {records.map((record) => (
        <div
          key={record.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{record.bmi}</div>
          <div>{record.date}</div>
        </div>
      ))}
    </div>
  );
}