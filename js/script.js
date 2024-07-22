gsap.registerPlugin(SplitText);

let _contents = document.body.querySelectorAll('.content');
let _sizes = {
	cols: 18,
}
let _colors = ['#00AC62', "#87E7D8", "#FCB97F"];
let _opacity = [0, 0.2, 0.4, 1];
let _speed = {
	pixel: 0.1,
	staggerPixel: 0.05
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
			start: 'top 70%',
			end: 'bottom 70%',
			scrub: 1,
			// markers: true
		}
	});
	tlCols
		.to(_colPixels, { 
			duration: 1,
			stagger: 1,
			autoAlpha: 1,
	})
		.to(_colPixels, { 
			duration: 1,
			stagger: 1,
			autoAlpha: 0,
	}, "<+=" + 2)
		.to(_split.chars, { 
		duration: 1,
		autoAlpha: 1,
		stagger: 1
	}, "<+=" + 2.5);

	
	// Chars Animation
	// const tlChars = gsap.timeline({
	// 	scrollTrigger: {
	// 		trigger: content,
	// 		start: 'top 70%',
	// 		end: 'bottom 70%',
	// 		scrub: 1,
	// 		// markers: true
	// 	}
	// });
	
	// tlChars.from(_split.chars, { 
	// 	duration: 1,
	// 	autoAlpha: 0,
	// 	stagger: 1
	// });
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
