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

	/** 
	 * Change flex-direction between row and column, also reverse opposit direction if needed.
	 * 
	 * @todo allow nesting through building a tree, start with root, append class to each once adjusted, only adjust child if parent is adjusted
	 * @todo dethrottle
	 */
	const flexDirectionAdjust = () => {
		var containers = document.getElementsByClassName("flex-direction-adjust");
		for (var i = 0; i < containers.length; i++) {
			var parent = containers[i];

			// default row-column
			var xAxis = true; // false for yAxis
			var reverse = false;
			if (parent.classList.contains('row-column-reverse')) {
				xAxis = true;
				reverse = true;
			}
			if (parent.classList.contains('column-row')) {
				xAxis = false;
				reverse = false;
			}
			if (parent.classList.contains('column-row-reverse')) {
				xAxis = false;
				reverse = true;
			}

			var style = parent.currentStyle || window.getComputedStyle(parent);
			var	parentSize = parseFloat(xAxis ? style.width : style.height);

			var children = parent.children;
			var childrenSize = 0;
			for (var j = 0; j < children.length; j++) {
				var child = children[j];
				var style = child.currentStyle || window.getComputedStyle(child);
				var width = parseFloat(xAxis ? style.width : style.height);
				var margin = parseFloat(xAxis ? style.marginLeft : style.marginTop) + parseFloat(xAxis ? style.marginRight : style.marginBottom);
				// var padding = parseFloat(xAxis ? style.paddingLeft : style.paddingTop) + parseFloat(xAxis ? style.paddingRight : style.paddingBottom);
				var border = parseFloat(xAxis ? style.borderLeftWidth : style.borderTopWidth) + parseFloat(xAxis ? style.borderRightWidth : style.borderBottomWidth);
				childrenSize += width + margin + border;
			}

			if (parentSize >= childrenSize) {
				parent.style.flexDirection = (xAxis ? "row" : "column");
			} else {
				parent.style.flexDirection = (xAxis ? "column" : "row") + (reverse ? "-reverse" : "");
			}
		}
	};

	const doStuffOnResize = () => {
		setVh();
		flexDirectionAdjust();
	}

	window.addEventListener('load', doStuffOnResize, false);
	window.addEventListener('resize', doStuffOnResize, false);
	window.addEventListener('orientationchange', doStuffOnResize, false);
};

export default initSupmat;
