document.addEventListener("DOMContentLoaded", () => {
    let count = 0;
    let pages = document.getElementsByClassName("page");
    document.addEventListener("wheel", (event) => {
        if (!event.target.parentElement.classList.contains("description")) {
          event.preventDefault();
        }
        const description = pages[count].querySelector(".description");
        const rect = description ? description.getBoundingClientRect() : null;
        const scrollTop = description ? description.scrollTop : 0;
        const scrollHeight = description ? description.scrollHeight : 0;
        const clientHeight = description ? description.clientHeight : 0;
        const reachBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const reachTop = description && scrollTop === 0;
        if (
          (rect === null ||
            touchStartY <= rect.top ||
            touchStartY >= rect.bottom ||
            reachBottom) &&
          event.deltaY > 0
        ) {
          if (count < 4) {
            window.scrollTo({
              top: window.scrollY + pages[count].clientHeight,
              behavior: "smooth",
            });
            count++;
            hideSeeMoreText(count);
            reverseArrow(count);
            applyAnimation(count);
          }
        } else if (
          (rect === null ||
            touchStartY <= rect.top ||
            touchStartY >= rect.bottom ||
            reachTop) &&
          diffY > 0
        ) {
          if (count > 0 && event.deltaY < 0) {
            window.scrollTo({
              top:
                window.scrollY + pages[count - 1].getBoundingClientRect().top,
              behavior: "smooth",
            });
            count--;
            hideSeeMoreText(count);
            reverseArrow(count);
          }
        }
    }, { passive: false });
    
    let touchStartY = 0;
    document.addEventListener("touchstart", function (event) {
      if (!event.target.parentElement.classList.contains("description")) {
        event.preventDefault();
      }
      touchStartY = event.touches[0].clientY;
    }, { passive: false });

    document.addEventListener("touchend", function (event) {
      const touchEndY = event.changedTouches[0].clientY;
      const diffY = touchEndY - touchStartY;
      const description = pages[count].querySelector(".description");
      const rect = description ? description.getBoundingClientRect() : null;
      const scrollTop = description ? description.scrollTop : 0;
      const scrollHeight = description ? description.scrollHeight : 0;
      const clientHeight = description ? description.clientHeight : 0;
      const reachBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const reachTop = description && scrollTop === 0;
      if (
        (rect === null || (touchStartY <= rect.top ||
        touchStartY >= rect.bottom) || reachBottom) &&
        diffY < 0
      ) {
        if (count < 4) {
          window.scrollTo({
            top: window.scrollY + pages[count].clientHeight,
            behavior: "smooth",
          });
          count++;
          hideSeeMoreText(count);
          reverseArrow(count);
          applyAnimation(count);
        }
      } else if (
        (rect === null ||
          touchStartY <= rect.top ||
          touchStartY >= rect.bottom || reachTop) &&
        diffY > 0
      ) {
        if (count > 0) {
          window.scrollTo({
            top: window.scrollY + pages[count - 1].getBoundingClientRect().top,
            behavior: "smooth",
          });
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