import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getRecord from '@wasp/queries/getRecord';
import deleteRecord from '@wasp/actions/deleteRecord';

export function RecordPage() {
  const { recordId } = useParams();

  const { data: record, isLoading, error } = useQuery(getRecord, { recordId });
  const deleteRecordFn = useAction(deleteRecord);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleDeleteRecord = () => {
    deleteRecordFn({ recordId });
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold'>Record</h2>
        <p>Date: {record.date}</p>
        <p>BMI: {record.bmi}</p>
      </div>

      <div>
        <button
          onClick={handleDeleteRecord}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        >
          Delete Record
        </button>
      </div>

      <div className='mt-4'>
        <Link to='/' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}