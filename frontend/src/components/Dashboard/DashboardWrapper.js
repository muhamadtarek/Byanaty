import Dashboard from './Dashboard';
import React from 'react';


const Wrapper = () => {
  const completedPicked = [
    { id: 1, name: 'Document 1', copies: 2 },
    { id: 2, name: 'Document 2', copies: 1 },
  ];

  const pending = [
    { id: 3, name: 'Document 3', copies: 3 },
  ];

  const completedNotPicked = [
    { id: 4, name: 'Document 4', copies: 1 },
  ];

  const copiesRequested = completedPicked.reduce((total, doc) => total + doc.copies, 0) 
    + pending.reduce((total, doc) => total + doc.copies, 0) 
    + completedNotPicked.reduce((total, doc) => total + doc.copies, 0);

  return (
    <Dashboard 
      completedPicked={completedPicked.map(doc => `${doc.name} - ${doc.copies} copies`)} 
      pending={pending.map(doc => `${doc.name} - ${doc.copies} copies`)} 
      completedNotPicked={completedNotPicked.map(doc => `${doc.name} - ${doc.copies} copies`)} 
      copiesRequested={copiesRequested} 
    />
  );
};

export default Wrapper;