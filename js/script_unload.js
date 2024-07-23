gsap.registerPlugin(SplitText);

// UNLOADER
let _unloadDom = document.body.querySelector('.unload');
let _exitDom = document.body.querySelector('#exit');
let _colorsLoader = ['#D5F3E8', "#FBECDF", "#D6FFFE"];


buildGridLoader({grid: [10, 10], className: "unload__square", width: 1000, gutter: 0, parent: ".unload"});

// _exitDom.addEventListener('click', unloadPage);

function unloadPage() {
	gsap.set(".unload", {autoAlpha: 1});
	gsap.to(".unload__square", 
		{
			duration: 0.2,
			autoAlpha: 1,
			onComplete: () => {
				console.log('Redirect page HERE');
			},
			stagger: {
				amount: .25,
				grid: 'auto',
				ease: "steps(2)",
				from: 'random'
			}
		}
	);
}

function buildGridLoader(vars) {
	vars = vars || {};
	var container = document.createElement("div"),
	rows = vars.grid[0] || 5,
	cols = vars.grid[1] || 5,
	width = vars.width || 100,
	gutter = vars.gutter || 1,
	className = vars.className || "",
	w = (width - cols * gutter) / cols,
	parent = (typeof(vars.parent) === "string") ? document.querySelector(vars.parent) : vars.parent ? vars.parent : document.body,
	css = "display: inline-block; margin: 0 " + 0 + "% " + 0 + "% 0; width: " + 10 + "%;",
	l = rows * cols,
	i, box;
	for (i = 0; i < l; i++) {
		box = document.createElement("div");
		box.style.cssText = css;
		box.setAttribute("class", className);
		box.style.setProperty('--bg-color-loader', _colorsLoader[Math.floor(Math.random() * _colorsLoader.length)]);
		container.appendChild(box);
	}
	container.style.cssText = "width:100vw; height: 100vh; line-height: 0; padding:" + gutter + "px 0 0 " + gutter + "px; display:flex;flex-wrap: wrap;";
	parent.appendChild(container);
	return container;
}
// END UNLOADER


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
// END LOGO Square Animation




// TEXT Animation
let _contents = document.body.querySelectorAll('.content');
let _colorsPixelsText = ['#00AC62', "#94EBDE", "#FCF1E7", "#FF88AE", "#E8A9FF", "#F9D5F5", "#FDA05C", "#F42E46", "#FEA490"];
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
			
			pixel.style.setProperty('--bg-color', _colorsPixelsText[Math.floor(Math.random() * _colorsPixelsText.length)]);
			pixel.style.setProperty('--bg-opacity', _opacity[Math.floor(Math.random() * _opacity.length)]);
			
			colPixel.appendChild(pixel);
		}
		pixelsContainer.appendChild(colPixel);
	}
	
	// Inject New DOM
	words.appendChild(pixelsContainer);
}
// END TEXT Animation
