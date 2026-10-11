/**
 * Let eye icons (SVGs with circles of class "pupil", each centered in its eye) look around:
 * Follow the mouse cursor or a touching finger, blink when nothing moves, and glance around on touch devices.
 */
var initEyes = function() {
	var icons = new Map(); // SVG -> its pupils
	for (const pupil of document.getElementsByClassName("pupil")) {
		const svg = pupil.ownerSVGElement;
		if (!icons.has(svg)) {
			icons.set(svg, []);
		}
		icons.get(svg).push(pupil);
		pupil.style.transition = "transform .25s ease-out";
	}

	// How far a pupil may move away from the center of its eye
	const rangeX = 1.15;
	const rangeY = 2.5;
	// Directions as fractions of the range, the first one matches the transform in the SVG
	const glances = [[1, .24], [-1, .24], [0, -1], [-.7, -.7], [.7, .7]];

	const look = (pupils, x, y) => {
		for (const pupil of pupils) {
			pupil.style.transform = "translate(" + (x * rangeX) + "px, " + (y * rangeY) + "px)";
		}
	};

	// Both eyes look in the same direction, as seen from between them
	const lookAt = (clientX, clientY) => {
		icons.forEach((pupils, svg) => {
			var centerX = 0;
			var centerY = 0;
			for (const pupil of pupils) {
				centerX += pupil.cx.baseVal.value / pupils.length;
				centerY += pupil.cy.baseVal.value / pupils.length;
			}
			var point = new DOMPoint(clientX, clientY).matrixTransform(svg.getScreenCTM().inverse());
			var dx = point.x - centerX;
			var dy = point.y - centerY;
			var distance = Math.hypot(dx, dy);
			// Keep the direction when too close to tell one
			if (distance > .5) {
				look(pupils, dx / distance, dy / distance);
			}
		});
	};

	const glance = (direction) => {
		icons.forEach((pupils) => look(pupils, direction[0], direction[1]));
	};

	const blink = () => {
		icons.forEach((pupils, svg) => {
			svg.animate([{ transform: "none" }, { transform: "scaleY(.1)" }, { transform: "none" }], 200);
		});
	};

	// Irregular delays, mostly around the middle between min and max
	const randomDelay = (min, max) => min + (Math.random() + Math.random()) / 2 * (max - min);

	// When nothing moves, blink now and then, and look around without a mouse to follow.
	// Actions return how long they take, so they don't happen at the same time or right after each other.
	const idleBlink = () => {
		blink();
		if (Math.random() < .2) {
			setTimeout(blink, 250);
			return 450;
		}
		return 200;
	};
	const idleGlance = () => {
		glance(glances[Math.floor(Math.random() * glances.length)]);
		return 250;
	};

	var timers = new Map(); // action -> its timer
	var busyUntil = 0;
	const repeat = (action, minDelay, maxDelay) => {
		timers.set(action, setTimeout(() => {
			if (performance.now() >= busyUntil) {
				busyUntil = performance.now() + action() + 500;
			}
			repeat(action, minDelay, maxDelay);
		}, randomDelay(minDelay, maxDelay)));
	};
	const stopIdle = () => {
		timers.forEach((timer) => clearTimeout(timer));
	};
	const restartIdle = () => {
		stopIdle();
		if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			repeat(idleBlink, 4000, 10000);
			if (window.matchMedia("(hover: none)").matches) {
				repeat(idleGlance, 2000, 5000);
			}
		}
	};
	restartIdle();

	window.addEventListener('pointermove', (event) => {
		// Touches are handled separately, as pointer events stop once the page scrolls
		if (event.pointerType == "mouse") {
			lookAt(event.clientX, event.clientY);
			restartIdle();
		}
	}, false);

	// Keep looking where a touch was for a while
	const followTouch = (event) => {
		stopIdle();
		lookAt(event.touches[0].clientX, event.touches[0].clientY);
	};
	const endTouch = (event) => {
		if (event.touches.length == 0) {
			restartIdle();
		}
	};
	window.addEventListener('touchstart', followTouch, { passive: true });
	window.addEventListener('touchmove', followTouch, { passive: true });
	window.addEventListener('touchend', endTouch, { passive: true });
	window.addEventListener('touchcancel', endTouch, { passive: true });
};

export default initEyes;
