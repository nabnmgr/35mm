import React, { useRef, useState, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import gsap from 'gsap';
import './PhotoStack.css';

const arrayMove = require('array-move');

const items = ['blue', 'red', 'indigo', 'green', 'purple', 'gray'];

const PhotoStack = () => {
    const photosRef = useRef([]);
    const [index, setIndex] = useState(items.length - 1);
    const [photos, setPhotos] = useState(items);

    const bind = useDrag((state) => {
        const {
            active,
            movement: [x, y],
        } = state;
        const i = state.args;

        console.info('change zindex', x, y);

        gsap.to(state.event.target, {
            duration: 0.6,
            x: active ? x : 0,
            y: active ? y : 0,
            scale: active ? 1.05 : 1,
            ease: 'Power4.easeOut',
            onComplete: () => {
                console.info('onComplete');
                if (active || x > -310) return;
                gsap.set(photosRef.current, {
                    css: { zIndex: 2 },
                });
                setPhotos(arrayMove(photos, i, 0));
            },
        });

        if (!active && (x < -310 || x > 310)) {
            // gsap.set(photosRef.current, {
            //     css: { zIndex: 2 },
            // });
            gsap.set(photosRef.current[i], {
                css: { zIndex: 1 },
            });
        }
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
                {photos.map((photo, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            photosRef.current[i] = el;
                        }}
                        {...bind(i)}
                        className={`photo bg-${photo}-300`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoStack;
