/**
 * Build styles
 */
require('./index.css').toString();

const isDevelopment = process.env.NODE_ENV === 'development';

const QUOTE_SETTINGS = {
  NO_CAPTION: 'NO_CAPTION',
  WITH_CAPTION: 'WITH_CAPTION',
  WITH_CAPTION_TEMPLATE: 'WITH_CAPTION_TEMPLATE',
}

if (isDevelopment) {
  console.log('@editorjs/quote fork');
}

/**
 * @class Quote
 * @classdesc Quote Tool for Editor.js
 * @property {QuoteData} data - Tool`s input and output data
 * @propert {object} api - Editor.js API instance
 *
 * @typedef {object} QuoteData
 * @description Quote Tool`s input and output data
 * @property {string} text - quote`s text
 * @property {string} caption - quote`s caption
 * @property {'center'|'left'} alignment - quote`s alignment
 *
 * @typedef {object} QuoteConfig
 * @description Quote Tool`s initial configuration
 * @property {string} quotePlaceholder - placeholder to show in quote`s text input
 * @property {string} captionPlaceholder - placeholder to show in quote`s caption input
 * @property {QUOTE_SETTINGS} defaultAlignment - alignment to use as default
 */
class Quote {
  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: '<svg width="15" height="14" viewBox="0 0 15 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.53 6.185l.027.025a1.109 1.109 0 0 1 0 1.568l-5.644 5.644a1.109 1.109 0 1 1-1.569-1.568l4.838-4.837L6.396 2.23A1.125 1.125 0 1 1 7.986.64l5.52 5.518.025.027zm-5.815 0l.026.025a1.109 1.109 0 0 1 0 1.568l-5.644 5.644a1.109 1.109 0 1 1-1.568-1.568l4.837-4.837L.58 2.23A1.125 1.125 0 0 1 2.171.64L7.69 6.158l.025.027z" /></svg>',
      title: 'Quote',
    };
  }

  /**
   * Empty Quote is not empty Block
   *
   * @public
   * @returns {boolean}
   */
  static get contentless() {
    return true;
  }

  /**
   * Allow to press Enter inside the Quote
   *
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Default placeholder for quote text
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_QUOTE_PLACEHOLDER() {
    return 'Enter a quote';
  }

  /**
   * Default placeholder for quote caption
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_CAPTION_PLACEHOLDER() {
    return 'Enter a caption';
  }

  /**
   * Allowed quote options
   *
   * @public
   * @returns {{noCaption: string, hasCaption: string, hasCaptions: string}}
   */
  static get CAPTIONS() {
    return QUOTE_SETTINGS;
  }

  /**
   * Default quote alignment
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_CAPTIONS() {
    return Quote.CAPTIONS['with_caption_template'];
  }

  /**
   * Allow Quote to be converted to/from other blocks
   */
  static get conversionConfig() {
    return {
      /**
       * To create Quote data from string, simple fill 'text' property
       */
      import: 'text',
      /**
       * To create string from Quote data, concatenate text and caption
       *
       * @param {QuoteData} quoteData
       * @returns {string}
       */
      export: function (quoteData) {
        return quoteData.captionLeft ? `${quoteData.text} — ${quoteData.captionLeft} — ${quoteData.captionRight}` : quoteData.text;
      },
    };
  }

  /**
   * Tool`s styles
   *
   * @returns {{baseClass: string, wrapper: string, quote: string, input: string, caption: string, settingsButton: string, settingsButtonActive: string}}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: 'cdx-quote',
      captionWrapper: 'cdx-quote__caption-wrapper',
      text: 'cdx-quote__text',
      input: this.api.styles.input,
      captionLeft: 'cdx-quote__caption--left',
      captionRight: 'cdx-quote__caption--right',
      captionImage: 'cdx-quote__caption--image',
      imageQuote: 'cdx-quote__image--quote',
      imageQuoteIndent: 'cdx-quote__image--quote--indent',
      paddingClassWithUrl: 'cdx-quote__padding--with-url',
      paddingClassWithourUrl: 'cdx-quote__padding--without-url',
      settingsWrapper: 'cdx-quote-settings',
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive,
      [QUOTE_SETTINGS.NO_CAPTION]: 'cdx-quote--no-caption',
      [QUOTE_SETTINGS.WITH_CAPTION]: 'cdx-quote--has-caption',
      [QUOTE_SETTINGS.WITH_CAPTION_TEMPLATE]: 'cdx-quote--has-captions',
    };
  }

  /**
   * Tool`s settings properties
   *
   * @returns {*[]}
   */
  get settings() {
    return [
      {
        name: QUOTE_SETTINGS.NO_CAPTION,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/></svg>`,
      },
      {
        name: QUOTE_SETTINGS.WITH_CAPTION,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z"/></svg>`,
      },
      {
        name: QUOTE_SETTINGS.WITH_CAPTION_TEMPLATE,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="24" height="24" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M3 5v14h19V5H3m2 2h15v4H5V7m0 10v-4h4v4H5m6 0v-4h9v4h-9z"/></svg>`,
      },
    ];
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {{data: QuoteData, config: QuoteConfig, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   *   readOnly - read-only mode flag
   */
  constructor({data, config, api, readOnly}) {
    const {CAPTIONS, DEFAULT_CAPTIONS} = Quote;

    this.api = api;
    this.readOnly = readOnly;

    this.quotePlaceholder = config.quotePlaceholder || Quote.DEFAULT_QUOTE_PLACEHOLDER;
    this.captionPlaceholder = config.captionPlaceholder || Quote.DEFAULT_CAPTION_PLACEHOLDER;

    this.data = {
      text: data.text || '',
      captionLeft: data.captionLeft || '',
      captionRight: data.captionRight || '',
      imageUrl: data.imageUrl || null,
      noQuoteIcon: data.noQuoteIcon || false,
      captionView: Object.values(CAPTIONS).includes(data.captionView) && data.captionView ||
        DEFAULT_CAPTIONS,
    };
  }

  /**
   * Create Quote Tool container with inputs
   *
   * @returns {Element}
   */
  render() {
    const container = this._make('blockquote', [
      this.CSS.baseClass,
      this.CSS.wrapper,
      this.CSS[QUOTE_SETTINGS[this.data.captionView]]
    ]);

    const quoteMainClasses = [this.CSS.input, this.CSS.text];
    if(!this.data.noQuoteIcon) {
      quoteMainClasses.push(this.CSS.imageQuoteIndent)
    }

    console.log(this.data.imageUrl);
    const url = this.data.imageUrl;
    const paddingClass = !!url ? this.CSS.paddingClassWithUrl : this.CSS.paddingClassWithourUrl;
    quoteMainClasses.push(paddingClass)
    const quote = this._make('div', quoteMainClasses, {
      contentEditable: !this.readOnly,
      innerHTML: this.data.text,
      style: {
        'padding-right': !!url ? '76px' : '12px'
      }
    });
    const captionWrapper = this._make('div', [this.CSS.baseClass, this.CSS.captionWrapper]);
    const captionLeft = this._make('div', [this.CSS.input, this.CSS.captionLeft], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.captionLeft,
    });
    const captionRight = this._make('div', [this.CSS.input, this.CSS.captionRight], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.captionRight,
    });
    const captionImage = this._make('img', [this.CSS.captionImage], {
      contentEditable: false,
      src: this.data.imageUrl,
    });

    captionImage.addEventListener('error', function () {
      this.style.display='none'
    });

    const imageQuote = this._make('div', [this.CSS.imageQuote], {
      contentEditable: false,
    });

    quote.dataset.placeholder = this.quotePlaceholder;
    captionLeft.dataset.placeholder = this.captionPlaceholder;
    captionRight.dataset.placeholder = this.captionPlaceholder;

    container.appendChild(quote);
    if(!this.data.noQuoteIcon) {
      container.appendChild(imageQuote);
    }
    if(this.data.imageUrl) {
      container.appendChild(captionImage);
    }
    captionWrapper.appendChild(captionLeft);
    captionWrapper.appendChild(captionRight);
    container.appendChild(captionWrapper);

    this._container = container;

    return container;
  }

  /**
   * Extract Quote data from Quote Tool element
   *
   * @param {HTMLDivElement} quoteElement - element to save
   * @returns {QuoteData}
   */
  save(quoteElement) {
    const text = quoteElement.querySelector(`.${this.CSS.text}`);
    const captionLeft = quoteElement.querySelector(`.${this.CSS.captionLeft}`);
    const captionRight = quoteElement.querySelector(`.${this.CSS.captionRight}`);
    const captionImage = quoteElement.querySelector(`.${this.CSS.captionImage}`);

    return Object.assign(this.data, {
      text: text.innerHTML,
      captionLeft: captionLeft.innerHTML,
      captionRight: captionRight.innerHTML,
      imageUrl: captionImage ? captionImage.getAttribute('src') : null,
    });
  }

  /**
   * Sanitizer rules
   */
  static get sanitize() {
    return {
      text: {
        br: true,
      },
      captionLeft: {
        br: true,
      },
      captionRight: {
        br: true,
      },
      captionView: {},
    };
  }

  /**
   * Create wrapper for Tool`s settings buttons:
   * 1. Left alignment
   * 2. Center alignment
   *
   * @returns {HTMLDivElement}
   */
  renderSettings() {
    const wrapper = this._make('div', [this.CSS.settingsWrapper], {});
    const capitalize = str => str[0].toUpperCase() + str.substr(1);

    this.settings
      .map(tune => {
        const el = this._make('div', this.CSS.settingsButton, {
          innerHTML: tune.icon,
          title: capitalize(tune.name.toLowerCase()).replace(/(_)/g, ' '),
        });

        el.classList.toggle(this.CSS.settingsButtonActive, tune.name === this.data.captionView);

        wrapper.appendChild(el);

        return el;
      })
      .forEach((element, index, elements) => {
        element.addEventListener('click', () => {
          this._toggleTune(this.settings[index].name);

          elements.forEach((el, i) => {
            const {name} = this.settings[i];

            el.classList.toggle(this.CSS.settingsButtonActive, name === this.data.captionView);
          });
        });
      });

    return wrapper;
  };

  /**
   * Toggle quote`s alignment
   *
   * @param {string} tune - alignment
   * @private
   */
  _toggleTune(tune) {
    this.data.captionView = tune;

    if (!Object.values(QUOTE_SETTINGS).includes(tune)) return;

    const captionClasses = [
      this.CSS[QUOTE_SETTINGS.NO_CAPTION],
      this.CSS[QUOTE_SETTINGS.WITH_CAPTION],
      this.CSS[QUOTE_SETTINGS.WITH_CAPTION_TEMPLATE],
    ]
    this._container.classList.remove(...captionClasses);
    this._container.classList.add(this.CSS[tune]);
  }

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {Array|string} classNames  - list or name of CSS classname(s)
   * @param  {object} attributes        - any attributes
   * @returns {Element}
   */
  _make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }
}

module.exports = Quote;
