document.addEventListener("DOMContentLoaded", () => {
    let count = 0;
    document.addEventListener("wheel", (e) => {
        if (e.deltaY > 0) {
            window.scrollTo({
              top: window.scrollY + window.innerHeight,
              behavior: "smooth",
            });
            if (count < 4) {
              count++;
              hideSeeMoreText(count);
              reverseArrow(count);
              applyAnimation(count);
            }
        }
        else {
            window.scrollTo({
              top: window.scrollY - window.innerHeight,
              behavior: "smooth",
            });
            if (count > 0) {
              count--;
              hideSeeMoreText(count);
              reverseArrow(count);
            }
        }
    });
    
    let touchStartY = 0;

    document.addEventListener("touchstart", function (event) {
      touchStartY = event.touches[0].clientY;
    });

    document.addEventListener("touchend", function (event) {
      const touchEndY = event.changedTouches[0].clientY;
      const diffY = touchEndY - touchStartY;
      if (diffY < 0) {
        window.scrollTo({
          top: window.scrollY + window.innerHeight,
          behavior: "smooth",
        });
        if (count < 4) {
          count++;
          hideSeeMoreText(count);
          reverseArrow(count);
          applyAnimation(count);
        }
      } else {
        window.scrollTo({
          top: window.scrollY - window.innerHeight,
          behavior: "smooth",
        });
        if (count > 0) {
          count--;
          hideSeeMoreText(count);
          reverseArrow(count);
        }
      }

    });
})

function hideSeeMoreText(count) {
  if (count > 0) {
    let text = document.getElementById("see-more-text");
    text.style.display = "none";
  }
  else {
    let text = document.getElementById("see-more-text");
    text.style.display = "flex";
  }
}

function reverseArrow(count) {
  if (count === 4) {
    let arrow = document.getElementById("arrow");
    arrow.style.animation = "updown-reverse 2s infinite alternate";
  }
  else {
    let arrow = document.getElementById("arrow");
    arrow.style.animation = "updown 2s infinite alternate";
  }
}

function applyAnimation(count) {
  if (count > 0) {
    let page = document.querySelectorAll(".page")[count];
    let image = page.querySelector("img");
    let description = page.querySelector(".description");
    if (image.style.animation === "" && description.style.animation === "") {
      image.style.animation = "zoom-out 1.5s 1s forwards";
      description.style.animation = "show-up 2s 1s forwards";
    }
  }
}