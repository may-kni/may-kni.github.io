"use strict";

/*(---これより下を消す---)*/

// spanで囲む
document.addEventListener("DOMContentLoaded", function () {
  function getElement(id) {
    return document.getElementById(id);
  }

  const cSpanElements = document.querySelectorAll(".c-span");

  cSpanElements.forEach(function (cSpan) {
    const textContent = cSpan.textContent.trim();
    const textArray = textContent.split("");

    const spannedText = textArray.map(function (char) {
      const span = document.createElement("span");
      span.textContent = char;
      return span;
    });
                                                          
    cSpan.innerHTML = "";

    spannedText.forEach(function (span) {
      cSpan.appendChild(span);
    });
  });

  // ヘッダーボタン色変更
  window.addEventListener("scroll", function () {
    const topAboutElement = document.querySelector(".top-about");
    const gNavBtnElements = document.querySelectorAll(".scrollBtn");

    if (topAboutElement) {
      const aboutOffset = topAboutElement.offsetTop;
     
      gNavBtnElements.forEach((gNavBtnElement) => {
        if (window.scrollY > aboutOffset) {
          gNavBtnElement.classList.add("active");
        } else {
          gNavBtnElement.classList.remove("active");
        }
      });
    }
  });

  // スムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();

      const href = anchor.getAttribute("href");
      const headerHeight = document.querySelector(".header__wrap").offsetHeight;

      // href属性の#を取り除いた部分と一致するIDを取得
      const target = getElement(href.replace("#", ""));

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      // window.scrollTo()を呼び出して、スクロール位置を設定します。behaviorオプションをsmoothに設定することで、スムーズなスクロールを実現します。
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });      
    });
  });

  const gNav = getElement("gNav");
  const gNavBtn = getElement("gNavBtn");

  gNavBtn.addEventListener("click", () => {
    gNavBtn.classList.toggle("active");
    gNav.classList.toggle("open");

    gNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        if (
          gNav.classList.contains("open") &&
          gNavBtn.classList.contains("active")
        ) {
          gNav.classList.remove("open");
          gNavBtn.classList.remove("active");
        }
      });
    });
  });

  const targetElems = document.querySelectorAll('[data-drop="wrap"]');

  targetElems.forEach(function (targetElem) {
    const toggleButton = targetElem.querySelector('[data-drop="toggle"]');
    const slideElement = targetElem.querySelector('[data-drop="slide"]');
    const accordionSlideContent = document.querySelector(
      ".top-price-plan__accordion"
    );

    toggleButton.addEventListener("click", function (e) {
      e.preventDefault();
      targetElem.classList.toggle("active");
      toggleButton.classList.toggle("active");
      slideElement.classList.toggle("active");
      accordionSlideContent.classList.toggle("open");
      adjustAccordionHeights(accordionSlideContent);
    });
  });

  function adjustAccordionHeights(accordionSlideContent) {
    if (accordionSlideContent.classList.contains("open")) {
      accordionSlideContent.style.height =
        accordionSlideContent.firstElementChild.scrollHeight + 4 + "px"; 
    } else {
      accordionSlideContent.style.height = "0px";
    }
  }

  window.addEventListener("resize", () => {
    const accordionSlideContent = document.querySelector(
      ".top-price-plan__accordion"
    );
    adjustAccordionHeights(accordionSlideContent);
  });

  // // IT点呼キーパー対応機器　PC時アコーディオン解除,
  const subTtlElements = document.querySelectorAll(".top-equipment-list__ttl");
  const boxElements = document.querySelectorAll(".top-equipment-list__box");
  const accordionSlideContents = document.querySelectorAll(
    ".top-equipment-list__accordion"
  );

  subTtlElements.forEach(function (subTtl, index) {
    subTtl.addEventListener("click", function () {
      // sub-ttlクリックで発火
      boxElements[index].classList.toggle("active");
      subTtl.classList.toggle("active");
      subTtl.parentElement.classList.toggle("active");
      accordionSlideContents[index].classList.toggle("open");
      adjustAccordionHeights(accordionSlideContents[index]);
    });
  });

  // リサイズの処理
  window.addEventListener("resize", function () {
    if (window.getComputedStyle(subTtlElements[0]).pointerEvents === "none") {
      boxElements.forEach(function (box) {
        box.style = "";
      });
      accordionSlideContents.forEach(function (accordion) {
        accordion.classList.remove("open");
        accordion.style.height = "auto";
      });
      subTtlElements.forEach(function (subTtl) {
        subTtl.classList.remove("active");
        subTtl.parentElement.classList.remove("active");
      });
    } else {
      accordionSlideContents.forEach(function (accordion) {
        if (accordion.classList.contains("open")) {
          accordion.style.height =
            accordion.firstElementChild.scrollHeight + 4 + "px";
        } else {
          accordion.style.height = "0px";
        }
      });
    }
  });

  // コンテンツの高さに合わせる；
  function matchHeight(selector, pcOnly = false) {
    const elements = document.querySelectorAll(selector);
    if (scaleWindowW() < 768 && pcOnly) {
      elements.forEach(function (element) {
        element.style.height = "auto";
      });
      return;
    }

    let maxheight = 0;

    // ループして最大の高さを見つける
    elements.forEach(function (element) {
      element.style.height = "auto"; // 初期化
      if (element.clientHeight > maxheight) {
        maxheight = element.clientHeight;
      }
    });

    // すべての要素に最大の高さを設定
    elements.forEach(function (element) {
      element.style.height = maxheight + "px";
    });
  }

  adjustHeights();

  function adjustHeights() {
    matchHeight(".top-step-list__box");
    matchHeight(".top-equipment-list__ttl", true);
    matchHeight(".top-equipment-list__box", true);
    matchHeight(".top-effect-before__img", true);
    matchHeight(".top-effect-after__txt");
  }

  window.addEventListener("resize", adjustHeights);

  // モーダル
  const modalToggles = document.querySelectorAll(".modal-toggle");
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const modalBg = document.querySelector(".modal-bg");
  const modalCloseBtn = document.querySelector(".modal-close-btn");

  modalToggles.forEach((modalToggle) => {
    modalToggle.addEventListener("click", () => {
      modal.classList.add("show");
      const imagePath = modalToggle.getAttribute("src");
      const imageAlt = modalToggle.getAttribute("alt");
      const newImage =  document.createElement("img");
      document.querySelector("body").style.overflow = "hidden";
      newImage.setAttribute("src", imagePath);
      newImage.setAttribute("alt", imageAlt);
      modalContent.appendChild(newImage);
    });
  });
  setCloseModalEvent(modalBg);
  setCloseModalEvent(modalCloseBtn);

  function setCloseModalEvent(el) {
    el.addEventListener("click", () => {
      modal.classList.remove("show");
      document.querySelector("body").style.overflow = "unset";
      while (modalContent.firstChild) {
        modalContent.removeChild(modalContent.firstChild);
      }
    });
  }
});

