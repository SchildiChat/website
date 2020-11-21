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
		var containers = document.getElementsByClassName("flex-dynamic-adjust");
		for (var i = 0; i < containers.length; i++) {
			var parent = containers[i];

			// default-row
			var xAxis = true; // false for yAxis
			if (parent.classList.contains('default-column')) {
				xAxis = false;
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

			const adjust = (elem, isAdjusted) => {
				if (isAdjusted) {
					elem.classList.remove("not-adjusted");
					elem.classList.add("adjusted");
				} else {
					elem.classList.add("not-adjusted");
					elem.classList.remove("adjusted");
				}
			}

			if (parentSize >= childrenSize) {
				adjust(parent, false);
			} else {
				adjust(parent, true);
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
