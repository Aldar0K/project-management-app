import React from 'react';

import Header from 'components/Header';
import GlobalRoute from 'components/GlobalRoute';
import Footer from 'components/Footer';
import ErrorBoundary from 'utils/ErrorBoundary';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <GlobalRoute />
        <Footer />
      </ErrorBoundary>
    </>
  );
};

export default App;
