module.exports = function (eruda) {
  const { evalCss } = eruda.util

  class Orientation extends eruda.Tool {
    constructor() {
      super()
      this.name = 'orientation'
      this._style = evalCss(require('./style.scss'))
      this._isShow = false
    }
    init($el, container) {
      super.init($el, container)

      const isSupported =
        window.DeviceOrientationEvent && window.DeviceMotionEvent

      if (!isSupported) {
        $el.html(
          '<div class="eruda-not-supported">Not supported for this browser!</div>',
        )

        return
      }

      $el.html(
        [
          '<div class="eruda-cube">',
          '  <div class="eruda-face eruda-one">1</div>',
          '  <div class="eruda-face eruda-two">2</div>',
          '  <div class="eruda-face eruda-three">3</div>',
          '  <div class="eruda-face eruda-four">4</div>',
          '  <div class="eruda-face eruda-five">5</div>',
          '  <div class="eruda-face eruda-six">6</div>',
          '</div>',
          '<div class="eruda-orientation-data">',
          '  <div class="eruda-content">',
          '    <table>',
          '      <tbody>',
          '        <tr>',
          '          <td class="eruda-key">coordinates</td>',
          '          <td class="eruda-coordinates">unknown</td>',
          '        </tr>',
          '        <tr>',
          '          <td class="eruda-key">acceleration</td>',
          '          <td class="eruda-acceleration">unknown</td>',
          '        </tr>',
          '        <tr>',
          '          <td class="eruda-key">acceleration including gravity</td>',
          '          <td class="eruda-acceleration-including-gravity">unknown</td>',
          '        </tr>',
          '        <tr>',
          '          <td class="eruda-key">rotation rate</td>',
          '          <td class="eruda-rotation-rate">unknown</td>',
          '        </tr>',
          '        <tr>',
          '          <td class="eruda-key">interval</td>',
          '          <td class="eruda-interval">unknown</td>',
          '        </tr>',
          '      </tbody>',
          '    </table>',
          '  </div>',
          '</div>',
        ].join(''),
      )

      this._$cube = this._$el.find('.eruda-cube')
      this._$coordinates = this._$el.find('.eruda-coordinates')
      this._$acceleration = this._$el.find('.eruda-acceleration')
      this._$accGravity = this._$el.find(
        '.eruda-acceleration-including-gravity',
      )
      this._$rotationRate = this._$el.find('.eruda-rotation-rate')
      this._$interval = this._$el.find('.eruda-interval')

      this._bindEvent()
    }
    show() {
      super.show()

      this._isShow = true
    }
    hide() {
      super.hide()

      this._isShow = false
    }
    destroy() {
      super.destroy()

      evalCss.remove(this._style)
      window.removeEventListener('deviceorientation', this._onDeviceorientation)
      window.removeEventListener('devicemotion', this._onDevicemotion)
    }
    _bindEvent() {
      const self = this

      this._onDeviceorientation = function (e) {
        if (!self._isShow) return

        self._$cube.css(
          'transform',
          'rotateX(' +
            e.beta +
            'deg) ' +
            'rotateY(' +
            e.gamma +
            'deg) ' +
            'rotateZ(' +
            e.alpha +
            'deg)',
        )

        self._$coordinates.text(
          '(' +
            Math.round(e.beta) +
            ', ' +
            Math.round(e.gamma) +
            ', ' +
            Math.round(e.alpha) +
            ')',
        )
      }

      this._onDevicemotion = function (e) {
        if (!self._isShow) return

        const acceleration = e.acceleration
        self._$acceleration.html(
          '(' +
            Math.round(acceleration.x) +
            ', ' +
            Math.round(acceleration.y) +
            ', ' +
            Math.round(acceleration.z) +
            ') m/s<sup>2</sup>',
        )

        const accGravity = e.accelerationIncludingGravity
        self._$accGravity.html(
          '(' +
            Math.round(accGravity.x) +
            ', ' +
            Math.round(accGravity.y) +
            ', ' +
            Math.round(accGravity.z) +
            ') m/s<sup>2</sup>',
        )

        const rotationRate = e.rotationRate
        self._$rotationRate.text(
          '(' +
            Math.round(rotationRate.beta) +
            ', ' +
            Math.round(rotationRate.gamma) +
            ', ' +
            Math.round(rotationRate.alpha) +
            ')',
        )

        self._$interval.text(e.interval + 'ms')
      }

      const bind = function (type) {
        let Event = DeviceOrientationEvent
        let eventName = 'deviceorientation'
        let listener = self._onDeviceorientation

        if (type === 'motion') {
          Event = DeviceMotionEvent
          eventName = 'devicemotion'
          listener = self._onDevicemotion
        }

        function requestPermission() {
          Event.requestPermission().then(function (response) {
            if (response === 'granted') {
              self._$cube.off('click', requestPermission)
            }
          })
        }

        if (Event.requestPermission) {
          self._$cube.on('click', requestPermission)
        }

        window.addEventListener(eventName, listener)
      }

      bind('orientation')
      bind('motion')
    }
  }

  return new Orientation()
}
