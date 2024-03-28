import React from 'react';

type BIconProps = {
  className?: string;
  children: string;
};

export default function BIcon({ children, className }: BIconProps) {
  return <i className={`bi ${children.trim()} ${className}`}></i>;
}
