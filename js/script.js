gsap.registerPlugin(SplitText);

// LOGO Square Animation
let _logoDom = document.body.querySelector('.logo-anim');
let _logoPixels = _logoDom.querySelectorAll('.logo-anim__pixel');
let tlLogo = gsap.timeline({
	repeat: -1,
	repeatDelay: 8
});
tlLogo
	.to(_logoPixels, {
		duration: 0.7,
		scale: 0.5,
		ease: "power4.in",
		stagger: {
			grid: [5,5],
			from: "center",
			amount: .5,
		}
	})
	.to(_logoPixels, {
		duration: 0.7,
		scale: 1,
		ease: "power4.out",
		stagger: {
			grid: [5,5],
			from: "center",
			amount: .5,
		}
	}, "<+=0.7");




// TEXT Animation
let _contents = document.body.querySelectorAll('.content');
let _colors = ['#00AC62', "#94EBDE", "#FCF1E7", "#FF88AE", "#E8A9FF", "#F9D5F5", "#FDA05C", "#F42E46", "#FEA490"];
let _opacity = [0, 0.2, 0.4, 0.6, 0.8, 1, 0, 0, 0, 0.2, 0.2, 0.2];
let _speed = {
	duration: 0.1,
	staggerCols: 1,
	staggerPixel: 1,
	delayCols: 4,
	delayPixel: 0.05,
}

_contents.forEach(content => {
	let _split = new SplitText(content, { 
		type: 'chars, words',
		wordsClass: 'words',
		charsClass: 'chars',
	});

	_split.words.forEach(words => {
		createPixelsLines(words);
	});

	// Pixel's Column Animation
	_colPixels = content.querySelectorAll('.col-pixel');
	const tlCols = gsap.timeline({
		scrollTrigger: {
			trigger: content,
			start: 'top 95%',
			end: 'bottom 65%',
			scrub: 1,
			// markers: true
		}
	});
	tlCols
		.to(_colPixels, { 
			autoAlpha: 1,
			duration: _speed.duration,
			stagger: _speed.staggerCols,
	})
		.to(_colPixels, { 
			autoAlpha: 0,
			duration: _speed.duration,
			stagger: _speed.staggerCols,
	}, "<+=" + _speed.delayCols)
		.to(_split.chars, { 
			autoAlpha: 1,
			duration: _speed.duration,
			stagger: _speed.staggerPixel,
	}, "<+=" + _speed.delayPixel);
});


function createPixelsLines(words) {
	const _nbCols = words.querySelectorAll('.chars').length;

	// Prepare DOM
	const pixelsContainer = document.createElement('div');
	pixelsContainer.classList.add('pixels');

	for (let i = 0; i < _nbCols; i++) { // columns per word
		const colPixel = document.createElement('div');
		colPixel.classList.add('col-pixel');
		for (let j = 0; j < 3; j++) { // pixels per column
			const pixel = document.createElement('div');
			pixel.classList.add('pixel');
			
			pixel.style.setProperty('--bg-color', _colors[Math.floor(Math.random() * _colors.length)]);
			pixel.style.setProperty('--bg-opacity', _opacity[Math.floor(Math.random() * _opacity.length)]);
			
			colPixel.appendChild(pixel);
		}
		pixelsContainer.appendChild(colPixel);
	}

	// Inject New DOM
	words.appendChild(pixelsContainer);
}
