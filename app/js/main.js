'use strict';

const paymentMethodInstance = window.paymentMethod.instance;
const paymentInstance = window.payment.instance;

document.addEventListener('DOMContentLoaded', () => {
    class Crm {
        constructor(id, formData, actionName) {
            this.id = id;
            this.formData = formData;
            this.actionName = actionName;
        }

        getRequestObject() {
            return {
                action: `amo_crm_${this.actionName}`,
                data: this.getFormData()
            }
        }

        getFormData() {
            if (this.id === 131) {
                return {
                    title: this.getFormValue(4) + ', ' + this.getFormValue(13),
                    price: +this.getFormValue(5),
                    name: this.getFormValue(0),
                    type: this.getFormValue(6),
                    time: this.getFormValue(7),
                    date: +this.getFormValue(8),
                    address: this.getFormValue(9),
                    statusId: +this.getFormValue(11),
                    customer: {
                        name: this.getFormValue(13),
                        email: this.getFormValue(15),
                        telephone: (this.getFormValue(3) + this.getFormValue(14)).replace(/[^0-9.]/g, "")
                    },
                    tag: {
                        value: this.getFormValue(12)
                    }
                }
            }
            if (this.id === 859) {
                return {
                    name: this.getFormValue(14),
                    customer: {
                        email: this.getFormValue(16),
                        telephone: (this.getFormValue(4) + this.getFormValue(15)).replace(/[^0-9.]/g, "")
                    },
                    intensive: {
                        name: this.getFormValue(5),
                        timestamp: +this.getFormValue(9)
                    },
                    tag: {
                        name: 'Интенсив',
                        value: this.getFormValue(12)
                    }
                }
            }
            if (this.id === 1447) {
                return {
                    customer: {
                        name: this.getFormValue(1),
                        email: this.getFormValue(3),
                        telephone: (this.getFormValue(0) + ' ' + this.getFormValue(2)).replace(/[^0-9.]/g, "")
                    },
                    tag: {
                        name: 'Начни учиться бесплатно'
                    }
                }
            }
            if (this.id === 779) {
                return {
                    customer: {
                        name: this.getFormValue(1),
                        telephone: (this.getFormValue(0) + ' ' + this.getFormValue(2)).replace(/[^0-9.]/g, ""),
                        email: this.getFormValue(3),
                        message: this.getFormValue(4)
                    },
                    tag: {
                        name: 'Обратный звонок'
                    }
                }
            }
            if (this.id === 1839) {
                return {
                    name: this.getFormValue(7),
                    customer: {
                        email: this.getFormValue(8),
                        telephone: (this.getFormValue(3) + this.getFormValue(9)).replace(/[^0-9.]/g, "")
                    },
                    intensive: {
                        name: this.getFormValue(4),
                        timestamp: +this.getFormValue(5)
                    },
                    tag: {
                        name: 'Интенсив',
                        value: this.getFormValue(6)
                    }
                }
            }
        }

        getFormValue(index) {
            return this.formData[index].value;
        }
    }

    //Inner carousel
    (function () {
        const innerCarouselsCollection = Array.from(document.querySelectorAll('.inner-carousel__grid'));
        const defaultCarouselClass = 'inner-carousel-instance-';

        if (innerCarouselsCollection.length) {
            innerCarouselsCollection.forEach((item, index) => {
                const carousel = item.closest('.inner-carousel');

                item.classList.add(defaultCarouselClass + index);
                new Swiper(item, {
                    pagination: {
                        el: carousel.querySelector('.swiper-pagination'),
                        type: 'bullets'
                    },
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    navigation: {
                        prevEl: carousel.querySelector('.inner-carousel__btn-prev'),
                        nextEl: carousel.querySelector('.inner-carousel__btn-next')
                    }
                });
            });
        }
    })();

    //International telephone input
    const iti = {
        utilsPath: 'https://ux-school.by/wp-content/themes/ux-mind-school/js/utils.js',
        init: function (el) {
            window.intlTelInput(el, {
                nationalMode: true,
                autoHideDialCode: false,
                autoPlaceholder: 'aggressive',
                separateDialCode: true,
                preferredCountries: ['by', 'ru', 'ua'],
                initialCountry: 'auto',
                geoIpLookup: function (success, failure) {
                    const date = new Date();
                    const dateString = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                    const localStorageData = JSON.parse(localStorage.getItem('ums-country-code'));
                    if (localStorageData) {
                        if (localStorageData.date != dateString) {
                            jQuery.when(getCustomerIpInfo()).then((resp) => {
                                if (resp) {
                                    success(resp.country);
                                    localStorage.setItem('ums-country-code', JSON.stringify({
                                        date: dateString,
                                        value: resp.country
                                    }));
                                } else {
                                    failure(resp.country);
                                }
                            });
                        } else {
                            success(localStorageData.value);
                        }
                    } else {
                        jQuery.when(getCustomerIpInfo()).then((resp) => {
                            if (resp) {
                                success(resp.country);
                                localStorage.setItem('ums-country-code', JSON.stringify({
                                    date: dateString,
                                    value: resp.country
                                }));
                            } else {
                                failure(resp.country);
                            }
                        });
                    }
                },
                utilsScript: this.utilsPath,
                customPlaceholder: function (selectedCountryPlaceholder) {
                    const customPlaceholder = selectedCountryPlaceholder.replace(/[0-9]/g, '_');
                    const customMask = selectedCountryPlaceholder.replace(/[0-9]/g, 9);
                    const customMaskObject = new Inputmask(customMask, {
                        showMaskOnHover: false,
                        greedy: false
                    });
                    customMaskObject.mask(el);
                    return customPlaceholder;
                }
            });
        },
        countryChange: function (el) {
            el.addEventListener("countrychange", (event) => {
                const target = event.target;
                const form = target.closest('.wpcf7-form') || target.closest('.form');
                const code = form.querySelector('.iti__selected-dial-code').textContent;
                const hiddenInput = form.querySelector('input[name="ums-country-code"]');
                hiddenInput.value = code;
            });
        }
    }
    
    //Variables
    let defaultSubmitButtonText;
    let requiredInputsCollection;
    let certificatePaymentObject;
    let telInputValidation = false;
    let emailInputValidation = false;
    let textInputValidation = false;
    let selectValidation = false;
    let dataCurrentPageValue = 1;
    let dataMaxPagesValue;
    let currentPage = 1;
    if (document.querySelector('.course-list__row_first')) {
        dataMaxPagesValue = +document.querySelector('.course-list__row_first').dataset.maxNumPages;
    }
    let deliveryElement = document.querySelector('select[name="delivery"]');
    let isCompleted = false;
    let isMobile = false;
    const certificateForm = '#wpcf7-f1805-o1';
    const lecturersCollection = document.querySelectorAll('.lecturers-page__item');
    const wpcf7Collection = document.querySelectorAll('.wpcf7');
    const contactPageItems = document.querySelectorAll('.contact-page__info-item');
    const navigationLinksCollection = document.querySelectorAll('.page-navigation__link');
    const inputs = document.querySelectorAll('input');
    const selects = document.querySelectorAll('select');
    const weCarouselOptions = {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000
        },
        navigation: {
            nextEl: '.we__btn-next',
            prevEl: '.we__btn-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
                pagination: {
                    el: '.we__pagination',
                    type: 'bullets'
                }
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
                pagination: {
                    el: null
                }
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1230: {
                slidesPerView: 4
            }
        }
    }
    const courseGalleryCarouselOptions = {
        slidesPerView: 5,
        loop: true,
        autoplay: {
            delay: 3000
        },
        navigation: {
            prevEl: '.course-gallery__btn-prev',
            nextEl: '.course-gallery__btn-next'
        },
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
            },
            992: {
                slidesPerView: 5
            }
        }
    }
    const graduatesCarouselOptions = {
        slidesPerView: 8,
        spaceBetween: 25,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 3000
        },
        breakpoints: {
            360: {
                slidesPerView: 2
            },
            480: {
                slidesPerView: 3
            },
            576: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 5
            },
            992: {
                slidesPerView: 6
            },
            1200: {
                slidesPerView: 8
            }
        }
    }
    const testimonialsCarouselOptions = {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        autoplay: {
            delay: 5000
        },
        navigation: {
            nextEl: '.testimonials__btn-next',
            prevEl: '.testimonials__btn-prev',
        },
        pagination: {
            el: '.testimonials__pagination',
            type: 'bullets',
            clickable: true
        }
    }
    

    initSwiper('.we__carousel', weCarouselOptions);
    initSwiper('.course-gallery__grid', courseGalleryCarouselOptions);
    initSwiper('.graduates__carousel', graduatesCarouselOptions);
    initSwiper('.testimonials__carousel', testimonialsCarouselOptions);
    changeLayout();
    showPopup();
    initInputListener();
    initItiPlugin();

    document.addEventListener('click', (event) => {
        //Get target element
        const target = event.target;
        //Find current element
        if (target.matches('.m-options__menu-btn')) {
            const mobileMenuEl = document.querySelector('.m-menu');
            const scrollBarWidth = getScrollbarWidth();
            mobileMenuEl.classList.add('m-menu_opened');
            document.body.style.paddingRight = scrollBarWidth;
            document.documentElement.classList.add('is-locked');
        }
        if (target.matches('.m-menu__options-close-btn')) {
            const mobileMenuEl = document.querySelector('.m-menu');
            mobileMenuEl.classList.remove('m-menu_opened');
            document.body.style.paddingRight = 0;
            document.documentElement.classList.remove('is-locked');
        }
        if (target.dataset.modal) {
            const modalId = target.dataset.modal;

            if (modalId === '#personal-data-modal') {
                const data = {
                    action: 'personal_data'
                }
                jQuery.when(window.utils.ajaxRequest(data)).then(resp => {
                    const modal = document.querySelector('.personal-data-modal');
                    modal.insertAdjacentHTML('afterBegin', resp);
                    jQuery(modal).modal({
                        closeExisting: false
                    });
                }, error => console.log(new Error(error)));
            }
            jQuery(modalId).modal({
                closeExisting: false
            });
        }
        if (target.dataset.videoId) {
            const videoId = target.dataset.videoId;
            const videoLink = 'https://www.youtube.com/embed/' + videoId;
            const videoModal = document.querySelector('.video-modal');
            videoModal.querySelector('iframe').setAttribute('src', videoLink);
            jQuery('.video-modal').modal({
                closeExisting: false
            });
        }
        if (target.matches('.content-list__title')) {
            target.classList.toggle('content-list__title_active');
            //Need to add animation with JS
            target.nextElementSibling.classList.toggle('content-list__text_state-actived');
        }
        if (target.matches('.contact-page__info-item')) {
            //Need to add animation with JS
            jQuery('body, html').animate({
                scrollTop: jQuery('#map-anchor').offset().top
            }, 800);
        }
        if (target.matches('.sort-navigation__button')) {
            const sortValue = target.dataset.sort;
            const buttons = document.querySelectorAll('.sort-navigation__button');
            const sortElements = document.querySelector('.sort-list').children;
            window.utils.removeClass(buttons, 'sort-navigation__button_state-active');
            window.utils.removeClass(sortElements, 'd-none');
            target.classList.add('sort-navigation__button_state-active');

            if (sortValue !== 'all') {
                for (let item of sortElements) {
                    let tagValues = item.dataset.tag;
                    if (!tagValues.split(', ').includes(sortValue)) {
                        item.classList.add('d-none');
                    }
                }
            }
        }
        if (target.matches('.dropdown-course-info__lecturer')) {
            const id = target.dataset.lecturerPostId;
            const text = target.textContent;
            const requestObject = {
                action: 'lecturer',
                id: id
            }
            const beforeSendHandler = function () {
                target.style.opacity = .3;
            }
            target.textContent = 'Загружаем...';
            jQuery.when(window.utils.ajaxRequest(requestObject, beforeSendHandler, target)).then((response) => {
                target.style.opacity = 1;
                target.textContent = text;
                document.querySelector('.dropdown-lecturer-modal').innerHTML = '';
                document.querySelector('.dropdown-lecturer-modal').insertAdjacentHTML('afterBegin', response);
                jQuery('.dropdown-lecturer-modal').modal();
            });
        }
        if (target.matches('.js-tabs__btn')) {
            const buttons = document.querySelectorAll('.js-tabs__btn');
            const id = target.dataset.id.split(',');
            const tabsGrid = target.parentElement.nextElementSibling;
            const content = tabsGrid.querySelector('.course-list__wrapper');
            const isShowFull = target.dataset.showFull;
            const ajaxButton = tabsGrid.querySelector('.course-list__more-btn');
            const footer = ajaxButton ? ajaxButton.parentElement : null;
            dataCurrentPageValue = 1;
            const data = {
                action: 'tabs',
                id: id
            };
            const beforeSendHandler = function () {
                const el = target.parentElement.nextElementSibling;
                el.classList.add('course-list__grid_state-is-loading');
            }

            if (isShowFull) {
                data.showTestPost = false;
                data.showFullPosts = true;
            } else {
                data.showTestPost = false;
            }

            window.utils.removeClass(buttons, 'tabs__btn_active');
            target.classList.add('tabs__btn_active');
            jQuery.when(window.utils.ajaxRequest(data, beforeSendHandler, target)).then(resp => {
                setTimeout(function () {
                    tabsGrid.classList.remove('course-list__grid_state-is-loading');
                    content.innerHTML = '';
                    content.insertAdjacentHTML('afterBegin', resp);
                    if (!isShowFull) {
                        dataMaxPagesValue = +content.querySelector('.course-list__row_first').dataset.maxNumPages;
                        if (dataCurrentPageValue === dataMaxPagesValue) {
                            ajaxButton.classList.add('course-list__more-btn_disabled');
                            footer.classList.add('course-list__footer_state-disabled');
                        } else {
                            ajaxButton.classList.remove('course-list__more-btn_disabled');
                            footer.classList.remove('course-list__footer_state-disabled');
                        }
                    }
                }, 250);
            }, error => console.log(new Error(error)));
        }
        if (target.matches('.course-list__more-btn')) {
            const gridElement = target.parentElement.previousElementSibling;
            const id = +document.querySelector('.tabs__btn_active').dataset.id;
            const data = {
                action: 'courses',
                id: id,
                current_page: dataCurrentPageValue
            }
            const beforeSendHandler = function () {
                const el = target.parentElement.previousElementSibling;
                el.classList.add('course-list__wrapper_state-is-loading');
                target.classList.add('ajax-btn_state-is-loading');
            }

            jQuery.when(window.utils.ajaxRequest(data, beforeSendHandler, target)).then(resp => {
                setTimeout(function () {
                    document.querySelector('.course-list__wrapper').insertAdjacentHTML('beforeEnd', resp);
                    gridElement.classList.remove('course-list__wrapper_state-is-loading');
                    target.classList.remove('ajax-btn_state-is-loading');
                }, 250);
                dataCurrentPageValue += 1;
                if (dataCurrentPageValue === dataMaxPagesValue) {
                    document.querySelector('.course-list__footer').classList.add('course-list__footer_state-disabled');
                    document.querySelector('.course-list__more-btn').classList.add('course-list__more-btn_disabled');
                }
            }, error => console.log(new Error(error)));
        }
        if (target.matches('.course-list-item__select-name')) {
            (function () {
                const buttons = document.querySelectorAll('.course-list-item__select-name');
                const dropdowns = document.querySelectorAll('.dropdown');
                const activeClass = 'course-list-item__select-name_active';
                const openClass = 'dropdown_opened';

                if (target.classList.contains(activeClass)) {
                    target.classList.remove(activeClass)
                    target.nextElementSibling.classList.remove(openClass);
                } else {
                    window.utils.removeClass(buttons, activeClass);
                    window.utils.removeClass(dropdowns, openClass);
                    target.classList.add(activeClass);
                    target.nextElementSibling.classList.add(openClass);
                }
            })();
        }
        if (target.matches('.wpcf7 button[type="submit"]')) {
            (function () {
                defaultSubmitButtonText = target.textContent;
                const activeText = 'Отправляем...';
                const activeClass = 'btn_is-loading';
                target.classList.add(activeClass);
                target.textContent = activeText;
            })();
        }
        if (target.matches('.contact-page__info-item')) {
            const activeClass = 'contact-page__info-item_active';
            window.utils.removeClass(contactPageItems, activeClass);
            target.classList.add(activeClass);
        }
        if (target.matches('.form__textarea-btn')) {
            (function () {
                const activeClass = 'form__textarea-btn_active';
                const disableClass = 'form__textarea_visibility-hide';

                target.classList.toggle(activeClass);
                target.nextElementSibling.lastElementChild.classList.toggle(disableClass);
            })();
        }
        if (target.matches('input[name="sale"]')) {
            if (target.checked) {
                paymentInstance.changePrice(paymentMethodInstance.getMethodIndex(), true);
                return;
            }
            paymentInstance.update(paymentMethodInstance.getMethodIndex());
            paymentInstance.changePrice(paymentMethodInstance.getMethodIndex());
        }
        if (target.matches('.content-list__more-btn')) {
            const icon = `
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z" fill="#211130" />
                </svg>`;
            const items = document.querySelectorAll('.faq__item:nth-child(n+7)');
            if (target.classList.contains('content-list__more-btn_opened')) {
                jQuery('html, body').animate({
                    scrollTop: jQuery('.faq__title').offset().top - 50
                }, 150);
                target.innerHTML = '';
                target.insertAdjacentHTML('afterBegin', `Показать ещё ${icon}`);
                target.classList.remove('content-list__more-btn_opened');
                for (let item of items) {
                    item.style.display = 'none';
                }
                return;
            }
            target.innerHTML = '';
            target.insertAdjacentHTML('afterBegin', `Скрыть ${icon}`);
            target.classList.add('content-list__more-btn_opened');
            for (let item of items) {
                item.style.display = 'block';
            }
        }
        if (target.matches('.portfolio__btn')) {
            const data = target.dataset.location;
            const pages = +target.dataset.maxPages;
            const content = document.querySelector('.portfolio__list');
            const requestData = {
                url: ajax.url,
                type: 'POST',
                data: {
                    action: 'portfolio',
                    currentPage: currentPage,
                },
                beforeSend: function () {
                    content.classList.add('portfolio__list_state-is-loading');
                    target.classList.add('ajax-btn_state-is-loading');
                },
                success: function (response) {
                    setTimeout(() => {
                        content.insertAdjacentHTML('beforeEnd', response);
                        content.classList.remove('portfolio__list_state-is-loading');
                        target.classList.remove('ajax-btn_state-is-loading');
                        currentPage++;
                        if (currentPage === pages) {
                            target.classList.add('portfolio__btn_disabled');
                        }
                    }, 250);
                }
            }

            if (data === 'post') {
                const tag = target.dataset.postTag;
                requestData.data.action = data + '_portfolio';
                requestData.data.tag = tag;
            }
            jQuery.ajax(requestData);
        }
        if (target.matches('.webpay-form__btn')) {
            event.preventDefault();

            const buttonText = target.textContent;
            target.textContent = 'Проверяем...';
            target.style.opacity = .5;
            const form = target.closest('.form');
            const method = target.dataset.paymentMethod;
            const inputs = form.querySelectorAll('input[required]');
            const customer = (method === 'alfa') ? form.querySelector('input[name="name"]').value : form.querySelector('input[name="wsb_customer_name"]').value;
            let isValid;
            let ajaxData = {
                action: 'payment_' + method,
                totalPrice: paymentInstance.getTotalPrice() * 100,
                productName: paymentInstance.getCurrent(),
                customerName: customer
            }

            for (let input of inputs) {
                const value = input.value;
                const label = input.nextElementSibling.nextElementSibling;

                if (!value) {
                    input.classList.add('wpcf7-not-valid');
                    label.classList.add('form__error-label_active');
                    isValid = false;
                    setTimeout(() => {
                        target.textContent = buttonText;
                        target.style.opacity = 1;
                    }, 300);
                    return;
                } else {
                    input.classList.remove('wpcf7-not-valid');
                    label.classList.remove('form__error-label_active');
                    isValid = true;
                }
            }

            if (isValid) {
                inputs.forEach(item => {
                    const label = item.nextElementSibling.nextElementSibling;

                    item.classList.remove('wpcf7-not-valid');
                    label.classList.remove('form__error-label_active');
                });
                if (paymentMethodInstance.getMethodIndex() !== 3) {
                    ajaxData.customerSaleType = paymentInstance.getSaleType();
                    ajaxData.customerSaleValue = paymentInstance.getSaleValue();
                }
                jQuery.ajax({
                    url: ajax.url,
                    type: 'POST',
                    dataType: 'json',
                    data: ajaxData,
                    beforeSend: function () {
                        target.style.opacity = .5;
                        target.textContent = 'Обрабатываем данные...';
                    },
                    success: function (response) {
                        //VK conversion
                        VK.Goal('purchase');
                        //Yandex conversion
                        ym(49171171, 'reachGoal', 'payment');
                        //Google conversion
                        gtag('event', 'conversion', {
                            'send_to': 'AW-795851636/iE7ACKPm0tMBEPT2vvsC'
                        });
                        gtag('event', 'success', {
                            'send_to': 'analytics',
                            'event_category': 'payment'
                        });

                        target.textContent = 'Перенаправляем на оплату...';
                        if (paymentMethodInstance.getMethodIndex() === 3) {
                            setTimeout(function () {
                                document.location.replace(response.checkout.redirect_url);
                            }, 200);
                            return;
                        }
                        setTimeout(function () {
                            document.location.replace(response.formUrl);
                        }, 200);
                    }
                });
            }
        }
    });

    //Events
    jQuery('.modal').on('modal:open', modalOpenHandler);
    jQuery('.modal').on('modal:close', modalCloseHandler);
    jQuery('.video-modal').on('modal:after-close', videoModalCloseHandler);
    addCustomEventHandler('click', lecturersCollection, lecturerHandlerFunction);
    addCustomEventHandler('wpcf7invalid', wpcf7Collection, wpcf7InvalidHandler);
    addCustomEventHandler('wpcf7mailsent', wpcf7Collection, wpcf7SentHandler);
    addCustomEventHandler('click', navigationLinksCollection, pageNavigationLinkHandler);
    addCustomEventHandler('input', inputs, paymentInputsHandler);
    addCustomEventHandler('change', selects, handleSelect);

    window.addEventListener('resize', () => {
        changeLayout();
    });
    window.addEventListener('scroll', () => {
        const button = document.querySelector('.m-options__menu-btn');
        const activeClass = 'm-options__menu-btn_active';
        
        if (button) {
            if (pageYOffset >= 900) {
                button.classList.add(activeClass);
                return;
            }
            button.classList.remove(activeClass);
        }
    });

    document.body.addEventListener('mouseover', (event) => {
        const target = event.target;
        if (target.closest('svg') && target.closest('svg').classList.contains('info__icon') && window.innerWidth > 991) {
            target.closest('svg').nextElementSibling.classList.add('info__content_opened');
        }
    });
    document.body.addEventListener('mouseout', (event) => {
        const target = event.target;
        if (target.closest('svg') && target.closest('svg').classList.contains('info__icon') && !event.relatedTarget.closest('svg') && window.innerWidth > 991) {
            target.closest('svg').nextElementSibling.classList.remove('info__content_opened');
        }
    });

    //Certificate
    (function () {
        const button = document.querySelector('.calculation__btn');
        const form = document.querySelector('#wpcf7-f1805-o1');
        const processMessage = 'Обрабатываем данные...';
        const transferMessage = 'Перенаправляем на оплату...';

        if (button) {
            const defaultText = button.textContent;
            requiredInputsCollection = button.closest('.form').querySelectorAll('input:required');
            button.addEventListener('click', function (event) {
                button.textContent = 'Отправляем...';
                button.classList.add('btn_is-loading');
                for (let input of requiredInputsCollection) {
                    let inputType = input.getAttribute('type');
                    if (inputType === 'tel') {
                        //Get input value and remove all non-digit symbols
                        let inputValue = input.value.replace(/\D/g, '');
                        if (input.value == '' || inputValue.length < 9) {
                            addErrorClass(input, input.closest('.form__input'));
                            // validation = false;
                            telInputValidation = false;
                        } else {
                            removeErrorClass(input, input.closest('.form__input'));
                            // validation = true;
                            telInputValidation = true;
                        }
                    }
                    if (inputType === 'email') {
                        if (input.value == '' || (input.value.indexOf('@') == -1)) {
                            addErrorClass(input, input.closest('.form__input'));
                            // validation = false;
                            emailInputValidation = false;
                        } else {
                            removeErrorClass(input, input.closest('.form__input'));
                            // validation = true;
                            emailInputValidation = true;
                        }
                    }
                    if (inputType === 'text') {
                        if (input.value == '') {
                            addErrorClass(input, input.parentElement);
                            // validation = false;
                            textInputValidation = false;
                        } else {
                            removeErrorClass(input, input.parentElement);
                            // validation = true;
                            textInputValidation = true;
                        }
                    }
                }
                //Get select data
                let deliveryValue = +deliveryElement.value;
                if (deliveryValue === 0) {
                    addErrorClass(deliveryElement, deliveryElement.parentElement);
                    selectValidation = false;
                    // validation = false
                } else if (deliveryValue === 1) {
                    deliveryElement.classList.remove('wpcf7-not-valid');
                    deliveryElement.parentElement.querySelector('.form__error-label').classList.remove('form__error-label_active');
                    let deliveryAddressElement = deliveryElement.parentElement.nextElementSibling.querySelector('input');
                    let deliveryAddress = deliveryAddressElement.value;
                    if (deliveryAddress === '') {
                        addErrorClass(deliveryAddressElement, deliveryAddressElement.parentElement);
                        // validation = false;
                        selectValidation = false;
                    } else {
                        removeErrorClass(deliveryAddressElement, deliveryAddressElement.parentElement);
                        // validation = true;
                        selectValidation = true;
                    }
                } else {
                    removeErrorClass(deliveryElement, deliveryElement.parentElement);
                    // validation = true;
                    selectValidation = true;
                }
                //Send form
                if (telInputValidation && emailInputValidation && textInputValidation && selectValidation) {
                    //Create payment object
                    certificatePaymentObject = {
                        action: 'payment_alfa',
                        orderAmount: +jQuery('input[name="total"]').val() * 100,
                        orderTitle: jQuery('.ums-select__btn').text(),
                        customerName: jQuery('input[name="name"]').val(),
                        customerSaleType: 'Без скидки',
                        customerSaleValue: 0
                    }
                    if (document.querySelector('.promocode-input').classList.contains('promocode-input_state-success')) {
                        certificatePaymentObject.customerSaleType = 'Промокод';
                        certificatePaymentObject.customerSaleValue = 10;
                    }
                    //Fill hidden fields with data
                    jQuery(certificateForm).find('input[name="ums-course"]').val(jQuery('.ums-select__btn').text());
                    jQuery(certificateForm).find('input[name="ums-price"]').val(jQuery('input[name="total"]').val());
                    jQuery(certificateForm).find('input[name="ums-name"]').val(jQuery('input[name="name"]').val());
                    jQuery(certificateForm).find('input[name="ums-email"]').val(jQuery('input[name="email"]').val());
                    jQuery(certificateForm).find('input[name="ums-tel"]').val(jQuery('input[name="tel"]').val());
                    jQuery(certificateForm).find('input[name="ums-delivery"]').val(jQuery('select[name="delivery"] option:selected').text() + ', ' + jQuery('input[name="delivery-address"]').val());
                    jQuery(certificateForm).find('form').trigger('submit');
                } else {
                    setTimeout(function () {
                        button.classList.remove('btn_is-loading');
                        button.textContent = defaultText;
                    }, 300);
                }
            });

            form.addEventListener('wpcf7mailsent', () => {
                button.textContent = processMessage;
                jQuery.ajax({
                    url: ajax.url,
                    method: 'POST',
                    data: certificatePaymentObject,
                    success: function (resp) {
                        button.textContent = transferMessage;
                        setTimeout(function () {
                            document.location.replace(JSON.parse(resp).formUrl);
                        }, 300);
                    }
                });
            });
            form.addEventListener('wpcf7invalid', () => {
                button.classList.remove('btn_is-loading');
                button.textContent = defaultText;
            });
        }
    })();

    function addErrorClass(inputElement, errorTextElement) {
        inputElement.classList.add('wpcf7-not-valid');
        errorTextElement.querySelector('.form__error-label').classList.add('form__error-label_active');
    }

    function removeErrorClass(inputElement, errorTextElement) {
        inputElement.classList.remove('wpcf7-not-valid');
        errorTextElement.querySelector('.form__error-label').classList.remove('form__error-label_active');
    }

    function detectDeviceWidth() {
        if (window.innerWidth < 992) {
            isMobile = true;
            return;
        }
        isMobile = false;
    }

    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    function changeLayout() {
        detectDeviceWidth();
        if (isMobile && !isCompleted) {
            jQuery('.about-course__title').after(jQuery('.about-course__author'));
            jQuery('.about-course__title').after(jQuery('.about-course__video'));
            jQuery('.lecturer-modal__grid').after(jQuery('.lecturer-modal__text'));
            jQuery('.lecturer-modal__img img').after(jQuery('.lecturer-modal__title'));
            jQuery('.footer-menu').after(jQuery('.google-testimonials'));
            isCompleted = true;
        } else if (!isMobile && isCompleted) {
            jQuery('.about-course .col-lg-7').append(jQuery('.about-course__video'));
            jQuery('.about-course .col-lg-7').append(jQuery('.about-course__author'));
            jQuery('.lecturer-modal__info').append(jQuery('.lecturer-modal__title'));
            jQuery('.lecturer-modal__info').append(jQuery('.lecturer-modal__text'));
            jQuery('.footer__logo').after(jQuery('.google-testimonials'));
            isCompleted = false;
        }
    }

    function sendGoogleConversion(baseURI) {
        if (baseURI.indexOf('motion')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-795851636/jzVICKfr8tMBEPT2vvsC'
            });
        }
        if (baseURI.indexOf('mobile')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-795851636/7JsCCNPR0tMBEPT2vvsC'
            });
        }
        if (baseURI.indexOf('web')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-795851636/k3eACIr30tMBEPT2vvsC'
            });
        }
        if (baseURI.indexOf('start')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-795851636/nx6iCJry0tMBEPT2vvsC'
            });
        }
        if (baseURI.indexOf('interior')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-795851636/sJ7ECMrM5NMBEPT2vvsC'
            });
        }
        if (baseURI.indexOf('oplatit-kurs')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-795851636/iE7ACKPm0tMBEPT2vvsC'
            });
        }
    }

    function getCustomerIpInfo() {
        return jQuery.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
            (resp && resp.country) ? resp.country: "";
        });
    }

    function getCookie(name) {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options = {}) {
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    }

    function showPopup() {
        const modal = jQuery('#event-modal');
        const cookieData = {
            path: '/',
            secure: true,
            'max-age': 3600
        };
        if (modal) {
            const cookie = getCookie('event');
            if (!cookie) {
                setCookie('event', 'true', cookieData);
                setTimeout(function () {
                    modal.modal({
                        fadeDuration: 300
                    });
                }, 25000);
            }
        }
    }

    function handleSelect(evt) {
        const target = evt.target;
        const targetName = target.name;
        const targetValue = target.value;

        switch (targetName) {
            case 'test-course-date':
                document.querySelector('input[name="ums-date"]').value = targetValue;
                break;
            case 'timetable':
                document.location.replace(targetValue);
                break;
            case 'delivery':
                if (+targetValue === 1) {
                    target.parentElement.nextElementSibling.classList.add('delivery-input_state-active');
                }
                if (+targetValue === 0) {
                    target.parentElement.classList.remove('form__select_state-active');
                    target.nextElementSibling.classList.remove('form__label_active');
                } else {
                    target.parentElement.nextElementSibling.classList.remove('delivery-input_state-active');
                    target.parentElement.classList.add('form__select_state-active');
                    target.nextElementSibling.classList.add('form__label_active');
                }
                break;
        }
    }

    function initInputListener() {
        const inputs = document.querySelectorAll('.form__input input, .form__input textarea');

        for (const input of inputs) {
            const wrapper = input.closest('.form__input');
            const label = wrapper.querySelector('.form__label');

            if (input.value !== '') {
                wrapper.classList.add('form__input_filled');
                if (label) {
                    label.classList.add('form__label_active');
                }
            }
            input.addEventListener('focus', () => {
                wrapper.classList.add('form__input_focused');
                wrapper.classList.add('form__input_filled');
                if (label) {
                    label.classList.add('form__label_active');
                }
            });
            input.addEventListener('blur', () => {
                if (input.value !== '') {
                    wrapper.classList.remove('form__input_focused');
                    return;
                }
                wrapper.classList.remove('form__input_filled');
                wrapper.classList.remove('form__input_focused');
                if (label) {
                    label.classList.remove('form__label_active');
                }
            });
        }
    }

    function modalOpenHandler(event) {
        const modal = event.target;
        const input = modal.querySelector('input[type="tel"]');

        if (input) {
            iti.init(input);
            iti.countryChange(input);
            const code = modal.querySelector('.iti__selected-dial-code').textContent;
            const hiddenInput = modal.querySelector('input[name="ums-country-code"]');
            if (hiddenInput) {
                hiddenInput.value = code;
            }
        }
    }

    function modalCloseHandler(event) {
        const target = event.target;
        const input = target.querySelector('input[type="tel"]');

        if (input) {
            const instance = window.intlTelInputGlobals.getInstance(input);
            instance.destroy();
        }
    }

    function videoModalCloseHandler(event) {
        const modal = event.target;
        modal.querySelector('iframe').setAttribute('src', '');
    }

    function lecturerHandlerFunction(evt) {
        const target = evt.target.closest('.lecturers-page__item');
        const id = target.dataset.lecturerPostId;
        const data = {
            action: 'team',
            id: id
        }
        const beforeSendHandler = function () {
            target.style.opacity = .3;
        }

        jQuery.when(window.utils.ajaxRequest(data, beforeSendHandler, target)).then((response) => {
            target.style.opacity = 1;
            document.querySelector('.ajax-lecturer-modal').innerHTML = '';
            document.querySelector('.ajax-lecturer-modal').insertAdjacentHTML('afterBegin', response);
            if (window.innerWidth < 992) {
                jQuery('.ajax-lecturer-modal .lecturer-modal__img img').after(jQuery('.ajax-lecturer-modal .modal__title'));
                jQuery('.ajax-lecturer-modal').append(jQuery('.ajax-lecturer-modal .lecturer-modal__text'));
            }
            jQuery('.ajax-lecturer-modal').modal();
        }, error => console.log(new Error(error)));
    }

    function addCustomEventHandler(event, collection, handlerFunction) {
        for (const el of collection) {
            el.addEventListener(event, handlerFunction);
        }
    }

    function wpcf7InvalidHandler(event) {
        const target = event.target;
        const button = target.querySelector('button[type="submit"]');

        button.textContent = defaultSubmitButtonText;
        button.classList.remove('btn_is-loading');
    }

    function wpcf7SentHandler(event) {
        const target = event.target;
        const id = +event.detail.contactFormId;
        const uri = event.target.baseURI;
        const inputs = event.detail.inputs;
        const button = target.querySelector('button[type="submit"]');
        let requestData, crmObject;
        let sendPulseData;

        switch (id) {
            case 131:
                //VK Conversion
                VK.Goal('lead');
                //Google conversion
                sendGoogleConversion(uri);
                gtag('event', 'click', {
                    'send_to': 'analytics',
                    'event_category': 'button'
                });
                //Yandex conversion
                ym(49171171, 'reachGoal', 'lead_form');
                //Send to CRM
                crmObject = new Crm(131, inputs, 'lead');
                requestData = crmObject.getRequestObject();
                jQuery.when(window.utils.ajaxRequest(requestData)).then(data => {
                    console.log(data);
                }, error => console.log(new Error(error)));
                //Close modal
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-first').modal();
                break;
            case 837:
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-first').modal();
                break;
            case 859:
                crmObject = new Crm(859, inputs, 'intensive');
                requestData = crmObject.getRequestObject();
                jQuery.when(window.utils.ajaxRequest(requestData)).then(data => {}, error => console.log(new Error(error)));
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-first').modal();
                break;
            case 1447:
                crmObject = new Crm(1447, inputs, 'free');
                requestData = crmObject.getRequestObject();
                sendPulseData = {
                    action: 'add_to_book',
                    id: 89064264,
                    email: inputs[3].value
                }
                jQuery.when(window.utils.ajaxRequest(requestData)).then(data => {}, error => console.log(new Error(error)));
                jQuery.when(window.utils.ajaxRequest(sendPulseData)).then(resp => {
                    const respObject = JSON.parse(resp);
                    if (respObject.result) {
                        //VK Conversion
                        VK.Goal('conversion');
                        //Yandex conversion
                        ym(49171171, 'reachGoal', 'freelessons');
                        //Google conversion
                        gtag('event', 'click', {
                            'send_to': 'analytics',
                            'event_category': 'freelessons'
                        });
                        target.querySelector('.form__input').classList.remove('form__input_filled');
                        target.querySelector('.form__label').classList.remove('form__label_active');
                        button.textContent = defaultSubmitButtonText;
                        button.classList.remove('btn_is-loading');
                        jQuery.modal.close();
                        jQuery('#success-modal-free-start').modal();
                    }
                }, error => console.log(new Error(error)));
                break;
            case 1655:
                sendPulseData = {
                    action: 'add_to_book',
                    id: 89064300,
                    email: inputs[1].value
                }
                jQuery.when(window.utils.ajaxRequest(sendPulseData)).then((resp) => {
                    const respObject = JSON.parse(resp);
                    if (respObject.result) {
                        target.querySelector('.form__input').classList.remove('form__input_filled');
                        target.querySelector('.form__label').classList.remove('form__label_active');
                        button.textContent = defaultSubmitButtonText;
                        button.classList.remove('btn_is-loading');
                        jQuery.modal.close();
                        jQuery('#success-modal-test').modal();
                    }
                }, error => console.log(new Error(error)));
                break;
            case 1628:
                sendPulseData = {
                    action: 'add_to_book',
                    id: 89086955,
                    email: inputs[0].value
                }
                jQuery.when(window.utils.ajaxRequest(sendPulseData)).then((resp) => {
                    const respObject = JSON.parse(resp);
                    if (respObject.result) {
                        //VK Conversion
                        VK.Goal('subscribe');
                        //Google conversion
                        gtag('event', 'click', {
                            'send_to': 'analytics',
                            'event_category': 'emailbutton'
                        });
                        //Yandex conversion
                        ym(49171171, 'reachGoal', 'emailsub');
                        target.querySelector('.form__input').classList.remove('form__input_filled');
                        target.querySelector('.form__label').classList.remove('form__label_active');
                        button.textContent = defaultSubmitButtonText;
                        button.classList.remove('btn_is-loading');
                        jQuery('#success-modal-third').modal();
                    }
                }, error => console.log(new Error(error)));
                break;
            case 779:
                //VK conversion
                VK.Goal('contact');
                crmObject = new Crm(779, inputs, 'call');
                requestData = crmObject.getRequestObject();
                jQuery.when(window.utils.ajaxRequest(requestData)).then(data => {}, error => console.log(new Error(error)));
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-second').modal();
                break;
            case 1839:
                crmObject = new Crm(1839, inputs, 'intensive');
                requestData = crmObject.getRequestObject();
                jQuery.when(window.utils.ajaxRequest(requestData)).then(data => {}, error => console.log(new Error(error)));
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-first').modal();
                break;
            case 1805:
                button.textContent = defaultSubmitButtonText;
                button.classList.remove('btn_is-loading');
                jQuery.modal.close();
                jQuery('#success-modal-second').modal();
                break;
        }
    }

    function pageNavigationLinkHandler(event) {
        const target = event.target;
        const activeClass = 'page-navigation__link_state-active';

        window.utils.removeClass(navigationLinksCollection, activeClass);
        target.classList.add(activeClass);
    }

    function paymentInputsHandler(event) {
        const target = event.target;
        const targetName = target.name;

        if (targetName === 'total' || targetName === 'wsb_total') {
            const saleInput = target.closest('.form').querySelector('input[name="sale"]');
            if (saleInput) {
                saleInput.checked = false;
            }
            paymentInstance.setTotalPrice(target.value);
            paymentInstance.changeCurenciesPrice(paymentMethodInstance.getMethodIndex());
        }
    }

    function initItiPlugin() {
        const telInputs = document.querySelectorAll('input[type="tel"]');

        for (const input of telInputs) {
            if (!input.closest('.modal')) {
                iti.init(input);
                iti.countryChange(input);
            }
        }
    }

    function initSwiper(className, options) {
        const domEl = document.querySelector(className);

        if (domEl) {
            return new Swiper(domEl, options);
        }
    }
});