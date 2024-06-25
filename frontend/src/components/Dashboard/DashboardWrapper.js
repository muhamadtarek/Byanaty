import Dashboard from './Dashboard';
import React from 'react';


const Wrapper = () => {
  const completedPicked = [
    { id: 1, name: 'شهادة الميلاد', copies: 2 },
    { id: 2, name: 'شهادة الزواج', copies: 1 },
  ];

  const pending = [
    { id: 3, name: 'شهادة الوفاة', copies: 1 },
  ];

  const completedNotPicked = [
    { id: 4, name: 'البطاقة الشخصية', copies: 1 },
  ];

  const copiesRequested = completedPicked.reduce((total, doc) => total + doc.copies, 0) 
    + pending.reduce((total, doc) => total + doc.copies, 0) 
    + completedNotPicked.reduce((total, doc) => total + doc.copies, 0);

  return (
    <Dashboard 
      completedPicked={completedPicked.map(doc => `${doc.name} - ${doc.copies} نسخة`)} 
      pending={pending.map(doc => `${doc.name} - ${doc.copies} نسخة`)} 
      completedNotPicked={completedNotPicked.map(doc => `${doc.name} - ${doc.copies} نسخة`)} 
      copiesRequested={copiesRequested} 
    />
  );
};

export default Wrapper;