"use strict";

/**
 *  ハンバーガーメニューの開閉
 */
const btn = document.getElementById('js-hamburger');
const nav = document.getElementById('g-nav'); 

if (btn && nav) {
  const toggleMenu = (open) => {
    const isOpen = typeof open === "boolean" ? open : !btn.classList.contains("is-active");
    btn.classList.toggle("is-active", isOpen);
    nav.classList.toggle("is-active", isOpen);

    // アクセシビリティ
    btn.setAttribute("aria-expanded", String(isOpen));
  };

  btn.addEventListener('click', () => toggleMenu());

  // メニュー内をクリックしたら閉じる
  nav.addEventListener('click', (e) => {
    // li押下でも閉じたいならこれでOK
    if (e.target.closest('.g-nav__txt, a')) toggleMenu(false);
  });
}

// こだわりポイント セクションのレスポンシブ制御
const handlePointsResponsive = () => {
  const container = document.querySelector('.point-content');
  const textBlock = document.querySelector('.point-text');
  const imageBlock = document.querySelector('.point-image');

  // 要素が存在しない場合はスキップ
  if (!container || !textBlock || !imageBlock) return;

  // 768以下かどうか判定するメディアアクエリ
  const  mql = window.matchMedia('(max-width:768px)');

  const updateLayout = (isMobile) => {
    if (isMobile) {
      // --- スマホ版のスタイル ---
      container.style.display = 'flex';
      container.style.flexDirection = 'column'; // 縦並び
      textBlock.style.order = '1';              // テキストを上
      imageBlock.style.order = '2';             // 画像を下
      imageBlock.style.marginTop = '20px';
    } else {
      // --- PC版のスタイル ---
      container.style.display = 'flex';
      container.style.flexDirection = 'row';    // 横並び
      container.style.alignItems = 'flex-start';
      container.style.gap = '40px';
      textBlock.style.order = '0';              // 順番を戻す
      imageBlock.style.order = '0';
      imageBlock.style.marginTop = '0';
      imageBlock.style.flex = '1';              // 幅の調整
      textBlock.style.flex='1';          
    }
  };

  // 1. 初回実行
  updateLayout(mql.matches);

  // 2. 画面サイズ変更時にリアルタイムで実行
  mql.addEventListener('change', (e) => {
    updateLayout(e.matches);
  });
};

// DOMの読み込み完了時に起動
document.addEventListener('DOMContentLoaded',handlePointsResponsive);

// 1. 各要素の取得
const screenshotImg = document.querySelector('.site-screenshot img'); // スクショ画像

// 2. 画面幅の凝視(768pxを境界にする）
const mql = window.matchMedia('(max-width: 768px)');
