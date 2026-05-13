window.addEventListener('DOMContentLoaded', function() {
    //mobile menu

    const btnMobMenu = document.querySelector('.btn-burger-menu'),
          menu = document.querySelectorAll('.nav-links'),
          lineMenu = document.querySelectorAll('.line'),
          lineClose = document.querySelector('.line2'),
          lineClose2 = document.querySelector('.line2-clone'),
          logo = document.querySelector('.logo'),
          linkMenu = document.querySelectorAll('.nav-link-item'),
          head = document.querySelector('.head'),
          turnActivity = document.querySelectorAll('.e-targer');


          
    turnActivity.forEach(i => {
        i.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
          

    btnMobMenu.addEventListener('click', () => {
        head.classList.toggle('head-open-menu');
        menu[1].classList.toggle('show-mobile-menu');
        lineMenu.forEach(i => {
            i.classList.toggle('line-white');
        });
        lineClose.classList.toggle('line-close2');
        lineClose2.classList.toggle('line-close2-clone');
        lineMenu[0].classList.toggle('hide-line');
        lineMenu[3].classList.toggle('hide-line');
        logo.classList.toggle('logo-white');
        linkMenu[3].classList.toggle('mt0');
        document.body.classList.toggle('hidden-body');
    });

    // анимация всплывания элементов
    const items = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('show');
        }
    });
    });

    items.forEach(el => observer.observe(el));

    // сохранение выбранного языка
    const savedLang = localStorage.getItem('lang') || 'ru';
    setLang(savedLang);


});

    // смена языка ру - en
    const content = {
        ru: {
            navLinkAbout: "обо мне",
            navLinkContact: "контакт",
            navLinkOrder: "условия",
            mainTitle: "Музыка, которая вдохновляет",
            text: "Я — Данил Сила, диджей, который не просто ставит треки, я чувствует настроение и делаю так, чтобы не хотелось уходить с танцпола. Проверенные хиты, эксклюзивные треки, неожиданные ремиксы,  и идеальный баланс между драйвом и эмоциями.",
            titleCardWedding: "свадьба",
            textCardWiddng: "Свадьба для Двоих — это про вас. Про торжественную музыку, которая запомнится на всю жизнь",
            titleCardClub: "клуб",
            textCardClub: "Музыка чувств и эмоций, незабываемой атмосферы драйва",
            titleCardCorporate: "корпоратив",
            textCardCorporate: "Энергия вечеринки, которая надолго останется в памяти",
            btnCard: "смотреть"
        },
        en: {
            navLinkAbout: "about me",
            navLinkContact: "contact",
            navLinkOrder: "price",
            mainTitle: "Celebration Atmosphere!",
            text: "I am Sila Danil, a professional DJ. During my performances, I create an unforgettable atmosphere of the evening together with guests: dances, crazy energy, favorite and famous tracks I work with on the best dancfloors. That is why during my performances I literally “blow up” the dance floor.",
            titleCardWedding: "wedding",
            textCardWiddng: "A wedding for Two is all about you. About the solemn music that will be remembered for a lifetime ",
            titleCardClub: "club",
            textCardClub: "Music of feelings and emotions, unforgettable driving atmosphere",
            titleCardCorporate: "corporate party",
            textCardCorporate: "Energy of a party that will remain in memory for a long time",
            btnCard: "look"
        }
    };

    let lang = "ru";


    function setLang(lang) {
        localStorage.setItem('lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            el.textContent = content[lang][key];
        });

        // активная кнопка выбора языка
        document.querySelectorAll('.list-lang-item').forEach(btn => {
            btn.classList.remove('list-lang-active');

            if(btn.dataset.lang === lang) {
                    btn.classList.add('list-lang-active');
                }
        });

        document.querySelectorAll('.list-lang-item').forEach(btn => {

            btn.addEventListener('click', (e) => {

                e.preventDefault();

                setLang(btn.dataset.lang);

            });

        });
    }