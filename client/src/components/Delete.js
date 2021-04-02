import Button from './Button';

const Delete = ({ cancelDelete, confirmDelete }) => {
  return (
    <div className='flex flex-col items-center'>
      <p>Are you sure?</p>
      <div className='mt-2'>
        <Button
          className='mr-4'
          type='button'
          text='Cancel'
          onClick={cancelDelete}
        />
        <Button type='button' text='Delete' onClick={confirmDelete} />
      </div>
    </div>
  );
};

export default Delete;
