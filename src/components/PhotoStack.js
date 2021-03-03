import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimation, useTransform } from 'framer-motion';
import './PhotoStack.css';

const data = [
    { id: 0, source: 'images/000022.jpg', description: '', landscapeMode: false },
    { id: 1, source: 'images/3603.jpg', description: '', landscapeMode: false },
    { id: 2, source: 'images/3138.jpg', description: '', landscapeMode: false },
    { id: 3, source: 'images/3276.jpg', description: '', landscapeMode: false },
    { id: 4, source: 'images/000008.jpg', description: '', landscapeMode: false },
    { id: 5, source: 'images/000014.jpg', description: '', landscapeMode: false },
    { id: 6, source: 'images/3203.jpg', description: '', landscapeMode: false },
];

const PhotoStack = () => {
    const [stack, setStack] = useState(data);
    const [current, setCurrent] = useState(data[data.length - 1].id);
    const [direction, setDirection] = useState(-1);
    const controls = useAnimation();
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-600, 0, 600], [-7, 0, 7]);

    useEffect(() => {
        console.info('useEffect.stack', stack);
        setCurrent(stack[stack.length - 1].id);
    }, [stack]);

    const variants = {
        moveOutside: {
            x: (window.screen.width / 1.5) * direction,
            transition: { duration: 0.5 },
        },
    };

    const handleDragEnd = (info) => {
        const dragOffSetX = info.offset.x;
        const velocityX = info.velocity.x;
        if (velocityX > -1500 && velocityX < 1500) return;

        setDirection(dragOffSetX < 0 ? -1 : 1);
        controls.start('moveOutside');
    };

    const onComplete = (definition) => {
        if (definition !== 'moveOutside') return;
        setStack(stack.filter((photo) => photo.id !== stack.length - 1));
        x.set(0);
    };

    return (
        <div className='photo-stack flex justify-center my-20'>
            <div className='photos'>
                {stack.map((photo) => {
                    if (photo.id === current) {
                        return (
                            <motion.img
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={0.7}
                                whileTap={{ scale: 1.1 }}
                                onDragEnd={(event, info) => {
                                    handleDragEnd(info);
                                }}
                                animate={controls}
                                variants={variants}
                                style={{ x, rotate, cursor: 'grab' }}
                                onAnimationComplete={onComplete}
                                key={photo.id}
                                className='photo'
                                src={photo.source}
                                alt=''
                            />
                        );
                    }
                    return (
                        <motion.img
                            key={photo.id}
                            className='photo'
                            src={photo.source}
                            alt=''
                            draggable={false}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PhotoStack;
