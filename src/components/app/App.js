import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

import AnimatedRoutes from "../animatedRoutes/AnimatedRoutes";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <AnimatedRoutes />
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;
