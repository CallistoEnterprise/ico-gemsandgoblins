const {DateTime} = luxon;

const windowWidth = () => Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const vw = (percent) => (percent * windowWidth()) / 100;

const objectMap = (object, map) => Object.fromEntries(
    Object.entries(object).map(
        ([key, value]) => ([key, map(key, value)])
    )
);

const initAnimationHandle = {
    frames: 0,
    duration: 0,
    cancel: () => {},
    isRunning: () => false,
};

const animationSetter = (el, frameHeight) => (frame) => el.style.backgroundPosition = `center ${-frame * frameHeight}px`;
const percentSetter = (el, frameHeight) => (frame) => el.style.backgroundPosition = `center ${frame * frameHeight}%`;

const animationTimer = (startFrame, endFrame, fps, update) => {
    const frames = endFrame - startFrame;
    const frameDuration = 1000.0 / fps;

    let startTime = null;
    let callbackHandle = null;

    const callback = (time) => {
        callbackHandle = null;

        if (startTime === null)
            startTime = time;

        const elapsed = time - startTime;
        const frameOffset = (elapsed / frameDuration) | 0;

        if (update(frameOffset, frames))
            callbackHandle = requestAnimationFrame(callback);
    };

    callbackHandle = requestAnimationFrame(callback);

    const cancel = () => {
        if (!callbackHandle)
            return;

        cancelAnimationFrame(callbackHandle);
        callbackHandle = null;
    };
    const isRunning = () => {
        return callbackHandle !== null;
    };

    return {
        frames,
        duration: frameDuration * frames,
        cancel,
        isRunning,
    };
};

const animation = {
    loop: (setAnimation, startFrame, endFrame, fps) => animationTimer(startFrame, endFrame, fps, (frameOffset, frames) => {
        setAnimation(startFrame + frameOffset % frames);
        return true;
    }),
    oneShot: (setAnimation, startFrame, endFrame, fps, shouldResetOnEnd = true) => animationTimer(startFrame, endFrame, fps, (frameOffset, frames) => {
        if (frameOffset >= Math.abs(frames)) {
            setAnimation(shouldResetOnEnd ? startFrame : startFrame + frames);
            return false;
        }

        setAnimation(startFrame + frameOffset * (frames < 0 ? -1 : 1));
        return true;
    }),
    button: (setAnimation, startFrame, hoverFrame, pressedFrame, releasedFrame, endFrame, fps) => {
        const states = {
            start: {
                hover: {
                    from: startFrame,
                    to: hoverFrame,
                },
                pressed: {
                    from: startFrame,
                    to: pressedFrame,
                },
            },
            hover: {
                start: {
                    from: releasedFrame,
                    to: endFrame,
                },
                pressed: {
                    from: hoverFrame,
                    to: pressedFrame,
                },
            },
            pressed: {
                start: {
                    from: pressedFrame,
                    to: endFrame,
                },
                hover: {
                    from: pressedFrame,
                    to: releasedFrame,
                },
            },
        };

        return objectMap(states,
            (state, transitions) => objectMap(transitions,
                (transition, {from, to}) => () => animation.oneShot(setAnimation, from, to, fps, false)
            )
        );
    }
};

const stateMachine = {
    button: (el, animations) => {
        let currentState = 'start';
        let readyTime = Date.now();
        let updateTimeout = null;
        let animationHandle = initAnimationHandle;
        const queue = [];

        const update = () => {
            const now = Date.now();
            const untilReady = readyTime - now;

            if (updateTimeout) {
                clearTimeout(updateTimeout);
                updateTimeout = null;
            }

            if (untilReady > 0) {
                updateTimeout = setTimeout(update, untilReady);
                return;
            }

            const nextState = queue.shift();
            animationHandle = animations[currentState][nextState]();
            readyTime = now + animationHandle.duration;
            currentState = nextState;

            if (queue.length)
                update();
        };

        el.onmouseenter = () => {
            if (animationHandle.isRunning())
                animationHandle.cancel();
            readyTime = Date.now();
            currentState = 'start';
            queue.length = 0;
            queue.push('hover');
            update();
        };
        el.onmouseleave = () => {
            queue.push('start');
            update();
        };
        el.onmousedown = () => {
            queue.push('pressed');
            update();
        }
        el.onmouseup = () => {
            queue.push('hover');
            update();
        }
    },
};

window.presale = () => {
    const onResizeHandlers = [];

    const roundStart = DateTime.fromISO("2023-03-01T00:00:00");
    const roundEnd = DateTime.fromISO("2023-04-01T00:00:00");
    let oldRemaining = roundEnd.diffNow(['days', 'hours', 'minutes', 'seconds', 'milliseconds']);
    const untilStart = roundStart.diffNow(['milliseconds']);

    document.querySelectorAll('.round-heading-indicator-light').forEach(el => {
        if (untilStart.milliseconds > 0)
            el.classList.add('inactive');
        else {
            el.classList.remove('inactive');
            animation.loop(animationSetter(el, 50), 0, 24, 24);
        }

        onResizeHandlers.push(() => {
            el.style.scale = windowWidth() > 800 ? vw(1.11) / 32 : vw(4.44) / 32;
        });
    });

    const updateClock = (isFirstRun) => {
        const remaining = roundEnd.diffNow(['days', 'hours', 'minutes', 'seconds', 'milliseconds']);
        const updateValue = (unit, value) => setTimeout(() => document.querySelectorAll(
            `.round-time-left-clock-value[data-field="${unit}"] .round-time-left-clock-value-text`
        ).forEach(el => el.innerHTML = value), 187);

        const animate = (unit) => document.querySelectorAll(
                    `.round-time-left-clock-value[data-field="${unit}"] .round-time-left-clock-value-bg-flip`
                ).forEach(
                    el => animation.oneShot(
                        animationSetter(el, 130),
                    0, 9, 24
                    )
        );

        if (isFirstRun) {
            updateValue('seconds', remaining.seconds);
            updateValue('minutes', remaining.minutes);
            updateValue('hours', remaining.hours);
            updateValue('days', remaining.days);
        }

        if (remaining.seconds !== oldRemaining.seconds) {
            updateValue('seconds', remaining.seconds);
            animate('seconds');
        }
        if (remaining.minutes !== oldRemaining.minutes) {
            updateValue('minutes', remaining.minutes);
            animate('minutes');
        }
        if (remaining.hours !== oldRemaining.hours) {
            updateValue('hours', remaining.hours);
            animate('hours');
        }
        if (remaining.days !== oldRemaining.days) {
            updateValue('days', remaining.days);
            animate('days');
        }

        oldRemaining = remaining;
    };

    setInterval(() => updateClock(false), 125);
    updateClock(true)

    document.querySelectorAll('.round-time-left-clock-value-bg-flip').forEach(el => {
        onResizeHandlers.push(() => {
            el.style.scale = windowWidth() > 800 ? vw(3.47) / 150 : vw(13.88) / 150;
        });
    });

    document.querySelectorAll('.presale-container .round-progress-bar-fill').forEach(el => {
        animation.loop(
            animationSetter(el, 145), 0, 47, 24
        );
        onResizeHandlers.push(() => {
            el.style.scale = windowWidth() > 800 ? vw(3.02) / 145 : vw(9.42) / 145;
        });
    });

    document.querySelectorAll('.presale-buy-button-img').forEach(el => {
        const animations = animation.button(
            animationSetter(el, 200),
            0, 2, 4, 9, 29, 24
        );

        stateMachine.button(el.parentElement, animations);
       

        onResizeHandlers.push(() => {
            el.style.scale = windowWidth() > 800 ? vw(15.2) / 700 : vw(71.11) / 700;
        });
    });

/*
    document.querySelectorAll(".button-whitepaper-header").forEach(el => {
        const animations = animation.button(
            percentSetter(el, 100 / 29),
            29, 6, 2, 0, 0, 24
        );

        stateMachine.button(el, animations);

    });
*/

    const onResize = () => onResizeHandlers.forEach(handler => handler());
    window.onresize = onResize;

    window.presaleRefreshUi = () => {
        document.querySelectorAll('.connect-wallet-button-img').forEach(el => {
            const animations = animation.button(
                animationSetter(el, 200),
                0, 2, 4, 9, 29, 24
            );

            stateMachine.button(el.parentElement, animations);

            onResizeHandlers.push(() => {
                el.style.scale = windowWidth() > 800 ? vw(16.67) / 700 : vw(66.67) / 700;
            });
        });

        document.querySelectorAll('.wallet-connected-button-img').forEach(el => {
            const animations = animation.button(
                animationSetter(el, 200),
                0, 2, 4, 9, 29, 24
            );

            stateMachine.button(el.parentElement, animations);

            onResizeHandlers.push(() => {
                el.style.scale = windowWidth() > 800 ? vw(16.67) / 700 : vw(66.67) / 700;
            });
        });

        document.querySelectorAll('.popup-close-button-img').forEach(el => {
            const animations = animation.button(
                animationSetter(el, 200),
                0, 2, 4, 9, 29, 24
            );

            stateMachine.button(el.parentElement, animations);

            onResizeHandlers.push(() => {
                el.style.scale = windowWidth() > 800 ? vw(16.67) / 700 : vw(66.67) / 700;
            });
        });

        document.querySelectorAll('.popup-contact-support-button-img').forEach(el => {
            const animations = animation.button(
                animationSetter(el, 200),
                0, 2, 4, 9, 29, 24
            );

            stateMachine.button(el.parentElement, animations);

            onResizeHandlers.push(() => {
                el.style.scale = windowWidth() > 800 ? vw(16.67) / 700 : vw(66.67) / 700;
            });
        });
        onResize();
    };
    window.presaleRefreshUi();

    setTimeout(function () {

        loadingWrapper.classList.add("loading-finished");

    }, 1000);
};
