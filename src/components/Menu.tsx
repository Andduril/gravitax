import { motion, useCycle } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import MenuToggle from './MenuToggle';
import './Menu.css';

interface MenuProps {
    children?: React.ReactNode;
}

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.3,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

const Menu: React.FC<MenuProps> = ({ children }) => {

    const [isOpen, toggleOpen] = useCycle<boolean>(false, true);
    const containerRef = useRef<HTMLElement>(null);
    const [height, setHeight] = useState<number>(0);

    useLayoutEffect(() => {
        if (containerRef && containerRef.current) {
            setHeight(containerRef.current.offsetHeight)
        }
    }, [])

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
        >
            <motion.div className='background' variants={sidebar}>
                {/* <div className='navigation'>
                    {children}
                </div> */}
                {children}
            </motion.div>
            
            <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
    )
};

export default Menu;