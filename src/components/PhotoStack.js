import React, { useRef, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import gsap from 'gsap';
import './PhotoStack.css';

const PhotoStack = () => {
    const photosRef = useRef([]);

    const [props, set] = useSpring(() => ({
        x: 0,
        y: 0,
        scale: 1,
    }));

    const bind = useDrag(({ active, movement: [x, y] }) => {
        console.info('useDrag', active, x, y);
        set({
            x: active ? x : 0,
            y: active ? y : 0,
            scale: active ? 1.05 : 1,
            immediate: active,
        });
    });

    const stackIn = () => {
        gsap.fromTo(
            photosRef.current,
            {
                y: (i) => -500 - (i + 1) * 10,
                x: (i) => 100 * Math.sin((i + 1) * 45),
                rotate: (i) => 20 * Math.sin((i + 1) * 45),
                opacity: 0,
            },
            {
                duration: 1.2,
                y: (i) => Math.sin(i + 2) * 10,
                x: (i) => Math.sin(i + 2) * 5,
                rotate: (i) => Math.sin(i + 3) * 2,
                opacity: 1,
                ease: 'Power4.easeOut',
                stagger: 0.1,
            }
        );
    };

    useEffect(() => {
        stackIn();
    }, []);

    return (
        <div className='photo-stack flex justify-center my-20'>
            <div className='photos'>
                <div
                    ref={(el) => {
                        photosRef.current[0] = el;
                    }}
                    className='photo bg-blue-300'
                />
                <div
                    ref={(el) => {
                        photosRef.current[1] = el;
                    }}
                    className='photo bg-red-300'
                />
                <div
                    ref={(el) => {
                        photosRef.current[2] = el;
                    }}
                    className='photo bg-indigo-300'
                />
                <div
                    ref={(el) => {
                        photosRef.current[3] = el;
                    }}
                    className='photo bg-green-300'
                />
                <div
                    ref={(el) => {
                        photosRef.current[4] = el;
                    }}
                    className='photo bg-purple-300'
                />
                <animated.div
                    ref={(el) => {
                        photosRef.current[5] = el;
                    }}
                    {...bind()}
                    style={props}
                    className='photo bg-gray-300'
                />
            </div>
        </div>
    );
};

export default PhotoStack;
