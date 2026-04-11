"use strict";

document.addEventListener('DOMContentLoaded', () => {
 /**
 * 1. ハンバーガーメニューの開閉
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
  /**
   * 2. ヒーローセクションのアニメーション
   */
  const hero = document.querySelector('.hero-section');
  if (hero) {
    setTimeout(() => {
      hero.classList.add('is-visible');
    }, 200);
  }

  window.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
  
    // ページ読み込みから少し遅らせてアニメーションを開始させる場合
    setTimeout(() => {
      heroContent.classList.add('is-visible');
    }, 300); 
  });

  /**
   * 3. 実績データの生成
   */
  const works = [
    {
      title: "BtoB向け新規顧客獲得の為のコーポレートサイト",
      category: "Webサイト",
      image: "path/to/Webサイト.png",
      tags: ["レスポンシブ", "Pinterest", "Figma"],
    },
    {
      title: "BtoC向け新規顧客獲得の為のコーポレートサイト",
      category: "Webサイト",
      image: "path/to/Webサイト工務店.png",
      tags: ["レスポンシブ", "Pinterest", "Figma"],
    },
    {
      title: "スキンケアブランドの購入を促す美容商品紹介ページ",
      category: "LP",
      image: "path/to/化粧品LP.png",
      tags: ["Figma", "Pinterest"],
    },
    {
      title: "無料体験申し込みを獲得する為のオンライン学習ページ",
      category: "LP",
      image: "path/to/オンライン学習LP.png",
      tags: ["Figma"],
    },
    {
      title: "銀行独自の決済アプリ「Green Pay」のSNS広告バナー",
      category: "バナー",
      image: "path/to/バナー.png",
      tags: ["Figma"],
    },
    {
      title: "商品紹介と新規顧客獲得の為のLP",
      category: "コーディング",
      image: "path/to/コーディング.png",
      tags: ["HTML/CSS", "JavaScript", "Figma", "レスポンシブ"],
    }
  ];

  const grid = document.getElementById('portfolio-grid');

  if (grid) {
    works.forEach(work => {
      const card = document.createElement('div');
      card.className = 'portfolio-card';

      const tagsHtml = work.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

      // ボタンを <a> タグに変更してリンクとして機能させる
      card.innerHTML = `
        <img src="${work.image}" alt="${work.title}">
        <p style="font-size: 0.7rem; color: #888; margin-top: 10px;">${work.category}</p>
        <h3 style="font-size: 0.9rem; margin: 5px 0;">${work.title}</h3>
        <div class="tags">${tagsHtml}</div>
        <a href="${work.url}" style="display: inline-block; border: 1px solid #ccc; background: none; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; cursor: pointer; text-decoration: none; color: inherit; margin-top: 10px;">
          詳細はこちら →
        </a>`;
      grid.appendChild(card);
    });
  }

  /**
   * 4. モーダル制御
   */
  const modal = document.getElementById('modal');
  const openBtn = document.getElementById('openModal');
  const closeBtn = document.querySelector('.close-button');

  if (openBtn && modal) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'block';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (modal && e.target === modal) {
      modal.style.display = 'none';
    }
  });

  /**
   * 5. スクロールふわっと表示
   */
  const aboutSection = document.querySelector('.about-section');
  if (aboutSection) {
    // 初期スタイル設定
    aboutSection.style.opacity = "0";
    aboutSection.style.transform = "translateY(20px)";
    aboutSection.style.transition = "all 0.8s ease-out";

    window.addEventListener('scroll', () => {
      const sectionPos = aboutSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;

      if (sectionPos < screenPos) {
        aboutSection.style.opacity = "1";
        aboutSection.style.transform = "translateY(0)";
      }
    });
  }

 /**
 * 6. スコア星表示 & スクロール演出
 */
const observerOptions = {
  root: null,
  threshold: 0.2 // 20%見えたら実行
};

const starObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const score = parseInt(el.getAttribute('data-score'));
      const maxStars = 5;
      let starHtml = '';

      el.innerHTML = starHtml;
      el.classList.add('is-visible'); // CSSでアニメーションさせるためのクラス
      observer.unobserve(el); // 一度表示したら監視を終了
    }
  });
}, observerOptions);

// すべての .stars を監視対象にする
document.querySelectorAll('.stars').forEach(el => {
  starObserver.observe(el);
});

  /**
   * 7. フッターの西暦
   */
  const yearElement = document.querySelector('.footer-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
