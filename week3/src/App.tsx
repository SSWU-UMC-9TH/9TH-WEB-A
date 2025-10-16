import './index.css';
import { Link, Route, Routes } from './router';

const MatthewPage   = () => <h1 className="p-6 text-2xl font-bold">매튜 페이지</h1>;
const AeongPage     = () => <h1 className="p-6 text-2xl font-bold">애옹 페이지</h1>;
const JoyPage       = () => <h1 className="p-6 text-2xl font-bold">조이 페이지</h1>;
const NotFoundPage  = () => <h1 className="p-6 text-2xl font-bold">404 - 해당 경로 없음</h1>;

const Header = () => {
  return (
    <nav className="flex gap-3 p-4 border-b">
      <Link to="/matthew">MATTHEW</Link>
      <Link to="/aeong">AEONG</Link>
      <Link to="/joy">JOY</Link>
      <Link to="/not-found">NOT FOUND</Link>
    </nav>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/matthew" component={MatthewPage} />
        <Route path="/aeong"   component={AeongPage} />
        <Route path="/joy"     component={JoyPage} />
        <Route path="/not-found" component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;