import React from 'react';

type FilterBoxProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function FilterBox({ title, children, className }: FilterBoxProps) {
  return (
    <div className='border rounded-top mb-4'>
      <h4 className={`px-3 py-3 h6 mb-0 ${className ? className : 'bg-secondary-subtle'}`}>
        {title}
      </h4>
      <div className='px-3 py-3'>{children}</div>
    </div>
  );
}
