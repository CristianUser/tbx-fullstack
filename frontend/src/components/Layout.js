import React from 'react';
import Header from './Header.js';
import Container from 'react-bootstrap/Container';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
