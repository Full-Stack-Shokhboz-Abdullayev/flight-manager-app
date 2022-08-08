import './App.scss';

import Footer from './components/UI/Footer';
import Navbar from './components/UI/Navbar';
import RouterContext from './router';

function App() {
  return <RouterContext Navbar={<Navbar />} Footer={<Footer />}></RouterContext>;
}

export default App;
