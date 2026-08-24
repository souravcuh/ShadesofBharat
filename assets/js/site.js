// Shades of Bharat — language switching (Sanskrit / Hindi / Russian / English)
// Nav labels are translated on every page. Hero copy is translated on the home page only
// (elements carry data-i18n="hero.title" etc.). Deeper chapter content is not yet translated —
// that is a larger content task for later.

(function () {
  var STRINGS = {
    sa: {
      'nav.home': 'गृहम्', 'nav.chapters': 'अध्यायाः', 'nav.about': 'परिचयः', 'nav.journal': 'पत्रिका',
      'hero.eyebrow': 'नूतनया दृष्ट्या भारतम्', 'hero.title': 'भारतदर्शनम्',
      'hero.body': 'चिरन्तनं कलाकौशलं, वेदाः इतिहासाश्च, ऋषयः तेषां विज्ञानं च। एका संस्कृतिः स्वकीयेन स्वरेण कथिता — स्वधर्मेण, ज्ञानेन, दैनन्दिनजीवनेन च।',
      'hero.cta': 'यात्रा आरभ्यताम्',
    },
    hi: {
      'nav.home': 'मुखपृष्ठ', 'nav.chapters': 'अध्याय', 'nav.about': 'परिचय', 'nav.journal': 'पत्रिका',
      'hero.eyebrow': 'एक नई दृष्टि से भारत', 'hero.title': 'भारत की सैर',
      'hero.body': 'कालातीत कला और नवाचार। वेद और महाकाव्य। ऋषि और उनका विज्ञान। एक सभ्यता, अपनी ही आवाज़ में कही गई — अपने धर्म, अपने ज्ञान, अपने रोज़मर्रा के जीवन के साथ।',
      'hero.cta': 'यात्रा आरंभ करें',
    },
    ru: {
      'nav.home': 'Главная', 'nav.chapters': 'Главы', 'nav.about': 'О проекте', 'nav.journal': 'Журнал',
      'hero.eyebrow': 'Бхарат под новым углом зрения', 'hero.title': 'Путешествие по Бхарату',
      'hero.body': 'Вечное искусство и новаторство. Веды и эпосы. Мудрецы и их наука. Одна цивилизация, рассказанная своим собственным голосом — через свою дхарму, свои знания, свою повседневную жизнь.',
      'hero.cta': 'Начать путешествие',
    },
    en: {
      'nav.home': 'Home', 'nav.chapters': 'Chapters', 'nav.about': 'About', 'nav.journal': 'Journal',
      'hero.eyebrow': 'A New Lens on Bharat', 'hero.title': 'Walk Through Bharat',
      'hero.body': 'Timeless art and innovation. Vedas and epics. Sages and their science. One civilization, told in its own voice — its dharma, its knowledge, its everyday life.',
      'hero.cta': 'Begin the Walk',
    },
  };

  var ORDER = ['sa', 'hi', 'ru', 'en'];
  var LABELS = { sa: 'संस्कृत', hi: 'हिंदी', ru: 'Русский', en: 'English' };
  var HERO_FONT = {
    sa: { title: "'Rozha One', serif", body: "'Hind', 'EB Garamond', serif", size: '54px' },
    hi: { title: "'Rozha One', serif", body: "'Hind', 'EB Garamond', serif", size: '58px' },
    ru: { title: "'PT Serif', serif", body: "'PT Serif', serif", size: '50px' },
    en: { title: "'Cormorant Garamond', serif", body: "'EB Garamond', serif", size: '60px' },
  };

  function getLang() {
    try {
      return localStorage.getItem('sob-lang') || 'sa';
    } catch (e) {
      return 'sa';
    }
  }

  function setLang(lang) {
    try { localStorage.setItem('sob-lang', lang); } catch (e) {}
    applyLang(lang);
  }

  function applyLang(lang) {
    var dict = STRINGS[lang] || STRINGS.sa;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    var heroTitle = document.querySelector('[data-i18n="hero.title"]');
    if (heroTitle) {
      var f = HERO_FONT[lang] || HERO_FONT.sa;
      heroTitle.style.fontFamily = f.title;
      heroTitle.style.fontSize = f.size;
    }
    var heroBody = document.querySelector('[data-i18n="hero.body"]');
    if (heroBody) {
      var fb = HERO_FONT[lang] || HERO_FONT.sa;
      heroBody.style.fontFamily = fb.body;
    }
    var heroCta = document.querySelector('[data-i18n="hero.cta"]');
    if (heroCta) {
      var fc = HERO_FONT[lang] || HERO_FONT.sa;
      heroCta.style.fontFamily = fc.body;
    }

    document.querySelectorAll('.lang-switch button').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  function buildSwitcher() {
    var mount = document.querySelector('.lang-switch');
    if (!mount) return;
    mount.innerHTML = '';
    ORDER.forEach(function (code) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = LABELS[code];
      btn.setAttribute('data-lang', code);
      btn.addEventListener('click', function () { setLang(code); });
      mount.appendChild(btn);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildSwitcher();
    applyLang(getLang());
  });
})();
