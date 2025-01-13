(function ($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 666px)',
		xsmall: '(max-width: 480px)'
	});

	$(function () {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 0);
		});

		// Touch mode.
		if (skel.vars.mobile)
			$body.addClass('is-touch');

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function () {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

		// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

		// Off-Canvas Navigation.

		// Title Bar.
		$(
			'<header class="site-header">' +
			'<a href="#" class="mobile">' +
			'<img id="ascii" src="./image/index/aa/ASCII14.png" style="float: right;width: 32px;">' +
			'</a>' +
			'</header>' +

			'<div class="desktop">' +
			'' +
			'<span class="element" style="font-weight: 123;color: #464646;"></span>' +
			'<span class="element"></span>' +
			'<img src="./image/index/signaturelogo.png" style="width: 13px;">' +
			'</div>'
		)
			.appendTo($body);

		// Navigation Panel.
		$(
			'<div id="cd" class="openNav">' +
			'<div class="mobile-header">' +
			'<div class="mobile mobile-burger">' +
			'<div class="bar one"></div>' +
			'<div class="bar two"></div>' +
			'<div class="bar three"><p>miao</p></div>' +
			'</div>' +
			'</div>' +
			'</div>' +

			'<div id="mo-nav">' +
			'<div class="mobile m-avatar">' +
			'<img id="flower27" src="./image/index/avatar2.png">' +
			'</div>' +
			'<bq>miao</bq>' +
			'<div class="navigation-tags">' +
			'<ul id="menu-%e4%b8%bb-1" class="mobile menu">' +
			'<li><a href=""><img src="./image/index/4.png" style="font-weight: 321;width: 23px;">喵喵喵</a></li>' +
			'<li><a href=""><img src="./image/index/20.png" style="font-weight: 321;width: 23px;">喵喵喵</a></li>' +
			'<li><a href=""><img src="./image/index/19.png" style="font-weight: 321;width: 23px;">喵喵喵</a></li>' +
			'<li><a href=""><img src="./image/index/28.png" style="font-weight: 321;width: 23px;">喵喵喵</a></li>' +
			'<li><a href=""><img src="./image/index/29.png" style="font-weight: 321;width: 23px;">喵喵喵</a></li>' +
			'<li><a href="#"><img src="./image/index/28.gif" style="font-weight: 321;width: 23px;">文字广告位</a></li>' +
			'<li><a href="#"><img src="./image/index/29.gif" style="font-weight: 321;width: 23px;">文字广告位2</a></li>' +
			'<li><a href="#"><img src="./image/index/30.gif" style="font-weight: 321;width: 23px;">文字广告位3</a></li>' +
			'</ul>' +
			'</div>' +
			'</div>'
		)
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'left',
				target: $body,
				visibleClass: 'navPanel-visible'
			});

		// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
		if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
			$('#titleBar, #navPanel, #page-wrapper')
				.css('transition', 'none');

		// Parallax.
		// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (skel.vars.browser == 'ie'
			|| skel.vars.mobile) {

			$.fn._parallax = function () {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function () {

				$(this).each(function () {

					var $this = $(this),
						on, off;

					on = function () {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function () {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function () {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					skel.on('change', function () {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

				return $(this);

			};

			$window
				.on('load resize', function () {
					$window.trigger('scroll');
				});

		}

		// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function () {

				var $this = $(this),
					on, off;

				on = function () {

					// Use main <img>'s src as this spotlight's background.
					$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Enable transitions (if supported).
					if (skel.canUse('transition')) {

						var top, bottom, mode;

						// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

						// Add scrollex.
						$this.scrollex({
							mode: mode,
							top: top,
							bottom: bottom,
							initialize: function (t) { $this.addClass('inactive'); },
							terminate: function (t) { $this.removeClass('inactive'); },
							enter: function (t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

					}

				};

				off = function () {

					// Clear spotlight's background.
					$this.css('background-image', '');

					// Disable transitions (if supported).
					if (skel.canUse('transition')) {

						// Remove scrollex.
						$this.unscrollex();

					}

				};

				skel.on('change', function () {

					if (skel.breakpoint('medium').active)
						(off)();
					else
						(on)();

				});

			});

		// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function () {

				var $this = $(this),
					on, off;

				on = function () {

					if (skel.canUse('transition')) {

						$this.scrollex({
							top: 250,
							bottom: 0,
							initialize: function (t) { $this.addClass('inactive'); },
							terminate: function (t) { $this.removeClass('inactive'); },
							enter: function (t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

					}

				};

				off = function () {

					if (skel.canUse('transition'))
						$this.unscrollex();

				};

				skel.on('change', function () {

					if (skel.breakpoint('medium').active)
						(off)();
					else
						(on)();

				});

			});

		// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

		// Your new JavaScript code for the header
		// 获取导航栏元素
		const header = document.querySelector(".site-header");

		// 监听页面滚动事件
		window.addEventListener("scroll", () => {
			// 当页面滚动超过一定高度时，添加类名 'top' 来改变导航栏样式
			if (window.scrollY > 50) {
				header.classList.add("top");
			} else {
				header.classList.remove("top");
			}
		});

		// Your additional code for mobile navigation
		const openNav = document.querySelector(".openNav");
		const mobileBurger = document.querySelector(".mobile-burger");
		const moNav = document.querySelector("#mo-nav");
		const mainContainer = document.querySelector("#main-container");

		mobileBurger.addEventListener("click", () => {
			openNav.classList.toggle("open");
			mobileBurger.classList.toggle("active");
			moNav.classList.toggle("open");
			mainContainer.classList.toggle("open");
		});

		// 设置 Typed.js 的配置选项
		var options = {
			strings: ["你指尖跃动的电光，是我此生不变的信仰，唯我超电磁炮永世长存！"/*, ""*/],
			typeSpeed: 140,
			backSpeed: 50,
			loop: true,
			showCursor: true
		};
		// 初始化 Typed.js
		var typed = new Typed(".element", options);

	});

})(jQuery);

//导航栏
document.addEventListener("DOMContentLoaded", function () {
	var header = document.querySelector('#header');

	window.addEventListener('scroll', function () {
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		header.style.transition = 'all 1s';
		header.style.borderRadius = scrollTop > 0 ? '0px' : '15px';
		header.style.width = scrollTop > 0 ? '100%' : '95%';
		header.style.top = scrollTop > 0 ? '0px' : '30px';
		header.style.backgroundColor = scrollTop > 0 ? 'rgba(66, 66, 66, 0)' : 'rgba(66, 66, 66, 0)';
	});

	header.addEventListener('mouseover', function () {
		header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
	});

	header.addEventListener('mouseout', function () {
		header.style.backgroundColor = 'rgba(66, 66, 66, 0)';
	});
});

//手机端菜单
'use strict';
$(document).ready(function () {
	var $burger = $('.mobile-burger'),
		$topLine = $('.bar one'),
		$midLine = $('.bar two'),
		$menuLine = $('.bar three'),
		anim = false;

	var changeClasses = {
		addActive: function addActive() {
			for (var i = 0; i <= 2; i++) {
				$burger.children().eq(i).removeClass('reverseLine' + (i + 1)).addClass('activeLine' + (i + 1));
			}
		},
		addReverse: function addReverse() {
			for (var i = 0; i <= 2; i++) {
				$burger.children().eq(i).removeClass('activeLine' + (i + 1)).addClass('reverseLine' + (i + 1));
			}
		}
	};

	var timeouts = {
		initial: function initial(child, Y, rot, scale) {
			$burger.children().eq(child).css('transform', 'translateY(' + Y + 'px) rotate(' + rot + 'deg) scale(' + scale + ',1)');
		},
		afterActive: function afterActive() {
			var _this = this;

			// ES6
			setTimeout(function () {
				_this.initial(0, 12, 45, 1.40);
				_this.initial(1, -12, -45, 1.40);
				_this.initial(2, 35, 0, 1);
				$burger.children().eq(2).css('opacity', '0');
				anim = true;
			}, 233);
			// With bind()
			// setTimeout(function() {
			//   this.initial(0, 12, 45, 1.40);
			//   this.initial(1, -12, -45, 1.40);
			//   this.initial(2, 35, 0, 1);
			//   $burger.children().eq(2).css('opacity', '0');
			//   anim = true;
			// }.bind(this), 1300);
		},
		beforeReverse: function beforeReverse() {
			var _this2 = this;

			setTimeout(function () {
				for (var i = 0; i <= 2; i++) {
					_this2.initial(i, 0, 0, 1);
				}
				$burger.children().eq(2).css('opacity', '1');
				anim = false;
			}, 233);
		}
	};

	$burger.on('click', function () {
		if (!anim) {
			changeClasses.addActive();
			timeouts.afterActive();
		} else if (anim) {
			changeClasses.addReverse();
			timeouts.beforeReverse();
		}
	});
});