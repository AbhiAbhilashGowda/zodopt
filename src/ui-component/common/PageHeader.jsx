import React from 'react';

const PageHeader = ({ title }) => {
  return <div style={{ borderBottom: '1px solid', fontSize: '1.4em', fontWeight: 600, paddingBottom: 10 }}>{title}</div>;
};

export default PageHeader;
