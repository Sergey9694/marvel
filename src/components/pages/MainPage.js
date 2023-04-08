import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";
import { motion } from "framer-motion";
import CharSearchForm from "../charSearchForm/CharSearchForm";

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = id => {
        setChar(id);
    };

    return (
        <motion.div
            className="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </motion.div>
    );
};

export default MainPage;
