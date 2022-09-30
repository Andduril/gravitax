import {motion} from 'framer-motion';

const Path = ({...props}) => {
    return (
        <motion.path
            fill="transparent"
            strokeWidth="3"
            stroke="#ffffff"
            strokeLinecap="round"
            {...props}
        />
    )
};

export default Path;