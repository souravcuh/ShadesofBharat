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

// Floating "upcoming festival" widget — dates are for 2026/early 2027 and need
// updating each year (see chapters/utsav-parva.html for the full Panchang walk).
(function () {
  var UPCOMING = [
    { hi: 'रक्षाबंधन', en: 'Raksha Bandhan', date: '2026-08-28', anchor: 'raksha-bandhan' },
    { hi: 'जन्माष्टमी', en: 'Janmashtami', date: '2026-09-04', anchor: 'janmashtami' },
    { hi: 'गणेश चतुर्थी', en: 'Ganesh Chaturthi', date: '2026-09-14', anchor: 'ganesh-chaturthi' },
    { hi: 'शरद नवरात्रि', en: 'Sharad Navratri', date: '2026-10-11', anchor: 'sharad-navratri' },
    { hi: 'दशहरा', en: 'Dussehra', date: '2026-10-20', anchor: 'dussehra' },
    { hi: 'धनतेरस', en: 'Dhanteras', date: '2026-11-06', anchor: 'dhanteras' },
    { hi: 'दिवाली', en: 'Diwali', date: '2026-11-08', anchor: 'diwali' },
    { hi: 'भाई दूज', en: 'Bhai Dooj', date: '2026-11-10', anchor: 'bhai-dooj' },
    { hi: 'मकर संक्रांति', en: 'Makar Sankranti', date: '2027-01-14', anchor: 'makar-sankranti' },
  ];

  function chapterUrl(path) {
    var inChapters = location.pathname.indexOf('/chapters/') !== -1;
    return (inChapters ? '' : 'chapters/') + path;
  }

  function daysUntil(dateStr) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var target = new Date(dateStr + 'T00:00:00');
    return Math.round((target - today) / 86400000);
  }

  function dismissed() {
    try { return sessionStorage.getItem('sob-upcoming-dismissed') === '1'; } catch (e) { return false; }
  }

  function dismiss() {
    try { sessionStorage.setItem('sob-upcoming-dismissed', '1'); } catch (e) {}
    var el = document.querySelector('.upcoming-widget');
    if (el) el.remove();
  }

  function buildWidget() {
    if (dismissed()) return;

    var next = null;
    for (var i = 0; i < UPCOMING.length; i++) {
      if (daysUntil(UPCOMING[i].date) >= 0) { next = UPCOMING[i]; break; }
    }
    if (!next) return;

    var days = daysUntil(next.date);
    var dayLabel = days === 0 ? 'आज · Today' : days === 1 ? 'कल · Tomorrow' : days + ' दिन शेष · days away';
    var dateLabel = new Date(next.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    var widget = document.createElement('div');
    widget.className = 'upcoming-widget';
    widget.innerHTML =
      '<div class="upcoming-widget-bar"></div>' +
      '<div class="upcoming-widget-body">' +
      '<button type="button" class="upcoming-widget-close" aria-label="Close">×</button>' +
      '<a class="upcoming-widget-link" href="' + chapterUrl('utsav-parva.html') + '#' + next.anchor + '">' +
      '<div class="upcoming-widget-kicker">आगामी पर्व · Upcoming</div>' +
      '<div class="upcoming-widget-hi">' + next.hi + '</div>' +
      '<div class="upcoming-widget-en">' + next.en + '</div>' +
      '<div class="upcoming-widget-date">' + dateLabel + '</div>' +
      '<div class="upcoming-widget-days">' + dayLabel + '</div>' +
      '</a>' +
      '</div>';

    document.body.appendChild(widget);
    widget.querySelector('.upcoming-widget-close').addEventListener('click', function (e) {
      e.preventDefault();
      dismiss();
    });
  }

  document.addEventListener('DOMContentLoaded', buildWidget);
})();

// Reusable multi-photo slot. Drop this anywhere on any page:
//   <div class="photo-slot" data-photo="festivals/gudi-padwa"></div>
//   <svg class="topic-icon photo-fallback">...</svg>   (optional — hidden once a photo appears)
// Then upload images named <slug>-1.jpg, <slug>-2.jpg, <slug>-3.jpg... (up to data-count,
// default 4) to assets/img/<folder>/ via GitHub's file uploader. No code editing needed —
// whichever numbers exist are shown, in a small grid, largest first; missing ones are
// skipped silently. Same markup works on the home page, a chapter page, anywhere.
(function () {
  function assetsPrefix() {
    return location.pathname.indexOf('/chapters/') !== -1 ? '../' : '';
  }

  function tryLoad(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve(src); };
      img.onerror = function () { resolve(null); };
      img.src = src;
    });
  }

  function initSlot(slot) {
    var key = slot.getAttribute('data-photo');
    if (!key) return;
    var count = parseInt(slot.getAttribute('data-count') || '4', 10);
    var base = assetsPrefix() + 'assets/img/' + key;
    var checks = [];
    for (var i = 1; i <= count; i++) checks.push(tryLoad(base + '-' + i + '.jpg'));

    Promise.all(checks).then(function (results) {
      var found = results.filter(Boolean);
      if (!found.length) return;

      found.forEach(function (src) {
        var a = document.createElement('a');
        a.href = src;
        a.target = '_blank';
        a.rel = 'noopener';
        var img = document.createElement('img');
        img.src = src;
        img.alt = '';
        a.appendChild(img);
        slot.appendChild(a);
      });
      slot.classList.add('has-photos');

      var scope = slot.parentElement || document;
      var fallback = scope.querySelector('.photo-fallback');
      if (fallback) fallback.style.display = 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.photo-slot[data-photo]').forEach(initSlot);
  });
})();

// Floating "verify with original scriptures" notice — site-wide, shown on every page load.
(function () {
  function dismiss() {
    var el = document.querySelector('.verify-note');
    if (el) el.remove();
  }

  function buildNote() {
    var note = document.createElement('div');
    note.className = 'verify-note';
    note.innerHTML =
      '<div class="verify-note-body">' +
      '<button type="button" class="verify-note-close" aria-label="Close">×</button>' +
      '<div class="verify-note-hi">यह जानकारी सामान्य परिचय हेतु है — कृपया मूल शास्त्रों (वेद, पुराण, इतिहास) से सत्यापित करें।</div>' +
      '<div class="verify-note-en">This content is a general introduction — please double-check against original scriptures (Vedas, Puranas, Itihasa) for scholarly or ritual use.</div>' +
      '</div>';

    document.body.appendChild(note);
    note.querySelector('.verify-note-close').addEventListener('click', function (e) {
      e.preventDefault();
      dismiss();
    });
  }

  document.addEventListener('DOMContentLoaded', buildNote);
})();
