import { Route, Routes } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import Homepage from "./pages/Homepage";

function App() {
    return (
        <Routes>
            <Route path="/" Component={DefaultLayout}>
                <Route index Component={Homepage} />
            </Route>
        </Routes>
    );
}

export default App;
