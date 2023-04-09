import { Route, Routes, useLocation } from "react-router-dom";
import { lazy } from "react";
import { AnimatePresence } from "framer-motion";

// Динамические импорты (ленивая подгрузка)
const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicLayout = lazy(() =>
    import("../pages/singleComicLayout/SingleComicLayout")
);
const SingleCharacterLayout = lazy(() =>
    import("../pages/singleCharacterLayout/SingleCharacterLayout")
);
const SinglePage = lazy(() => import("../pages/SinglePage"));

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<MainPage />} />
                <Route path="/comics" element={<ComicsPage />} />
                <Route
                    path="/comics/:id"
                    element={
                        <SinglePage
                            Component={SingleComicLayout}
                            dataType="comic"
                        />
                    }
                />
                <Route
                    path="/characters/:id"
                    element={
                        <SinglePage
                            Component={SingleCharacterLayout}
                            dataType="character"
                        />
                    }
                />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;
