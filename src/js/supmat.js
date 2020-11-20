// /*!
//  */

var initSupmat = function() {
	// for stupid vh handling with address bar on mobile browsers
	var vhElem = document.createElement('div');
	vhElem.style.cssText = 'position:fixed;top:0;bottom:0;width:0';
	document.body.appendChild(vhElem);
	const setVh = () => {
		var style = vhElem.currentStyle || window.getComputedStyle(vhElem);
		var height = parseFloat(style.height);
		document.documentElement.style.setProperty('--vh', (height/100)+"px");
	};

	// change between space-between and space-around
	const justifyBetweenAround = () => {
		var containers = document.getElementsByClassName("justify-between-around");
		for (var i = 0; i < containers.length; i++) {
			var parent = containers.item(i);
			var style = parent.currentStyle || window.getComputedStyle(parent),
				width = parseFloat(style.width),
				margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
				padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
				border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
			var parentWidth = width;

			console.log(parentWidth);

			var children = parent.children;
			var childrenWidth = 0;
			var lastMargin = 0;
			for (var j = 0; j < children.length; j++) {
				var child = children.item(j);
				var style = child.currentStyle || window.getComputedStyle(child),
					width = parseFloat(style.width),
					margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
					padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
					border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
				var childWidth = width + margin - padding + border;
				childrenWidth += childWidth;
				lastMargin = margin;
				console.log(child.getBoundingClientRect().bottom);
			}
			childWidth -= lastMargin;
			console.log(childrenWidth);

			if (parentWidth >= childrenWidth) {
				parent.style.flexDirection = "row";
			} else {
				parent.style.flexDirection = "column-reverse";
			}
		}
	};

	const doStuffOnResize = () => {
		setVh();
		justifyBetweenAround();
	}

	window.addEventListener('load', doStuffOnResize, false);
	window.addEventListener('resize', doStuffOnResize, false);
	window.addEventListener('orientationchange', doStuffOnResize, false);
};

export default initSupmat;
