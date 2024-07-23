gsap.registerPlugin(SplitText);

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

// a key map of allowed keys
var allowedKeys = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down',
	65: 'a',
	66: 'b'
  };
  
// the 'official' Konami Code sequence
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

// a variable to remember the 'position' the user has reached so far.
var konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
	// get the value of the key code from the key map
	var key = allowedKeys[e.keyCode];
	// get the value of the required key from the konami code
	var requiredKey = konamiCode[konamiCodePosition];
  
	// compare the key with the required key
	if (key == requiredKey) {
  
	  // move to the next key in the konami code sequence
	  konamiCodePosition++;
  
	  // if the last key is reached, activate cheats
	  if (konamiCodePosition == konamiCode.length) {
		activateCheats();
		konamiCodePosition = 0;
	  }
	} else {
	  konamiCodePosition = 0;
	}
  });


function activateCheats() {
	const _colPixels = document.body.querySelectorAll('.col-pixel');
	const _pixels = document.body.querySelectorAll('.col-pixel');
	
	gsap.to(_colPixels, {autoAlpha: 1})
	gsap.to(_pixels, {scale: 3, stagger: {
		amount: 2,
		from: "random"
	  }})
}
