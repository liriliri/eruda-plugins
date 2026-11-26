const map = require('licia/map')
const modernizr = require('./modernizr')

let featureList = require('../script/featureList.json')

let featureNames = featureList['feature-detects'],
  specialNames = featureList['special-names']

module.exports = function (eruda) {
  let { evalCss } = eruda.util

  class Features extends eruda.Tool {
    constructor() {
      super()
      this.name = 'features'
      this._style = evalCss(require('./style.scss'))

      this._features = {}
      this._isInit = false
    }
    show() {
      super.show()

      if (!this._isInit) this._initFeatures()
    }
    hide() {
      super.hide()
    }
    destroy() {
      super.destroy()
      evalCss.remove(this._style)
    }
    _initFeatures() {
      this._isInit = true

      modernizr.testRunner()

      let i = 0,
        featureNum = featureNames.length

      featureNames.forEach((feature) => {
        if (specialNames[feature]) feature = specialNames[feature]
        feature = feature.replace(/\//g, '')

        modernizr.on(feature, (result) => {
          this._features[feature] = result
          i++
          if (i === featureNum) this._render()
        })
      })
    }
    _render() {
      const features = map(this._features, (feature, key) => {
        const ok = feature ? 'eruda-ok' : ''

        return `<li>
          <a href="http://caniuse.com/#search=${key}" target="_blank" class="eruda-inner-wrapper ${ok}">
            ${key}
          </a>
        </li>`
      }).join('')
      const html = `<ul>${features}</ul>`
      this._$el.html(html)
    }
  }

  return new Features()
}
