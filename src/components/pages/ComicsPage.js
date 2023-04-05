import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

import { motion } from "framer-motion";

const ComicsPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <AppBanner />
            <ComicsList />
        </motion.div>
    );
};

export default ComicsPage;
