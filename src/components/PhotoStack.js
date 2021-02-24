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
    const controls = useAnimation();

    return (
        <div className='photo-stack flex justify-center my-20'>
            <div className='photos'>
                {data.map((photo) => (
                    <motion.div key={photo.id}>
                        <motion.img
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={0.7}
                            onDrag={(event, info) => {
                                // console.log('onDragEnd', info.offset.x);
                            }}
                            onDragEnd={(event, info) => {
                                console.log('onDragEnd', info.offset.x);
                            }}
                            className='photo'
                            src={photo.source}
                            animate={controls}
                            alt=''
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PhotoStack;
