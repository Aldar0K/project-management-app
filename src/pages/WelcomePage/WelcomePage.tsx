import React from 'react';

import Hero from 'components/Hero';
import Team from 'components/Team';
import Course from 'components/Course';

const WelcomePage = () => {
  return (
    <main className="main">
      <Hero />
      <Team />
      <Course />
    </main>
  );
};

export default WelcomePage;
