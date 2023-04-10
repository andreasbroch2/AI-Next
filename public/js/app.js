(() => {
  // resources/js/app.js
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || html.clientHeight) && rect.right <= (window.innerWidth || html.clientWidth);
  }
  function scrollHandler() {
    function flowAnimation() {
      let steps = document.querySelectorAll(".step");
      steps.forEach(function(step, i) {
        setTimeout(function() {
          step.classList.add("active", "done");
          step.querySelector(".checkmark").style.visibility = "visible";
          setTimeout(function() {
            step.classList.remove("active");
          }, 750);
        }, i * 1500);
      });
    }
  
    let flowContainers = document.querySelectorAll(".flow-container");
    flowContainers.forEach(function(flowContainer) {
      if (isInViewport(flowContainer)) {
        console.log('in viewport');
        flowAnimation();
        window.removeEventListener("scroll", scrollHandler); // remove event listener
      }
    });
  }
  
  window.addEventListener("scroll", scrollHandler);
})();
