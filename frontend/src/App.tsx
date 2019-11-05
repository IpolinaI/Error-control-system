import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Pages from './pages';
import { ROUTES } from './services/routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main className="page__container">
        <Route exact path={ROUTES.ERRORS} component={Pages.ErrorsPage} />
        <Route exact path={ROUTES.ENTER} component={Pages.EnterPage} />
        <Route exact path={ROUTES.CREATION} component={Pages.CreationPage} />
        <Route exact path={ROUTES.HISTORY} component={Pages.HistoryPage} />
      </main>
    </BrowserRouter>
  );
}

export default App;
