import React from 'react';

type FilterBoxProps = {
  title: string;
  children: React.ReactNode;
};

export default function FilterBox({ title, children }: FilterBoxProps) {
  return (
    <div className='border rounded-top mb-4'>
      <h4 className='bg-secondary-subtle px-3 py-3 h6 mb-0'>{title}</h4>
      <div className='px-3 py-3'>{children}</div>
    </div>
  );
}
