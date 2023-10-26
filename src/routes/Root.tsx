import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { App } from '../App';
import { Home } from '../Pages/Home/Home';
import { Contacts } from '../Pages/Contacts/Contacts';
import { PageNotFound } from '../Pages/PageNotFound/PageNotFound';


export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="contacts" element={<Contacts />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
)