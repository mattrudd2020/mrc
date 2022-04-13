// Using Locomotive Scroll from Locomotive --> https://github.com/locomotivemtl/locomotive-scroll
// connected to ScrollTrigger via
// https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy() //

const scroller = document.querySelector('[data-scroll-container]')

const locoScroll = new LocomotiveScroll({
  el: scroller,
  smooth: true,
  getSpeed: true,
  lerp: 0.1
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(scroller, {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: scroller.style.transform ? "transform" : "fixed"
});

ScrollTrigger.defaults({
  scroller: scroller
})

//LOTTIE ANIMATION

LottieScrollTrigger({
    target: "#quote",
    path: "https://uploads-ssl.webflow.com/61a80bd2a3ff0e334f69bd03/61df93ff2941d82f928e5377_FINAL-NEW_LETTERS2.json",
    speed: "medium",
    pin: "#LottieSection",
    start: "top 25%",
    end: "bottom top",
    pinnedContainer: '#LottieSection',
    scrub: 1,
    markers: true
  }); 

LottieScrollTrigger({
    target: "#contours",
    path: "https://assets.codepen.io/4086427/data_6.json",
    speed: "medium",
    pin: "#LottieSection2",
    start: "top 12.5%",
    end: "bottom top",
    pinnedContainer: '#LottieSection2',
    scrub: 1,
    markers: true
  });    

LottieScrollTrigger({
  target: "#title2",
  path: "https://assets.codepen.io/4086427/data_4.json",
  speed: "medium",
  pin: "#LottieSection",
  start: "top 17.5%",
  end: "bottom 17.5%",
  pinnedContainer: '#LottieSection',
  scrub: 1,
  markers: true
  }); 
    
  LottieScrollTrigger({
  target: "#title3",
  path: "https://assets.codepen.io/4086427/data_4.json",
  speed: "medium",
  pin: "#LottieSection",
  start: "top 17.5%",
  end: "bottom 17.5%",
  pinnedContainer: '#LottieSection',
  scrub: 1,
  markers: true
 });  

function LottieScrollTrigger(vars) {
    let playhead = {frame: 0},
      target = gsap.utils.toArray(vars.target)[0],
      speeds = {slow: "+=2000", medium: "+=1000", fast: "+=500"},
      st = {trigger: target, pin: true, start: "top top", end: speeds[vars.speed] || "+=1000", scrub: 1},
      animation = lottie.loadAnimation({
        container: target,
        renderer: vars.renderer || "svg",
        loop: false,
        autoplay: false,
        path: vars.path
      });
    for (let p in vars) { // let users override the ScrollTrigger defaults
      st[p] = vars[p];
    }
    animation.addEventListener("DOMLoaded", function() {
      gsap.to(playhead, {
        frame: animation.totalFrames - 1,
        ease: "none",
        onUpdate: () => animation.goToAndStop(playhead.frame, true),
        scrollTrigger: st
    });  
    // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
 ScrollTrigger.sort();
    ScrollTrigger.refresh(); 
  });
  return animation;   
}
//Not loading after above animation!?//
const boxes = gsap.utils.toArray('.box');

// Set things up
gsap.set(boxes, {autoAlpha: 0, y: 100});

boxes.forEach((box, i) => {
  // Set up your animation
  const anim = gsap.to(box, {delay: 1, duration: 2, autoAlpha: 1, y: 0, ease:"power3", paused: true});
  
  // Use callbacks to control the state of the animation
  ScrollTrigger.create({
    trigger: box,
  	pinnedContainer: "#LottieSection",
    end: "top top",
    once: true,
    markers: true,
    onEnter: self => {
      // If it's scrolled past, set the state
      // If it's scrolled to, play it
      self.progress === 1 ? anim.progress(1) : anim.play()
    }
  });
});

// HORIZONTAL

const horizontalSections = gsap.utils.toArray('.horizontal')

horizontalSections.forEach(function (sec, i) {	
  
  var thisPinWrap = sec.querySelector('.pin-wrap');
  var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');
  
  var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth); 
  
  gsap.fromTo(thisAnimWrap, { 
    x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue() 
  }, { 
    x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0, 
    ease: "none",
    scrollTrigger: {
      trigger: sec,		
      scroller: scroller,
      start: "top top",
      end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
      pin: thisPinWrap,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      scrub: true,
      snap: 1,
      //markers: true
    }
  });

});	

  /* COLOR CHANGER */

  const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
  scrollColorElems.forEach((colorSection, i) => {
    const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
    const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

    ScrollTrigger.create({
      trigger: colorSection,
      scroller: "[data-scroll-container]",
      start: "top 75%",
      onEnter: () =>
        gsap.to("body", {
          backgroundColor: colorSection.dataset.bgcolor,
          color: colorSection.dataset.textcolor,
          overwrite: "auto"
        }),
      onLeaveBack: () =>
        gsap.to("body", {
          backgroundColor: prevBg,
          color: prevText,
          overwrite: "auto"
        })
    });
  });

// MENU CODE



// MENU HAMBURGER CODE

var upper = document.getElementsByClassName('upper');
var middle = document.getElementsByClassName('middle');
var lower = document.getElementsByClassName('lower');

var tl = gsap.timeline({paused: true, reversed: true});

tl.to(upper, 0.5, {attr: {d: "M8,2 L2,8"}, x: 1, ease:Power2.easeInOut}, 'start')
tl.to(middle, 0.5, {autoAlpha: 0}, 'start')
tl.to(lower, 0.5, {attr: {d: "M8,8 L2,2"}, x: 1, ease:Power2.easeInOut}, 'start');

document.querySelector('.hamburger').addEventListener('click', function(){
  tl.reversed() ? tl.play() : tl.reverse();
})

// FOOTER CODE
gsap.set('.footer-container', { yPercent: -50 })

const uncover = gsap.timeline({ paused:true })

uncover
.to('.footer-container', { yPercent: 0, ease: 'none' })
;

ScrollTrigger.create({  
  trigger: '.copy2',
  start: 'bottom bottom',
  end: '+=75%',
  animation: uncover,
  scrub: true,  
  markers: true,
})

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

/////////TITLE SWITCH & PARA FADE///////

let panels = gsap.utils.toArray(".panel");
  
let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".text-container",
    start: "top top",
    end: "+=300%",
    scrub: true,
    pin: true,
    scroller: '[data-scroll-container]' 
  }
});


let stayTime = 1; // seconds between each text flip on the timeline (not literally seconds on screen - we're just spacing them out on the timeline)
let textElements = gsap.utils.toArray(".text"); // get an Array of all the ".text" elements

// loop through each text element and add an autoAlpha flip at the appropriate times on the timeline
textElements.forEach((el, i) => {
  tl2.set(el, {autoAlpha: 1}, i * stayTime);
  if (i !== 0) { // if it's the first one, we don't need to toggle the previous one off.
    tl2.set(textElements[i - 1], {autoAlpha: 0}, i * stayTime);
  }
});
// add some space at the end of the timeline so the last one stays for the correct duration before things get unpinned.
tl2.set({}, {delay: stayTime});

tl2.to(".panel.first", {
  yPercent: -100
});

tl2.to("#para-text", {opacity: 0,}, "<1");


gsap.set(".panel", {zIndex: (i, target, targets) => targets.length - i});


//CIRCLE-GROW
gsap
  .timeline({
  defaults: {
    ease:"none"
  },
    scrollTrigger: {
      trigger: "#container-circle",
      pin: true,
      start: "top top",
      end: "+=800",
      scrub: 1,
      markers: true
    }
  })
  .to("#masker", { duration: 2, attr: { r: 800 } })
  .to("#clipPathReveal", { duration: 10, rotation: -360, svgOrigin:"200 200" }, 0.4);



//GSAP GALLERY TWEEN


 gsap.to('#Wrapper1', {
  xPercent: -10,
  ease: "Power2.easeInOut",
  scrollTrigger: {
    trigger: "#WrapperOuter",
    start: "top center",
    end: "bottom top",
    scrub: true
  }
}) 

 gsap.to('#Wrapper2', {
  xPercent: 10,
  ease: "Power2.easeOut",
  scrollTrigger: {
    trigger: "#WrapperOuter",
    start: "top center",
    end: "bottom top",
    scrub: true
  }
}) 
 gsap.to('#Wrapper3', {
  xPercent: -10,
  ease: "Power2.easeOut",
  scrollTrigger: {
    trigger: "#WrapperOuter",
    start: "top center",
    end: "bottom top",
    scrub: true
  }
}) 

 gsap.to('#Wrapper4', {
  xPercent: 10,
  ease: "Power2.easeOut",
  scrollTrigger: {
    trigger: "#WrapperOuter",
    start: "top center",
    end: "bottom top",
    scrub: true
  }
}) 
 gsap.to('#Wrapper5', {
  xPercent: -10,
  ease: "Power2.easeOut",
  scrollTrigger: {
    trigger: "#WrapperOuter",
    start: "top center",
    end: "bottom top",
    scrub: true
  }
}) 


//GSAP VIDEO HOVER MOUSE


const cursorMain = document.querySelector(".cursor-main");
const cursorVideo = document.querySelector(".cursor-video");
let scale = 1;

function mousemoveHandler(e) {
  const target = e.target;
  const tl = gsap.timeline({
    defaults: {
      x: e.clientX,
      y: e.clientY,
      ease: "power2.out"
    }
  });

  if (target.closest(".video-lightbox")) {
    tl.to(cursorMain, {
      opacity: 0
    }).to(
      cursorVideo,
      {
        opacity: 1
      },
      "-=0.5"
    );
  } else {
    if (target.classList.contains("line-animation")) {
      scale = 2;
    } else {
      scale = 1;
    }

    tl.to(cursorMain, {
      opacity: 1,
      scale: scale
    }).to(
      cursorVideo,
      {
        opacity: 0
      },
      "-=0.5"
    );
  }
}

function mouseleaveHandler() {
  gsap.to(cursorMain, {
    opacity: 0
  });
}

document.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("mouseleave", mouseleaveHandler);


//PRELOADER GSAP

let clips = gsap.utils.toArray(".clip"),
    shape = document.querySelector(".shape");

let loader = gsap.timeline({
  delay:3.2,
  onUpdate: () => {
    clips.forEach(el => {
      el.style.clipPath = "none";
      el.style.clipPath = "url(#clippath)";
    })
  }
});

loader.to(".shape", {
  attr: {d:"M 0 0.5 Q 0.5 0 1 0.5 L 1 0 L 0 0 L 0 1"},
  duration: 1, ease:'power2.in'
})
.to(".shape", {
  attr: {d:"M 0 0 Q 0.5 0 1 0 L 1 0 L 0 0 L 0 1"},
  duration: 0.5, ease:'power2.out'
})

//HOVER SCRIPT


// Utils
// ********************************
  // Map number x from range [a, b] to [c, d]
  const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

  // Linear interpolation
  const lerp = (a, b, n) => (1 - n) * a + n * b;

  const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

  // Gets the mouse position
  const getMousePos = (e) => {
      let posx = 0;
      let posy = 0;
      if (!e) e = window.event;
      if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
      }
      else if (e.clientX || e.clientY)    {
          posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
          posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
      }
      
      return { x : posx, y : posy }
  };


  class Menu {
    constructor(el) {

        this.DOM = {el: el};
        this.DOM.menuItems = this.DOM.el.querySelectorAll('.menu__item');
        this.animatableProperties = {
            // translationX
            tx: {previous: 0, current: 0, amt: 0.08},
            // translationY
            ty: {previous: 0, current: 0, amt: 0.08},
            // Rotation angle
            rotation: {previous: 0, current: 0, amt: 0.08},
            // CSS filter (brightness) value
            brightness: {previous: 1, current: 1, amt: 0.08}
        };
        this.menuItems = [];
        [...this.DOM.menuItems].forEach((item, pos) => this.menuItems.push(new MenuItem(item, pos, this.animatableProperties)));
        this.showMenuItems();
    }
    showMenuItems() {
        gsap.to(this.menuItems.map(item => item.DOM.textInner), {
            duration: 1.2,
            ease: 'Expo.easeOut',
            startAt: {y: '100%'},
            y: 0,
            delay: pos => pos*0.06
        });
    }
  }

let images;

let dataImg = Array.from(document.querySelectorAll('[data-img]'));
let urls = new Array();

dataImg.forEach(url => {
  urls.push(url.dataset.img)
})

images = Object.entries(urls);

console.log(images)

// track the mouse position
let mousepos = {x: 0, y: 0};
// cache the mouse position
let mousePosCache = mousepos;
let direction = {x: mousePosCache.x-mousepos.x, y: mousePosCache.y-mousepos.y};

// update mouse position when moving the mouse
window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));

class MenuItem {
    constructor(el, inMenuPosition, animatableProperties) {
        // el is the <a> with class "menu__item"
        this.DOM = {el: el};
        // position in the Menu
        this.inMenuPosition = inMenuPosition;
        // menu item properties that will animate as we move the mouse around the menu
        this.animatableProperties = animatableProperties;
        // the item text
        this.DOM.textInner = this.DOM.el.querySelector('.menu__item-textinner');
        // create the image structure
        this.layout();
        // initialize some events
        this.initEvents();
    }

    layout() {
        this.DOM.reveal = document.createElement('div');
        this.DOM.reveal.className = 'hover-reveal';
        this.DOM.revealInner = document.createElement('div');
        this.DOM.revealInner.className = 'hover-reveal__inner';
        this.DOM.revealImage = document.createElement('div');
        this.DOM.revealImage.className = 'hover-reveal__img';
        this.DOM.revealImage.style.backgroundImage = `url(${images[this.inMenuPosition][1]})`;

        this.DOM.revealInner.appendChild(this.DOM.revealImage);
        this.DOM.reveal.appendChild(this.DOM.revealInner);
        this.DOM.el.appendChild(this.DOM.reveal);
    }
    calcBounds() {
        this.bounds = {
            el: this.DOM.el.getBoundingClientRect(),
            reveal: this.DOM.reveal.getBoundingClientRect()
        };
    }
    // bind some events
    initEvents() {
        this.mouseenterFn = (ev) => {
            // show the image element
            this.showImage();
            this.firstRAFCycle = true;
            // start the render loop animation (rAF)
            this.loopRender();
        };
        this.mouseleaveFn = () => {
            // stop the render loop animation (rAF)
            this.stopRendering();
            // hide the image element
            this.hideImage();
        };
        
        this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
        this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
    }
    // show the image element
    showImage() {
        // kill any current tweens
        gsap.killTweensOf(this.DOM.revealInner);
        gsap.killTweensOf(this.DOM.revealImage);
        
        this.tl = gsap.timeline({
            onStart: () => {
                // show the image element
                this.DOM.reveal.style.opacity = 1;
                // set a high z-index value so image appears on top of other elements
                gsap.set(this.DOM.el, {zIndex: images.length});
            }
        })
        // animate the image wrap
        .to(this.DOM.revealInner, 0.2, {
            ease: 'Sine.easeOut',
            startAt: {x: direction.x < 0 ? '-100%' : '100%'},
            x: '0%'
        })
        // animate the image element
        .to(this.DOM.revealImage, 0.2, {
            ease: 'Sine.easeOut',
            startAt: {x: direction.x < 0 ? '100%': '-100%'},
            x: '0%'
        }, 0);
    }
    // hide the image element
    hideImage() {
        // kill any current tweens
        gsap.killTweensOf(this.DOM.revealInner);
        gsap.killTweensOf(this.DOM.revealImage);

        this.tl = gsap.timeline({
            onStart: () => {
                gsap.set(this.DOM.el, {zIndex: 1});
            },
            onComplete: () => {
                gsap.set(this.DOM.reveal, {opacity: 0});
            }
        })
        .to(this.DOM.revealInner, 0.2, {
            ease: 'Sine.easeOut',
            x: direction.x < 0 ? '100%' : '-100%'
        })
        .to(this.DOM.revealImage, 0.2, {
            ease: 'Sine.easeOut',
            x: direction.x < 0 ? '-100%' : '100%'
        }, 0);
    }
    // start the render loop animation (rAF)
    loopRender() {
        if ( !this.requestId ) {
            this.requestId = requestAnimationFrame(() => this.render());
        }
    }
    // stop the render loop animation (rAF)
    stopRendering() {
        if ( this.requestId ) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    }
    // translate the item as the mouse moves
    render() {
        this.requestId = undefined;
        // calculate position/sizes the first time
        if ( this.firstRAFCycle ) {
            this.calcBounds();
        }

        // calculate the mouse distance (current vs previous cycle)
        const mouseDistanceX = clamp(Math.abs(mousePosCache.x - mousepos.x), 0, 100);
        // direction where the mouse is moving
        direction = {x: mousePosCache.x-mousepos.x, y: mousePosCache.y-mousepos.y};
        // updated cache values
        mousePosCache = {x: mousepos.x, y: mousepos.y};

        // new translation values
        // the center of the image element is positioned where the mouse is
        this.animatableProperties.tx.current = Math.abs(mousepos.x - this.bounds.el.left) - this.bounds.reveal.width/2;
        this.animatableProperties.ty.current = Math.abs(mousepos.y - this.bounds.el.top) - this.bounds.reveal.height/2;
        // new rotation value
        this.animatableProperties.rotation.current = this.firstRAFCycle ? 0 : map(mouseDistanceX,0,100,0,direction.x < 0 ? 0 : -0);
        // new filter value
        this.animatableProperties.brightness.current = this.firstRAFCycle ? 1 : map(mouseDistanceX,0,100,1,4);

        // set up the interpolated values
        // for the first cycle, both the interpolated values need to be the same so there's no "lerped" animation between the previous and current state
        this.animatableProperties.tx.previous = this.firstRAFCycle ? this.animatableProperties.tx.current : lerp(this.animatableProperties.tx.previous, this.animatableProperties.tx.current, this.animatableProperties.tx.amt);
        this.animatableProperties.ty.previous = this.firstRAFCycle ? this.animatableProperties.ty.current : lerp(this.animatableProperties.ty.previous, this.animatableProperties.ty.current, this.animatableProperties.ty.amt);
        this.animatableProperties.rotation.previous = this.firstRAFCycle ? this.animatableProperties.rotation.current : lerp(this.animatableProperties.rotation.previous, this.animatableProperties.rotation.current, this.animatableProperties.rotation.amt);
        this.animatableProperties.brightness.previous = this.firstRAFCycle ? this.animatableProperties.brightness.current : lerp(this.animatableProperties.brightness.previous, this.animatableProperties.brightness.current, this.animatableProperties.brightness.amt);
        
        // set styles
        gsap.set(this.DOM.reveal, {
            x: this.animatableProperties.tx.previous,
            y: this.animatableProperties.ty.previous,
            rotation: this.animatableProperties.rotation.previous,
            filter: `brightness(${this.animatableProperties.brightness.previous})`
        });

        // loop
        this.firstRAFCycle = false;
        this.loopRender();
    }
  }
// ********************************
// End Menu Item
// ********************************


// ********************************
// Index
// ********************************
  // menu (<nav> element)
  const menuEl = document.querySelector('.menu');
/*
  // preload the images set as data attrs in the menu items
  // preloader('.menu__item').then(() => {
      // initialize the smooth scroll
      const scroll = new LocomotiveScroll({el: menuEl, smooth: true});
*/

      // initialize menu
      new Menu(menuEl);
  // });
// ********************************
// End Index
// ********************************




