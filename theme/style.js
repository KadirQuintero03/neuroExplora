/**
 * NEURO EXPLORA v3 — Theme JS
 * Misión Cerebro: Exploradores de la Mente
 * Retro Cyberpunk | exeLearning Theme
 */
var myTheme = {
    init: function () {
        // Common functions
        if (this.inIframe()) $('body').addClass('in-iframe');
        if (!$('body').hasClass('exe-web-site')) return;

        // Add menu and search bar togglers
        var togglers =
            '<button type="button" id="siteNavToggler" class="toggler" title="' +
            $exe_i18n.menu +
            '">' +
            '<span class="sr-av">' + $exe_i18n.menu + '</span>' +
            '</button>' +
            '<button type="button" id="searchBarTogger" class="toggler" title="' +
            $exe_i18n.search +
            '">' +
            '<span class="sr-av">' + $exe_i18n.search + '</span>' +
            '</button>';
        $('#siteNav').before(togglers);

        // Check current NAV status
        var url = window.location.href;
        url = url.split('?');
        if (url.length > 1) {
            if (url[1].indexOf('nav=false') != -1) {
                $('body').addClass('siteNav-off');
                myTheme.params('add');
            }
        }

        // Menu toggler
        $('#siteNavToggler').on('click', function () {
            if (myTheme.isLowRes()) {
                $('#exe-client-search').hide();
                if ($('body').hasClass('siteNav-off')) {
                    $('body').removeClass('siteNav-off');
                } else {
                    if ($('#siteNav').isInViewport()) {
                        $('body').addClass('siteNav-off');
                        myTheme.params('add');
                    }
                }
            } else {
                $('body').toggleClass('siteNav-off');
                myTheme.params(
                    $('body').hasClass('siteNav-off') ? 'add' : 'remove'
                );
            }
        });

        // Search bar toggler
        $('#searchBarTogger').on('click', function () {
            var bar = $('#exe-client-search');
            if (bar.is(':visible')) {
                bar.hide();
            } else {
                if (myTheme.isLowRes()) {
                    $('body').addClass('siteNav-off');
                }
                bar.show();
                $('#exe-client-search-text').focus();
            }
        });

        // Fixed navigation
        $('#siteNav').wrap('<div id="sidebar-nav"></div>');
        myTheme.checkNav();
        $(window).bind('resize', function () {
            myTheme.checkNav();
        });

        // Search form
        this.searchForm();

        // Move .page-title to content area
        this.movePageTitle();

        // ── NEURO EXPLORA ENHANCEMENTS ──────────────────

        // Mission progress bar
        this.initMissionProgress();

        // Glitch effect on page title hover
        this.initGlitchEffect();

        // Typewriter effect for first heading on page
        this.initTypewriter();

        // HUD box corner brackets enhancement
        this.enhanceBoxes();

        // Nav items with mission numbering
        this.enhanceNavItems();

        // Game intro overlay on first visit
        this.initGameIntro();
    },

    // ─── CORE FUNCTIONS ───────────────────────────────

    inIframe: function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    },

    searchForm: function () {
        $('#exe-client-search-text').attr('class', 'form-control');
    },

    isLowRes: function () {
        return $('#siteNav').css('float') == 'none';
    },

    checkNav: function () {
        var wrapper = $('#sidebar-nav');
        var navH = $('#siteNav > ul').height();
        navH = navH + 50;
        if (navH < $(window).height()) wrapper.addClass('fixed');
        else wrapper.removeClass('fixed');
    },

    param: function (e, act) {
        if (act == 'add') {
            var ref = e.href;
            var con = '?';
            if (ref.indexOf('.html?') != -1) con = '&';
            var param = 'nav=false';
            if (ref.indexOf(param) == -1) {
                ref += con + param;
                e.href = ref;
            }
        } else {
            var ref = e.href;
            ref = ref.split('?');
            e.href = ref[0];
        }
    },

    params: function (act) {
        $('.nav-buttons a').each(function () {
            myTheme.param(this, act);
        });
    },

    movePageTitle: function () {
        const tryMove = () => {
            const $header = $('.main-header .page-header');
            const $title = $header.find('.page-title').first();
            let $content = $('.page-content').first();
            if (!$content.length) $content = $('.content, main .content').first();
            if (!$content.length) $content = $('#main, #content').first();
            if (!$content.length && $header.length) $content = $header.nextAll(':not(header)').first();
            if (!$content.length && $header.length) $content = $header.parent();
            if ($header.length && $title.length && $content.length) {
                $content.prepend($title);
                return true;
            }
            return false;
        };
        if (tryMove()) return;
        const observer = new MutationObserver(() => {
            if (tryMove()) observer.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    },

    // ─── NEURO EXPLORA ENHANCEMENTS ───────────────────

    /**
     * Mission progress bar — tracks scroll position
     */
    initMissionProgress: function () {
        // Progress bar element injected at bottom of page
        var $bar = $('<div class="ne-progress-bar"><div class="ne-progress-fill" id="ne-progress-fill"></div></div>');
        $('body').append($bar);

        // Update on scroll
        $(window).on('scroll', function () {
            var scrollTop = $(window).scrollTop();
            var docHeight = $(document).height() - $(window).height();
            var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            $('#ne-progress-fill').css('width', Math.min(100, progress) + '%');
        });

        // Update mission label in nav based on active page
        var $activeNav = $('#siteNav a.active');
        if ($activeNav.length) {
            var missionName = $activeNav.text().trim();
            // Inject mission label in bottom status
        }
    },

    /**
     * Glitch effect on headings hover
     */
    initGlitchEffect: function () {
        var style = document.createElement('style');
        style.innerHTML = [
            '@keyframes ne-glitch {',
            '  0%,100% { clip-path: none; transform: none; }',
            '  25% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translate(-2px,0); }',
            '  50% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translate(2px,0); }',
            '  75% { clip-path: none; transform: translate(0,-1px); }',
            '}',
            '.exe-content h1:hover, .exe-content h2:hover {',
            '  animation: ne-glitch 0.4s steps(1) infinite;',
            '  color: #ff8fa3 !important;',
            '}'
        ].join('');
        document.head.appendChild(style);
    },

    /**
     * Typewriter effect for box titles
     */
    initTypewriter: function () {
        var $titles = $('.exe-content .box-title').first();
        if (!$titles.length) return;

        // Only run on first box title, not all (performance)
        var el = $titles[0];
        var original = el.textContent;
        if (!original || original.length < 3) return;

        el.textContent = '';
        el.style.borderRight = '2px solid #ff5c7a';

        var i = 0;
        var typeTimer = setInterval(function () {
            if (i < original.length) {
                el.textContent += original.charAt(i);
                i++;
            } else {
                clearInterval(typeTimer);
                // Blinking cursor stays for 2s then fades
                setTimeout(function () {
                    el.style.borderRight = 'none';
                }, 2000);
            }
        }, 40);
    },

    /**
     * HUD box enhancement — status indicator
     */
    enhanceBoxes: function () {
        $('.exe-content .box').each(function (idx) {
            var $box = $(this);
            // Add HUD status chip
            var $chip = $('<span class="ne-hud-chip">SYS:' + String(idx + 1).padStart(2, '0') + '</span>');
            $chip.css({
                position: 'absolute',
                top: '10px',
                right: '54px',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.6rem',
                color: 'rgba(255,92,122,0.4)',
                letterSpacing: '1px',
                pointerEvents: 'none'
            });
            $box.css('position', 'relative');
            $box.prepend($chip);
        });
    },

    /**
     * Nav items — add mission number prefix
     */
    enhanceNavItems: function () {
        $('#siteNav > ul > li').each(function (idx) {
            var $a = $(this).find('> a');
            var current = $a.text().trim();
            // Only prefix top-level items without sub-menus with mission number
            if (!$a.hasClass('daddy')) {
                $a.attr('data-mission', String(idx + 1).padStart(2, '0'));
            }
        });

        // Inject mission CSS
        var style = document.createElement('style');
        style.innerHTML = [
            '#siteNav > ul > li > a::after {',
            '  content: attr(data-mission);',
            '  position: absolute;',
            '  right: 10px;',
            '  top: 50%;',
            '  transform: translateY(-50%);',
            '  font-size: 0.55rem;',
            '  font-family: "Share Tech Mono", monospace;',
            '  color: rgba(255,92,122,0.35);',
            '  letter-spacing: 1px;',
            '}',
            '#siteNav > ul > li > a.active::after {',
            '  color: rgba(255,92,122,0.8);',
            '}'
        ].join('');
        document.head.appendChild(style);
    },

    /**
     * Game intro overlay.
     *
     * Reglas de activación:
     *   1. La página activa se llama "Portada" (texto del enlace en el nav, sin
     *      importar mayúsculas/acentos), O
     *   2. Es el primer ítem del nav (posición 0), lo que cubre el caso en que
     *      la portada tenga otro nombre.
     *
     * En cualquier otra página la animación NO se muestra.
     * Si el usuario vuelve a la portada, vuelve a ver la animación.
     */
    initGameIntro: function () {
        var $activeLink = $('#siteNav a.active');

        // Criterio 1: el texto del enlace activo coincide con "portada"
        var activeText = $activeLink.text().trim().toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // elimina acentos
        var isPortada = activeText === 'portada';

        // Criterio 2: es el primer ítem de nivel superior del nav
        var isFirstItem = ($('#siteNav > ul > li').first().find('> a')[0] === $activeLink[0]);

        if (!isPortada && !isFirstItem) return;

        // Build intro overlay
        var packageTitle = $('.package-title').first().text().trim() || 'NEURO EXPLORA';

        var introHTML = [
            '<div id="ne-intro-overlay">',
            '  <div id="ne-intro-content">',
            '    <div class="ne-intro-scanlines"></div>',
            '    <div class="ne-intro-logo">',
            '      <div class="ne-intro-icon">&#9881;</div>',
            '      <div class="ne-intro-subtitle">SISTEMA DE APRENDIZAJE NEURONAL</div>',
            '    </div>',
            '    <div class="ne-intro-title" id="ne-intro-title"></div>',
            '    <div class="ne-intro-loading">',
            '      <div class="ne-intro-bar-label">CARGANDO MISIÓN...</div>',
            '      <div class="ne-intro-bar-bg">',
            '        <div class="ne-intro-bar-fill" id="ne-intro-bar"></div>',
            '      </div>',
            '      <div class="ne-intro-bar-pct" id="ne-intro-pct">0%</div>',
            '    </div>',
            '    <div class="ne-intro-prompt" id="ne-intro-prompt" style="display:none">',
            '      [ PRESIONA CUALQUIER TECLA O TOCA LA PANTALLA ]',
            '    </div>',
            '  </div>',
            '</div>'
        ].join('');

        var introCSS = [
            '#ne-intro-overlay {',
            '  position:fixed;inset:0;background:#000;z-index:99999;',
            '  display:flex;align-items:center;justify-content:center;',
            '  font-family:"Share Tech Mono","Courier New",monospace;',
            '  cursor:pointer;',
            '}',
            '.ne-intro-scanlines {',
            '  position:absolute;inset:0;pointer-events:none;',
            '  background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,92,122,0.03) 2px,rgba(255,92,122,0.03) 4px);',
            '}',
            '#ne-intro-content {',
            '  text-align:center;max-width:600px;width:90%;position:relative;z-index:1;',
            '}',
            '.ne-intro-logo {margin-bottom:32px;}',
            '.ne-intro-icon {',
            '  font-size:3rem;color:#ff5c7a;',
            '  text-shadow:0 0 20px rgba(255,92,122,0.8),0 0 40px rgba(255,92,122,0.4);',
            '  animation:ne-spin 4s linear infinite;display:block;margin-bottom:8px;',
            '}',
            '@keyframes ne-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}',
            '.ne-intro-subtitle {',
            '  color:rgba(255,92,122,0.5);font-size:0.6rem;letter-spacing:4px;text-transform:uppercase;',
            '}',
            '.ne-intro-title {',
            '  font-family:"Press Start 2P","Courier New",monospace;',
            '  color:#ff5c7a;font-size:1rem;margin-bottom:40px;min-height:3em;',
            '  text-shadow:0 0 20px rgba(255,92,122,0.8);',
            '  line-height:1.8;letter-spacing:2px;',
            '}',
            '.ne-intro-loading {margin-bottom:24px;}',
            '.ne-intro-bar-label {',
            '  color:rgba(255,92,122,0.6);font-size:0.65rem;letter-spacing:3px;margin-bottom:10px;',
            '}',
            '.ne-intro-bar-bg {',
            '  background:#0d0f1a;border:1px solid rgba(255,92,122,0.3);',
            '  height:8px;border-radius:2px;overflow:hidden;position:relative;',
            '}',
            '.ne-intro-bar-fill {',
            '  height:100%;width:0%;background:linear-gradient(90deg,#ff5c7a,#00d4ff);',
            '  box-shadow:0 0 10px rgba(255,92,122,0.6);transition:width 0.1s linear;',
            '}',
            '.ne-intro-bar-pct {',
            '  color:rgba(0,212,255,0.7);font-size:0.65rem;letter-spacing:2px;margin-top:6px;text-align:right;',
            '}',
            '.ne-intro-prompt {',
            '  color:rgba(255,92,122,0.7);font-size:0.6rem;letter-spacing:2px;',
            '  animation:ne-blink 1s step-end infinite;',
            '}',
            '@keyframes ne-blink{0%,100%{opacity:1}50%{opacity:0}}'
        ].join('');

        var styleEl = document.createElement('style');
        styleEl.innerHTML = introCSS;
        document.head.appendChild(styleEl);

        $('body').append(introHTML);

        // Typewrite the title — 40 ms/char
        var titleEl = document.getElementById('ne-intro-title');
        var chars = packageTitle.split('');
        var ti = 0;
        var titleTimer = setInterval(function () {
            if (ti < chars.length) {
                titleEl.textContent += chars[ti];
                ti++;
            } else {
                clearInterval(titleTimer);
                myTheme.introLoadBar();
            }
        }, 40);

        // ── Dismiss ────────────────────────────────────────────
        // IMPORTANTE: NO usar $(document).one() con selector delegado —
        // el listener se consume en la primera visita y no vuelve a disparar.
        // En su lugar, ponemos listeners DIRECTAMENTE sobre el overlay.
        // Se elimina la condición de "prompt visible" para que cualquier
        // clic/tecla en cualquier momento cierre la animación.
        var dismissed = false;
        function dismissIntro() {
            if (dismissed) return;
            dismissed = true;
            var overlay = document.getElementById('ne-intro-overlay');
            if (!overlay) return;
            overlay.style.transition = 'opacity 0.5s ease';
            overlay.style.opacity = '0';
            setTimeout(function () {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 550);
        }

        var overlayEl = document.getElementById('ne-intro-overlay');
        overlayEl.addEventListener('click',      dismissIntro, { once: true });
        overlayEl.addEventListener('touchstart', dismissIntro, { once: true });
        document.addEventListener('keydown',     dismissIntro, { once: true });
    },

    introLoadBar: function () {
        var pct = 0;
        var barEl = document.getElementById('ne-intro-bar');
        var pctEl = document.getElementById('ne-intro-pct');
        var timer = setInterval(function () {
            pct += Math.random() * 12 + 2;
            if (pct >= 100) {
                pct = 100;
                clearInterval(timer);
                if (barEl) barEl.style.width = '100%';
                if (pctEl) pctEl.textContent = '100%';
                setTimeout(function () {
                    $('#ne-intro-prompt').show();
                }, 400);
                return;
            }
            if (barEl) barEl.style.width = pct + '%';
            if (pctEl) pctEl.textContent = Math.floor(pct) + '%';
        }, 120);
    }
};

$(function () {
    myTheme.init();
});

$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};
