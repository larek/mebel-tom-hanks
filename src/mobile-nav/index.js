// Define variable
let sidenav = document.querySelector('.mobile-nav'),
  sidenavButton = document.querySelector('.mobile-nav-trigger'),
  width = window.innerWidth,
  sidenavWidth = width < 360 ? (width - 50) : 300,
  sidenavDropdownLinks = document.querySelectorAll('.mobile-nav__item_dropdown'),
  sidenavList = document.querySelector('.mobile-nav__list');

//console.log(sidenavList.offsetHeight);
sidenavList.style.height = window.innerHeight + 'px';
sidenavList.style.overflowY = 'scroll';

// Add event listeners on dropdown links
for(let i = 0; i < sidenavDropdownLinks.length; i++){
  sidenavDropdownLinks[i].addEventListener('click', e => {
    if(e.target.classList[1] == 'dropdown-toggle'){
      e.preventDefault();
      e.currentTarget.children[1].classList.toggle('mobile-nav__sublist_show');
    }
  });
}

// Init style
sidenav.style.width = sidenavWidth + 'px';
setTransformTranslate(sidenav, -sidenavWidth, 0);
// setTransformTranslate(sidenavButton, (sidenavWidth+10), 18);

// Animate by click
sidenavButton.onclick = function(){
  // Check state of sidenavButton
  if(sidenavButton.classList.value == 'mobile-nav-trigger mobile-nav-trigger_open'){
    setTransformTranslate(document.body, 0, 0);
    setTimeout(function(){
      document.body.removeAttribute('style');
    }, 500);
  }else{
    setTransformTranslate(document.body, sidenavWidth, 0);
    setTransition(document.body, 'transform', '.3s');
    window.scrollTo(0, 0);
    document.body.style.height = window.innerHeight;
    document.body.style.overflow = 'hidden';
  }
  sidenavButton.classList.toggle('mobile-nav-trigger_open');
};

// Function set transform translate property for element
function setTransformTranslate(elem, left, top){
  elem.style.webkitTransform = 'translate(' + left + 'px, ' + top + 'px)';
  elem.style.MozTransform = 'translate(' + left + 'px, ' + top + 'px)';
  elem.style.OTransform = 'translate(' + left + 'px, ' + top + 'px)';
  elem.style.transform = 'translate(' + left + 'px, ' + top + 'px)';
}

// Function set transition css property
function setTransition(elem, prop, duration){
  elem.style.webkitTransition = prop + ' ' + duration;
  elem.style.MozTransition = prop + ' ' + duration;
  elem.style.OTransition = prop + ' ' + duration;
  elem.style.transition = prop + ' ' + duration;
}
