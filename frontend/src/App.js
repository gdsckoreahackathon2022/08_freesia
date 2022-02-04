import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/jwtlogin/Login";
import Signup from "./components/jwtlogin/Signup";
import Home from "./components/home/Home";
import List from "./components/challenge/List";
import Create from "./components/challenge/Create";
import Detail from "./components/challenge/Detail";
import Edit from "./components/challenge/Edit";
import Mypage from "./components/mypage/Mypage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/challenge" element={<List />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
