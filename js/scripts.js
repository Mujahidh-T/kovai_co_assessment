"use strict";

// Tabs
const tabHeader = document.querySelector(".tab__header");
const tabImages = document.querySelector(".tab__images");

// Event
tabHeader.addEventListener("click", function (e) {
  e.preventDefault();

  if (!e.target.classList.contains("tab--heading")) return;

  const [, tabContents] = e.target.closest(".tab__content--block").children;
  const targetId = +e.target.dataset.id;

  // Updating the Active Title
  [...e.target.closest(".tab__header").children].forEach((heading) => {
    heading.classList.remove("active");
  });

  e.target.classList.add("active");

  // Populating Active Content
  [...tabContents.children].forEach((tabContent) => {
    tabContent.classList.remove("active");
  });

  [...tabContents.children][targetId - 1].classList.add("active");

  // Populating Active Image
  [...tabImages.children].forEach((tabImage) => {
    tabImage.classList.remove("active");
  });
  [...tabImages.children][targetId - 1].classList.add("active");
});

// -------------------------------------------------------------------------------------

// Slider
const _slider = document.querySelector(".slider");
const _sliderArr = [..._slider.children];
const _slideFirst = _sliderArr[0];
const _slideLast = _sliderArr[_sliderArr.length - 1];
const _sliderNextElement = document.querySelector(".slider__control--next");
const _sliderPreviousElement = document.querySelector(
  ".slider__control--previous"
);

let _slideNextState = true;
let _slidePreviousState = false;

// Positioning Slider Content
_sliderArr.forEach((content, i) => {
  content.style.left = `${i * 100}%`;
});

// Assigning Height to Parent
_slider.style.height = `${
  Number.parseInt(getComputedStyle(_sliderArr[0]).height) + 30
}px`;

// Slider Next Callback
const _sliderNextCallback = function (e) {
  e.preventDefault();

  if (_slideNextState) {
    _slidePreviousState = true;
    _sliderPreviousElement.classList.remove("slider__control--disabled");

    _sliderArr.forEach((el) => {
      const elLeft = Number.parseInt(el.style.left);
      const elActive = Number.parseInt(el.dataset.slide);

      el.style.left = `${elLeft - 100}%`;
      el.dataset.slide = elActive - 1;
    });
  }

  if (_slideLast.dataset.slide === "0") {
    _slideNextState = false;
    _sliderNextElement.classList.add("slider__control--disabled");
  }
};

// Slider Previous Callback
const _sliderPreviousCallback = function (e) {
  e.preventDefault();

  if (_slidePreviousState) {
    _slideNextState = true;
    _sliderNextElement.classList.remove("slider__control--disabled");

    _sliderArr.forEach((el) => {
      const elLeft = Number.parseInt(el.style.left);
      const elActive = Number.parseInt(el.dataset.slide);

      el.style.left = `${elLeft + 100}%`;
      el.dataset.slide = elActive + 1;
    });
  }

  if (_slideFirst.dataset.slide === "0") {
    _slidePreviousState = false;
    _sliderPreviousElement.classList.add("slider__control--disabled");
  }
};

// Slider Next
_sliderNextElement.addEventListener("click", _sliderNextCallback);

// Slider Previous
_sliderPreviousElement.addEventListener("click", _sliderPreviousCallback);

// -------------------------------------------------------------------------------------

// Accordion
const _accordions = document.querySelectorAll(".accordion");

_accordions.forEach((accordion) => {
  accordion.addEventListener("click", function (e) {
    e.preventDefault();

    if (!e.target.classList.contains("accordion--heading")) return;

    const [_accordionIconElement, , _accordionBodyElement] = [
      ...e.target.closest(".accordion").children,
    ];

    _accordionBodyElement.classList.toggle("show");

    if (_accordionBodyElement.classList.contains("show")) {
      _accordionIconElement.firstElementChild.classList.remove("fa-plus");
      _accordionIconElement.firstElementChild.classList.add("fa-minus");
    } else {
      _accordionIconElement.firstElementChild.classList.remove("fa-minus");
      _accordionIconElement.firstElementChild.classList.add("fa-plus");
    }
  });
});

// -------------------------------------------------------------------------------------
