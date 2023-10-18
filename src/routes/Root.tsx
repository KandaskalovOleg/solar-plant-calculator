import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { App } from '../App';
import { Home } from '../Pages/Home/Home';
import { PageNotFound } from '../Pages/PageNotFound/PageNotFound';
import en from './../locales/en.json';

const headerPages = en.header;
const settingsPages = en.settings;

const pages = [...headerPages, ...settingsPages].map((page) => ({
  path: page.toLowerCase(),
  component: page,
}));

export const Root: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          {pages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={page.component}
            />
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}