import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ComparisonPage from '../pages/Comparison/ComparisonPage';
import InfoPage from '../pages/Info/InfoPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

const RouterContext: FC<{ Navbar: React.ReactNode; Footer: React.ReactNode }> = ({
  Navbar,
  Footer,
}) => {
  return (
    <Router>
      {Navbar}
      <main className="container">
        <Routes>
          <Route path="/" element={<InfoPage></InfoPage>} />
          <Route path="/compare" element={<ComparisonPage></ComparisonPage>} />
          <Route path="/*" element={<NotFoundPage></NotFoundPage>} />
        </Routes>
      </main>
      {Footer}
    </Router>
  );
};

export default RouterContext;
