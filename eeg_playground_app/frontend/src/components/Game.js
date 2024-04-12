import React, {useEffect, useRef } from 'react';
import p5 from 'p5';

// circle
let x = 400;
let y = 250;
let r = 70;

// rectangle
let rx = 120;
let ry = 120;
let rwh = 40;

//step
let speed = 1;

// points
let points = 0

const Game = ({ attention, meditation, direction }) => {

    const p5ContainerRef = useRef();

    // detect collision
    const circleRect = (cx, cy, radius, rx, ry, rw, rh) => {

        // temporary variables to set edges for testing
        let testX = cx;
        let testY = cy;

        // which edge is closest?
        if (cx < rx) testX = rx;      // test left edge
        else if (cx > rx + rw) testX = rx + rw;   // right edge
        if (cy < ry) testY = ry;      // top edge
        else if (cy > ry + rh) testY = ry + rh;   // bottom edge

        // get distance from closest edges
        let distX = cx - testX;
        let distY = cy - testY;
        let distance = Math.sqrt((distX * distX) + (distY * distY));

        // if the distance is less than the radius, collision!
        if (distance <= radius) {
            return true;
        }
        return false;
    }
    const sketch = (p) => {
        // p is a reference to the p5 instance this sketch is attached to
        p.setup = function () {
            p.createCanvas(800, 500);
            p.background('#373738');
        }

        p.draw = function () {
            p.background('#373738');
            // circle
            p.noStroke();
            p.fill(attention, 10, meditation);
            p.circle(x, y, r);
            // rectangle
            p.noStroke()
            p.fill('#EE6751')
            p.rect(rx, ry, rwh, rwh, 5)
            
            // display points
            p.textSize(18);
            p.text(points, 780, 20)

            // eeg dir changing
            if (direction === 0) {
                x = x;
                y = y - speed;
            } else if (direction === 1) {
                x = x;
                y = y + speed;
            } else if (direction === 2) {
                y = y;
                x = x + speed;
            } else if (direction === 3) {
                y = y;
                x = x - speed;
            }

            // canvas edge detection
            if (x <= -70) {
                x = p.width;
            }
            if (x > p.width) {
                x = 0;
            }
            if (y <= -70) {
                y = p.height;
            }
            if (y > p.height) {
                y = 0;
            }

            // collision detectin
            let hit = circleRect(x, y, r/2, rx, ry, rwh, rwh);
            if (hit) {
                rx = p.random(5, 750)
                ry = p.random(5, 445) 
                points+=1
            }

        }
    }

    useEffect(() => {
        // On component creation, instantiate a p5 object with the sketch and container reference 
        const p5Instance = new p5(sketch, p5ContainerRef.current);
        console.log(direction)
        // On component destruction, delete the p5 instance
        return () => {
            p5Instance.remove();
        }
    }, [direction, attention]);
    return (
        <div ref={p5ContainerRef} />
    );
}
export default Game;
