document.addEventListener("DOMContentLoaded", () => {
    let count = 0;
    const pages = document.getElementsByClassName("page");
    const arrow = document.getElementById("arrow");
    document.addEventListener("wheel", (event) => {
        if (!event.target.parentElement.classList.contains("description")) {
          event.preventDefault();
        }
        const descriptions = document.querySelectorAll(".description");
        const description = descriptions[count];
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
            reverseArrow(count, arrow);
            applyAnimation(count);
            setTimeout(() => {
              descriptions.forEach((el) => (el.scrollTop = 0));
            }, 700)
          }
        } else if (
          rect === null ||
          touchStartY <= rect.top ||
          touchStartY >= rect.bottom ||
          (reachTop && event.deltaY < 0)
        ) {
          if (count > 0) {
            window.scrollTo({
              top:
                window.scrollY + pages[count - 1].getBoundingClientRect().top,
              behavior: "smooth",
            });
            count--;
            hideSeeMoreText(count);
            reverseArrow(count, arrow);
            setTimeout(() => {
              descriptions.forEach((el) => (el.scrollTop = 0));
            }, 700)
          }
        }
    }, { passive: false });
    
    let touchStartY = 0;
    document.addEventListener("touchstart", function (event) {
      if (
        !event.target.parentElement.classList.contains("description") &&
        !event.target.parentElement.classList.contains("arrow-container")
      ) {
        event.preventDefault();
      }
      touchStartY = event.touches[0].clientY;
    }, { passive: false });

    document.addEventListener("touchend", function (event) {
      if (!event.target.parentElement.classList.contains("arrow-container")) {
        const touchEndY = event.changedTouches[0].clientY;
        const diffY = touchEndY - touchStartY;
        const descriptions = document.querySelectorAll(".description")
        const description = descriptions[count];
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
          diffY < 0 &&
          Math.abs(diffY) > 190
        ) {
          if (count < 4) {
            window.scrollTo({
              top: window.scrollY + pages[count].clientHeight,
              behavior: "smooth",
            });
            count++;
            hideSeeMoreText(count);
            reverseArrow(count, arrow);
            applyAnimation(count);
            setTimeout(() => {
              descriptions.forEach((el) => (el.scrollTop = 0));
            }, 700)
          }
        } else if (
          (rect === null ||
            touchStartY <= rect.top ||
            touchStartY >= rect.bottom ||
            reachTop) &&
          diffY > 0 &&
          Math.abs(diffY) > 190
        ) {
          if (count > 0) {
            window.scrollTo({
              top:
                window.scrollY + pages[count - 1].getBoundingClientRect().top,
              behavior: "smooth",
            });
            count--;
            hideSeeMoreText(count);
            reverseArrow(count, arrow);
            setTimeout(() => {
              descriptions.forEach((el) => (el.scrollTop = 0));
            }, 700)
          }
        }
      }
    });
    
    arrow.addEventListener("click", () => {
      const descriptions = document.querySelectorAll(".description");
      if (count === 4) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        count--;
        hideSeeMoreText(count);
        reverseArrow(count, arrow);
        setTimeout(() => {
              descriptions.forEach((el) => (el.scrollTop = 0));
            }, 700)
      }
      else if (count >= 0) {
        window.scrollTo({
          top: window.scrollY + pages[count].clientHeight,
          behavior: "smooth",
        });
        count++;
        hideSeeMoreText(count);
        reverseArrow(count, arrow);
        applyAnimation(count);
        setTimeout(() => {
              descriptions.forEach((el) => (el.scrollTop = 0));
        }, 700)
      }
    })

    
})

window.addEventListener("load", () => {
  history.scrollRestoration = "manual";
});

function hideSeeMoreText(count) {
  if (count > 0) {
    let text = document.getElementById("see-more-text");
    text.style.visibility = "hidden"
  }
  else {
    let text = document.getElementById("see-more-text");
    text.style.visibility = "visible";
  }
}

function reverseArrow(count, arrow) {
  if (count < 4) {
    arrow.className = "updown";
  }
  else {
    arrow.className = "updown-reverse"
  }
}

function applyAnimation(count) {
  if (count > 0) {
    let page = document.querySelectorAll(".page")[count];
    let image = page.querySelector("img");
    let description = page.querySelector(".description");
    if (!image.classList.contains("zoom-out") && !description.classList.contains("show-up")) {
      image.classList.add("zoom-out");
      description.classList.add("show-up");
    }
  }
}