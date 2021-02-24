import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
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
    const controls = useAnimation();

    useEffect(() => {
        console.info('useEffect.stack', stack);
        setCurrent(stack[stack.length - 1].id);
    }, [stack]);

    useEffect(() => {
        console.info('useEffect.stack', current);
    }, [current]);

    const handleDragEnd = (info) => {
        const dragOffSetX = info.offset.x;
        if (dragOffSetX > -450 && dragOffSetX < 450) return;

        const direction = dragOffSetX < 0 ? -1 : 1;
        const endX = (window.screen.width / 2) * direction;
        const rotation = 5 * direction;

        controls.start({
            x: endX,
            y: info.offset.y,
            rotate: rotation,
            transition: { duration: 0.5 },
        });
    };

    const onComplete = () => {
        console.info('onAnimationEnd');
        setStack(stack.filter((photo) => photo.id !== stack.length - 1));
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
                                onDrag={(event, info) => {
                                    console.log(info.point.x);
                                }}
                                onDragEnd={(event, info) => {
                                    handleDragEnd(info);
                                }}
                                animate={controls}
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
