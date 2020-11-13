$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            var _value = isNaN(parseInt(this.value)) ? this.value : parseInt(this.value);
            if(_value.toString().length != this.value)
                _value = this.value;
            o[this.name].push(_value || '');
        } else {
            var _value = isNaN(parseInt(this.value)) ? this.value : parseInt(this.value);
            if(_value.toString().length != this.value)
                _value = this.value;
            o[this.name] = _value || $("input[name='"+this.name+"']").attr("placeholder") ||'';
        }
    });
    return o;
};

$.fn.serializeArrayObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            var _value = isNaN(parseInt(this.value)) ? this.value : parseInt(this.value);
            if(_value.toString().length != this.value)
                _value = this.value;
            o[this.name].push(_value || '');
        } else {
            var _value = isNaN(parseInt(this.value)) ? this.value : parseInt(this.value);
            if(_value.toString().length != this.value)
                _value = this.value;
//            if($("input[name='"+this.name+"']").attr("type") == "checkbox")
                var _newValue = new Array();
            _newValue.push(_value);
            o[this.name] = _value || $("input[name='"+this.name+"']").attr("placeholder") ||'';
        }
    });
    return o;
};
/*
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

//! moment.js
//! version : 2.10.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Dc.apply(null,arguments)}function b(a){Dc=a}function c(a){return"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return za(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(0/0);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=j(b)),"undefined"!=typeof b._locale&&(a._locale=b._locale),Fc.length>0)for(c in Fc)d=Fc[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function n(b){m(this,b),this._d=new Date(+b._d),Gc===!1&&(Gc=!0,a.updateOffset(this),Gc=!1)}function o(a){return a instanceof n||null!=a&&null!=a._isAMomentObject}function p(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function q(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&p(a[d])!==p(b[d]))&&g++;return g+f}function r(){}function s(a){return a?a.toLowerCase().replace("_","-"):a}function t(a){for(var b,c,d,e,f=0;f<a.length;){for(e=s(a[f]).split("-"),b=e.length,c=s(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=u(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&q(e,c,!0)>=b-1)break;b--}f++}return null}function u(a){var b=null;if(!Hc[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=Ec._abbr,require("./locale/"+a),v(b)}catch(c){}return Hc[a]}function v(a,b){var c;return a&&(c="undefined"==typeof b?x(a):w(a,b),c&&(Ec=c)),Ec._abbr}function w(a,b){return null!==b?(b.abbr=a,Hc[a]||(Hc[a]=new r),Hc[a].set(b),v(a),Hc[a]):(delete Hc[a],null)}function x(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return Ec;if(!c(a)){if(b=u(a))return b;a=[a]}return t(a)}function y(a,b){var c=a.toLowerCase();Ic[c]=Ic[c+"s"]=Ic[b]=a}function z(a){return"string"==typeof a?Ic[a]||Ic[a.toLowerCase()]:void 0}function A(a){var b,c,d={};for(c in a)f(a,c)&&(b=z(c),b&&(d[b]=a[c]));return d}function B(b,c){return function(d){return null!=d?(D(this,b,d),a.updateOffset(this,c),this):C(this,b)}}function C(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function D(a,b,c){return a._d["set"+(a._isUTC?"UTC":"")+b](c)}function E(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=z(a),"function"==typeof this[a])return this[a](b);return this}function F(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function G(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Mc[a]=e),b&&(Mc[b[0]]=function(){return F(e.apply(this,arguments),b[1],b[2])}),c&&(Mc[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function H(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function I(a){var b,c,d=a.match(Jc);for(b=0,c=d.length;c>b;b++)Mc[d[b]]?d[b]=Mc[d[b]]:d[b]=H(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function J(a,b){return a.isValid()?(b=K(b,a.localeData()),Lc[b]||(Lc[b]=I(b)),Lc[b](a)):a.localeData().invalidDate()}function K(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Kc.lastIndex=0;d>=0&&Kc.test(a);)a=a.replace(Kc,c),Kc.lastIndex=0,d-=1;return a}function L(a,b,c){_c[a]="function"==typeof b?b:function(a){return a&&c?c:b}}function M(a,b){return f(_c,a)?_c[a](b._strict,b._locale):new RegExp(N(a))}function N(a){return a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function O(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=p(a)}),c=0;c<a.length;c++)ad[a[c]]=d}function P(a,b){O(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function Q(a,b,c){null!=b&&f(ad,a)&&ad[a](b,c._a,c,a)}function R(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function S(a){return this._months[a.month()]}function T(a){return this._monthsShort[a.month()]}function U(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function V(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),R(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function W(b){return null!=b?(V(this,b),a.updateOffset(this,!0),this):C(this,"Month")}function X(){return R(this.year(),this.month())}function Y(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[cd]<0||c[cd]>11?cd:c[dd]<1||c[dd]>R(c[bd],c[cd])?dd:c[ed]<0||c[ed]>24||24===c[ed]&&(0!==c[fd]||0!==c[gd]||0!==c[hd])?ed:c[fd]<0||c[fd]>59?fd:c[gd]<0||c[gd]>59?gd:c[hd]<0||c[hd]>999?hd:-1,j(a)._overflowDayOfYear&&(bd>b||b>dd)&&(b=dd),j(a).overflow=b),a}function Z(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function $(a,b){var c=!0,d=a+"\n"+(new Error).stack;return g(function(){return c&&(Z(d),c=!1),b.apply(this,arguments)},b)}function _(a,b){kd[a]||(Z(b),kd[a]=!0)}function aa(a){var b,c,d=a._i,e=ld.exec(d);if(e){for(j(a).iso=!0,b=0,c=md.length;c>b;b++)if(md[b][1].exec(d)){a._f=md[b][0]+(e[6]||" ");break}for(b=0,c=nd.length;c>b;b++)if(nd[b][1].exec(d)){a._f+=nd[b][0];break}d.match(Yc)&&(a._f+="Z"),ta(a)}else a._isValid=!1}function ba(b){var c=od.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(aa(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function ca(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function da(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function ea(a){return fa(a)?366:365}function fa(a){return a%4===0&&a%100!==0||a%400===0}function ga(){return fa(this.year())}function ha(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=Aa(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function ia(a){return ha(a,this._week.dow,this._week.doy).week}function ja(){return this._week.dow}function ka(){return this._week.doy}function la(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function ma(a){var b=ha(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function na(a,b,c,d,e){var f,g,h=da(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:ea(a-1)+g}}function oa(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function pa(a,b,c){return null!=a?a:null!=b?b:c}function qa(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function ra(a){var b,c,d,e,f=[];if(!a._d){for(d=qa(a),a._w&&null==a._a[dd]&&null==a._a[cd]&&sa(a),a._dayOfYear&&(e=pa(a._a[bd],d[bd]),a._dayOfYear>ea(e)&&(j(a)._overflowDayOfYear=!0),c=da(e,0,a._dayOfYear),a._a[cd]=c.getUTCMonth(),a._a[dd]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[ed]&&0===a._a[fd]&&0===a._a[gd]&&0===a._a[hd]&&(a._nextDay=!0,a._a[ed]=0),a._d=(a._useUTC?da:ca).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[ed]=24)}}function sa(a){var b,c,d,e,f,g,h;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=pa(b.GG,a._a[bd],ha(Aa(),1,4).year),d=pa(b.W,1),e=pa(b.E,1)):(f=a._locale._week.dow,g=a._locale._week.doy,c=pa(b.gg,a._a[bd],ha(Aa(),f,g).year),d=pa(b.w,1),null!=b.d?(e=b.d,f>e&&++d):e=null!=b.e?b.e+f:f),h=na(c,d,e,g,f),a._a[bd]=h.year,a._dayOfYear=h.dayOfYear}function ta(b){if(b._f===a.ISO_8601)return void aa(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=K(b._f,b._locale).match(Jc)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(M(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),Mc[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),Q(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[ed]<=12&&b._a[ed]>0&&(j(b).bigHour=void 0),b._a[ed]=ua(b._locale,b._a[ed],b._meridiem),ra(b),Y(b)}function ua(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function va(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(0/0));for(e=0;e<a._f.length;e++)f=0,b=m({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],ta(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function wa(a){if(!a._d){var b=A(a._i);a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],ra(a)}}function xa(a){var b,e=a._i,f=a._f;return a._locale=a._locale||x(a._l),null===e||void 0===f&&""===e?l({nullInput:!0}):("string"==typeof e&&(a._i=e=a._locale.preparse(e)),o(e)?new n(Y(e)):(c(f)?va(a):f?ta(a):d(e)?a._d=e:ya(a),b=new n(Y(a)),b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b))}function ya(b){var f=b._i;void 0===f?b._d=new Date:d(f)?b._d=new Date(+f):"string"==typeof f?ba(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),ra(b)):"object"==typeof f?wa(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function za(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,xa(f)}function Aa(a,b,c,d){return za(a,b,c,d,!1)}function Ba(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Aa();for(d=b[0],e=1;e<b.length;++e)b[e][a](d)&&(d=b[e]);return d}function Ca(){var a=[].slice.call(arguments,0);return Ba("isBefore",a)}function Da(){var a=[].slice.call(arguments,0);return Ba("isAfter",a)}function Ea(a){var b=A(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=x(),this._bubble()}function Fa(a){return a instanceof Ea}function Ga(a,b){G(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+F(~~(a/60),2)+b+F(~~a%60,2)})}function Ha(a){var b=(a||"").match(Yc)||[],c=b[b.length-1]||[],d=(c+"").match(td)||["-",0,0],e=+(60*d[1])+p(d[2]);return"+"===d[0]?e:-e}function Ia(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(o(b)||d(b)?+b:+Aa(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Aa(b).local();return c._isUTC?Aa(b).zone(c._offset||0):Aa(b).local()}function Ja(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ka(b,c){var d,e=this._offset||0;return null!=b?("string"==typeof b&&(b=Ha(b)),Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ja(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?$a(this,Va(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ja(this)}function La(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Ma(a){return this.utcOffset(0,a)}function Na(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ja(this),"m")),this}function Oa(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ha(this._i)),this}function Pa(a){return a=a?Aa(a).utcOffset():0,(this.utcOffset()-a)%60===0}function Qa(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ra(){if(this._a){var a=this._isUTC?h(this._a):Aa(this._a);return this.isValid()&&q(this._a,a.toArray())>0}return!1}function Sa(){return!this._isUTC}function Ta(){return this._isUTC}function Ua(){return this._isUTC&&0===this._offset}function Va(a,b){var c,d,e,g=a,h=null;return Fa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=ud.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:p(h[dd])*c,h:p(h[ed])*c,m:p(h[fd])*c,s:p(h[gd])*c,ms:p(h[hd])*c}):(h=vd.exec(a))?(c="-"===h[1]?-1:1,g={y:Wa(h[2],c),M:Wa(h[3],c),d:Wa(h[4],c),h:Wa(h[5],c),m:Wa(h[6],c),s:Wa(h[7],c),w:Wa(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=Ya(Aa(g.from),Aa(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Ea(g),Fa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function Wa(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function Xa(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Ya(a,b){var c;return b=Ia(b,a),a.isBefore(b)?c=Xa(a,b):(c=Xa(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function Za(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(_(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Va(c,d),$a(this,e,a),this}}function $a(b,c,d,e){var f=c._milliseconds,g=c._days,h=c._months;e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&D(b,"Date",C(b,"Date")+g*d),h&&V(b,C(b,"Month")+h*d),e&&a.updateOffset(b,g||h)}function _a(a){var b=a||Aa(),c=Ia(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this,Aa(b)))}function ab(){return new n(this)}function bb(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=o(a)?a:Aa(a),+this>+a):(c=o(a)?+a:+Aa(a),c<+this.clone().startOf(b))}function cb(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=o(a)?a:Aa(a),+a>+this):(c=o(a)?+a:+Aa(a),+this.clone().endOf(b)<c)}function db(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function eb(a,b){var c;return b=z(b||"millisecond"),"millisecond"===b?(a=o(a)?a:Aa(a),+this===+a):(c=+Aa(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))}function fb(a){return 0>a?Math.ceil(a):Math.floor(a)}function gb(a,b,c){var d,e,f=Ia(a,this),g=6e4*(f.utcOffset()-this.utcOffset());return b=z(b),"year"===b||"month"===b||"quarter"===b?(e=hb(this,f),"quarter"===b?e/=3:"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:fb(e)}function hb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function ib(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function jb(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():J(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):J(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function kb(b){var c=J(this,b||a.defaultFormat);return this.localeData().postformat(c)}function lb(a,b){return this.isValid()?Va({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function mb(a){return this.from(Aa(),a)}function nb(a,b){return this.isValid()?Va({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function ob(a){return this.to(Aa(),a)}function pb(a){var b;return void 0===a?this._locale._abbr:(b=x(a),null!=b&&(this._locale=b),this)}function qb(){return this._locale}function rb(a){switch(a=z(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function sb(a){return a=z(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function tb(){return+this._d-6e4*(this._offset||0)}function ub(){return Math.floor(+this/1e3)}function vb(){return this._offset?new Date(+this):this._d}function wb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function xb(){return k(this)}function yb(){return g({},j(this))}function zb(){return j(this).overflow}function Ab(a,b){G(0,[a,a.length],0,b)}function Bb(a,b,c){return ha(Aa([a,11,31+b-c]),b,c).week}function Cb(a){var b=ha(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")}function Db(a){var b=ha(this,1,4).year;return null==a?b:this.add(a-b,"y")}function Eb(){return Bb(this.year(),1,4)}function Fb(){var a=this.localeData()._week;return Bb(this.year(),a.dow,a.doy)}function Gb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Hb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function Ib(a){return this._weekdays[a.day()]}function Jb(a){return this._weekdaysShort[a.day()]}function Kb(a){return this._weekdaysMin[a.day()]}function Lb(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=Aa([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b}function Mb(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Hb(a,this.localeData()),this.add(a-b,"d")):b}function Nb(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Ob(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)}function Pb(a,b){G(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function Qb(a,b){return b._meridiemParse}function Rb(a){return"p"===(a+"").toLowerCase().charAt(0)}function Sb(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Tb(a){G(0,[a,3],0,"millisecond")}function Ub(){return this._isUTC?"UTC":""}function Vb(){return this._isUTC?"Coordinated Universal Time":""}function Wb(a){return Aa(1e3*a)}function Xb(){return Aa.apply(null,arguments).parseZone()}function Yb(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.call(b,c):d}function Zb(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b}function $b(){return this._invalidDate}function _b(a){return this._ordinal.replace("%d",a)}function ac(a){return a}function bc(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)}function cc(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)}function dc(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function ec(a,b,c,d){var e=x(),f=h().set(d,b);return e[c](f,a)}function fc(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return ec(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=ec(a,f,c,e);return g}function gc(a,b){return fc(a,b,"months",12,"month")}function hc(a,b){return fc(a,b,"monthsShort",12,"month")}function ic(a,b){return fc(a,b,"weekdays",7,"day")}function jc(a,b){return fc(a,b,"weekdaysShort",7,"day")}function kc(a,b){return fc(a,b,"weekdaysMin",7,"day")}function lc(){var a=this._data;return this._milliseconds=Rd(this._milliseconds),this._days=Rd(this._days),this._months=Rd(this._months),a.milliseconds=Rd(a.milliseconds),a.seconds=Rd(a.seconds),a.minutes=Rd(a.minutes),a.hours=Rd(a.hours),a.months=Rd(a.months),a.years=Rd(a.years),this}function mc(a,b,c,d){var e=Va(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function nc(a,b){return mc(this,a,b,1)}function oc(a,b){return mc(this,a,b,-1)}function pc(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;return g.milliseconds=d%1e3,a=fb(d/1e3),g.seconds=a%60,b=fb(a/60),g.minutes=b%60,c=fb(b/60),g.hours=c%24,e+=fb(c/24),h=fb(qc(e)),e-=fb(rc(h)),f+=fb(e/30),e%=30,h+=fb(f/12),f%=12,g.days=e,g.months=f,g.years=h,this}function qc(a){return 400*a/146097}function rc(a){return 146097*a/400}function sc(a){var b,c,d=this._milliseconds;if(a=z(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+12*qc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(rc(this._months/12)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function tc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*p(this._months/12)}function uc(a){return function(){return this.as(a)}}function vc(a){return a=z(a),this[a+"s"]()}function wc(a){return function(){return this._data[a]}}function xc(){return fb(this.days()/7)}function yc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function zc(a,b,c){var d=Va(a).abs(),e=fe(d.as("s")),f=fe(d.as("m")),g=fe(d.as("h")),h=fe(d.as("d")),i=fe(d.as("M")),j=fe(d.as("y")),k=e<ge.s&&["s",e]||1===f&&["m"]||f<ge.m&&["mm",f]||1===g&&["h"]||g<ge.h&&["hh",g]||1===h&&["d"]||h<ge.d&&["dd",h]||1===i&&["M"]||i<ge.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,yc.apply(null,k)}function Ac(a,b){return void 0===ge[a]?!1:void 0===b?ge[a]:(ge[a]=b,!0)}function Bc(a){var b=this.localeData(),c=zc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Cc(){var a=he(this.years()),b=he(this.months()),c=he(this.days()),d=he(this.hours()),e=he(this.minutes()),f=he(this.seconds()+this.milliseconds()/1e3),g=this.asSeconds();return g?(0>g?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}var Dc,Ec,Fc=a.momentProperties=[],Gc=!1,Hc={},Ic={},Jc=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,Kc=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Lc={},Mc={},Nc=/\d/,Oc=/\d\d/,Pc=/\d{3}/,Qc=/\d{4}/,Rc=/[+-]?\d{6}/,Sc=/\d\d?/,Tc=/\d{1,3}/,Uc=/\d{1,4}/,Vc=/[+-]?\d{1,6}/,Wc=/\d+/,Xc=/[+-]?\d+/,Yc=/Z|[+-]\d\d:?\d\d/gi,Zc=/[+-]?\d+(\.\d{1,3})?/,$c=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,_c={},ad={},bd=0,cd=1,dd=2,ed=3,fd=4,gd=5,hd=6;G("M",["MM",2],"Mo",function(){return this.month()+1}),G("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),G("MMMM",0,0,function(a){return this.localeData().months(this,a)}),y("month","M"),L("M",Sc),L("MM",Sc,Oc),L("MMM",$c),L("MMMM",$c),O(["M","MM"],function(a,b){b[cd]=p(a)-1}),O(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[cd]=e:j(c).invalidMonth=a});var id="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),jd="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),kd={};a.suppressDeprecationWarnings=!1;var ld=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,md=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],nd=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],od=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=$("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),G(0,["YY",2],0,function(){return this.year()%100}),G(0,["YYYY",4],0,"year"),G(0,["YYYYY",5],0,"year"),G(0,["YYYYYY",6,!0],0,"year"),y("year","y"),L("Y",Xc),L("YY",Sc,Oc),L("YYYY",Uc,Qc),L("YYYYY",Vc,Rc),L("YYYYYY",Vc,Rc),O(["YYYY","YYYYY","YYYYYY"],bd),O("YY",function(b,c){c[bd]=a.parseTwoDigitYear(b)}),a.parseTwoDigitYear=function(a){return p(a)+(p(a)>68?1900:2e3)};var pd=B("FullYear",!1);G("w",["ww",2],"wo","week"),G("W",["WW",2],"Wo","isoWeek"),y("week","w"),y("isoWeek","W"),L("w",Sc),L("ww",Sc,Oc),L("W",Sc),L("WW",Sc,Oc),P(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=p(a)});var qd={dow:0,doy:6};G("DDD",["DDDD",3],"DDDo","dayOfYear"),y("dayOfYear","DDD"),L("DDD",Tc),L("DDDD",Pc),O(["DDD","DDDD"],function(a,b,c){c._dayOfYear=p(a)}),a.ISO_8601=function(){};var rd=$("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Aa.apply(null,arguments);return this>a?this:a}),sd=$("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Aa.apply(null,arguments);return a>this?this:a});Ga("Z",":"),Ga("ZZ",""),L("Z",Yc),L("ZZ",Yc),O(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ha(a)});var td=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var ud=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,vd=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;Va.fn=Ea.prototype;var wd=Za(1,"add"),xd=Za(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var yd=$("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});G(0,["gg",2],0,function(){return this.weekYear()%100}),G(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ab("gggg","weekYear"),Ab("ggggg","weekYear"),Ab("GGGG","isoWeekYear"),Ab("GGGGG","isoWeekYear"),y("weekYear","gg"),y("isoWeekYear","GG"),L("G",Xc),L("g",Xc),L("GG",Sc,Oc),L("gg",Sc,Oc),L("GGGG",Uc,Qc),L("gggg",Uc,Qc),L("GGGGG",Vc,Rc),L("ggggg",Vc,Rc),P(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=p(a)}),P(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),G("Q",0,0,"quarter"),y("quarter","Q"),L("Q",Nc),O("Q",function(a,b){b[cd]=3*(p(a)-1)}),G("D",["DD",2],"Do","date"),y("date","D"),L("D",Sc),L("DD",Sc,Oc),L("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),O(["D","DD"],dd),O("Do",function(a,b){b[dd]=p(a.match(Sc)[0],10)});var zd=B("Date",!0);G("d",0,"do","day"),G("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),G("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),G("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),G("e",0,0,"weekday"),G("E",0,0,"isoWeekday"),y("day","d"),y("weekday","e"),y("isoWeekday","E"),L("d",Sc),L("e",Sc),L("E",Sc),L("dd",$c),L("ddd",$c),L("dddd",$c),P(["dd","ddd","dddd"],function(a,b,c){var d=c._locale.weekdaysParse(a);null!=d?b.d=d:j(c).invalidWeekday=a}),P(["d","e","E"],function(a,b,c,d){b[d]=p(a)});var Ad="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Bd="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Cd="Su_Mo_Tu_We_Th_Fr_Sa".split("_");G("H",["HH",2],0,"hour"),G("h",["hh",2],0,function(){return this.hours()%12||12}),Pb("a",!0),Pb("A",!1),y("hour","h"),L("a",Qb),L("A",Qb),L("H",Sc),L("h",Sc),L("HH",Sc,Oc),L("hh",Sc,Oc),O(["H","HH"],ed),O(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),O(["h","hh"],function(a,b,c){b[ed]=p(a),j(c).bigHour=!0});var Dd=/[ap]\.?m?\.?/i,Ed=B("Hours",!0);G("m",["mm",2],0,"minute"),y("minute","m"),L("m",Sc),L("mm",Sc,Oc),O(["m","mm"],fd);var Fd=B("Minutes",!1);G("s",["ss",2],0,"second"),y("second","s"),L("s",Sc),L("ss",Sc,Oc),O(["s","ss"],gd);var Gd=B("Seconds",!1);G("S",0,0,function(){return~~(this.millisecond()/100)}),G(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),Tb("SSS"),Tb("SSSS"),y("millisecond","ms"),L("S",Tc,Nc),L("SS",Tc,Oc),L("SSS",Tc,Pc),L("SSSS",Wc),O(["S","SS","SSS","SSSS"],function(a,b){b[hd]=p(1e3*("0."+a))});var Hd=B("Milliseconds",!1);G("z",0,0,"zoneAbbr"),G("zz",0,0,"zoneName");var Id=n.prototype;Id.add=wd,Id.calendar=_a,Id.clone=ab,Id.diff=gb,Id.endOf=sb,Id.format=kb,Id.from=lb,Id.fromNow=mb,Id.to=nb,Id.toNow=ob,Id.get=E,Id.invalidAt=zb,Id.isAfter=bb,Id.isBefore=cb,Id.isBetween=db,Id.isSame=eb,Id.isValid=xb,Id.lang=yd,Id.locale=pb,Id.localeData=qb,Id.max=sd,Id.min=rd,Id.parsingFlags=yb,Id.set=E,Id.startOf=rb,Id.subtract=xd,Id.toArray=wb,Id.toDate=vb,Id.toISOString=jb,Id.toJSON=jb,Id.toString=ib,Id.unix=ub,Id.valueOf=tb,Id.year=pd,Id.isLeapYear=ga,Id.weekYear=Cb,Id.isoWeekYear=Db,Id.quarter=Id.quarters=Gb,Id.month=W,Id.daysInMonth=X,Id.week=Id.weeks=la,Id.isoWeek=Id.isoWeeks=ma,Id.weeksInYear=Fb,Id.isoWeeksInYear=Eb,Id.date=zd,Id.day=Id.days=Mb,Id.weekday=Nb,Id.isoWeekday=Ob,Id.dayOfYear=oa,Id.hour=Id.hours=Ed,Id.minute=Id.minutes=Fd,Id.second=Id.seconds=Gd,Id.millisecond=Id.milliseconds=Hd,Id.utcOffset=Ka,Id.utc=Ma,Id.local=Na,Id.parseZone=Oa,Id.hasAlignedHourOffset=Pa,Id.isDST=Qa,Id.isDSTShifted=Ra,Id.isLocal=Sa,Id.isUtcOffset=Ta,Id.isUtc=Ua,Id.isUTC=Ua,Id.zoneAbbr=Ub,Id.zoneName=Vb,Id.dates=$("dates accessor is deprecated. Use date instead.",zd),Id.months=$("months accessor is deprecated. Use month instead",W),Id.years=$("years accessor is deprecated. Use year instead",pd),Id.zone=$("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",La);var Jd=Id,Kd={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Ld={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},Md="Invalid date",Nd="%d",Od=/\d{1,2}/,Pd={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",
hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Qd=r.prototype;Qd._calendar=Kd,Qd.calendar=Yb,Qd._longDateFormat=Ld,Qd.longDateFormat=Zb,Qd._invalidDate=Md,Qd.invalidDate=$b,Qd._ordinal=Nd,Qd.ordinal=_b,Qd._ordinalParse=Od,Qd.preparse=ac,Qd.postformat=ac,Qd._relativeTime=Pd,Qd.relativeTime=bc,Qd.pastFuture=cc,Qd.set=dc,Qd.months=S,Qd._months=id,Qd.monthsShort=T,Qd._monthsShort=jd,Qd.monthsParse=U,Qd.week=ia,Qd._week=qd,Qd.firstDayOfYear=ka,Qd.firstDayOfWeek=ja,Qd.weekdays=Ib,Qd._weekdays=Ad,Qd.weekdaysMin=Kb,Qd._weekdaysMin=Cd,Qd.weekdaysShort=Jb,Qd._weekdaysShort=Bd,Qd.weekdaysParse=Lb,Qd.isPM=Rb,Qd._meridiemParse=Dd,Qd.meridiem=Sb,v("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===p(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=$("moment.lang is deprecated. Use moment.locale instead.",v),a.langData=$("moment.langData is deprecated. Use moment.localeData instead.",x);var Rd=Math.abs,Sd=uc("ms"),Td=uc("s"),Ud=uc("m"),Vd=uc("h"),Wd=uc("d"),Xd=uc("w"),Yd=uc("M"),Zd=uc("y"),$d=wc("milliseconds"),_d=wc("seconds"),ae=wc("minutes"),be=wc("hours"),ce=wc("days"),de=wc("months"),ee=wc("years"),fe=Math.round,ge={s:45,m:45,h:22,d:26,M:11},he=Math.abs,ie=Ea.prototype;ie.abs=lc,ie.add=nc,ie.subtract=oc,ie.as=sc,ie.asMilliseconds=Sd,ie.asSeconds=Td,ie.asMinutes=Ud,ie.asHours=Vd,ie.asDays=Wd,ie.asWeeks=Xd,ie.asMonths=Yd,ie.asYears=Zd,ie.valueOf=tc,ie._bubble=pc,ie.get=vc,ie.milliseconds=$d,ie.seconds=_d,ie.minutes=ae,ie.hours=be,ie.days=ce,ie.weeks=xc,ie.months=de,ie.years=ee,ie.humanize=Bc,ie.toISOString=Cc,ie.toString=Cc,ie.toJSON=Cc,ie.locale=pb,ie.localeData=qb,ie.toIsoString=$("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Cc),ie.lang=yd,G("X",0,0,"unix"),G("x",0,0,"valueOf"),L("x",Xc),L("X",Zc),O("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),O("x",function(a,b,c){c._d=new Date(p(a))}),a.version="2.10.3",b(Aa),a.fn=Jd,a.min=Ca,a.max=Da,a.utc=h,a.unix=Wb,a.months=gc,a.isDate=d,a.locale=v,a.invalid=l,a.duration=Va,a.isMoment=o,a.weekdays=ic,a.parseZone=Xb,a.localeData=x,a.isDuration=Fa,a.monthsShort=hc,a.weekdaysMin=kc,a.defineLocale=w,a.weekdaysShort=jc,a.normalizeUnits=z,a.relativeTimeThreshold=Ac;var je=a;return je});
/**
* @version: 2.1.12
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2015 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: https://www.improvely.com/
*/

(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['moment', 'jquery', 'exports'], function(momentjs, $, exports) {
      root.daterangepicker = factory(root, exports, momentjs, $);
    });

  } else if (typeof exports !== 'undefined') {
      var momentjs = require('moment');
      var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;  //isomorphic issue
      if (!jQuery) {
          try {
              jQuery = require('jquery');
              if (!jQuery.fn) jQuery.fn = {}; //isomorphic issue
          } catch (err) {
              if (!jQuery) throw new Error('jQuery dependency not found');
          }
      }

    factory(root, exports, momentjs, jQuery);

  // Finally, as a browser global.
  } else {
    root.daterangepicker = factory(root, {}, root.moment || moment, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this || {}, function(root, daterangepicker, moment, $) { // 'this' doesn't exist on a server

    var DateRangePicker = function(element, options, cb) {

        //default settings for options
        this.parentEl = 'body';
        this.element = $(element);
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.minDate = false;
        this.maxDate = false;
        this.dateLimit = false;
        this.autoApply = false;
        this.singleDatePicker = false;
        this.showDropdowns = false;
        this.showWeekNumbers = false;
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        this.linkedCalendars = true;
        this.autoUpdateInput = true;
        this.ranges = {};

        this.opens = 'right';
        if (this.element.hasClass('pull-right'))
            this.opens = 'left';

        this.drops = 'down';
        if (this.element.hasClass('dropup'))
            this.drops = 'up';

        this.buttonClasses = 'btn btn-sm';
        this.applyClass = 'btn-success';
        this.cancelClass = 'btn-default';

        this.locale = {
            format: 'MM/DD/YYYY',
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        };

        this.callback = function() { };

        //some state information
        this.isShowing = false;
        this.leftCalendar = {};
        this.rightCalendar = {};

        //custom options from user
        if (typeof options !== 'object' || options === null)
            options = {};

        //allow setting options with data attributes
        //data-api options will be overwritten with custom javascript options
        options = $.extend(this.element.data(), options);

        //html template for the picker UI
        if (typeof options.template !== 'string')
            options.template = '<div class="daterangepicker dropdown-menu">' +
                '<div class="calendar left">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini" type="text" name="daterangepicker_start" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' +
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="calendar right">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini" type="text" name="daterangepicker_end" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' +
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="ranges">' +
                    '<div class="range_inputs">' +
                        '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
                        '<button class="cancelBtn" type="button"></button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(options.template).appendTo(this.parentEl);

        //
        // handle all the possible options overriding defaults
        //

        if (typeof options.locale === 'object') {

            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;

            if (typeof options.locale.separator === 'string')
                this.locale.separator = options.locale.separator;

            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

            if (typeof options.locale.monthNames === 'object')
              this.locale.monthNames = options.locale.monthNames.slice();

            if (typeof options.locale.firstDay === 'number')
              this.locale.firstDay = options.locale.firstDay;

            if (typeof options.locale.applyLabel === 'string')
              this.locale.applyLabel = options.locale.applyLabel;

            if (typeof options.locale.cancelLabel === 'string')
              this.locale.cancelLabel = options.locale.cancelLabel;

            if (typeof options.locale.weekLabel === 'string')
              this.locale.weekLabel = options.locale.weekLabel;

            if (typeof options.locale.customRangeLabel === 'string')
              this.locale.customRangeLabel = options.locale.customRangeLabel;

        }

        if (typeof options.startDate === 'string')
            this.startDate = moment(options.startDate, this.locale.format);

        if (typeof options.endDate === 'string')
            this.endDate = moment(options.endDate, this.locale.format);

        if (typeof options.minDate === 'string')
            this.minDate = moment(options.minDate, this.locale.format);

        if (typeof options.maxDate === 'string')
            this.maxDate = moment(options.maxDate, this.locale.format);

        if (typeof options.startDate === 'object')
            this.startDate = moment(options.startDate);

        if (typeof options.endDate === 'object')
            this.endDate = moment(options.endDate);

        if (typeof options.minDate === 'object')
            this.minDate = moment(options.minDate);

        if (typeof options.maxDate === 'object')
            this.maxDate = moment(options.maxDate);

        // sanity check for bad options
        if (this.minDate && this.startDate.isBefore(this.minDate))
            this.startDate = this.minDate.clone();

        // sanity check for bad options
        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();

        if (typeof options.applyClass === 'string')
            this.applyClass = options.applyClass;

        if (typeof options.cancelClass === 'string')
            this.cancelClass = options.cancelClass;

        if (typeof options.dateLimit === 'object')
            this.dateLimit = options.dateLimit;

        if (typeof options.opens === 'string')
            this.opens = options.opens;

        if (typeof options.drops === 'string')
            this.drops = options.drops;

        if (typeof options.showWeekNumbers === 'boolean')
            this.showWeekNumbers = options.showWeekNumbers;

        if (typeof options.buttonClasses === 'string')
            this.buttonClasses = options.buttonClasses;

        if (typeof options.buttonClasses === 'object')
            this.buttonClasses = options.buttonClasses.join(' ');

        if (typeof options.showDropdowns === 'boolean')
            this.showDropdowns = options.showDropdowns;

        if (typeof options.singleDatePicker === 'boolean') {
            this.singleDatePicker = options.singleDatePicker;
            if (this.singleDatePicker)
                this.endDate = this.startDate.clone();
        }

        if (typeof options.timePicker === 'boolean')
            this.timePicker = options.timePicker;

        if (typeof options.timePickerSeconds === 'boolean')
            this.timePickerSeconds = options.timePickerSeconds;

        if (typeof options.timePickerIncrement === 'number')
            this.timePickerIncrement = options.timePickerIncrement;

        if (typeof options.timePicker24Hour === 'boolean')
            this.timePicker24Hour = options.timePicker24Hour;

        if (typeof options.autoApply === 'boolean')
            this.autoApply = options.autoApply;

        if (typeof options.autoUpdateInput === 'boolean')
            this.autoUpdateInput = options.autoUpdateInput;

        if (typeof options.linkedCalendars === 'boolean')
            this.linkedCalendars = options.linkedCalendars;

        if (typeof options.isInvalidDate === 'function')
            this.isInvalidDate = options.isInvalidDate;

        // update day names order to firstDay
        if (this.locale.firstDay != 0) {
            var iterator = this.locale.firstDay;
            while (iterator > 0) {
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                iterator--;
            }
        }

        var start, end, range;

        //if no start/end dates set, check if an input element contains initial values
        if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
            if ($(this.element).is('input[type=text]')) {
                var val = $(this.element).val(),
                    split = val.split(this.locale.separator);

                start = end = null;

                if (split.length == 2) {
                    start = moment(split[0], this.locale.format);
                    end = moment(split[1], this.locale.format);
                } else if (this.singleDatePicker && val !== "") {
                    start = moment(val, this.locale.format);
                    end = moment(val, this.locale.format);
                }
                if (start !== null && end !== null) {
                    this.setStartDate(start);
                    this.setEndDate(end);
                }
            }
        }

        if (typeof options.ranges === 'object') {
            for (range in options.ranges) {

                if (typeof options.ranges[range][0] === 'string')
                    start = moment(options.ranges[range][0], this.locale.format);
                else
                    start = moment(options.ranges[range][0]);

                if (typeof options.ranges[range][1] === 'string')
                    end = moment(options.ranges[range][1], this.locale.format);
                else
                    end = moment(options.ranges[range][1]);

                // If the start or end date exceed those allowed by the minDate or dateLimit
                // options, shorten the range to the allowable period.
                if (this.minDate && start.isBefore(this.minDate))
                    start = this.minDate.clone();

                var maxDate = this.maxDate;
                if (this.dateLimit && start.clone().add(this.dateLimit).isAfter(maxDate))
                    maxDate = start.clone().add(this.dateLimit);
                if (maxDate && end.isAfter(maxDate))
                    end = maxDate.clone();

                // If the end of the range is before the minimum or the start of the range is
                // after the maximum, don't display this range option at all.
                if ((this.minDate && end.isBefore(this.minDate)) || (maxDate && start.isAfter(maxDate)))
                    continue;

                this.ranges[range] = [start, end];
            }

            var list = '<ul>';
            for (range in this.ranges) {
                list += '<li>' + range + '</li>';
            }
            list += '<li>' + this.locale.customRangeLabel + '</li>';
            list += '</ul>';
            this.container.find('.ranges').prepend(list);
        }

        if (typeof cb === 'function') {
            this.callback = cb;
        }

        if (!this.timePicker) {
            this.startDate = this.startDate.startOf('day');
            this.endDate = this.endDate.endOf('day');
            this.container.find('.calendar-time').hide();
        }

        //can't be used together for now
        if (this.timePicker && this.autoApply)
            this.autoApply = false;

        if (this.autoApply && typeof options.ranges !== 'object') {
            this.container.find('.ranges').hide();
        } else if (this.autoApply) {
            this.container.find('.applyBtn, .cancelBtn').addClass('hide');
        }

        if (this.singleDatePicker) {
            this.container.addClass('single');
            this.container.find('.calendar.left').addClass('single');
            this.container.find('.calendar.left').show();
            this.container.find('.calendar.right').hide();
            this.container.find('.daterangepicker_input input, .daterangepicker_input i').hide();
            if (!this.timePicker) {
                this.container.find('.ranges').hide();
            }
        }

        if (typeof options.ranges === 'undefined' && !this.singleDatePicker) {
            this.container.addClass('show-calendar');
        }

        this.container.addClass('opens' + this.opens);

        //swap the position of the predefined ranges if opens right
        if (typeof options.ranges !== 'undefined' && this.opens == 'right') {
            var ranges = this.container.find('.ranges');
            var html = ranges.clone();
            ranges.remove();
            this.container.find('.calendar.left').parent().prepend(html);
        }

        //apply CSS classes and labels to buttons
        this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        //
        // event listeners
        //

        this.container.find('.calendar')
            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
            .on('click.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
            .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
            .on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))
            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this))
            .on('click.daterangepicker', '.daterangepicker_input input', $.proxy(this.showCalendars, this))
            //.on('keyup.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this))
            .on('change.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this));

        this.container.find('.ranges')
            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
            .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
            .on('mouseenter.daterangepicker', 'li', $.proxy(this.hoverRange, this))
            .on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));

        if (this.element.is('input')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.elementChanged, this),
                'keydown.daterangepicker': $.proxy(this.keydown, this)
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
        }

        //
        // if attached to a text input, set the initial value
        //

        if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.element.trigger('change');
        } else if (this.element.is('input') && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format));
            this.element.trigger('change');
        }

    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.locale.format);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);

            if (!this.timePicker)
                this.startDate = this.startDate.startOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.minDate && this.startDate.isBefore(this.minDate))
                this.startDate = this.minDate;

            if (this.maxDate && this.startDate.isAfter(this.maxDate))
                this.startDate = this.maxDate;

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.locale.format);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (!this.timePicker)
                this.endDate = this.endDate.endOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.endDate.isBefore(this.startDate))
                this.endDate = this.startDate.clone();

            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate;

            if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
                this.endDate = this.startDate.clone().add(this.dateLimit);

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        isInvalidDate: function() {
            return false;
        },

        updateView: function() {
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
                if (!this.endDate) {
                    this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');
                } else {
                    this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');
                }
            }
            if (this.endDate) {
                this.container.find('input[name="daterangepicker_end"]').removeClass('active');
                this.container.find('input[name="daterangepicker_start"]').addClass('active');
            } else {
                this.container.find('input[name="daterangepicker_end"]').addClass('active');
                this.container.find('input[name="daterangepicker_start"]').removeClass('active');
            }
            this.updateMonthsInView();
            this.updateCalendars();
            this.updateFormInputs();
        },

        updateMonthsInView: function() {
            if (this.endDate) {

                //if both dates are visible already, do nothing
                if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                    (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    &&
                    (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    ) {
                    return;
                }

                this.leftCalendar.month = this.startDate.clone().date(2);
                if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                    this.rightCalendar.month = this.endDate.clone().date(2);
                } else {
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
                
            } else {
                if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                    this.leftCalendar.month = this.startDate.clone().date(2);
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
            }
        },

        updateCalendars: function() {

            if (this.timePicker) {
                var hour, minute, second;
                if (this.endDate) {
                    hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                } else {
                    hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                }
                this.leftCalendar.month.hour(hour).minute(minute).second(second);
                this.rightCalendar.month.hour(hour).minute(minute).second(second);
            }

            this.renderCalendar('left');
            this.renderCalendar('right');

            //highlight any predefined range matching the current start and end dates
            this.container.find('.ranges li').removeClass('active');
            if (this.endDate == null) return;

            var customRange = true;
            var i = 0;
            for (var range in this.ranges) {
                if (this.timePicker) {
                    if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                        break;
                    }
                } else {
                    //ignore times when comparing dates if time picker is not enabled
                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                        break;
                    }
                }
                i++;
            }
            if (customRange) {
                this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
                this.showCalendars();
            }

        },

        renderCalendar: function(side) {

            //
            // Build the matrix of dates that will populate the calendar
            //

            var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
            var month = calendar.month.month();
            var year = calendar.month.year();
            var hour = calendar.month.hour();
            var minute = calendar.month.minute();
            var second = calendar.month.second();
            var daysInMonth = moment([year, month]).daysInMonth();
            var firstDay = moment([year, month, 1]);
            var lastDay = moment([year, month, daysInMonth]);
            var lastMonth = moment(firstDay).subtract(1, 'month').month();
            var lastYear = moment(firstDay).subtract(1, 'month').year();
            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
            var dayOfWeek = firstDay.day();

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            calendar.firstDay = firstDay;
            calendar.lastDay = lastDay;

            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

            var col, row;
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);

                if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                    calendar[row][col] = this.minDate.clone();
                }

                if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                    calendar[row][col] = this.maxDate.clone();
                }

            }

            //make the calendar object available to hoverDate/clickDate
            if (side == 'left') {
                this.leftCalendar.calendar = calendar;
            } else {
                this.rightCalendar.calendar = calendar;
            }

            //
            // Display the calendar
            //

            var minDate = side == 'left' ? this.minDate : this.startDate;
            var maxDate = this.maxDate;
            var selected = side == 'left' ? this.startDate : this.endDate;

            var html = '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers)
                html += '<th></th>';

            if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
                html += '<th class="prev available"><i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

            if (this.showDropdowns) {
                var currentMonth = calendar[1][1].month();
                var currentYear = calendar[1][1].year();
                var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
                var minYear = (minDate && minDate.year()) || (currentYear - 50);
                var inMinYear = currentYear == minYear;
                var inMaxYear = currentYear == maxYear;

                var monthHtml = '<select class="monthselect">';
                for (var m = 0; m < 12; m++) {
                    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            ">" + this.locale.monthNames[m] + "</option>";
                    } else {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                    }
                }
                monthHtml += "</select>";

                var yearHtml = '<select class="yearselect">';
                for (var y = minYear; y <= maxYear; y++) {
                    yearHtml += '<option value="' + y + '"' +
                        (y === currentYear ? ' selected="selected"' : '') +
                        '>' + y + '</option>';
                }
                yearHtml += '</select>';

                dateHtml = monthHtml + yearHtml;
            }

            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
                html += '<th class="next available"><i class="fa fa-chevron-right glyphicon glyphicon-chevron-right"></i></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //adjust maxDate to reflect the dateLimit setting in order to
            //grey out end dates beyond the dateLimit
            if (this.endDate == null && this.dateLimit) {
                var maxLimit = this.startDate.clone().add(this.dateLimit).endOf('day');
                if (!maxDate || maxLimit.isBefore(maxDate)) {
                    maxDate = maxLimit;
                }
            }

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';

                for (var col = 0; col < 7; col++) {

                    var classes = [];

                    //highlight today's date
                    if (calendar[row][col].isSame(new Date(), "day"))
                        classes.push('today');

                    //highlight weekends
                    if (calendar[row][col].isoWeekday() > 5)
                        classes.push('weekend');

                    //grey out the dates in other months displayed at beginning and end of this calendar
                    if (calendar[row][col].month() != calendar[1][1].month())
                        classes.push('off');

                    //don't allow selection of dates before the minimum date
                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of dates after the maximum date
                    if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of date if a custom function decides it's invalid
                    if (this.isInvalidDate(calendar[row][col]))
                        classes.push('off', 'disabled');

                    //highlight the currently selected start date
                    if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                        classes.push('active', 'start-date');

                    //highlight the currently selected end date
                    if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                        classes.push('active', 'end-date');

                    //highlight dates in-between the selected dates
                    if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                        classes.push('in-range');

                    var cname = '', disabled = false;
                    for (var i = 0; i < classes.length; i++) {
                        cname += classes[i] + ' ';
                        if (classes[i] == 'disabled')
                            disabled = true;
                    }
                    if (!disabled)
                        cname += 'available';

                    html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';

            this.container.find('.calendar.' + side + ' .calendar-table').html(html);

        },

        renderTimePicker: function(side) {

            var html, selected, minDate, maxDate = this.maxDate;

            if (this.dateLimit && (!this.maxDate || this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)))
                maxDate = this.startDate.clone().add(this.dateLimit);

            if (side == 'left') {
                selected = this.startDate.clone();
                minDate = this.minDate;
            } else if (side == 'right') {
                selected = this.endDate ? this.endDate.clone() : this.startDate.clone();
                minDate = this.startDate;
            }

            //
            // hours
            //

            html = '<select class="hourselect">';

            var start = this.timePicker24Hour ? 0 : 1;
            var end = this.timePicker24Hour ? 23 : 12;

            for (var i = start; i <= end; i++) {
                var i_in_24 = i;
                if (!this.timePicker24Hour)
                    i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

                var time = selected.clone().hour(i_in_24);
                var disabled = false;
                if (minDate && time.minute(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.minute(0).isAfter(maxDate))
                    disabled = true;

                if (i_in_24 == selected.hour() && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
                } else {
                    html += '<option value="' + i + '">' + i + '</option>';
                }
            }

            html += '</select> ';

            //
            // minutes
            //

            html += ': <select class="minuteselect">';

            for (var i = 0; i < 60; i += this.timePickerIncrement) {
                var padded = i < 10 ? '0' + i : i;
                var time = selected.clone().minute(i);

                var disabled = false;
                if (minDate && time.second(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.second(0).isAfter(maxDate))
                    disabled = true;

                if (selected.minute() == i && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                } else {
                    html += '<option value="' + i + '">' + padded + '</option>';
                }
            }

            html += '</select> ';

            //
            // seconds
            //

            if (this.timePickerSeconds) {
                html += ': <select class="secondselect">';

                for (var i = 0; i < 60; i++) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().second(i);

                    var disabled = false;
                    if (minDate && time.isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.isAfter(maxDate))
                        disabled = true;

                    if (selected.second() == i && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + padded + '</option>';
                    }
                }

                html += '</select> ';
            }

            //
            // AM/PM
            //

            if (!this.timePicker24Hour) {
                html += '<select class="ampmselect">';

                var am_html = '';
                var pm_html = '';

                if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                    am_html = ' disabled="disabled" class="disabled"';

                if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                    pm_html = ' disabled="disabled" class="disabled"';

                if (selected.hour() >= 12) {
                    html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
                } else {
                    html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
                }

                html += '</select>';
            }

            this.container.find('.calendar.' + side + ' .calendar-time div').html(html);

        },

        updateFormInputs: function() {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.locale.format));
            if (this.endDate)
                this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.locale.format));

            if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }

        },

        move: function() {
            var parentOffset = { top: 0, left: 0 },
                containerTop;
            var parentRightEdge = $(window).width();
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
                parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
            }

            if (this.drops == 'up')
                containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
            else
                containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
            this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');

            if (this.opens == 'left') {
                this.container.css({
                    top: containerTop,
                    right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else if (this.opens == 'center') {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                            - this.container.outerWidth() / 2,
                    right: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        show: function(e) {
            if (this.isShowing) return;

            // Create a click proxy that is private to this instance of datepicker, for unbinding
            this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);
            // Bind global datepicker mousedown for hiding and
            $(document)
              .on('mousedown.daterangepicker', this._outsideClickProxy)
              // also support mobile devices
              .on('touchend.daterangepicker', this._outsideClickProxy)
              // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
              .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
              // and also close when focus changes to outside the picker (eg. tabbing between controls)
              .on('focusin.daterangepicker', this._outsideClickProxy);

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();

            this.updateView();
            this.container.show();
            this.move();
            this.element.trigger('show.daterangepicker', this);
            this.isShowing = true;
        },

        hide: function(e) {
            if (!this.isShowing) return;

            //incomplete date selection, revert to last values
            if (!this.endDate) {
                this.startDate = this.oldStartDate.clone();
                this.endDate = this.oldEndDate.clone();
            }

            //if a new date range was selected, invoke the user callback function
            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.callback(this.startDate, this.endDate, this.chosenLabel);

            //if picker is attached to a text input, update it
            this.updateElement();

            $(document).off('.daterangepicker');
            this.container.hide();
            this.element.trigger('hide.daterangepicker', this);
            this.isShowing = false;
        },

        toggle: function(e) {
            if (this.isShowing) {
                this.hide();
            } else {
                this.show();
            }
        },

        outsideClick: function(e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (
                // ie modal dialog fix
                e.type == "focusin" ||
                target.closest(this.element).length ||
                target.closest(this.container).length ||
                target.closest('.calendar-table').length
                ) return;
            this.hide();
        },

        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
            this.element.trigger('showCalendar.daterangepicker', this);
        },

        hideCalendars: function() {
            this.container.removeClass('show-calendar');
            this.element.trigger('hideCalendar.daterangepicker', this);
        },

        hoverRange: function(e) {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            var label = e.target.innerHTML;
            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
                this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.locale.format));
                this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.locale.format));
            }
            
        },

        clickRange: function(e) {
            var label = e.target.innerHTML;
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];
                this.startDate = dates[0];
                this.endDate = dates[1];

                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }

                this.hideCalendars();
                this.clickApply();
            }
        },

        clickPrev: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract(1, 'month');
                if (this.linkedCalendars)
                    this.rightCalendar.month.subtract(1, 'month');
            } else {
                this.rightCalendar.month.subtract(1, 'month');
            }
            this.updateCalendars();
        },

        clickNext: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add(1, 'month');
            } else {
                this.rightCalendar.month.add(1, 'month');
                if (this.linkedCalendars)
                    this.leftCalendar.month.add(1, 'month');
            }
            this.updateCalendars();
        },

        hoverDate: function(e) {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            //ignore dates that can't be selected
            if (!$(e.target).hasClass('available')) return;

            //have the text inputs above calendars reflect the date being hovered over
            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            if (this.endDate) {
                this.container.find('input[name=daterangepicker_start]').val(date.format(this.locale.format));
            } else {
                this.container.find('input[name=daterangepicker_end]').val(date.format(this.locale.format));
            }

            //highlight the dates between the start date and the date being hovered as a potential end date
            var leftCalendar = this.leftCalendar;
            var rightCalendar = this.rightCalendar;
            var startDate = this.startDate;
            if (!this.endDate) {
                this.container.find('.calendar td').each(function(index, el) {

                    //skip week numbers, only look at dates
                    if ($(el).hasClass('week')) return;

                    var title = $(el).attr('data-title');
                    var row = title.substr(1, 1);
                    var col = title.substr(3, 1);
                    var cal = $(el).parents('.calendar');
                    var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

                    if (dt.isAfter(startDate) && dt.isBefore(date)) {
                        $(el).addClass('in-range');
                    } else {
                        $(el).removeClass('in-range');
                    }

                });
            }

        },

        clickDate: function(e) {

            if (!$(e.target).hasClass('available')) return;

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            //
            // this function needs to do a few things:
            // * alternate between selecting a start and end date for the range,
            // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
            // * if autoapply is enabled, and an end date was chosen, apply the selection
            // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
            //

            if (this.endDate || date.isBefore(this.startDate)) {
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = cal.find('.ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.endDate = null;
                this.setStartDate(date.clone());
            } else {
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.setEndDate(date.clone());
                if (this.autoApply)
                    this.clickApply();
            }

            if (this.singleDatePicker) {
                this.setEndDate(this.startDate);
                if (!this.timePicker)
                    this.clickApply();
            }

            this.updateView();

        },

        clickApply: function(e) {
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function(e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },

        monthOrYearChanged: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.'+leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            if (!isLeft) {
                if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                    month = this.startDate.month();
                    year = this.startDate.year();
                }
            }

            if (this.minDate) {
                if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                    month = this.minDate.month();
                    year = this.minDate.year();
                }
            }

            if (this.maxDate) {
                if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                    month = this.maxDate.month();
                    year = this.maxDate.year();
                }
            }

            if (isLeft) {
                this.leftCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
            } else {
                this.rightCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
            }
            this.updateCalendars();
        },

        timeChanged: function(e) {

            var cal = $(e.target).closest('.calendar'),
                isLeft = cal.hasClass('left');

            var hour = parseInt(cal.find('.hourselect').val(), 10);
            var minute = parseInt(cal.find('.minuteselect').val(), 10);
            var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

            if (!this.timePicker24Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm === 'PM' && hour < 12)
                    hour += 12;
                if (ampm === 'AM' && hour === 12)
                    hour = 0;
            }

            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                start.second(second);
                this.setStartDate(start);
                if (this.singleDatePicker)
                    this.endDate = this.startDate.clone();
            } else if (this.endDate) {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                end.second(second);
                this.setEndDate(end);
            }

            //update the calendars so all clickable dates reflect the new time component
            this.updateCalendars();

            //update the form inputs above the calendars with the new time
            this.updateFormInputs();

            //re-render the time pickers because changing one selection can affect what's enabled in another
            this.renderTimePicker('left');
            this.renderTimePicker('right');

        },

        formInputsChanged: function(e) {
            var isRight = $(e.target).closest('.calendar').hasClass('right');
            var start = moment(this.container.find('input[name="daterangepicker_start"]').val(), this.locale.format);
            var end = moment(this.container.find('input[name="daterangepicker_end"]').val(), this.locale.format);

            if (start.isValid() && end.isValid()) {

                if (isRight && end.isBefore(start))
                    start = end.clone();

                this.setStartDate(start);
                this.setEndDate(end);

                if (isRight) {
                    this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format));
                } else {
                    this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format));
                }

            }

            this.updateCalendars();
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
            }
        },

        elementChanged: function() {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;

            var dateString = this.element.val().split(this.locale.separator),
                start = null,
                end = null;

            if (dateString.length === 2) {
                start = moment(dateString[0], this.locale.format);
                end = moment(dateString[1], this.locale.format);
            }

            if (this.singleDatePicker || start === null || end === null) {
                start = moment(this.element.val(), this.locale.format);
                end = start;
            }

            this.setStartDate(start);
            this.setEndDate(end);
            this.updateView();
        },

        keydown: function(e) {
            //hide on tab or enter
            if ((e.keyCode === 9) || (e.keyCode === 13)) {
                this.hide();
            }
        },

        updateElement: function() {
            if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.element.trigger('change');
            } else if (this.element.is('input') && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format));
                this.element.trigger('change');
            }
        },

        remove: function() {
            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData();
        }

    };

    $.fn.daterangepicker = function(options, callback) {
        this.each(function() {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, options, callback));
        });
        return this;
    };

}));
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.8
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.hidden = 'hidden';
            _.paused = false;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, dataSettings, settings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);
            _.checkResponsive(true);

        }

        return Slick;

    }());

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

        if (_.slideCount > _.options.slidesToShow && _.paused !== true) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator,
                _.options.autoplaySpeed);
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;
        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this;

        if (_.options.infinite === false) {

            if (_.direction === 1) {

                if ((_.currentSlide + 1) === _.slideCount -
                    1) {
                    _.direction = 0;
                }

                _.slideHandler(_.currentSlide + _.options.slidesToScroll);

            } else {

                if ((_.currentSlide - 1 === 0)) {

                    _.direction = 1;

                }

                _.slideHandler(_.currentSlide - _.options.slidesToScroll);

            }

        } else {

            _.slideHandler(_.currentSlide + _.options.slidesToScroll);

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dotString;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            dotString = '<ul class="' + _.options.dotsClass + '">';

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dotString += '<li>' + _.options.customPaging.call(this, _, i) + '</li>';
            }

            dotString += '</ul>';

            _.$dots = $(dotString).appendTo(
                _.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slidesCache = _.$slides;

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div aria-live="polite" class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 1) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.html(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.target),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots).off('click.slick', _.changeSlide);

            if (_.options.pauseOnDotsHover === true && _.options.autoplay === true) {

                $('li', _.$dots)
                    .off('mouseenter.slick', $.proxy(_.setPaused, _, true))
                    .off('mouseleave.slick', $.proxy(_.setPaused, _, false));

            }

        }

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.$list.off('mouseenter.slick', $.proxy(_.setPaused, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.setPaused, _, false));

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);
    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.html(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }


        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css("display","");

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css("display","");

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }

        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToShow;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToShow;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;

            if (_.options.centerMode === true) {
                if (_.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.on('click.slick', {
                message: 'previous'
            }, _.changeSlide);
            _.$nextArrow.on('click.slick', {
                message: 'next'
            }, _.changeSlide);
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.options.autoplay === true) {
            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.setPaused, _, true))
                .on('mouseleave.slick', $.proxy(_.setPaused, _, false));
        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        _.$list.on('mouseenter.slick', $.proxy(_.setPaused, _, true));
        _.$list.on('mouseleave.slick', $.proxy(_.setPaused, _, false));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

        if (_.options.autoplay === true) {

            _.autoPlay();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: 'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {
                    image
                        .animate({ opacity: 0 }, 100, function() {
                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy')
                                        .removeClass('slick-loading');
                                });
                        });
                };

                imageToLoad.src = imageSource;

            });
        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = rangeStart + _.options.slidesToShow;
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.paused = false;
        _.autoPlay();

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        _.$slider.trigger('afterChange', [_, index]);

        _.animating = false;

        _.setPosition();

        _.swipeLeft = null;

        if (_.options.autoplay === true && _.paused === false) {
            _.autoPlay();
        }
        if (_.options.accessibility === true) {
            _.initADA();
        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {
        event.preventDefault();
    };

    Slick.prototype.progressiveLazyLoad = function() {

        var _ = this,
            imgCount, targetImage;

        imgCount = $('img[data-lazy]', _.$slider).length;

        if (imgCount > 0) {
            targetImage = $('img[data-lazy]', _.$slider).first();
            targetImage.attr('src', targetImage.attr('data-lazy')).removeClass('slick-loading').load(function() {
                    targetImage.removeAttr('data-lazy');
                    _.progressiveLazyLoad();

                    if (_.options.adaptiveHeight === true) {
                        _.setPosition();
                    }
                })
                .error(function() {
                    targetImage.removeAttr('data-lazy');
                    _.progressiveLazyLoad();
                });
        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this,
            currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === "array" && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(0);

        _.setPosition();

        _.$slider.trigger('reInit', [_]);

        if (_.options.autoplay === true) {
            _.focusHandler();
        }

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption = Slick.prototype.slickSetOption = function(option, value, refresh) {

        var _ = this, l, item;

        if( option === "responsive" && $.type(value) === "array" ) {
            for ( item in value ) {
                if( $.type( _.options.responsive ) !== "array" ) {
                    _.options.responsive = [ value[item] ];
                } else {
                    l = _.options.responsive.length-1;
                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {
                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {
                            _.options.responsive.splice(l,1);
                        }
                        l--;
                    }
                    _.options.responsive.push( value[item] );
                }
            }
        } else {
            _.options[option] = value;
        }

        if (refresh === true) {
            _.unload();
            _.reinit();
        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = (_.animType !== null && _.animType !== false);

    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

                    _.$slides
                        .slice(index - centerOffset, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }

    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.setPaused = function(paused) {

        var _ = this;

        if (_.options.autoplay === true && _.options.pauseOnHover === true) {
            _.paused = paused;
            if (!paused) {
                _.autoPlay();
            } else {
                _.autoPlayClear();
            }
        }
    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.setSlideClasses(index);
            _.asNavFor(index);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if (_.options.autoplay === true) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'left';
            } else {
                return 'right';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount;

        _.dragging = false;

        _.shouldClick = (_.touchObject.swipeLength > 10) ? false : true;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.edgeHit === true) {
            _.$slider.trigger('edge', [_, _.swipeDirection()]);
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

            switch (_.swipeDirection()) {
                case 'left':
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
                    _.slideHandler(slideCount);
                    _.currentDirection = 0;
                    _.touchObject = {};
                    _.$slider.trigger('swipe', [_, 'left']);
                    break;

                case 'right':
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
                    _.slideHandler(slideCount);
                    _.currentDirection = 1;
                    _.touchObject = {};
                    _.$slider.trigger('swipe', [_, 'right']);
                    break;
            }
        } else {
            if (_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                _.touchObject = {};
            }
        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(
                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        }

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                .removeClass('slick-active')
                .attr('aria-hidden', 'true');

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active')
                .attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if (document[_.hidden]) {
            _.paused = true;
            _.autoPlayClear();
        } else {
            if (_.options.autoplay === true) {
                _.paused = false;
                _.autoPlay();
            }
        }

    };
    Slick.prototype.initADA = function() {
        var _ = this;
        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        _.$slideTrack.attr('role', 'listbox');

        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
            $(this).attr({
                'role': 'option',
                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
            });
        });

        if (_.$dots !== null) {
            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                $(this).attr({
                    'role': 'presentation',
                    'aria-selected': 'false',
                    'aria-controls': 'navigation' + _.instanceUid + i + '',
                    'id': 'slick-slide' + _.instanceUid + i + ''
                });
            })
                .first().attr('aria-selected', 'true').end()
                .find('button').attr('role', 'button').end()
                .closest('div').attr('role', 'toolbar');
        }
        _.activateADA();

    };

    Slick.prototype.activateADA = function() {
        var _ = this,
        _isSlideOnFocus =_.$slider.find('*').is(':focus');
        // _isSlideOnFocus = _.$slides.is(':focus') || _.$slides.find('*').is(':focus');

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false',
            'tabindex': '0'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

        (_isSlideOnFocus) &&  _.$slideTrack.find('.slick-active').focus();

    };

    Slick.prototype.focusHandler = function() {
        var _ = this;
        _.$slider.on('focus.slick blur.slick', '*', function(event) {
            event.stopImmediatePropagation();
            var sf = $(this);
            setTimeout(function() {
                if (_.isPlay) {
                    if (sf.is(':focus')) {
                        _.autoPlayClear();
                        _.paused = true;
                    } else {
                        _.paused = false;
                        _.autoPlay();
                    }
                }
            }, 0);
        });
    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i = 0,
            ret;
        for (i; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));
/*
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

var aia = aia || {};

$(document).ready(function() {
	var screenSmMin = '768px';
	var screenSmallMediaQuery = window.matchMedia('(min-width: ' + screenSmMin + ')');
	
	setTimeout(resizeCards, 300);
    $(".nav-switch a[data-toggle='tab']").on("click", function(){
        var cards = $('.card-1, .card-3, .card-4, .card-6, .card-9, .card-10, .card-11, .card-12, .card-banner-desc, .press-card');

        // resetting card height
        cards.each(function(i,e) {
            $(e).css("height", "auto");
        });
        setTimeout(resizeCards, 300);
    });

	screenSmallMediaQuery.addListener(screenSmResize);
	// And share the same code to set things up with our current state.
	screenSmResize(screenSmallMediaQuery);

	// card sizing
	var timer;
	$(window).bind('resize',function(){
		timer && clearTimeout(timer);
		timer = setTimeout(function(){
			screenSmResize(screenSmallMediaQuery);
			alignCardHeight();
		},100);
	});
	
	// modified by Adobe
	function screenSmResize(screenSmallMediaQuery) {
	  if (screenSmallMediaQuery.matches) {
	  	resizeCards();
	  }
	  else {
	  	var cards = $('.card-1, .card-3, .card-4, .card-6, .card-9, .card-10, .card-11, .card-12, .card-banner-desc, .press-card');

	  	// resetting card height
		cards.each(function(i,e) {
	  	$(e).css("height", "auto");
		});
	  }
	}
	function resizeCard3() {
        var maxHeight = 0;
        $(".card-3").each(function(i,e) {
          var cardContent = $(e).children(".content");
          if (cardContent.outerHeight() > maxHeight) {
            maxHeight = cardContent.outerHeight();
          };
        });

        $(".card-3").each(function(i,e) {
          $(e).height(maxHeight);
        });
	}

	function resizeCards() {
		var cards = ['.card-1', '.card-4', '.card-6', '.card-9', '.card-10', '.card-11', '.card-12', '.press-card','.card-14'];
		var maxCardBannerDescHeight = 0;
		var cardBannerDesc = $('.card-banner-desc');

		$.each(cards,function(idx,cardType){
			var maxHeight = 0;
			$(cardType).each(function(i,e) {
			  if ($(e).height() > maxHeight) {
				maxHeight = $(e).height();
			  };
			});

			$(cardType).each(function(i,e) {
			  $(e).height(maxHeight);
			});
		});

		cardBannerDesc.each(function(i,e) {
		  if ($(e).height() > maxCardBannerDescHeight) {
		  	maxCardBannerDescHeight = $(e).height();
		  };
		});
		cardBannerDesc.each(function(i,e) {
		  $(e).height(maxCardBannerDescHeight);
		});
		resizeCard3();
		
		// modified by Adobe
		alignCardHeight();
	}
	
	aia.resizeCards = resizeCards;
});

+function ($) {
  'use strict';

  // LIST 2 CLASS DEFINITION
  // ======================
  var List2   = function (el) {
    $(el).on('click', '[data-dismiss="list-2"]', this.close)
  }

  List2.VERSION = '1.0';

  List2.prototype.close = function (e) {
    var $this    = $(this);

    if (e) e.preventDefault();

    var $parent = $this.closest('li');

    $parent.trigger(e = $.Event('close.aia.list-2'));

    if (e.isDefaultPrevented()) return;

    $parent.removeClass('in');

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().remove();
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(List2.TRANSITION_DURATION) :
      removeElement()
  }


  // List 2 PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data  = $this.data('bs.list-2');

      if (!data) $this.data('bs.list-2', (data = new List2(this)));
      if (typeof option == 'string') data[option].call($this);
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin;
  $.fn.alert.Constructor = List2;


  // LIST 2 NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old;
    return this;
  }


  // LIST 2 DATA-API
  // ==============

  $('.list-2 > li').on('click.bs.list-2.data-api', '[data-dismiss="list-2"]', List2.prototype.close);
}(jQuery);

/* ========================================================================
 * Bootstrap: offcanvas.js v3.1.3
 * http://jasny.github.io/bootstrap/javascript/#offcanvas
 * ========================================================================
 * Copyright 2013-2014 Arnold Daniels
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

+function ($) { "use strict";

  // OFFCANVAS PUBLIC CLASS DEFINITION
  // =================================

  var OffCanvas = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, OffCanvas.DEFAULTS, options)
    this.state    = null
    this.placement = null
    // TC
    this.$canvasBackdrop = $('.navmenu-backdrop');

    if (this.options.recalc) {
      this.calcClone()
      $(window).on('resize', $.proxy(this.recalc, this))
    }
    if (this.options.autohide)
      $(document).on('click', $.proxy(this.autohide, this))

    if (this.options.toggle) this.toggle()

    if (this.options.disablescrolling) {
        this.options.disableScrolling = this.options.disablescrolling
        delete this.options.disablescrolling
    }
  }

  OffCanvas.DEFAULTS = {
    toggle: true,
    placement: 'auto',
    autohide: true,
    recalc: true,
    disableScrolling: true
  }

  OffCanvas.prototype.offset = function () {
    switch (this.placement) {
      case 'left':
      case 'right':  return this.$element.outerWidth()
      case 'top':
      case 'bottom': return this.$element.outerHeight()
    }
  }

  OffCanvas.prototype.calcPlacement = function () {
    if (this.options.placement !== 'auto') {
        this.placement = this.options.placement
        return
    }

    if (!this.$element.hasClass('in')) {
      this.$element.css('visiblity', 'hidden !important').addClass('in')
    }

    var horizontal = $(window).width() / this.$element.width()
    var vertical = $(window).height() / this.$element.height()

    var element = this.$element
    function ab(a, b) {
      if (element.css(b) === 'auto') return a
      if (element.css(a) === 'auto') return b

      var size_a = parseInt(element.css(a), 10)
      var size_b = parseInt(element.css(b), 10)

      return size_a > size_b ? b : a
    }

    this.placement = horizontal >= vertical ? ab('left', 'right') : ab('top', 'bottom')

    if (this.$element.css('visibility') === 'hidden !important') {
      this.$element.removeClass('in').css('visiblity', '')
    }
  }

  OffCanvas.prototype.opposite = function (placement) {
    switch (placement) {
      case 'top':    return 'bottom'
      case 'left':   return 'right'
      case 'bottom': return 'top'
      case 'right':  return 'left'
    }
  }

  OffCanvas.prototype.getCanvasElements = function() {
    // Return a set containing the canvas plus all fixed elements
    var canvas = this.options.canvas ? $(this.options.canvas) : this.$element

    var fixed_elements = canvas.find('*').filter(function() {
      return $(this).css('position') === 'fixed'
    }).not(this.options.exclude)

    return canvas.add(fixed_elements)
  }

  OffCanvas.prototype.slide = function (elements, offset, callback) {
    // Use jQuery animation if CSS transitions aren't supported
    if (!$.support.transition) {
      var anim = {}
      anim[this.placement] = "+=" + offset
      return elements.animate(anim, 350, callback)
    }

    var placement = this.placement
    var opposite = this.opposite(placement)

    elements.each(function() {
      if ($(this).css(placement) !== 'auto')
        $(this).css(placement, (parseInt($(this).css(placement), 10) || 0) + offset)

      if ($(this).css(opposite) !== 'auto')
        $(this).css(opposite, (parseInt($(this).css(opposite), 10) || 0) - offset)
    })

    this.$element
      .one($.support.transition.end, callback)
      .emulateTransitionEnd(350)
  }

  OffCanvas.prototype.disableScrolling = function() {
    var bodyWidth = $('body').width()
    var prop = 'padding-' + this.opposite(this.placement)

    if ($('body').data('offcanvas-style') === undefined) {
      $('body').data('offcanvas-style', $('body').attr('style') || '')
    }

    // fix bug where iOS scrolling still occurs
    // $('body').css('overflow', 'hidden')
    $('body').addClass('offcanvas-lock').css('position', 'fixed')
    // $('body').addClass('offcanvas-lock').css('overflow', 'hidden')

    if ($('body').width() > bodyWidth) {
      var padding = parseInt($('body').css(prop), 10) + $('body').width() - bodyWidth

      setTimeout(function() {
        $('body').css(prop, padding)
      }, 1)
    }
  }

  OffCanvas.prototype.show = function () {
    if (this.state) return

    var startEvent = $.Event('show.bs.offcanvas')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    this.state = 'slide-in'
    this.calcPlacement();

    var elements = this.getCanvasElements()
    var placement = this.placement
    var opposite = this.opposite(placement)
    var offset = this.offset()

    if (elements.index(this.$element) !== -1) {
      $(this.$element).data('offcanvas-style', $(this.$element).attr('style') || '')
      this.$element.css(placement, -1 * offset)
      this.$element.css(placement); // Workaround: Need to get the CSS property for it to be applied before the next line of code
    }

    elements.addClass('canvas-sliding').each(function() {
      if ($(this).data('offcanvas-style') === undefined) $(this).data('offcanvas-style', $(this).attr('style') || '')
      if ($(this).css('position') === 'static') $(this).css('position', 'relative')
      if (($(this).css(placement) === 'auto' || $(this).css(placement) === '0px') &&
          ($(this).css(opposite) === 'auto' || $(this).css(opposite) === '0px')) {
        $(this).css(placement, 0)
      }
    })

    if (this.options.disableScrolling) this.disableScrolling()

    var complete = function () {
      if (this.state != 'slide-in') return

      this.state = 'slid'

      elements.removeClass('canvas-sliding').addClass('canvas-slid')
      this.$element.trigger('shown.bs.offcanvas')
    }

    setTimeout($.proxy(function() {
      this.$element.addClass('in')
      this.slide(elements, offset, $.proxy(complete, this))
    }, this), 1)
  }

  OffCanvas.prototype.hide = function (fast) {
    if (this.state !== 'slid') return

    var startEvent = $.Event('hide.bs.offcanvas')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    this.state = 'slide-out'

    var elements = $('.canvas-slid')
    var placement = this.placement
    var offset = -1 * this.offset()

    var complete = function () {
      if (this.state != 'slide-out') return

      this.state = null
      this.placement = null

      this.$element.removeClass('in')

      elements.removeClass('canvas-sliding')
      elements.add(this.$element).add('body').each(function() {
        // fix bug where iOS scrolling still occurs
        $(this).attr('style', $(this).data('offcanvas-style')).removeData('offcanvas-style').removeClass('offcanvas-lock')
      })

      this.$element.trigger('hidden.bs.offcanvas')
    }

    elements.removeClass('canvas-slid').addClass('canvas-sliding')

    setTimeout($.proxy(function() {
      this.slide(elements, offset, $.proxy(complete, this))
    }, this), 1)
  }

  OffCanvas.prototype.toggle = function () {
    if (this.state === 'slide-in' || this.state === 'slide-out') return
    this[this.state === 'slid' ? 'hide' : 'show']()
  }

  OffCanvas.prototype.calcClone = function() {
    this.$calcClone = this.$element.clone()
      .html('')
      .addClass('offcanvas-clone').removeClass('in')
      .appendTo($('body'))
  }

  OffCanvas.prototype.recalc = function () {
    if (this.$calcClone.css('display') === 'none' || (this.state !== 'slid' && this.state !== 'slide-in')) return

    this.state = null
    this.placement = null
    var elements = this.getCanvasElements()

    this.$element.removeClass('in')

    elements.removeClass('canvas-slid')
    elements.add(this.$element).add('body').each(function() {
      // fix bug where iOS scrolling still occurs
      $(this).attr('style', $(this).data('offcanvas-style')).removeData('offcanvas-style').removeClass('offcanvas-lock')
    })
  }

  OffCanvas.prototype.autohide = function (e) {
    if ($(e.target).closest(this.$element).length === 0) this.hide()
  }

  // OFFCANVAS PLUGIN DEFINITION
  // ==========================

  var old = $.fn.offcanvas

  $.fn.offcanvas = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.offcanvas')
      var options = $.extend({}, OffCanvas.DEFAULTS, $this.data(), typeof option === 'object' && option)

      if (!data) $this.data('bs.offcanvas', (data = new OffCanvas(this, options)))
      if (typeof option === 'string') data[option]()
    })
  }

  $.fn.offcanvas.Constructor = OffCanvas


  // OFFCANVAS NO CONFLICT
  // ====================

  $.fn.offcanvas.noConflict = function () {
    $.fn.offcanvas = old
    return this
  }


  // OFFCANVAS DATA-API
  // =================

  $(document).on('click.bs.offcanvas.data-api', '[data-toggle=offcanvas]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $canvas = $(target)
    var data    = $canvas.data('bs.offcanvas')
    var option  = data ? 'toggle' : $this.data()

    e.stopPropagation()

    if (data) data.toggle()
      else $canvas.offcanvas(option)
  })

}(window.jQuery);

var toggleButtons = $('[data-target="toggle-group"]').find(".btn-toggle");

$(toggleButtons).on('click', function() {
  var currentToggleIndex = $(toggleButtons).index(this);
  $(toggleButtons).removeClass("btn-selected");
  $(toggleButtons).eq(currentToggleIndex).addClass("btn-selected");
});
/**
 * @preserve
 * Project: Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Version: v2.1.3
 * Contributors: Mattia Larentis
 * Dependencies: Bootstrap's Dropdown plugin, jQuery
 * Description: A simple plugin to enable Bootstrap dropdowns to active on hover and provide a nice user experience.
 * License: MIT
 * Homepage: http://cameronspear.com/blog/bootstrap-dropdown-on-hover-plugin/
 */
;(function ($, window, undefined) {
    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();

    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function (options) {
        // don't do anything if touch is supported
        // (plugin causes some issues on mobile)
        if('ontouchstart' in document) return this; // don't want to affect chaining

        // the element we really care about
        // is the dropdown-toggle's parent
        $navtoolDropdowns = $('.navbar-tools .dropdown');
        $searchDropdown = $('.navbar .search-suggest-box');
        $searchInput = $('[data-id="search-input"]');
        /**
         * added navtool dropdowns, so that they are also cleared on hover (TC)
         */
        $allDropdowns = $allDropdowns.add(this.parent()).add($navtoolDropdowns);

        return this.each(function () {
            var $this = $(this),
                $parent = $this.parent(),
                defaults = {
                    delay: 500,
                    hoverDelay: 0,
                    instantlyCloseOthers: true
                },
                data = {
                    delay: $(this).data('delay'),
                    hoverDelay: $(this).data('hover-delay'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                showEvent   = 'show.bs.dropdown',
                hideEvent   = 'hide.bs.dropdown',
                // shownEvent  = 'shown.bs.dropdown',
                // hiddenEvent = 'hidden.bs.dropdown',
                settings = $.extend(true, {}, defaults, options, data),
                timeout, timeoutHover;

            $parent.hover(function (event) {
                // so a neighbor can't open the dropdown
                /**
                 * added handling for hovering over children of target (TC)
                 */
                if(!$parent.hasClass('open') && !$this.has(event.target)) {
                    // stop this event, stop executing any code
                    // in this callback but continue to propagate
                    return true;
                }

                openDropdown(event);
            }, function () {
                // clear timer for hover event
                window.clearTimeout(timeoutHover)
                timeout = window.setTimeout(function () {
                    $this.attr('aria-expanded', 'false');
                    $parent.removeClass('open');
                    $this.trigger(hideEvent);
                }, settings.delay);
            });

            // this helps with button groups!
            $this.hover(function (event) {
                // this helps prevent a double event from firing.
                // see https://github.com/CWSpear/bootstrap-hover-dropdown/issues/55
                if(!$parent.hasClass('open') && !$parent.is(event.target)) {

                    // stop this event, stop executing any code
                    // in this callback but continue to propagate
                    return true;
                }

                openDropdown(event);
            });

            // handle submenus
            $parent.find('.dropdown-submenu').each(function (){
                var $this = $(this);
                var subTimeout;
                $this.hover(function () {
                    window.clearTimeout(subTimeout);
                    $this.children('.dropdown-menu').show();
                    // always close submenu siblings instantly
                    $this.siblings().children('.dropdown-menu').hide();
                }, function () {
                    var $submenu = $this.children('.dropdown-menu');
                    subTimeout = window.setTimeout(function () {
                        $submenu.hide();
                    }, settings.delay);
                });
            });

            function openDropdown(event) {
                // clear dropdown timeout here so it doesnt close before it should
                window.clearTimeout(timeout);
                // restart hover timer
                window.clearTimeout(timeoutHover);

                // delay for hover event.
                timeoutHover = window.setTimeout(function () {
                    $allDropdowns.find(':focus').blur();

                    if(settings.instantlyCloseOthers === true) {
                        $allDropdowns.removeClass('open');
                        $searchDropdown.hide();
                        $searchInput.val('');
                    }

                    // clear timer for hover event
                    window.clearTimeout(timeoutHover);
                    $this.attr('aria-expanded', 'true');
                    $parent.addClass('open');
                    $this.trigger(showEvent);
                }, settings.hoverDelay);
            }
        });
    };

    $(document).ready(function () {
        // apply dropdownHover to all elements with the data-hover="dropdown" attribute
        $('[data-hover="dropdown"]').dropdownHover();
    });
})(jQuery, window);

+function ($) { "use strict";
  var Navbar = function(navMenuElement, navBarElement) {
    // caching elements
    this.$window = $(window);
    this.$body = $('body');
    this.$navMenu = $(navMenuElement);
    this.$navBar = $(navBarElement);
    this.$navBarZero = this.$navBar.find('.navbar-zero');
    this.$slimBar = this.$navBar.find('.navbar-slim');
    this.$navDropdowns = this.$navBar.find('.navbar-nav li');
    this.$navDropdownDismissButton = this.$navBar.find('[data-dismiss="navbar-dropdown"]');
    this.$navMenuProfile = this.$navMenu.find('#navmenu-profile');
    this.$navMenuLogin = this.$navMenu.find('#navmenu-login');
    this.$searchInput = this.$navBar.find('[data-id="search-input"]');
    this.$searchResults = this.$navBar.find('.search-suggest-box');
    this.$searchButton = this.$navBar.find('.navbar-search-btn');
    this.$searchDismissButton = this.$navBar.find('.dismiss-search-btn'); // [data-dismiss="navbar-search"]
    this.$searchDropdown = this.$navBar.find('.navbar-search-btn > .dropdown-toggle');
    this.authorizationId = this.getUrlParam('authorizationId'); // for future use
    this.screenSmMin = '768px';
    this.screenSdMin = '1025px';
    this.screenSmallMediaQuery = window.matchMedia('(min-width: ' + this.screenSmMin + ')');
    this.screenShmediumMediaQuery = window.matchMedia('(min-width: ' + this.screenSdMin + ')');
    this.navBarHeight = null;
    this.slimBarHeight = null;
    this.slimY = null;
    this.dy = null;
    this.dyPrev = 0;
    this.navBarOffsetClass = 'navbar-offset-xs';
    this.didScroll = false;
    this.delta = 5;
    this.scrollDetectRefreshInterval = 250;

    // initialization
    this.setElementSizes();

    // listeners
    this.$window.on('scroll.aia.navbar', function(e) { this.didScroll = true; }.bind(this));
    this.screenSmallMediaQuery.addListener(this.setElementSizes.bind(this));
    this.screenShmediumMediaQuery.addListener(this.setElementSizes.bind(this));
    this.$navDropdownDismissButton.on('click.aia.navbar', this.dismissNavDropdown.bind(this));
    this.$searchInput.on('keyup.aia.navbar', this.searchInputKeyed.bind(this));
    this.$searchButton.on('hidden.bs.dropdown', this.hideSearchResults.bind(this));
    this.$searchButton.on('shown.bs.dropdown', function(e) { this.$searchInput.focus(); }.bind(this));
    this.$searchDismissButton.on('click.aia.navbar', this.dismissSearchDropdown.bind(this));

    // scroll detection timer
    this.checkScrollInterval = setInterval(function() {
      if (this.didScroll) {
        this.hasScrolled();
        this.didScroll = false;
      }
    }.bind(this), this.scrollDetectRefreshInterval);
  }

  Navbar.prototype.dismissNavDropdown = function() {
    this.$navDropdowns.removeClass('open');
  }

  Navbar.prototype.searchInputKeyed = function() {
    var val = this.$searchInput.val();
    /*
    if (val.length > 3) {
      this.$searchResults.show();
    } else {
      this.$searchResults.hide();
    }*/
    if (this.navBarOffsetClass === 'navbar-offset-xs') {
      var height = this.$window.height() - this.navBarHeight - 60; // search bar height;
      if (height > this.$searchResults.height()) {
        this.$searchResults.height(height);
      }
    }
  }

  Navbar.prototype.hideSearchResults = function() {
    this.$searchResults.hide();
    this.$searchInput.val('');
    this.$searchInput.blur();
  }

  Navbar.prototype.dismissSearchDropdown = function(e) {
    this.$searchDropdown.dropdown('toggle');
    e.preventDefault();
  }

  /**
   *  Sticky header functions
   */
  Navbar.prototype.setElementSizes = function() {
    this.navBarHeight = this.$navBar.height();
    this.slimBarHeight = this.$slimBar.height();
    this.slimY = this.navBarHeight - this.slimBarHeight;
	
    if (this.screenShmediumMediaQuery.matches) {
      if (this.$navBarZero.length && this.$navBarZero.is(':visible')) {
        this.navBarOffsetClass = 'navbar-offset-sd-zero';
      } else {
        this.navBarOffsetClass = 'navbar-offset-sd';
      }
    } else if (this.screenSmallMediaQuery.matches) {
      this.navBarOffsetClass = 'navbar-offset-sm';
	} else if ($('body.ie8').length>0) { // added ie targeting
		this.navBarOffsetClass = 'navbar-offset-sd';
    } else {
      this.navBarOffsetClass = 'navbar-offset-xs';
    }
    // if in slim state,
    if ((this.$navBar).hasClass('navbar-fixed-slim')) {
      this.$navBar.removeClass('navbar-offset-xs navbar-offset-sm navbar-offset-sd navbar-offset-sd-zero');
      this.$navBar.addClass(this.navBarOffsetClass);
    }
  }

  Navbar.prototype.hoverExpandNavBar = function() {
    if (this.screenShmediumMediaQuery.matches) {
      this.$navBar.removeClass('navbar-fixed-slim');
      this.$navBar.removeClass('navbar-offset-xs navbar-offset-sm navbar-offset-sd navbar-offset-sd-zero');
      this.$navBar.on('mouseleave.aia.navbar', this.hoverShrinkNavbar.bind(this));
    }
  }

  Navbar.prototype.hoverShrinkNavbar = function() {
    this.$navBar.addClass('navbar-fixed-slim').addClass(this.navBarOffsetClass);
    this.$navBar.off('mouseleave.aia.navbar');
  }

  Navbar.prototype.hasScrolled = function() {
    this.dy = this.$window.scrollTop();
    if (Math.abs(this.dyPrev - this.dy) <= this.delta)
      return;

    if (this.dy > this.dyPrev && this.dy > this.slimY) { // scroll down
      // affix slim nav bar
      this.$navBar.addClass('navbar-fixed-slim').addClass(this.navBarOffsetClass);
      this.$slimBar.on('mouseenter.aia.navbar', this.hoverExpandNavBar.bind(this));
    } else { // scroll up
      if ('ontouchstart' in document.documentElement) { // for touch devices
        // affix fat bar
        this.$navBar.removeClass('navbar-fixed-slim');
        this.$navBar.removeClass('navbar-offset-xs navbar-offset-sm navbar-offset-sd navbar-offset-sd-zero');
        this.$slimBar.off('mouseenter.aia.navbar');
      } else if (this.dy < this.slimY) { // 768 and above
        // slim bar to fat bar
        this.$navBar.removeClass('navbar-fixed-slim');
        this.$navBar.removeClass('navbar-offset-xs navbar-offset-sm navbar-offset-sd navbar-offset-sd-zero');
        this.$slimBar.off('mouseenter.aia.navbar');
      } // else keep slim bar
    }
    this.dyPrev = this.dy;
  }


  /**
   *  Pre/Post login functions
   */
  Navbar.prototype.isLoggedIn = function() {
    var isLoggedIn = typeof this.authorizationId !== 'undefined' &&
      this.authorizationId.length > 0 &&
      this.authorizationId !== 'anonymous';
    return isLoggedIn;
  }

  Navbar.prototype.getUrlParam = function(param) {
    var pageUrl = window.location.search.substring(1);
    var urlVariables = pageUrl.split('&');
    for (var i = 0; i < urlVariables.length; i++)
    {
      var paramName = urlVariables[i].split('=');
      if (paramName[0] == param)
      {
          return paramName[1];
      }
    }
  }

  // PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data  = $this.data('aia.navbar');
      var options = typeof option == 'object' && option;

      if (!data) $this.data('aia.navbar', (data = new Navbar(this, options)));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.navbar;

  $.fn.navbar             = Plugin;
  $.fn.navbar.Constructor = Navbar;


  // NO CONFLICT
  // ===============

  $.fn.navbar.noConflict = function () {
    $.fn.navbar = old;
    return this;
  };


  // DATA-API
  // ============

  var loadNavbarHandler = function() {
    // expect only one instance of navbar
    var $navmenu = $('.navmenu');
    var $navbar = $('.navbar');
    Plugin.call($navmenu, $navbar);
  };

  $(window)
    .on('load.aia.navbar', loadNavbarHandler);
}(jQuery);

$('.premium-timeframe').on('click', function() {
	$('.premium-timeframe').removeClass("red-underline-2px");
	$(this).addClass("red-underline-2px");
  $('#premium-by-timespan-value').text($(this).data("premium"));
});


//inject popup with default value, set initial position, width is not reflected on this.
$(".range-slider input[type=range]").on('touchstart', function(e) {
  var container = $(this)
  ,svg = '<svg class="icon-m hide-on-fallback" role="img" title="accarrowdn-glyph"><use xlink:href="dist/img/icons/icons.svg#accarrowdn-glyph"></use><image class="icon-fallback" src="dist/img/icons/accarrowdn-glyph.png" xlink:href=""></image></svg>'
  ,x = e.originalEvent.touches[0].pageX
  ,bubble = $('<div />', { 'class' : 'bubble' })
      .append($('<div />', { 'class': 'value', 'text' : $(this).val()}))
      .css({left: x})
      .append(svg)
      .insertAfter(container);
});
//update left position offset
$(".range-slider input[type=range]").on('touchmove', function(e) {
  var value= $(this).val()
  ,bubble = $(this).parent().find('.bubble')
  ,x = e.originalEvent.touches[0].pageX;

  bubble.css({left: x - (bubble.outerWidth()/2)});
  bubble.find('.value').text(value);

});
//remove range popup
$(".range-slider input[type=range]").on('touchend', function() {
  $(this).parent().find('.bubble').remove()
});


+function ($) { "use strict";

  // INLINE SEARCHBAR CLASS DEFINITION
  // =========================

	var InlineSearchbar = function(element, options) {
    this.$element = $(element);
    this.options  = options;

    this.$searchInput = $(element).find('input');
    this.$searchSuggestList = $(element).find('[data-id="search-suggest"]');
    this.$searchSuggestListItems = $(element).find('[data-id="search-suggest"] li');

    // listeners
    this.$element.on('keyup.aia.inlinesearchbar', this.keyup.bind(this));
    this.$searchInput.on('keyup.aia.inlinesearchbar', this.didKeySuggestion.bind(this));
    this.$searchInput.on('focusout', this.leave.bind(this));
	};

  InlineSearchbar.VERSION = '1.0';
  InlineSearchbar.DEFAULTS = {};

  InlineSearchbar.prototype.leave = function(e) {
    this.$element.removeClass('open');
    this.$searchSuggestList.hide();
  }

  InlineSearchbar.prototype.keyup = function(e) {
    // 38 up
    // 40 down
    // 27 escape
    // 32 space
    if (!/(38|40|27|32)/.test(e.which)) return;
    var isActive = this.$element.hasClass('open');
    if (!isActive) return;
    if (!this.$searchSuggestListItems.length) return;

    e.preventDefault();
    e.stopPropagation();

    var index = 0;
    if (e.which == 27) {
      this.$element.removeClass('open');
      this.$searchSuggestList.hide();
    }
    // if (this.$searchInput.is(':focus')) {
    //   // debugger;
    //   if (e.which == 38) { // up to last item
    //     index = this.$searchSuggestListItems.length - 1;
    //   }
    //   if (e.which == 40) { // down to first item
    //     index = 0;
    //   }
    // } else { // suggest list is in focus
    //   var index = this.$searchSuggestListItems.index(e.target);
    //   if (e.which == 38 && index > 0) { // up
    //     index--;
    //   }
    //   if (e.which == 40 && this.$searchSuggestListItems.length - 1) { // down to first item
    //     index++;
    //   }
    // }
    // this.$searchSuggestListItems.eq(index).trigger('focus');
  }

  InlineSearchbar.prototype.didKeySuggestion = function(e) {
    // ignore accesibility keys
    if (/(38|40|27)/.test(e.which)) return;

    var val = this.$searchInput.val();
    if (val.length > 4) {
      this.$element.addClass('open');
      this.$searchSuggestList.show();
    } else {
      this.$element.removeClass('open');
      this.$searchSuggestList.hide();
    }
  }

  // PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data  = $this.data('aia.inlinesearchbar');

      if (!data) $this.data('aia.inlinesearchbar', (data = new InlineSearchbar(this)));
      if (typeof option == 'string') data[option](); // option is method call
    })
  }

  var old = $.fn.inlinesearchbar;

  $.fn.inlinesearchbar             = Plugin;
  $.fn.inlinesearchbar.Constructor = InlineSearchbar;


  // NO CONFLICT
  // ===============

  $.fn.inlinesearchbar.noConflict = function () {
    $.fn.inlinesearchbar = old;
    return this;
  };
}(jQuery);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzLmpzIiwibGlzdC0yLmpzIiwib2ZmY2FudmFzLmpzIiwidG9nZ2xlLWJ1dHRvbnMuanMiLCJuYXZiYXIvYm9vdHN0cmFwLWhvdmVyLWRyb3Bkb3duLWN1c3RvbS5qcyIsIm5hdmJhci9uYXZiYXIuanMiLCJwcmVtaXVtLXF1b3RlL3ByZW1pdW0tcXVvdGUuanMiLCJyYW5nZS1zbGlkZXIvcmFuZ2Utc2xpZGVyLmpzIiwiaW5saW5lLXNlYXJjaGJhci9pbmxpbmUtc2VhcmNoYmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdk5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHRyZXNpemVDYXJkcygpO1xuXHR2YXIgc2NyZWVuU21NaW4gPSAnNzY4cHgnO1xuICB2YXIgc2NyZWVuU21hbGxNZWRpYVF1ZXJ5ID0gd2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6ICcgKyBzY3JlZW5TbU1pbiArICcpJyk7XG5cblx0c2NyZWVuU21hbGxNZWRpYVF1ZXJ5LmFkZExpc3RlbmVyKHNjcmVlblNtUmVzaXplKTtcblx0Ly8gQW5kIHNoYXJlIHRoZSBzYW1lIGNvZGUgdG8gc2V0IHRoaW5ncyB1cCB3aXRoIG91ciBjdXJyZW50IHN0YXRlLlxuXHRzY3JlZW5TbVJlc2l6ZShzY3JlZW5TbWFsbE1lZGlhUXVlcnkpO1xuXG5cdGZ1bmN0aW9uIHNjcmVlblNtUmVzaXplKHNjcmVlblNtYWxsTWVkaWFRdWVyeSkge1xuXHQgIGlmIChzY3JlZW5TbWFsbE1lZGlhUXVlcnkubWF0Y2hlcykge1xuXHQgIFx0cmVzaXplQ2FyZHMoKTtcblx0ICB9XG5cdCAgZWxzZSB7XG5cdCAgXHR2YXIgY2FyZHMgPSAkKCdbZGF0YS1pZD1cImNhcmRzXCJdJykuZmluZCgnLmNhcmQtMSwgLmNhcmQtMiwgLmNhcmQtMywgLmNhcmQtNCwgLmNhcmQtNiwgLmNhcmQtOSwgLmNhcmQtMTAsIC5jYXJkLTExLCAuY2FyZC0xMiwgLmNhcmQtYmFubmVyLWRlc2MnKTtcblx0XHRcdHZhciBjYXJkQmFubmVyRGVzYyA9ICQoJ1tkYXRhLWlkPVwiY2FyZHNcIl0nKS5maW5kKCcuY2FyZC1iYW5uZXItZGVzYycpO1xuXG5cdCAgXHQvLyByZXNldHRpbmcgY2FyZCBoZWlnaHRcblx0XHRcdGNhcmRzLmVhY2goZnVuY3Rpb24oaSxlKSB7XG5cdFx0ICBcdCQoZSkuY3NzKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRjYXJkQmFubmVyRGVzYy5lYWNoKGZ1bmN0aW9uKGksZSkge1xuXHRcdCAgXHQkKGUpLmNzcyhcImhlaWdodFwiLCBcImF1dG9cIik7XG5cdFx0XHR9KTtcblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiByZXNpemVDYXJkcygpIHtcblxuXHRcdHZhciBtYXhIZWlnaHQgPSAwO1xuXHRcdHZhciBjYXJkcyA9ICQoJ1tkYXRhLWlkPVwiY2FyZHNcIl0nKS5maW5kKCcuY2FyZC0xLCAuY2FyZC0yLCAuY2FyZC0zLCAuY2FyZC00LCAuY2FyZC02LCAuY2FyZC05LCAuY2FyZC0xMCwgLmNhcmQtMTEsIC5jYXJkLTEyJyk7XG5cdFx0dmFyIG1heENhcmRCYW5uZXJEZXNjSGVpZ2h0ID0gMDtcblx0XHR2YXIgY2FyZEJhbm5lckRlc2MgPSAkKCdbZGF0YS1pZD1cImNhcmRzXCJdJykuZmluZCgnLmNhcmQtYmFubmVyLWRlc2MnKTtcblxuXHRcdC8vIGNvbnNvbGUubG9nKHdpbmRvdy5vdXRlcldpZHRoKTtcblxuXHRcdGNhcmRzLmVhY2goZnVuY3Rpb24oaSxlKSB7XG5cdFx0ICBpZiAoJChlKS5oZWlnaHQoKSA+IG1heEhlaWdodCkge1xuXHRcdCAgXHRtYXhIZWlnaHQgPSAkKGUpLmhlaWdodCgpO1xuXHRcdCAgfTtcblx0XHR9KTtcblxuXHRcdGNhcmRzLmVhY2goZnVuY3Rpb24oaSxlKSB7XG5cdFx0ICAkKGUpLmhlaWdodChtYXhIZWlnaHQpO1xuXHRcdH0pO1xuXG5cdFx0Y2FyZEJhbm5lckRlc2MuZWFjaChmdW5jdGlvbihpLGUpIHtcblx0XHQgIGlmICgkKGUpLmhlaWdodCgpID4gbWF4Q2FyZEJhbm5lckRlc2NIZWlnaHQpIHtcblx0XHQgIFx0bWF4Q2FyZEJhbm5lckRlc2NIZWlnaHQgPSAkKGUpLmhlaWdodCgpO1xuXHRcdCAgfTtcblx0XHR9KTtcblx0XHRjYXJkQmFubmVyRGVzYy5lYWNoKGZ1bmN0aW9uKGksZSkge1xuXHRcdCAgJChlKS5oZWlnaHQobWF4Q2FyZEJhbm5lckRlc2NIZWlnaHQpO1xuXHRcdH0pO1xuXHR9XG59KTtcbiIsIitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gTElTVCAyIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuICB2YXIgTGlzdDIgICA9IGZ1bmN0aW9uIChlbCkge1xuICAgICQoZWwpLm9uKCdjbGljaycsICdbZGF0YS1kaXNtaXNzPVwibGlzdC0yXCJdJywgdGhpcy5jbG9zZSlcbiAgfVxuXG4gIExpc3QyLlZFUlNJT04gPSAnMS4wJztcblxuICBMaXN0Mi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciAkdGhpcyAgICA9ICQodGhpcyk7XG5cbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyICRwYXJlbnQgPSAkdGhpcy5jbG9zZXN0KCdsaScpO1xuXG4gICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdjbG9zZS5haWEubGlzdC0yJykpO1xuXG4gICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVybjtcblxuICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2luJyk7XG5cbiAgICBmdW5jdGlvbiByZW1vdmVFbGVtZW50KCkge1xuICAgICAgLy8gZGV0YWNoIGZyb20gcGFyZW50LCBmaXJlIGV2ZW50IHRoZW4gY2xlYW4gdXAgZGF0YVxuICAgICAgJHBhcmVudC5kZXRhY2goKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiAkcGFyZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgJHBhcmVudFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCByZW1vdmVFbGVtZW50KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTGlzdDIuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgcmVtb3ZlRWxlbWVudCgpXG4gIH1cblxuXG4gIC8vIExpc3QgMiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICB2YXIgZGF0YSAgPSAkdGhpcy5kYXRhKCdicy5saXN0LTInKTtcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5saXN0LTInLCAoZGF0YSA9IG5ldyBMaXN0Mih0aGlzKSkpO1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXS5jYWxsKCR0aGlzKTtcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uYWxlcnRcblxuICAkLmZuLmFsZXJ0ICAgICAgICAgICAgID0gUGx1Z2luO1xuICAkLmZuLmFsZXJ0LkNvbnN0cnVjdG9yID0gTGlzdDI7XG5cblxuICAvLyBMSVNUIDIgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmFsZXJ0Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5hbGVydCA9IG9sZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cbiAgLy8gTElTVCAyIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09XG5cbiAgJCgnLmxpc3QtMiA+IGxpJykub24oJ2NsaWNrLmJzLmxpc3QtMi5kYXRhLWFwaScsICdbZGF0YS1kaXNtaXNzPVwibGlzdC0yXCJdJywgTGlzdDIucHJvdG90eXBlLmNsb3NlKTtcbn0oalF1ZXJ5KTtcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBvZmZjYW52YXMuanMgdjMuMS4zXG4gKiBodHRwOi8vamFzbnkuZ2l0aHViLmlvL2Jvb3RzdHJhcC9qYXZhc2NyaXB0LyNvZmZjYW52YXNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCBBcm5vbGQgRGFuaWVsc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIilcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuK2Z1bmN0aW9uICgkKSB7IFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIE9GRkNBTlZBUyBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgT2ZmQ2FudmFzID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gJChlbGVtZW50KVxuICAgIHRoaXMub3B0aW9ucyAgPSAkLmV4dGVuZCh7fSwgT2ZmQ2FudmFzLkRFRkFVTFRTLCBvcHRpb25zKVxuICAgIHRoaXMuc3RhdGUgICAgPSBudWxsXG4gICAgdGhpcy5wbGFjZW1lbnQgPSBudWxsXG4gICAgLy8gVENcbiAgICB0aGlzLiRjYW52YXNCYWNrZHJvcCA9ICQoJy5uYXZtZW51LWJhY2tkcm9wJyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlY2FsYykge1xuICAgICAgdGhpcy5jYWxjQ2xvbmUoKVxuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCAkLnByb3h5KHRoaXMucmVjYWxjLCB0aGlzKSlcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvaGlkZSlcbiAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5hdXRvaGlkZSwgdGhpcykpXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRvZ2dsZSkgdGhpcy50b2dnbGUoKVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlc2Nyb2xsaW5nKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5kaXNhYmxlU2Nyb2xsaW5nID0gdGhpcy5vcHRpb25zLmRpc2FibGVzY3JvbGxpbmdcbiAgICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5kaXNhYmxlc2Nyb2xsaW5nXG4gICAgfVxuICB9XG5cbiAgT2ZmQ2FudmFzLkRFRkFVTFRTID0ge1xuICAgIHRvZ2dsZTogdHJ1ZSxcbiAgICBwbGFjZW1lbnQ6ICdhdXRvJyxcbiAgICBhdXRvaGlkZTogdHJ1ZSxcbiAgICByZWNhbGM6IHRydWUsXG4gICAgZGlzYWJsZVNjcm9sbGluZzogdHJ1ZVxuICB9XG5cbiAgT2ZmQ2FudmFzLnByb3RvdHlwZS5vZmZzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgc3dpdGNoICh0aGlzLnBsYWNlbWVudCkge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICBjYXNlICdyaWdodCc6ICByZXR1cm4gdGhpcy4kZWxlbWVudC5vdXRlcldpZHRoKClcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICBjYXNlICdib3R0b20nOiByZXR1cm4gdGhpcy4kZWxlbWVudC5vdXRlckhlaWdodCgpXG4gICAgfVxuICB9XG5cbiAgT2ZmQ2FudmFzLnByb3RvdHlwZS5jYWxjUGxhY2VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucGxhY2VtZW50ICE9PSAnYXV0bycpIHtcbiAgICAgICAgdGhpcy5wbGFjZW1lbnQgPSB0aGlzLm9wdGlvbnMucGxhY2VtZW50XG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5jc3MoJ3Zpc2libGl0eScsICdoaWRkZW4gIWltcG9ydGFudCcpLmFkZENsYXNzKCdpbicpXG4gICAgfVxuXG4gICAgdmFyIGhvcml6b250YWwgPSAkKHdpbmRvdykud2lkdGgoKSAvIHRoaXMuJGVsZW1lbnQud2lkdGgoKVxuICAgIHZhciB2ZXJ0aWNhbCA9ICQod2luZG93KS5oZWlnaHQoKSAvIHRoaXMuJGVsZW1lbnQuaGVpZ2h0KClcblxuICAgIHZhciBlbGVtZW50ID0gdGhpcy4kZWxlbWVudFxuICAgIGZ1bmN0aW9uIGFiKGEsIGIpIHtcbiAgICAgIGlmIChlbGVtZW50LmNzcyhiKSA9PT0gJ2F1dG8nKSByZXR1cm4gYVxuICAgICAgaWYgKGVsZW1lbnQuY3NzKGEpID09PSAnYXV0bycpIHJldHVybiBiXG5cbiAgICAgIHZhciBzaXplX2EgPSBwYXJzZUludChlbGVtZW50LmNzcyhhKSwgMTApXG4gICAgICB2YXIgc2l6ZV9iID0gcGFyc2VJbnQoZWxlbWVudC5jc3MoYiksIDEwKVxuXG4gICAgICByZXR1cm4gc2l6ZV9hID4gc2l6ZV9iID8gYiA6IGFcbiAgICB9XG5cbiAgICB0aGlzLnBsYWNlbWVudCA9IGhvcml6b250YWwgPj0gdmVydGljYWwgPyBhYignbGVmdCcsICdyaWdodCcpIDogYWIoJ3RvcCcsICdib3R0b20nKVxuXG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuY3NzKCd2aXNpYmlsaXR5JykgPT09ICdoaWRkZW4gIWltcG9ydGFudCcpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2luJykuY3NzKCd2aXNpYmxpdHknLCAnJylcbiAgICB9XG4gIH1cblxuICBPZmZDYW52YXMucHJvdG90eXBlLm9wcG9zaXRlID0gZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgIHN3aXRjaCAocGxhY2VtZW50KSB7XG4gICAgICBjYXNlICd0b3AnOiAgICByZXR1cm4gJ2JvdHRvbSdcbiAgICAgIGNhc2UgJ2xlZnQnOiAgIHJldHVybiAncmlnaHQnXG4gICAgICBjYXNlICdib3R0b20nOiByZXR1cm4gJ3RvcCdcbiAgICAgIGNhc2UgJ3JpZ2h0JzogIHJldHVybiAnbGVmdCdcbiAgICB9XG4gIH1cblxuICBPZmZDYW52YXMucHJvdG90eXBlLmdldENhbnZhc0VsZW1lbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gUmV0dXJuIGEgc2V0IGNvbnRhaW5pbmcgdGhlIGNhbnZhcyBwbHVzIGFsbCBmaXhlZCBlbGVtZW50c1xuICAgIHZhciBjYW52YXMgPSB0aGlzLm9wdGlvbnMuY2FudmFzID8gJCh0aGlzLm9wdGlvbnMuY2FudmFzKSA6IHRoaXMuJGVsZW1lbnRcblxuICAgIHZhciBmaXhlZF9lbGVtZW50cyA9IGNhbnZhcy5maW5kKCcqJykuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICQodGhpcykuY3NzKCdwb3NpdGlvbicpID09PSAnZml4ZWQnXG4gICAgfSkubm90KHRoaXMub3B0aW9ucy5leGNsdWRlKVxuXG4gICAgcmV0dXJuIGNhbnZhcy5hZGQoZml4ZWRfZWxlbWVudHMpXG4gIH1cblxuICBPZmZDYW52YXMucHJvdG90eXBlLnNsaWRlID0gZnVuY3Rpb24gKGVsZW1lbnRzLCBvZmZzZXQsIGNhbGxiYWNrKSB7XG4gICAgLy8gVXNlIGpRdWVyeSBhbmltYXRpb24gaWYgQ1NTIHRyYW5zaXRpb25zIGFyZW4ndCBzdXBwb3J0ZWRcbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSB7XG4gICAgICB2YXIgYW5pbSA9IHt9XG4gICAgICBhbmltW3RoaXMucGxhY2VtZW50XSA9IFwiKz1cIiArIG9mZnNldFxuICAgICAgcmV0dXJuIGVsZW1lbnRzLmFuaW1hdGUoYW5pbSwgMzUwLCBjYWxsYmFjaylcbiAgICB9XG5cbiAgICB2YXIgcGxhY2VtZW50ID0gdGhpcy5wbGFjZW1lbnRcbiAgICB2YXIgb3Bwb3NpdGUgPSB0aGlzLm9wcG9zaXRlKHBsYWNlbWVudClcblxuICAgIGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJCh0aGlzKS5jc3MocGxhY2VtZW50KSAhPT0gJ2F1dG8nKVxuICAgICAgICAkKHRoaXMpLmNzcyhwbGFjZW1lbnQsIChwYXJzZUludCgkKHRoaXMpLmNzcyhwbGFjZW1lbnQpLCAxMCkgfHwgMCkgKyBvZmZzZXQpXG5cbiAgICAgIGlmICgkKHRoaXMpLmNzcyhvcHBvc2l0ZSkgIT09ICdhdXRvJylcbiAgICAgICAgJCh0aGlzKS5jc3Mob3Bwb3NpdGUsIChwYXJzZUludCgkKHRoaXMpLmNzcyhvcHBvc2l0ZSksIDEwKSB8fCAwKSAtIG9mZnNldClcbiAgICB9KVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLm9uZSgkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsIGNhbGxiYWNrKVxuICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKDM1MClcbiAgfVxuXG4gIE9mZkNhbnZhcy5wcm90b3R5cGUuZGlzYWJsZVNjcm9sbGluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBib2R5V2lkdGggPSAkKCdib2R5Jykud2lkdGgoKVxuICAgIHZhciBwcm9wID0gJ3BhZGRpbmctJyArIHRoaXMub3Bwb3NpdGUodGhpcy5wbGFjZW1lbnQpXG5cbiAgICBpZiAoJCgnYm9keScpLmRhdGEoJ29mZmNhbnZhcy1zdHlsZScpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICQoJ2JvZHknKS5kYXRhKCdvZmZjYW52YXMtc3R5bGUnLCAkKCdib2R5JykuYXR0cignc3R5bGUnKSB8fCAnJylcbiAgICB9XG5cbiAgICAvLyBmaXggYnVnIHdoZXJlIGlPUyBzY3JvbGxpbmcgc3RpbGwgb2NjdXJzXG4gICAgLy8gJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJylcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ29mZmNhbnZhcy1sb2NrJykuY3NzKCdwb3NpdGlvbicsICdmaXhlZCcpXG4gICAgLy8gJCgnYm9keScpLmFkZENsYXNzKCdvZmZjYW52YXMtbG9jaycpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJylcblxuICAgIGlmICgkKCdib2R5Jykud2lkdGgoKSA+IGJvZHlXaWR0aCkge1xuICAgICAgdmFyIHBhZGRpbmcgPSBwYXJzZUludCgkKCdib2R5JykuY3NzKHByb3ApLCAxMCkgKyAkKCdib2R5Jykud2lkdGgoKSAtIGJvZHlXaWR0aFxuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCdib2R5JykuY3NzKHByb3AsIHBhZGRpbmcpXG4gICAgICB9LCAxKVxuICAgIH1cbiAgfVxuXG4gIE9mZkNhbnZhcy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSkgcmV0dXJuXG5cbiAgICB2YXIgc3RhcnRFdmVudCA9ICQuRXZlbnQoJ3Nob3cuYnMub2ZmY2FudmFzJylcbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoc3RhcnRFdmVudClcbiAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICB0aGlzLnN0YXRlID0gJ3NsaWRlLWluJ1xuICAgIHRoaXMuY2FsY1BsYWNlbWVudCgpO1xuXG4gICAgdmFyIGVsZW1lbnRzID0gdGhpcy5nZXRDYW52YXNFbGVtZW50cygpXG4gICAgdmFyIHBsYWNlbWVudCA9IHRoaXMucGxhY2VtZW50XG4gICAgdmFyIG9wcG9zaXRlID0gdGhpcy5vcHBvc2l0ZShwbGFjZW1lbnQpXG4gICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0KClcblxuICAgIGlmIChlbGVtZW50cy5pbmRleCh0aGlzLiRlbGVtZW50KSAhPT0gLTEpIHtcbiAgICAgICQodGhpcy4kZWxlbWVudCkuZGF0YSgnb2ZmY2FudmFzLXN0eWxlJywgJCh0aGlzLiRlbGVtZW50KS5hdHRyKCdzdHlsZScpIHx8ICcnKVxuICAgICAgdGhpcy4kZWxlbWVudC5jc3MocGxhY2VtZW50LCAtMSAqIG9mZnNldClcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKHBsYWNlbWVudCk7IC8vIFdvcmthcm91bmQ6IE5lZWQgdG8gZ2V0IHRoZSBDU1MgcHJvcGVydHkgZm9yIGl0IHRvIGJlIGFwcGxpZWQgYmVmb3JlIHRoZSBuZXh0IGxpbmUgb2YgY29kZVxuICAgIH1cblxuICAgIGVsZW1lbnRzLmFkZENsYXNzKCdjYW52YXMtc2xpZGluZycpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJCh0aGlzKS5kYXRhKCdvZmZjYW52YXMtc3R5bGUnKSA9PT0gdW5kZWZpbmVkKSAkKHRoaXMpLmRhdGEoJ29mZmNhbnZhcy1zdHlsZScsICQodGhpcykuYXR0cignc3R5bGUnKSB8fCAnJylcbiAgICAgIGlmICgkKHRoaXMpLmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpICQodGhpcykuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpXG4gICAgICBpZiAoKCQodGhpcykuY3NzKHBsYWNlbWVudCkgPT09ICdhdXRvJyB8fCAkKHRoaXMpLmNzcyhwbGFjZW1lbnQpID09PSAnMHB4JykgJiZcbiAgICAgICAgICAoJCh0aGlzKS5jc3Mob3Bwb3NpdGUpID09PSAnYXV0bycgfHwgJCh0aGlzKS5jc3Mob3Bwb3NpdGUpID09PSAnMHB4JykpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MocGxhY2VtZW50LCAwKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVTY3JvbGxpbmcpIHRoaXMuZGlzYWJsZVNjcm9sbGluZygpXG5cbiAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZSAhPSAnc2xpZGUtaW4nKSByZXR1cm5cblxuICAgICAgdGhpcy5zdGF0ZSA9ICdzbGlkJ1xuXG4gICAgICBlbGVtZW50cy5yZW1vdmVDbGFzcygnY2FudmFzLXNsaWRpbmcnKS5hZGRDbGFzcygnY2FudmFzLXNsaWQnKVxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdzaG93bi5icy5vZmZjYW52YXMnKVxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoJC5wcm94eShmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2luJylcbiAgICAgIHRoaXMuc2xpZGUoZWxlbWVudHMsIG9mZnNldCwgJC5wcm94eShjb21wbGV0ZSwgdGhpcykpXG4gICAgfSwgdGhpcyksIDEpXG4gIH1cblxuICBPZmZDYW52YXMucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoZmFzdCkge1xuICAgIGlmICh0aGlzLnN0YXRlICE9PSAnc2xpZCcpIHJldHVyblxuXG4gICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KCdoaWRlLmJzLm9mZmNhbnZhcycpXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHN0YXJ0RXZlbnQpXG4gICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5zdGF0ZSA9ICdzbGlkZS1vdXQnXG5cbiAgICB2YXIgZWxlbWVudHMgPSAkKCcuY2FudmFzLXNsaWQnKVxuICAgIHZhciBwbGFjZW1lbnQgPSB0aGlzLnBsYWNlbWVudFxuICAgIHZhciBvZmZzZXQgPSAtMSAqIHRoaXMub2Zmc2V0KClcblxuICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlICE9ICdzbGlkZS1vdXQnKSByZXR1cm5cblxuICAgICAgdGhpcy5zdGF0ZSA9IG51bGxcbiAgICAgIHRoaXMucGxhY2VtZW50ID0gbnVsbFxuXG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpbicpXG5cbiAgICAgIGVsZW1lbnRzLnJlbW92ZUNsYXNzKCdjYW52YXMtc2xpZGluZycpXG4gICAgICBlbGVtZW50cy5hZGQodGhpcy4kZWxlbWVudCkuYWRkKCdib2R5JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gZml4IGJ1ZyB3aGVyZSBpT1Mgc2Nyb2xsaW5nIHN0aWxsIG9jY3Vyc1xuICAgICAgICAkKHRoaXMpLmF0dHIoJ3N0eWxlJywgJCh0aGlzKS5kYXRhKCdvZmZjYW52YXMtc3R5bGUnKSkucmVtb3ZlRGF0YSgnb2ZmY2FudmFzLXN0eWxlJykucmVtb3ZlQ2xhc3MoJ29mZmNhbnZhcy1sb2NrJylcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignaGlkZGVuLmJzLm9mZmNhbnZhcycpXG4gICAgfVxuXG4gICAgZWxlbWVudHMucmVtb3ZlQ2xhc3MoJ2NhbnZhcy1zbGlkJykuYWRkQ2xhc3MoJ2NhbnZhcy1zbGlkaW5nJylcblxuICAgIHNldFRpbWVvdXQoJC5wcm94eShmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc2xpZGUoZWxlbWVudHMsIG9mZnNldCwgJC5wcm94eShjb21wbGV0ZSwgdGhpcykpXG4gICAgfSwgdGhpcyksIDEpXG4gIH1cblxuICBPZmZDYW52YXMucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ3NsaWRlLWluJyB8fCB0aGlzLnN0YXRlID09PSAnc2xpZGUtb3V0JykgcmV0dXJuXG4gICAgdGhpc1t0aGlzLnN0YXRlID09PSAnc2xpZCcgPyAnaGlkZScgOiAnc2hvdyddKClcbiAgfVxuXG4gIE9mZkNhbnZhcy5wcm90b3R5cGUuY2FsY0Nsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kY2FsY0Nsb25lID0gdGhpcy4kZWxlbWVudC5jbG9uZSgpXG4gICAgICAuaHRtbCgnJylcbiAgICAgIC5hZGRDbGFzcygnb2ZmY2FudmFzLWNsb25lJykucmVtb3ZlQ2xhc3MoJ2luJylcbiAgICAgIC5hcHBlbmRUbygkKCdib2R5JykpXG4gIH1cblxuICBPZmZDYW52YXMucHJvdG90eXBlLnJlY2FsYyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy4kY2FsY0Nsb25lLmNzcygnZGlzcGxheScpID09PSAnbm9uZScgfHwgKHRoaXMuc3RhdGUgIT09ICdzbGlkJyAmJiB0aGlzLnN0YXRlICE9PSAnc2xpZGUtaW4nKSkgcmV0dXJuXG5cbiAgICB0aGlzLnN0YXRlID0gbnVsbFxuICAgIHRoaXMucGxhY2VtZW50ID0gbnVsbFxuICAgIHZhciBlbGVtZW50cyA9IHRoaXMuZ2V0Q2FudmFzRWxlbWVudHMoKVxuXG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgZWxlbWVudHMucmVtb3ZlQ2xhc3MoJ2NhbnZhcy1zbGlkJylcbiAgICBlbGVtZW50cy5hZGQodGhpcy4kZWxlbWVudCkuYWRkKCdib2R5JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIC8vIGZpeCBidWcgd2hlcmUgaU9TIHNjcm9sbGluZyBzdGlsbCBvY2N1cnNcbiAgICAgICQodGhpcykuYXR0cignc3R5bGUnLCAkKHRoaXMpLmRhdGEoJ29mZmNhbnZhcy1zdHlsZScpKS5yZW1vdmVEYXRhKCdvZmZjYW52YXMtc3R5bGUnKS5yZW1vdmVDbGFzcygnb2ZmY2FudmFzLWxvY2snKVxuICAgIH0pXG4gIH1cblxuICBPZmZDYW52YXMucHJvdG90eXBlLmF1dG9oaWRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCh0aGlzLiRlbGVtZW50KS5sZW5ndGggPT09IDApIHRoaXMuaGlkZSgpXG4gIH1cblxuICAvLyBPRkZDQU5WQVMgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgb2xkID0gJC5mbi5vZmZjYW52YXNcblxuICAkLmZuLm9mZmNhbnZhcyA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5vZmZjYW52YXMnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgT2ZmQ2FudmFzLkRFRkFVTFRTLCAkdGhpcy5kYXRhKCksIHR5cGVvZiBvcHRpb24gPT09ICdvYmplY3QnICYmIG9wdGlvbilcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5vZmZjYW52YXMnLCAoZGF0YSA9IG5ldyBPZmZDYW52YXModGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oKVxuICAgIH0pXG4gIH1cblxuICAkLmZuLm9mZmNhbnZhcy5Db25zdHJ1Y3RvciA9IE9mZkNhbnZhc1xuXG5cbiAgLy8gT0ZGQ0FOVkFTIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5vZmZjYW52YXMubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLm9mZmNhbnZhcyA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIE9GRkNBTlZBUyBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5vZmZjYW52YXMuZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlPW9mZmNhbnZhc10nLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKSwgaHJlZlxuICAgIHZhciB0YXJnZXQgID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKVxuICAgICAgICB8fCBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgfHwgKGhyZWYgPSAkdGhpcy5hdHRyKCdocmVmJykpICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpIC8vc3RyaXAgZm9yIGllN1xuICAgIHZhciAkY2FudmFzID0gJCh0YXJnZXQpXG4gICAgdmFyIGRhdGEgICAgPSAkY2FudmFzLmRhdGEoJ2JzLm9mZmNhbnZhcycpXG4gICAgdmFyIG9wdGlvbiAgPSBkYXRhID8gJ3RvZ2dsZScgOiAkdGhpcy5kYXRhKClcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIGlmIChkYXRhKSBkYXRhLnRvZ2dsZSgpXG4gICAgICBlbHNlICRjYW52YXMub2ZmY2FudmFzKG9wdGlvbilcbiAgfSlcblxufSh3aW5kb3cualF1ZXJ5KTtcbiIsInZhciB0b2dnbGVCdXR0b25zID0gJCgnW2RhdGEtdGFyZ2V0PVwidG9nZ2xlLWdyb3VwXCJdJykuZmluZChcIi5idG4tdG9nZ2xlXCIpO1xuXG4kKHRvZ2dsZUJ1dHRvbnMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICB2YXIgY3VycmVudFRvZ2dsZUluZGV4ID0gJCh0b2dnbGVCdXR0b25zKS5pbmRleCh0aGlzKTtcbiAgJCh0b2dnbGVCdXR0b25zKS5yZW1vdmVDbGFzcyhcImJ0bi1zZWxlY3RlZFwiKTtcbiAgJCh0b2dnbGVCdXR0b25zKS5lcShjdXJyZW50VG9nZ2xlSW5kZXgpLmFkZENsYXNzKFwiYnRuLXNlbGVjdGVkXCIpO1xufSk7IiwiLyoqXG4gKiBAcHJlc2VydmVcbiAqIFByb2plY3Q6IEJvb3RzdHJhcCBIb3ZlciBEcm9wZG93blxuICogQXV0aG9yOiBDYW1lcm9uIFNwZWFyXG4gKiBWZXJzaW9uOiB2Mi4xLjNcbiAqIENvbnRyaWJ1dG9yczogTWF0dGlhIExhcmVudGlzXG4gKiBEZXBlbmRlbmNpZXM6IEJvb3RzdHJhcCdzIERyb3Bkb3duIHBsdWdpbiwgalF1ZXJ5XG4gKiBEZXNjcmlwdGlvbjogQSBzaW1wbGUgcGx1Z2luIHRvIGVuYWJsZSBCb290c3RyYXAgZHJvcGRvd25zIHRvIGFjdGl2ZSBvbiBob3ZlciBhbmQgcHJvdmlkZSBhIG5pY2UgdXNlciBleHBlcmllbmNlLlxuICogTGljZW5zZTogTUlUXG4gKiBIb21lcGFnZTogaHR0cDovL2NhbWVyb25zcGVhci5jb20vYmxvZy9ib290c3RyYXAtZHJvcGRvd24tb24taG92ZXItcGx1Z2luL1xuICovXG47KGZ1bmN0aW9uICgkLCB3aW5kb3csIHVuZGVmaW5lZCkge1xuICAgIC8vIG91dHNpZGUgdGhlIHNjb3BlIG9mIHRoZSBqUXVlcnkgcGx1Z2luIHRvXG4gICAgLy8ga2VlcCB0cmFjayBvZiBhbGwgZHJvcGRvd25zXG4gICAgdmFyICRhbGxEcm9wZG93bnMgPSAkKCk7XG5cbiAgICAvLyBpZiBpbnN0YW50bHlDbG9zZU90aGVycyBpcyB0cnVlLCB0aGVuIGl0IHdpbGwgaW5zdGFudGx5XG4gICAgLy8gc2h1dCBvdGhlciBuYXYgaXRlbXMgd2hlbiBhIG5ldyBvbmUgaXMgaG92ZXJlZCBvdmVyXG4gICAgJC5mbi5kcm9wZG93bkhvdmVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gZG9uJ3QgZG8gYW55dGhpbmcgaWYgdG91Y2ggaXMgc3VwcG9ydGVkXG4gICAgICAgIC8vIChwbHVnaW4gY2F1c2VzIHNvbWUgaXNzdWVzIG9uIG1vYmlsZSlcbiAgICAgICAgaWYoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQpIHJldHVybiB0aGlzOyAvLyBkb24ndCB3YW50IHRvIGFmZmVjdCBjaGFpbmluZ1xuXG4gICAgICAgIC8vIHRoZSBlbGVtZW50IHdlIHJlYWxseSBjYXJlIGFib3V0XG4gICAgICAgIC8vIGlzIHRoZSBkcm9wZG93bi10b2dnbGUncyBwYXJlbnRcbiAgICAgICAgJG5hdnRvb2xEcm9wZG93bnMgPSAkKCcubmF2YmFyLXRvb2xzIC5kcm9wZG93bicpO1xuICAgICAgICAkc2VhcmNoRHJvcGRvd24gPSAkKCcubmF2YmFyIC5zZWFyY2gtc3VnZ2VzdC1ib3gnKTtcbiAgICAgICAgJHNlYXJjaElucHV0ID0gJCgnW2RhdGEtaWQ9XCJzZWFyY2gtaW5wdXRcIl0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFkZGVkIG5hdnRvb2wgZHJvcGRvd25zLCBzbyB0aGF0IHRoZXkgYXJlIGFsc28gY2xlYXJlZCBvbiBob3ZlciAoVEMpXG4gICAgICAgICAqL1xuICAgICAgICAkYWxsRHJvcGRvd25zID0gJGFsbERyb3Bkb3ducy5hZGQodGhpcy5wYXJlbnQoKSkuYWRkKCRuYXZ0b29sRHJvcGRvd25zKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgJHBhcmVudCA9ICR0aGlzLnBhcmVudCgpLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgICAgICBkZWxheTogNTAwLFxuICAgICAgICAgICAgICAgICAgICBob3ZlckRlbGF5OiAwLFxuICAgICAgICAgICAgICAgICAgICBpbnN0YW50bHlDbG9zZU90aGVyczogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGVsYXk6ICQodGhpcykuZGF0YSgnZGVsYXknKSxcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJEZWxheTogJCh0aGlzKS5kYXRhKCdob3Zlci1kZWxheScpLFxuICAgICAgICAgICAgICAgICAgICBpbnN0YW50bHlDbG9zZU90aGVyczogJCh0aGlzKS5kYXRhKCdjbG9zZS1vdGhlcnMnKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2hvd0V2ZW50ICAgPSAnc2hvdy5icy5kcm9wZG93bicsXG4gICAgICAgICAgICAgICAgaGlkZUV2ZW50ICAgPSAnaGlkZS5icy5kcm9wZG93bicsXG4gICAgICAgICAgICAgICAgLy8gc2hvd25FdmVudCAgPSAnc2hvd24uYnMuZHJvcGRvd24nLFxuICAgICAgICAgICAgICAgIC8vIGhpZGRlbkV2ZW50ID0gJ2hpZGRlbi5icy5kcm9wZG93bicsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMsIGRhdGEpLFxuICAgICAgICAgICAgICAgIHRpbWVvdXQsIHRpbWVvdXRIb3ZlcjtcblxuICAgICAgICAgICAgJHBhcmVudC5ob3ZlcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBzbyBhIG5laWdoYm9yIGNhbid0IG9wZW4gdGhlIGRyb3Bkb3duXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogYWRkZWQgaGFuZGxpbmcgZm9yIGhvdmVyaW5nIG92ZXIgY2hpbGRyZW4gb2YgdGFyZ2V0IChUQylcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZighJHBhcmVudC5oYXNDbGFzcygnb3BlbicpICYmICEkdGhpcy5oYXMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzdG9wIHRoaXMgZXZlbnQsIHN0b3AgZXhlY3V0aW5nIGFueSBjb2RlXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIHRoaXMgY2FsbGJhY2sgYnV0IGNvbnRpbnVlIHRvIHByb3BhZ2F0ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvcGVuRHJvcGRvd24oZXZlbnQpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIGNsZWFyIHRpbWVyIGZvciBob3ZlciBldmVudFxuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dEhvdmVyKVxuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy50cmlnZ2VyKGhpZGVFdmVudCk7XG4gICAgICAgICAgICAgICAgfSwgc2V0dGluZ3MuZGVsYXkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHRoaXMgaGVscHMgd2l0aCBidXR0b24gZ3JvdXBzIVxuICAgICAgICAgICAgJHRoaXMuaG92ZXIoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBoZWxwcyBwcmV2ZW50IGEgZG91YmxlIGV2ZW50IGZyb20gZmlyaW5nLlxuICAgICAgICAgICAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vQ1dTcGVhci9ib290c3RyYXAtaG92ZXItZHJvcGRvd24vaXNzdWVzLzU1XG4gICAgICAgICAgICAgICAgaWYoISRwYXJlbnQuaGFzQ2xhc3MoJ29wZW4nKSAmJiAhJHBhcmVudC5pcyhldmVudC50YXJnZXQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc3RvcCB0aGlzIGV2ZW50LCBzdG9wIGV4ZWN1dGluZyBhbnkgY29kZVxuICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGlzIGNhbGxiYWNrIGJ1dCBjb250aW51ZSB0byBwcm9wYWdhdGVcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb3BlbkRyb3Bkb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgc3VibWVudXNcbiAgICAgICAgICAgICRwYXJlbnQuZmluZCgnLmRyb3Bkb3duLXN1Ym1lbnUnKS5lYWNoKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIHN1YlRpbWVvdXQ7XG4gICAgICAgICAgICAgICAgJHRoaXMuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHN1YlRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5jaGlsZHJlbignLmRyb3Bkb3duLW1lbnUnKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFsd2F5cyBjbG9zZSBzdWJtZW51IHNpYmxpbmdzIGluc3RhbnRseVxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5zaWJsaW5ncygpLmNoaWxkcmVuKCcuZHJvcGRvd24tbWVudScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkc3VibWVudSA9ICR0aGlzLmNoaWxkcmVuKCcuZHJvcGRvd24tbWVudScpO1xuICAgICAgICAgICAgICAgICAgICBzdWJUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN1Ym1lbnUuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCBzZXR0aW5ncy5kZWxheSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgZHJvcGRvd24gdGltZW91dCBoZXJlIHNvIGl0IGRvZXNudCBjbG9zZSBiZWZvcmUgaXQgc2hvdWxkXG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAvLyByZXN0YXJ0IGhvdmVyIHRpbWVyXG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0SG92ZXIpO1xuXG4gICAgICAgICAgICAgICAgLy8gZGVsYXkgZm9yIGhvdmVyIGV2ZW50LlxuICAgICAgICAgICAgICAgIHRpbWVvdXRIb3ZlciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJGFsbERyb3Bkb3ducy5maW5kKCc6Zm9jdXMnKS5ibHVyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MuaW5zdGFudGx5Q2xvc2VPdGhlcnMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRhbGxEcm9wZG93bnMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWFyY2hEcm9wZG93bi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VhcmNoSW5wdXQudmFsKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFyIHRpbWVyIGZvciBob3ZlciBldmVudFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRIb3Zlcik7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLnRyaWdnZXIoc2hvd0V2ZW50KTtcbiAgICAgICAgICAgICAgICB9LCBzZXR0aW5ncy5ob3ZlckRlbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gYXBwbHkgZHJvcGRvd25Ib3ZlciB0byBhbGwgZWxlbWVudHMgd2l0aCB0aGUgZGF0YS1ob3Zlcj1cImRyb3Bkb3duXCIgYXR0cmlidXRlXG4gICAgICAgICQoJ1tkYXRhLWhvdmVyPVwiZHJvcGRvd25cIl0nKS5kcm9wZG93bkhvdmVyKCk7XG4gICAgfSk7XG59KShqUXVlcnksIHdpbmRvdyk7XG4iLCIrZnVuY3Rpb24gKCQpIHsgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBOYXZiYXIgPSBmdW5jdGlvbihuYXZNZW51RWxlbWVudCwgbmF2QmFyRWxlbWVudCkge1xuICAgIC8vIGNhY2hpbmcgZWxlbWVudHNcbiAgICB0aGlzLiR3aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdGhpcy4kYm9keSA9ICQoJ2JvZHknKTtcbiAgICB0aGlzLiRuYXZNZW51ID0gJChuYXZNZW51RWxlbWVudCk7XG4gICAgdGhpcy4kbmF2QmFyID0gJChuYXZCYXJFbGVtZW50KTtcbiAgICB0aGlzLiRuYXZCYXJaZXJvID0gdGhpcy4kbmF2QmFyLmZpbmQoJy5uYXZiYXItemVybycpO1xuICAgIHRoaXMuJHNsaW1CYXIgPSB0aGlzLiRuYXZCYXIuZmluZCgnLm5hdmJhci1zbGltJyk7XG4gICAgdGhpcy4kbmF2RHJvcGRvd25zID0gdGhpcy4kbmF2QmFyLmZpbmQoJy5uYXZiYXItbmF2IGxpJyk7XG4gICAgdGhpcy4kbmF2RHJvcGRvd25EaXNtaXNzQnV0dG9uID0gdGhpcy4kbmF2QmFyLmZpbmQoJ1tkYXRhLWRpc21pc3M9XCJuYXZiYXItZHJvcGRvd25cIl0nKTtcbiAgICB0aGlzLiRuYXZNZW51UHJvZmlsZSA9IHRoaXMuJG5hdk1lbnUuZmluZCgnI25hdm1lbnUtcHJvZmlsZScpO1xuICAgIHRoaXMuJG5hdk1lbnVMb2dpbiA9IHRoaXMuJG5hdk1lbnUuZmluZCgnI25hdm1lbnUtbG9naW4nKTtcbiAgICB0aGlzLiRzZWFyY2hJbnB1dCA9IHRoaXMuJG5hdkJhci5maW5kKCdbZGF0YS1pZD1cInNlYXJjaC1pbnB1dFwiXScpO1xuICAgIHRoaXMuJHNlYXJjaFJlc3VsdHMgPSB0aGlzLiRuYXZCYXIuZmluZCgnLnNlYXJjaC1zdWdnZXN0LWJveCcpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbiA9IHRoaXMuJG5hdkJhci5maW5kKCcubmF2YmFyLXNlYXJjaC1idG4nKTtcbiAgICB0aGlzLiRzZWFyY2hEaXNtaXNzQnV0dG9uID0gdGhpcy4kbmF2QmFyLmZpbmQoJy5kaXNtaXNzLXNlYXJjaC1idG4nKTsgLy8gW2RhdGEtZGlzbWlzcz1cIm5hdmJhci1zZWFyY2hcIl1cbiAgICB0aGlzLiRzZWFyY2hEcm9wZG93biA9IHRoaXMuJG5hdkJhci5maW5kKCcubmF2YmFyLXNlYXJjaC1idG4gPiAuZHJvcGRvd24tdG9nZ2xlJyk7XG4gICAgdGhpcy5hdXRob3JpemF0aW9uSWQgPSB0aGlzLmdldFVybFBhcmFtKCdhdXRob3JpemF0aW9uSWQnKTsgLy8gZm9yIGZ1dHVyZSB1c2VcbiAgICB0aGlzLnNjcmVlblNtTWluID0gJzc2OHB4JztcbiAgICB0aGlzLnNjcmVlblNkTWluID0gJzEwMjVweCc7XG4gICAgdGhpcy5zY3JlZW5TbWFsbE1lZGlhUXVlcnkgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogJyArIHRoaXMuc2NyZWVuU21NaW4gKyAnKScpO1xuICAgIHRoaXMuc2NyZWVuU2htZWRpdW1NZWRpYVF1ZXJ5ID0gd2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6ICcgKyB0aGlzLnNjcmVlblNkTWluICsgJyknKTtcbiAgICB0aGlzLm5hdkJhckhlaWdodCA9IG51bGw7XG4gICAgdGhpcy5zbGltQmFySGVpZ2h0ID0gbnVsbDtcbiAgICB0aGlzLnNsaW1ZID0gbnVsbDtcbiAgICB0aGlzLmR5ID0gbnVsbDtcbiAgICB0aGlzLmR5UHJldiA9IDA7XG4gICAgdGhpcy5uYXZCYXJPZmZzZXRDbGFzcyA9ICduYXZiYXItb2Zmc2V0LXhzJztcbiAgICB0aGlzLmRpZFNjcm9sbCA9IGZhbHNlO1xuICAgIHRoaXMuZGVsdGEgPSA1O1xuICAgIHRoaXMuc2Nyb2xsRGV0ZWN0UmVmcmVzaEludGVydmFsID0gMjUwO1xuXG4gICAgLy8gaW5pdGlhbGl6YXRpb25cbiAgICB0aGlzLnNldEVsZW1lbnRTaXplcygpO1xuXG4gICAgLy8gbGlzdGVuZXJzXG4gICAgdGhpcy4kd2luZG93Lm9uKCdzY3JvbGwuYWlhLm5hdmJhcicsIGZ1bmN0aW9uKGUpIHsgdGhpcy5kaWRTY3JvbGwgPSB0cnVlOyB9LmJpbmQodGhpcykpO1xuICAgIHRoaXMuc2NyZWVuU21hbGxNZWRpYVF1ZXJ5LmFkZExpc3RlbmVyKHRoaXMuc2V0RWxlbWVudFNpemVzLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc2NyZWVuU2htZWRpdW1NZWRpYVF1ZXJ5LmFkZExpc3RlbmVyKHRoaXMuc2V0RWxlbWVudFNpemVzLmJpbmQodGhpcykpO1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duRGlzbWlzc0J1dHRvbi5vbignY2xpY2suYWlhLm5hdmJhcicsIHRoaXMuZGlzbWlzc05hdkRyb3Bkb3duLmJpbmQodGhpcykpO1xuICAgIHRoaXMuJHNlYXJjaElucHV0Lm9uKCdrZXl1cC5haWEubmF2YmFyJywgdGhpcy5zZWFyY2hJbnB1dEtleWVkLmJpbmQodGhpcykpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbi5vbignaGlkZGVuLmJzLmRyb3Bkb3duJywgdGhpcy5oaWRlU2VhcmNoUmVzdWx0cy5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLiRzZWFyY2hCdXR0b24ub24oJ3Nob3duLmJzLmRyb3Bkb3duJywgZnVuY3Rpb24oZSkgeyB0aGlzLiRzZWFyY2hJbnB1dC5mb2N1cygpOyB9LmJpbmQodGhpcykpO1xuICAgIHRoaXMuJHNlYXJjaERpc21pc3NCdXR0b24ub24oJ2NsaWNrLmFpYS5uYXZiYXInLCB0aGlzLmRpc21pc3NTZWFyY2hEcm9wZG93bi5iaW5kKHRoaXMpKTtcblxuICAgIC8vIHNjcm9sbCBkZXRlY3Rpb24gdGltZXJcbiAgICB0aGlzLmNoZWNrU2Nyb2xsSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmRpZFNjcm9sbCkge1xuICAgICAgICB0aGlzLmhhc1Njcm9sbGVkKCk7XG4gICAgICAgIHRoaXMuZGlkU2Nyb2xsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpLCB0aGlzLnNjcm9sbERldGVjdFJlZnJlc2hJbnRlcnZhbCk7XG4gIH1cblxuICBOYXZiYXIucHJvdG90eXBlLmRpc21pc3NOYXZEcm9wZG93biA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJG5hdkRyb3Bkb3ducy5yZW1vdmVDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgTmF2YmFyLnByb3RvdHlwZS5zZWFyY2hJbnB1dEtleWVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbCA9IHRoaXMuJHNlYXJjaElucHV0LnZhbCgpO1xuICAgIGlmICh2YWwubGVuZ3RoID4gMykge1xuICAgICAgdGhpcy4kc2VhcmNoUmVzdWx0cy5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJHNlYXJjaFJlc3VsdHMuaGlkZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5uYXZCYXJPZmZzZXRDbGFzcyA9PT0gJ25hdmJhci1vZmZzZXQteHMnKSB7XG4gICAgICB2YXIgaGVpZ2h0ID0gdGhpcy4kd2luZG93LmhlaWdodCgpIC0gdGhpcy5uYXZCYXJIZWlnaHQgLSA2MDsgLy8gc2VhcmNoIGJhciBoZWlnaHQ7XG4gICAgICBpZiAoaGVpZ2h0ID4gdGhpcy4kc2VhcmNoUmVzdWx0cy5oZWlnaHQoKSkge1xuICAgICAgICB0aGlzLiRzZWFyY2hSZXN1bHRzLmhlaWdodChoZWlnaHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIE5hdmJhci5wcm90b3R5cGUuaGlkZVNlYXJjaFJlc3VsdHMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRzZWFyY2hSZXN1bHRzLmhpZGUoKTtcbiAgICB0aGlzLiRzZWFyY2hJbnB1dC52YWwoJycpO1xuICAgIHRoaXMuJHNlYXJjaElucHV0LmJsdXIoKTtcbiAgfVxuXG4gIE5hdmJhci5wcm90b3R5cGUuZGlzbWlzc1NlYXJjaERyb3Bkb3duID0gZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuJHNlYXJjaERyb3Bkb3duLmRyb3Bkb3duKCd0b2dnbGUnKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKipcbiAgICogIFN0aWNreSBoZWFkZXIgZnVuY3Rpb25zXG4gICAqL1xuICBOYXZiYXIucHJvdG90eXBlLnNldEVsZW1lbnRTaXplcyA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubmF2QmFySGVpZ2h0ID0gdGhpcy4kbmF2QmFyLmhlaWdodCgpO1xuICAgIHRoaXMuc2xpbUJhckhlaWdodCA9IHRoaXMuJHNsaW1CYXIuaGVpZ2h0KCk7XG4gICAgdGhpcy5zbGltWSA9IHRoaXMubmF2QmFySGVpZ2h0IC0gdGhpcy5zbGltQmFySGVpZ2h0O1xuXG4gICAgaWYgKHRoaXMuc2NyZWVuU2htZWRpdW1NZWRpYVF1ZXJ5Lm1hdGNoZXMpIHtcbiAgICAgIGlmICh0aGlzLiRuYXZCYXJaZXJvLmxlbmd0aCAmJiB0aGlzLiRuYXZCYXJaZXJvLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgIHRoaXMubmF2QmFyT2Zmc2V0Q2xhc3MgPSAnbmF2YmFyLW9mZnNldC1zZC16ZXJvJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubmF2QmFyT2Zmc2V0Q2xhc3MgPSAnbmF2YmFyLW9mZnNldC1zZCc7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjcmVlblNtYWxsTWVkaWFRdWVyeS5tYXRjaGVzKSB7XG4gICAgICB0aGlzLm5hdkJhck9mZnNldENsYXNzID0gJ25hdmJhci1vZmZzZXQtc20nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5hdkJhck9mZnNldENsYXNzID0gJ25hdmJhci1vZmZzZXQteHMnO1xuICAgIH1cbiAgICAvLyBpZiBpbiBzbGltIHN0YXRlLFxuICAgIGlmICgodGhpcy4kbmF2QmFyKS5oYXNDbGFzcygnbmF2YmFyLWZpeGVkLXNsaW0nKSkge1xuICAgICAgdGhpcy4kbmF2QmFyLnJlbW92ZUNsYXNzKCduYXZiYXItb2Zmc2V0LXhzIG5hdmJhci1vZmZzZXQtc20gbmF2YmFyLW9mZnNldC1zZCBuYXZiYXItb2Zmc2V0LXNkLXplcm8nKTtcbiAgICAgIHRoaXMuJG5hdkJhci5hZGRDbGFzcyh0aGlzLm5hdkJhck9mZnNldENsYXNzKTtcbiAgICB9XG4gIH1cblxuICBOYXZiYXIucHJvdG90eXBlLmhvdmVyRXhwYW5kTmF2QmFyID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuc2NyZWVuU2htZWRpdW1NZWRpYVF1ZXJ5Lm1hdGNoZXMpIHtcbiAgICAgIHRoaXMuJG5hdkJhci5yZW1vdmVDbGFzcygnbmF2YmFyLWZpeGVkLXNsaW0nKTtcbiAgICAgIHRoaXMuJG5hdkJhci5yZW1vdmVDbGFzcygnbmF2YmFyLW9mZnNldC14cyBuYXZiYXItb2Zmc2V0LXNtIG5hdmJhci1vZmZzZXQtc2QgbmF2YmFyLW9mZnNldC1zZC16ZXJvJyk7XG4gICAgICB0aGlzLiRuYXZCYXIub24oJ21vdXNlbGVhdmUuYWlhLm5hdmJhcicsIHRoaXMuaG92ZXJTaHJpbmtOYXZiYXIuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgTmF2YmFyLnByb3RvdHlwZS5ob3ZlclNocmlua05hdmJhciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJG5hdkJhci5hZGRDbGFzcygnbmF2YmFyLWZpeGVkLXNsaW0nKS5hZGRDbGFzcyh0aGlzLm5hdkJhck9mZnNldENsYXNzKTtcbiAgICB0aGlzLiRuYXZCYXIub2ZmKCdtb3VzZWxlYXZlLmFpYS5uYXZiYXInKTtcbiAgfVxuXG4gIE5hdmJhci5wcm90b3R5cGUuaGFzU2Nyb2xsZWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmR5ID0gdGhpcy4kd2luZG93LnNjcm9sbFRvcCgpO1xuICAgIGlmIChNYXRoLmFicyh0aGlzLmR5UHJldiAtIHRoaXMuZHkpIDw9IHRoaXMuZGVsdGEpXG4gICAgICByZXR1cm47XG5cbiAgICBpZiAodGhpcy5keSA+IHRoaXMuZHlQcmV2ICYmIHRoaXMuZHkgPiB0aGlzLnNsaW1ZKSB7IC8vIHNjcm9sbCBkb3duXG4gICAgICAvLyBhZmZpeCBzbGltIG5hdiBiYXJcbiAgICAgIHRoaXMuJG5hdkJhci5hZGRDbGFzcygnbmF2YmFyLWZpeGVkLXNsaW0nKS5hZGRDbGFzcyh0aGlzLm5hdkJhck9mZnNldENsYXNzKTtcbiAgICAgIHRoaXMuJHNsaW1CYXIub24oJ21vdXNlZW50ZXIuYWlhLm5hdmJhcicsIHRoaXMuaG92ZXJFeHBhbmROYXZCYXIuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHsgLy8gc2Nyb2xsIHVwXG4gICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7IC8vIGZvciB0b3VjaCBkZXZpY2VzXG4gICAgICAgIC8vIGFmZml4IGZhdCBiYXJcbiAgICAgICAgdGhpcy4kbmF2QmFyLnJlbW92ZUNsYXNzKCduYXZiYXItZml4ZWQtc2xpbScpO1xuICAgICAgICB0aGlzLiRuYXZCYXIucmVtb3ZlQ2xhc3MoJ25hdmJhci1vZmZzZXQteHMgbmF2YmFyLW9mZnNldC1zbSBuYXZiYXItb2Zmc2V0LXNkIG5hdmJhci1vZmZzZXQtc2QtemVybycpO1xuICAgICAgICB0aGlzLiRzbGltQmFyLm9mZignbW91c2VlbnRlci5haWEubmF2YmFyJyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZHkgPCB0aGlzLnNsaW1ZKSB7IC8vIDc2OCBhbmQgYWJvdmVcbiAgICAgICAgLy8gc2xpbSBiYXIgdG8gZmF0IGJhclxuICAgICAgICB0aGlzLiRuYXZCYXIucmVtb3ZlQ2xhc3MoJ25hdmJhci1maXhlZC1zbGltJyk7XG4gICAgICAgIHRoaXMuJG5hdkJhci5yZW1vdmVDbGFzcygnbmF2YmFyLW9mZnNldC14cyBuYXZiYXItb2Zmc2V0LXNtIG5hdmJhci1vZmZzZXQtc2QgbmF2YmFyLW9mZnNldC1zZC16ZXJvJyk7XG4gICAgICAgIHRoaXMuJHNsaW1CYXIub2ZmKCdtb3VzZWVudGVyLmFpYS5uYXZiYXInKTtcbiAgICAgIH0gLy8gZWxzZSBrZWVwIHNsaW0gYmFyXG4gICAgfVxuICAgIHRoaXMuZHlQcmV2ID0gdGhpcy5keTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqICBQcmUvUG9zdCBsb2dpbiBmdW5jdGlvbnNcbiAgICovXG4gIE5hdmJhci5wcm90b3R5cGUuaXNMb2dnZWRJbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpc0xvZ2dlZEluID0gdHlwZW9mIHRoaXMuYXV0aG9yaXphdGlvbklkICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdGhpcy5hdXRob3JpemF0aW9uSWQubGVuZ3RoID4gMCAmJlxuICAgICAgdGhpcy5hdXRob3JpemF0aW9uSWQgIT09ICdhbm9ueW1vdXMnO1xuICAgIHJldHVybiBpc0xvZ2dlZEluO1xuICB9XG5cbiAgTmF2YmFyLnByb3RvdHlwZS5nZXRVcmxQYXJhbSA9IGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgdmFyIHBhZ2VVcmwgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcbiAgICB2YXIgdXJsVmFyaWFibGVzID0gcGFnZVVybC5zcGxpdCgnJicpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXJsVmFyaWFibGVzLmxlbmd0aDsgaSsrKVxuICAgIHtcbiAgICAgIHZhciBwYXJhbU5hbWUgPSB1cmxWYXJpYWJsZXNbaV0uc3BsaXQoJz0nKTtcbiAgICAgIGlmIChwYXJhbU5hbWVbMF0gPT0gcGFyYW0pXG4gICAgICB7XG4gICAgICAgICAgcmV0dXJuIHBhcmFtTmFtZVsxXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYWlhLm5hdmJhcicpO1xuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbjtcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdhaWEubmF2YmFyJywgKGRhdGEgPSBuZXcgTmF2YmFyKHRoaXMsIG9wdGlvbnMpKSk7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dLmNhbGwoJHRoaXMpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4ubmF2YmFyO1xuXG4gICQuZm4ubmF2YmFyICAgICAgICAgICAgID0gUGx1Z2luO1xuICAkLmZuLm5hdmJhci5Db25zdHJ1Y3RvciA9IE5hdmJhcjtcblxuXG4gIC8vIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PVxuXG4gICQuZm4ubmF2YmFyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5uYXZiYXIgPSBvbGQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cblxuICAvLyBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT1cblxuICB2YXIgbG9hZE5hdmJhckhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBleHBlY3Qgb25seSBvbmUgaW5zdGFuY2Ugb2YgbmF2YmFyXG4gICAgdmFyICRuYXZtZW51ID0gJCgnLm5hdm1lbnUnKTtcbiAgICB2YXIgJG5hdmJhciA9ICQoJy5uYXZiYXInKTtcbiAgICBQbHVnaW4uY2FsbCgkbmF2bWVudSwgJG5hdmJhcik7XG4gIH07XG5cbiAgJCh3aW5kb3cpXG4gICAgLm9uKCdsb2FkLmFpYS5uYXZiYXInLCBsb2FkTmF2YmFySGFuZGxlcik7XG59KGpRdWVyeSk7XG4iLCIkKCcucHJlbWl1bS10aW1lZnJhbWUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0JCgnLnByZW1pdW0tdGltZWZyYW1lJykucmVtb3ZlQ2xhc3MoXCJyZWQtdW5kZXJsaW5lLTJweFwiKTtcblx0JCh0aGlzKS5hZGRDbGFzcyhcInJlZC11bmRlcmxpbmUtMnB4XCIpO1xuICAkKCcjcHJlbWl1bS1ieS10aW1lc3Bhbi12YWx1ZScpLnRleHQoJCh0aGlzKS5kYXRhKFwicHJlbWl1bVwiKSk7XG59KTtcbiIsIlxuLy9pbmplY3QgcG9wdXAgd2l0aCBkZWZhdWx0IHZhbHVlLCBzZXQgaW5pdGlhbCBwb3NpdGlvbiwgd2lkdGggaXMgbm90IHJlZmxlY3RlZCBvbiB0aGlzLlxuJChcIi5yYW5nZS1zbGlkZXIgaW5wdXRbdHlwZT1yYW5nZV1cIikub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XG4gIHZhciBjb250YWluZXIgPSAkKHRoaXMpXG4gICxzdmcgPSAnPHN2ZyBjbGFzcz1cImljb24tbSBoaWRlLW9uLWZhbGxiYWNrXCIgcm9sZT1cImltZ1wiIHRpdGxlPVwiYWNjYXJyb3dkbi1nbHlwaFwiPjx1c2UgeGxpbms6aHJlZj1cImRpc3QvaW1nL2ljb25zL2ljb25zLnN2ZyNhY2NhcnJvd2RuLWdseXBoXCI+PC91c2U+PGltYWdlIGNsYXNzPVwiaWNvbi1mYWxsYmFja1wiIHNyYz1cImRpc3QvaW1nL2ljb25zL2FjY2Fycm93ZG4tZ2x5cGgucG5nXCIgeGxpbms6aHJlZj1cIlwiPjwvaW1hZ2U+PC9zdmc+J1xuICAseCA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnBhZ2VYXG4gICxidWJibGUgPSAkKCc8ZGl2IC8+JywgeyAnY2xhc3MnIDogJ2J1YmJsZScgfSlcbiAgICAgIC5hcHBlbmQoJCgnPGRpdiAvPicsIHsgJ2NsYXNzJzogJ3ZhbHVlJywgJ3RleHQnIDogJCh0aGlzKS52YWwoKX0pKVxuICAgICAgLmNzcyh7bGVmdDogeH0pXG4gICAgICAuYXBwZW5kKHN2ZylcbiAgICAgIC5pbnNlcnRBZnRlcihjb250YWluZXIpO1xufSk7XG4vL3VwZGF0ZSBsZWZ0IHBvc2l0aW9uIG9mZnNldFxuJChcIi5yYW5nZS1zbGlkZXIgaW5wdXRbdHlwZT1yYW5nZV1cIikub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHZhbHVlPSAkKHRoaXMpLnZhbCgpXG4gICxidWJibGUgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5idWJibGUnKVxuICAseCA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnBhZ2VYO1xuXG4gIGJ1YmJsZS5jc3Moe2xlZnQ6IHggLSAoYnViYmxlLm91dGVyV2lkdGgoKS8yKX0pO1xuICBidWJibGUuZmluZCgnLnZhbHVlJykudGV4dCh2YWx1ZSk7XG5cbn0pO1xuLy9yZW1vdmUgcmFuZ2UgcG9wdXBcbiQoXCIucmFuZ2Utc2xpZGVyIGlucHV0W3R5cGU9cmFuZ2VdXCIpLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5idWJibGUnKS5yZW1vdmUoKVxufSk7XG5cbiIsIitmdW5jdGlvbiAoJCkgeyBcInVzZSBzdHJpY3RcIjtcblxuICAvLyBJTkxJTkUgU0VBUkNIQkFSIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdHZhciBJbmxpbmVTZWFyY2hiYXIgPSBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9ICQoZWxlbWVudCk7XG4gICAgdGhpcy5vcHRpb25zICA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLiRzZWFyY2hJbnB1dCA9ICQoZWxlbWVudCkuZmluZCgnaW5wdXQnKTtcbiAgICB0aGlzLiRzZWFyY2hTdWdnZXN0TGlzdCA9ICQoZWxlbWVudCkuZmluZCgnW2RhdGEtaWQ9XCJzZWFyY2gtc3VnZ2VzdFwiXScpO1xuICAgIHRoaXMuJHNlYXJjaFN1Z2dlc3RMaXN0SXRlbXMgPSAkKGVsZW1lbnQpLmZpbmQoJ1tkYXRhLWlkPVwic2VhcmNoLXN1Z2dlc3RcIl0gbGknKTtcblxuICAgIC8vIGxpc3RlbmVyc1xuICAgIHRoaXMuJGVsZW1lbnQub24oJ2tleXVwLmFpYS5pbmxpbmVzZWFyY2hiYXInLCB0aGlzLmtleXVwLmJpbmQodGhpcykpO1xuICAgIHRoaXMuJHNlYXJjaElucHV0Lm9uKCdrZXl1cC5haWEuaW5saW5lc2VhcmNoYmFyJywgdGhpcy5kaWRLZXlTdWdnZXN0aW9uLmJpbmQodGhpcykpO1xuICAgIHRoaXMuJHNlYXJjaElucHV0Lm9uKCdmb2N1c291dCcsIHRoaXMubGVhdmUuYmluZCh0aGlzKSk7XG5cdH07XG5cbiAgSW5saW5lU2VhcmNoYmFyLlZFUlNJT04gPSAnMS4wJztcbiAgSW5saW5lU2VhcmNoYmFyLkRFRkFVTFRTID0ge307XG5cbiAgSW5saW5lU2VhcmNoYmFyLnByb3RvdHlwZS5sZWF2ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgdGhpcy4kc2VhcmNoU3VnZ2VzdExpc3QuaGlkZSgpO1xuICB9XG5cbiAgSW5saW5lU2VhcmNoYmFyLnByb3RvdHlwZS5rZXl1cCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAvLyAzOCB1cFxuICAgIC8vIDQwIGRvd25cbiAgICAvLyAyNyBlc2NhcGVcbiAgICAvLyAzMiBzcGFjZVxuICAgIGlmICghLygzOHw0MHwyN3wzMikvLnRlc3QoZS53aGljaCkpIHJldHVybjtcbiAgICB2YXIgaXNBY3RpdmUgPSB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdvcGVuJyk7XG4gICAgaWYgKCFpc0FjdGl2ZSkgcmV0dXJuO1xuICAgIGlmICghdGhpcy4kc2VhcmNoU3VnZ2VzdExpc3RJdGVtcy5sZW5ndGgpIHJldHVybjtcblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBpZiAoZS53aGljaCA9PSAyNykge1xuICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgdGhpcy4kc2VhcmNoU3VnZ2VzdExpc3QuaGlkZSgpO1xuICAgIH1cbiAgICAvLyBpZiAodGhpcy4kc2VhcmNoSW5wdXQuaXMoJzpmb2N1cycpKSB7XG4gICAgLy8gICAvLyBkZWJ1Z2dlcjtcbiAgICAvLyAgIGlmIChlLndoaWNoID09IDM4KSB7IC8vIHVwIHRvIGxhc3QgaXRlbVxuICAgIC8vICAgICBpbmRleCA9IHRoaXMuJHNlYXJjaFN1Z2dlc3RMaXN0SXRlbXMubGVuZ3RoIC0gMTtcbiAgICAvLyAgIH1cbiAgICAvLyAgIGlmIChlLndoaWNoID09IDQwKSB7IC8vIGRvd24gdG8gZmlyc3QgaXRlbVxuICAgIC8vICAgICBpbmRleCA9IDA7XG4gICAgLy8gICB9XG4gICAgLy8gfSBlbHNlIHsgLy8gc3VnZ2VzdCBsaXN0IGlzIGluIGZvY3VzXG4gICAgLy8gICB2YXIgaW5kZXggPSB0aGlzLiRzZWFyY2hTdWdnZXN0TGlzdEl0ZW1zLmluZGV4KGUudGFyZ2V0KTtcbiAgICAvLyAgIGlmIChlLndoaWNoID09IDM4ICYmIGluZGV4ID4gMCkgeyAvLyB1cFxuICAgIC8vICAgICBpbmRleC0tO1xuICAgIC8vICAgfVxuICAgIC8vICAgaWYgKGUud2hpY2ggPT0gNDAgJiYgdGhpcy4kc2VhcmNoU3VnZ2VzdExpc3RJdGVtcy5sZW5ndGggLSAxKSB7IC8vIGRvd24gdG8gZmlyc3QgaXRlbVxuICAgIC8vICAgICBpbmRleCsrO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvLyB0aGlzLiRzZWFyY2hTdWdnZXN0TGlzdEl0ZW1zLmVxKGluZGV4KS50cmlnZ2VyKCdmb2N1cycpO1xuICB9XG5cbiAgSW5saW5lU2VhcmNoYmFyLnByb3RvdHlwZS5kaWRLZXlTdWdnZXN0aW9uID0gZnVuY3Rpb24oZSkge1xuICAgIC8vIGlnbm9yZSBhY2Nlc2liaWxpdHkga2V5c1xuICAgIGlmICgvKDM4fDQwfDI3KS8udGVzdChlLndoaWNoKSkgcmV0dXJuO1xuXG4gICAgdmFyIHZhbCA9IHRoaXMuJHNlYXJjaElucHV0LnZhbCgpO1xuICAgIGlmICh2YWwubGVuZ3RoID4gNCkge1xuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgdGhpcy4kc2VhcmNoU3VnZ2VzdExpc3Quc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICB0aGlzLiRzZWFyY2hTdWdnZXN0TGlzdC5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIHZhciBkYXRhICA9ICR0aGlzLmRhdGEoJ2FpYS5pbmxpbmVzZWFyY2hiYXInKTtcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdhaWEuaW5saW5lc2VhcmNoYmFyJywgKGRhdGEgPSBuZXcgSW5saW5lU2VhcmNoYmFyKHRoaXMpKSk7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKCk7IC8vIG9wdGlvbiBpcyBtZXRob2QgY2FsbFxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5pbmxpbmVzZWFyY2hiYXI7XG5cbiAgJC5mbi5pbmxpbmVzZWFyY2hiYXIgICAgICAgICAgICAgPSBQbHVnaW47XG4gICQuZm4uaW5saW5lc2VhcmNoYmFyLkNvbnN0cnVjdG9yID0gSW5saW5lU2VhcmNoYmFyO1xuXG5cbiAgLy8gTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09XG5cbiAgJC5mbi5pbmxpbmVzZWFyY2hiYXIubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmlubGluZXNlYXJjaGJhciA9IG9sZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbn0oalF1ZXJ5KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

!function(root, factory) {
    "function" == typeof define && define.amd ? define([], function() {
        return root.svg4everybody = factory();
    }) : "object" == typeof exports ? module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /* svg4everybody v2.0.0 | github.com/jonathantneal/svg4everybody */
    function embed(svg, g) {
        if (g) {
            var viewBox = !svg.getAttribute("viewBox") && g.getAttribute("viewBox"), fragment = document.createDocumentFragment(), clone = g.cloneNode(!0);
            for (viewBox && svg.setAttribute("viewBox", viewBox); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            svg.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        xhr.onreadystatechange = function() {
            if (4 === xhr.readyState) {
                var x = document.createElement("x");
                x.innerHTML = xhr.responseText, xhr.s.splice(0).map(function(array) {
                    embed(array[0], x.querySelector("#" + array[1].replace(/(\W)/g, "\\$1")));
                });
            }
        }, xhr.onreadystatechange();
    }
    function svg4everybody(opts) {
        function oninterval() {
            for (var use; use = uses[0]; ) {
                var svg = use.parentNode;
                if (svg && /svg/i.test(svg.nodeName)) {
                    var src = use.getAttribute("xlink:href");
                    if (polyfill && (!validate || validate(src, svg, use))) {
                        var url = src.split("#"), url_root = url[0], url_hash = url[1];
                        if (svg.removeChild(use), url_root.length) {
                            var xhr = svgCache[url_root] = svgCache[url_root] || new XMLHttpRequest();
                            xhr.s || (xhr.s = [], xhr.open("GET", url_root), xhr.send()), xhr.s.push([ svg, url_hash ]), 
                            loadreadystatechange(xhr);
                        } else {
                            embed(svg, document.getElementById(url_hash));
                        }
                    }
                }
            }
            requestAnimationFrame(oninterval, 17);
        }
        opts = opts || {};
        var uses = document.getElementsByTagName("use"), polyfill = "polyfill" in opts ? opts.polyfill : /\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537, validate = opts.validate, requestAnimationFrame = window.requestAnimationFrame || setTimeout, svgCache = {};
        polyfill && oninterval();
    }
    return svg4everybody;
});
/* iFrame Resizer (iframeSizer.min.js ) - v3.5.1 - 2015-11-04
 *  Desc: Force cross domain iframes to size to content.
 *  Requires: iframeResizer.contentWindow.min.js to be loaded into the target frame.
 *  Copyright: (c) 2015 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!function(a){"use strict";function b(b,c,d){"addEventListener"in a?b.addEventListener(c,d,!1):"attachEvent"in a&&b.attachEvent("on"+c,d)}function c(b,c,d){"removeEventListener"in a?b.removeEventListener(c,d,!1):"detachEvent"in a&&b.detachEvent("on"+c,d)}function d(){var b,c=["moz","webkit","o","ms"];for(b=0;b<c.length&&!N;b+=1)N=a[c[b]+"RequestAnimationFrame"];N||h("setup","RequestAnimationFrame not supported")}function e(b){var c="Host page: "+b;return a.top!==a.self&&(c=a.parentIFrame&&a.parentIFrame.getId?a.parentIFrame.getId()+": "+b:"Nested host page: "+b),c}function f(a){return K+"["+e(a)+"]"}function g(a){return P[a]?P[a].log:G}function h(a,b){k("log",a,b,g(a))}function i(a,b){k("info",a,b,g(a))}function j(a,b){k("warn",a,b,!0)}function k(b,c,d,e){!0===e&&"object"==typeof a.console&&console[b](f(c),d)}function l(d){function e(){function a(){s(V),p(W)}g("Height"),g("Width"),t(a,V,"init")}function f(){var a=U.substr(L).split(":");return{iframe:P[a[0]].iframe,id:a[0],height:a[1],width:a[2],type:a[3]}}function g(a){var b=Number(P[W]["max"+a]),c=Number(P[W]["min"+a]),d=a.toLowerCase(),e=Number(V[d]);h(W,"Checking "+d+" is in range "+c+"-"+b),c>e&&(e=c,h(W,"Set "+d+" to min value")),e>b&&(e=b,h(W,"Set "+d+" to max value")),V[d]=""+e}function k(){function a(){function a(){var a=0,d=!1;for(h(W,"Checking connection is from allowed list of origins: "+c);a<c.length;a++)if(c[a]===b){d=!0;break}return d}function d(){var a=P[W].remoteHost;return h(W,"Checking connection is from: "+a),b===a}return c.constructor===Array?a():d()}var b=d.origin,c=P[W].checkOrigin;if(c&&""+b!="null"&&!a())throw new Error("Unexpected message received from: "+b+" for "+V.iframe.id+". Message was: "+d.data+". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.");return!0}function l(){return K===(""+U).substr(0,L)&&U.substr(L).split(":")[0]in P}function w(){var a=V.type in{"true":1,"false":1,undefined:1};return a&&h(W,"Ignoring init message from meta parent page"),a}function y(a){return U.substr(U.indexOf(":")+J+a)}function z(a){h(W,"MessageCallback passed: {iframe: "+V.iframe.id+", message: "+a+"}"),N("messageCallback",{iframe:V.iframe,message:JSON.parse(a)}),h(W,"--")}function A(){var b=document.body.getBoundingClientRect(),c=V.iframe.getBoundingClientRect();return JSON.stringify({clientHeight:Math.max(document.documentElement.clientHeight,a.innerHeight||0),clientWidth:Math.max(document.documentElement.clientWidth,a.innerWidth||0),offsetTop:parseInt(c.top-b.top,10),offsetLeft:parseInt(c.left-b.left,10),scrollTop:a.pageYOffset,scrollLeft:a.pageXOffset})}function B(a,b){function c(){u("Send Page Info","pageInfo:"+A(),a,b)}x(c,32)}function C(){function d(b,c){function d(){P[g]?B(P[g].iframe,g):e()}["scroll","resize"].forEach(function(e){h(g,b+e+" listener for sendPageInfo"),c(a,e,d)})}function e(){d("Remove ",c)}function f(){d("Add ",b)}var g=W;f(),P[g].stopPageInfo=e}function D(){P[W]&&P[W].stopPageInfo&&(P[W].stopPageInfo(),delete P[W].stopPageInfo)}function E(){var a=!0;return null===V.iframe&&(j(W,"IFrame ("+V.id+") not found"),a=!1),a}function F(a){var b=a.getBoundingClientRect();return o(W),{x:Math.floor(Number(b.left)+Number(M.x)),y:Math.floor(Number(b.top)+Number(M.y))}}function G(b){function c(){M=g,H(),h(W,"--")}function d(){return{x:Number(V.width)+f.x,y:Number(V.height)+f.y}}function e(){a.parentIFrame?a.parentIFrame["scrollTo"+(b?"Offset":"")](g.x,g.y):j(W,"Unable to scroll to requested position, window.parentIFrame not found")}var f=b?F(V.iframe):{x:0,y:0},g=d();h(W,"Reposition requested from iFrame (offset x:"+f.x+" y:"+f.y+")"),a.top!==a.self?e():c()}function H(){!1!==N("scrollCallback",M)?p(W):q()}function I(b){function c(){var a=F(g);h(W,"Moving to in page link (#"+e+") at x: "+a.x+" y: "+a.y),M={x:a.x,y:a.y},H(),h(W,"--")}function d(){a.parentIFrame?a.parentIFrame.moveToAnchor(e):h(W,"In page link #"+e+" not found and window.parentIFrame not found")}var e=b.split("#")[1]||"",f=decodeURIComponent(e),g=document.getElementById(f)||document.getElementsByName(f)[0];g?c():a.top!==a.self?d():h(W,"In page link #"+e+" not found")}function N(a,b){return m(W,a,b)}function O(){switch(P[W].firstRun&&T(),V.type){case"close":n(V.iframe);break;case"message":z(y(6));break;case"scrollTo":G(!1);break;case"scrollToOffset":G(!0);break;case"pageInfo":B(P[W].iframe,W),C();break;case"pageInfoStop":D();break;case"inPageLink":I(y(9));break;case"reset":r(V);break;case"init":e(),N("initCallback",V.iframe),N("resizedCallback",V);break;default:e(),N("resizedCallback",V)}}function Q(a){var b=!0;return P[a]||(b=!1,j(V.type+" No settings for "+a+". Message was: "+U)),b}function S(){for(var a in P)u("iFrame requested init",v(a),document.getElementById(a),a)}function T(){P[W].firstRun=!1}var U=d.data,V={},W=null;"[iFrameResizerChild]Ready"===U?S():l()?(V=f(),W=R=V.id,!w()&&Q(W)&&(h(W,"Received: "+U),E()&&k()&&O())):i(W,"Ignored: "+U)}function m(a,b,c){var d=null,e=null;if(P[a]){if(d=P[a][b],"function"!=typeof d)throw new TypeError(b+" on iFrame["+a+"] is not a function");e=d(c)}return e}function n(a){var b=a.id;h(b,"Removing iFrame: "+b),a.parentNode.removeChild(a),m(b,"closedCallback",b),h(b,"--"),delete P[b]}function o(b){null===M&&(M={x:void 0!==a.pageXOffset?a.pageXOffset:document.documentElement.scrollLeft,y:void 0!==a.pageYOffset?a.pageYOffset:document.documentElement.scrollTop},h(b,"Get page position: "+M.x+","+M.y))}function p(b){null!==M&&(a.scrollTo(M.x,M.y),h(b,"Set page position: "+M.x+","+M.y),q())}function q(){M=null}function r(a){function b(){s(a),u("reset","reset",a.iframe,a.id)}h(a.id,"Size reset requested by "+("init"===a.type?"host page":"iFrame")),o(a.id),t(b,a,"reset")}function s(a){function b(b){a.iframe.style[b]=a[b]+"px",h(a.id,"IFrame ("+e+") "+b+" set to "+a[b]+"px")}function c(b){H||"0"!==a[b]||(H=!0,h(e,"Hidden iFrame detected, creating visibility listener"),y())}function d(a){b(a),c(a)}var e=a.iframe.id;P[e]&&(P[e].sizeHeight&&d("height"),P[e].sizeWidth&&d("width"))}function t(a,b,c){c!==b.type&&N?(h(b.id,"Requesting animation frame"),N(a)):a()}function u(a,b,c,d){function e(){var e=P[d].targetOrigin;h(d,"["+a+"] Sending msg to iframe["+d+"] ("+b+") targetOrigin: "+e),c.contentWindow.postMessage(K+b,e)}function f(){i(d,"["+a+"] IFrame("+d+") not found"),P[d]&&delete P[d]}function g(){c&&"contentWindow"in c&&null!==c.contentWindow?e():f()}d=d||c.id,P[d]&&g()}function v(a){return a+":"+P[a].bodyMarginV1+":"+P[a].sizeWidth+":"+P[a].log+":"+P[a].interval+":"+P[a].enablePublicMethods+":"+P[a].autoResize+":"+P[a].bodyMargin+":"+P[a].heightCalculationMethod+":"+P[a].bodyBackground+":"+P[a].bodyPadding+":"+P[a].tolerance+":"+P[a].inPageLinks+":"+P[a].resizeFrom+":"+P[a].widthCalculationMethod}function w(a,c){function d(){function b(b){1/0!==P[w][b]&&0!==P[w][b]&&(a.style[b]=P[w][b]+"px",h(w,"Set "+b+" = "+P[w][b]+"px"))}function c(a){if(P[w]["min"+a]>P[w]["max"+a])throw new Error("Value for min"+a+" can not be greater than max"+a)}c("Height"),c("Width"),b("maxHeight"),b("minHeight"),b("maxWidth"),b("minWidth")}function e(){var a=c&&c.id||S.id+F++;return null!==document.getElementById(a)&&(a+=F++),a}function f(b){return R=b,""===b&&(a.id=b=e(),G=(c||{}).log,R=b,h(b,"Added missing iframe ID: "+b+" ("+a.src+")")),b}function g(){h(w,"IFrame scrolling "+(P[w].scrolling?"enabled":"disabled")+" for "+w),a.style.overflow=!1===P[w].scrolling?"hidden":"auto",a.scrolling=!1===P[w].scrolling?"no":"yes"}function i(){("number"==typeof P[w].bodyMargin||"0"===P[w].bodyMargin)&&(P[w].bodyMarginV1=P[w].bodyMargin,P[w].bodyMargin=""+P[w].bodyMargin+"px")}function k(){var b=P[w].firstRun,c=P[w].heightCalculationMethod in O;!b&&c&&r({iframe:a,height:0,width:0,type:"init"})}function l(){Function.prototype.bind&&(P[w].iframe.iFrameResizer={close:n.bind(null,P[w].iframe),resize:u.bind(null,"Window resize","resize",P[w].iframe),moveToAnchor:function(a){u("Move to anchor","inPageLink:"+a,P[w].iframe,w)},sendMessage:function(a){a=JSON.stringify(a),u("Send Message","message:"+a,P[w].iframe,w)}})}function m(c){function d(){u("iFrame.onload",c,a),k()}b(a,"load",d),u("init",c,a)}function o(a){if("object"!=typeof a)throw new TypeError("Options is not an object")}function p(a){for(var b in S)S.hasOwnProperty(b)&&(P[w][b]=a.hasOwnProperty(b)?a[b]:S[b])}function q(a){return""===a||"file://"===a?"*":a}function s(b){b=b||{},P[w]={firstRun:!0,iframe:a,remoteHost:a.src.split("/").slice(0,3).join("/")},o(b),p(b),P[w].targetOrigin=!0===P[w].checkOrigin?q(P[w].remoteHost):"*"}function t(){return w in P&&"iFrameResizer"in a}var w=f(a.id);t()?j(w,"Ignored iFrame, already setup."):(s(c),g(),d(),i(),m(v(w)),l())}function x(a,b){null===Q&&(Q=setTimeout(function(){Q=null,a()},b))}function y(){function b(){function a(a){function b(b){return"0px"===P[a].iframe.style[b]}function c(a){return null!==a.offsetParent}c(P[a].iframe)&&(b("height")||b("width"))&&u("Visibility change","resize",P[a].iframe,a)}for(var b in P)a(b)}function c(a){h("window","Mutation observed: "+a[0].target+" "+a[0].type),x(b,16)}function d(){var a=document.querySelector("body"),b={attributes:!0,attributeOldValue:!1,characterData:!0,characterDataOldValue:!1,childList:!0,subtree:!0},d=new e(c);d.observe(a,b)}var e=a.MutationObserver||a.WebKitMutationObserver;e&&d()}function z(a){function b(){B("Window "+a,"resize")}h("window","Trigger event: "+a),x(b,16)}function A(){function a(){B("Tab Visable","resize")}"hidden"!==document.visibilityState&&(h("document","Trigger event: Visiblity change"),x(a,16))}function B(a,b){function c(a){return"parent"===P[a].resizeFrom&&P[a].autoResize&&!P[a].firstRun}for(var d in P)c(d)&&u(a,b,document.getElementById(d),d)}function C(){b(a,"message",l),b(a,"resize",function(){z("resize")}),b(document,"visibilitychange",A),b(document,"-webkit-visibilitychange",A),b(a,"focusin",function(){z("focus")}),b(a,"focus",function(){z("focus")})}function D(){function a(a,c){function d(){if(!c.tagName)throw new TypeError("Object is not a valid DOM element");if("IFRAME"!==c.tagName.toUpperCase())throw new TypeError("Expected <IFRAME> tag, found <"+c.tagName+">")}c&&(d(),w(c,a),b.push(c))}var b;return d(),C(),function(c,d){switch(b=[],typeof d){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(d||"iframe"),a.bind(void 0,c));break;case"object":a(c,d);break;default:throw new TypeError("Unexpected data type ("+typeof d+")")}return b}}function E(a){a.fn.iFrameResize=function(a){return this.filter("iframe").each(function(b,c){w(c,a)}).end()}}var F=0,G=!1,H=!1,I="message",J=I.length,K="[iFrameSizer]",L=K.length,M=null,N=a.requestAnimationFrame,O={max:1,scroll:1,bodyScroll:1,documentElementScroll:1},P={},Q=null,R="Host Page",S={autoResize:!0,bodyBackground:null,bodyMargin:null,bodyMarginV1:8,bodyPadding:null,checkOrigin:!0,inPageLinks:!1,enablePublicMethods:!0,heightCalculationMethod:"bodyOffset",id:"iFrameResizer",interval:32,log:!1,maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,resizeFrom:"parent",scrolling:!1,sizeHeight:!0,sizeWidth:!1,tolerance:0,widthCalculationMethod:"scroll",closedCallback:function(){},initCallback:function(){},messageCallback:function(){j("MessageCallback function not defined")},resizedCallback:function(){},scrollCallback:function(){return!0}};a.jQuery&&E(jQuery),"function"==typeof define&&define.amd?define([],D):"object"==typeof module&&"object"==typeof module.exports?module.exports=D():a.iFrameResize=a.iFrameResize||D()}(window||{});
//# sourceMappingURL=iframeResizer.map
$(document).ready(function() {
    +function ($) {
        "use strict";

        // INLINE SEARCHBAR CLASS DEFINITION
        // =========================

        var InlineSearchbar = function (element, options) {
        	
            this.$element = $(element);
            this.options = options;

            this.$searchInput = $(element).find('input');
            this.$searchSuggestList = $(element).find('[data-id="search-suggest"]');
            this.$searchSuggestListItems = $(element).find('[data-id="search-suggest"] li');

            // listeners
            this.$element.on('keyup.aia.inlinesearchbar', this.keyup.bind(this));
            this.$searchInput.on('keyup.aia.inlinesearchbar', this.didKeySuggestion.bind(this));
            this.$searchInput.on('focusout', this.leave.bind(this));
            
        };

        InlineSearchbar.VERSION = '1.0';
        InlineSearchbar.DEFAULTS = {};

        InlineSearchbar.prototype.leave = function (e) {
            this.$element.removeClass('open');
            this.$searchSuggestList.hide();
        }

        InlineSearchbar.prototype.keyup = function (e) {
            // 38 up
            // 40 down
            // 27 escape
            // 32 space
            if (!/(38|40|27|32)/.test(e.which)) return;
            var isActive = this.$element.hasClass('open');
            if (!isActive) return;
            if (!this.$searchSuggestListItems.length) return;

            e.preventDefault();
            e.stopPropagation();

            var index = 0;
            if (e.which == 27) {
                this.$element.removeClass('open');
                this.$searchSuggestList.hide();
            }
        }

        InlineSearchbar.prototype.didKeySuggestion = function (e) {
            // ignore accesibility keys
            if (/(38|40|27)/.test(e.which)) return;

            var val = this.$searchInput.val();
            /*
             if (val.length > 4) {
             this.$element.addClass('open');
             this.$searchSuggestList.show();
             } else {
             this.$element.removeClass('open');
             this.$searchSuggestList.hide();
             }
             */
            this.$element.addClass('open');
            //this.$searchSuggestList.show();
        }

        // PLUGIN DEFINITION
        // =====================

        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('aia.inlinesearchbar');

                if (!data) $this.data('aia.inlinesearchbar', (data = new InlineSearchbar(this)));
                if (typeof option == 'string') data[option](); // option is method call
            })
        }

        var old = $.fn.inlinesearchbar;

        $.fn.inlinesearchbar = Plugin;
        $.fn.inlinesearchbar.Constructor = InlineSearchbar;


        // NO CONFLICT
        // ===============

        $.fn.inlinesearchbar.noConflict = function () {
            $.fn.inlinesearchbar = old;
            return this;
        };
    }(jQuery); 
});

var suggestItem = '';
suggestItem +=  '<li>' +
    '   <a href="javascript:doSearch({keyword})">' +
    '      <svg class="icon-xs hide-on-fallback" role="img" title="search-nav">' +
    '           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="{icon}"></use>' +
    '           <image class="icon-fallback" src="{icon}" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href=""></image> ' +
    '       </svg>' +
    '       <span>{keyword}</span>' +
    '   </a>' +
    '</li>'

$(function () {
    var searchInput = $('[data-id="search-input"]');
    var searchSuggestBox = $('[data-id="search-suggest-box1"]');
    var close = true;
    searchInput.focus(function () {
        var nkey = $.trim($(this).val());

        var keywords = getSuggestItems(nkey);
        var html = '<ul class="search-suggest-list">';

        if (keywords && keywords.length && keywords.length > 0) {
            for (var i = 0; i < keywords.length; i++) {
                var item = suggestItem;
                var target = keywords[i];

                //if (target.indexOf("<") > -1) {
                //    target = target.replace(new RegExp('<', 'g'), '');
                //    target = target.replace(new RegExp('>', 'g'), '');
                //}
				target = target.replace(new RegExp(/'/g),"").replace(new RegExp(/</g),"").replace(new RegExp(/>/g),"").replace(new RegExp(/"/g),"");

                item = item.replace("{icon}", "/content/dam/aia/dist/img/icons/icons.svg#search-nav");
                item = item.replace("{icon}", "/content/dam/aia/dist/img/icons/search-nav.png");

                //item = item.replace("{keyword}", "'"+keywords[i]+"'").replace("{keyword}", target);
                item = item.replace("{keyword}", "'"+target+"'").replace("{keyword}", target);

                html += item;
            }
        }
        if (nkey) {
            html = afterAssociatedkeywords(html, nkey);
        }
        html += "</ul>";
        searchSuggestBox.html(html);
        searchSuggestBox.show();

    }).blur(function () {
        if (close) {
            //searchSuggestBox.hide();
        }
    }).keyup(function() {
        searchInput.focus();
    });

    $(".btn.btn-primary.go-btn").click(function (e) {
        doSearch(searchInput.val()); 
    });

    $('[data-id="search-input"]').attr("autocomplete", "off");
});

function getSuggestItems(keyword) {

    var data = new Array();
    var value = localData.get(aia_search_keyword);
    if (keyword && value) {
        var arr = value.split(aia_search_separator);
        for (var i = 0; i < arr.length; i++) {

            if (arr[i].indexOf(keyword) == 0) {
                data[data.length] = arr[i];
            }
            if (data.length > 4) {
                break;
            }
        }
    } else if (value) {
        var arr = value.split(aia_search_separator);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == "") {
                continue;
            }
            data[data.length] = arr[i];
            if (data.length > 4) {
                break;
            }
        }
    }
    return data;
}

function setSuggestItem(keyword) {

    if (keyword && $.trim(keyword) != "") {

        var value = localData.get(aia_search_keyword);

        var target = aia_search_separator + keyword + aia_search_separator;
        if (value && value.indexOf(target) > -1) {
            if (value.indexOf(target) == 0) {
                value = value.replace(aia_search_separator + keyword, "");
            } else {
                value = value.replace(keyword + aia_search_separator, "");
            }
        } else if (value && value.indexOf(target < 0)) {

        } else {
            value = aia_search_separator;
        }

        value = aia_search_separator + keyword + value;
        if (value && value.split(aia_search_separator).length > 100) {
            value = value.substring(0, value.lastIndexOf(aia_search_separator)).substring(0, value.lastIndexOf(aia_search_separator));
        }

        localData.set(aia_search_keyword, value);
    }
}

function doSearch(keyword, type) {
    if(keyword){
		keyword = keyword.replace(new RegExp(/'/g),"").replace(new RegExp(/</g),"").replace(new RegExp(/>/g),"").replace(new RegExp(/"/g),"");
    }
    if (keyword && $.trim(keyword).length > 0) {        
    	setSuggestItem(keyword);
    }

    var searchExecutor = $("#searchExecutor").val();

    if (searchExecutor.lastIndexOf(".html") < 0) {
        searchExecutor = searchExecutor + ".html";
    }
    if (!type) { 
        type = "123";
    }
    
    $("#search_type").val(type);
    $("[data-id='search-input']").val(keyword);
    $("#search-form1").attr("action", searchExecutor);
    $("#search-form1").submit();
}

function afterAssociatedkeywords(html, keyword) {
    var target = keyword;
    target = target.replace(new RegExp(/'/g),"").replace(new RegExp(/</g),"").replace(new RegExp(/>/g),"").replace(new RegExp(/"/g),"");

    var searchOptions = $('[data-id="search-input"]').data('search-options');
    
    var item;
    if( !searchOptions.hideProductsFilter ){
	    item = suggestItem;
	    item = item.replace("{icon}", "/content/dam/aia/dist/img/icons/icons.svg#productsearchaltg-2ndg");
	    item = item.replace("{icon}", "/content/dam/aia/dist/img/icons/productsearchaltg-2ndg.png");
	    //item = item.replace("{keyword}", "'"+keyword + "','1'").replace("{keyword}", search.productString + " " + target);
        item = item.replace("{keyword}", "'"+target + "','1'").replace("{keyword}", search.productString + " " + target);
	    html += item;
    }
    
    if( !searchOptions.hideArticlesFilter ){
	    item = suggestItem;
	    item = item.replace("{icon}", "/content/dam/aia/dist/img/icons/icons.svg#article-search");
	    item = item.replace("{icon}", "/content/dam/aia/dist/img/icons/article-search.png");
	    //item = item.replace("{keyword}", "'"+keyword + "','2'").replace("{keyword}", search.articleString + " " + target);
        item = item.replace("{keyword}", "'"+target + "','2'").replace("{keyword}", search.articleString + " " + target);
	    html += item;
    }
    
    if( !searchOptions.hideFormsFilter ){
	    item = suggestItem;
	    item = item.replace("{icon}", "/content/dam/aia/dist/img/icons/icons.svg#formsearchaltg-2ndg");
	    item = item.replace("{icon}", "/content/dam/aia/dist/img/icons/formsearchaltg-2ndg.png");
		//item = item.replace("{keyword}", "'"+keyword + "','3'").replace("{keyword}", search.formString + " " + target);
	    item = item.replace("{keyword}", "'"+target + "','3'").replace("{keyword}", search.formString + " " + target);
	    html += item;
    }
    return html;
}

var aia_search_keyword = "aia_search_keyword";
var aia_search_separator = "/,/";

var localData = {
    hname: location.hostname ? location.hostname : 'localStatus',
    isLocalStorage: window.localStorage ? true : false,
    dataDom: null,

    initDom: function () {
        if (!this.dataDom) {
            try {
                this.dataDom = document.createElement('input');
                this.dataDom.type = 'hidden';
                this.dataDom.style.display = "none";
                this.dataDom.addBehavior('#default#userData');
                document.body.appendChild(this.dataDom);
                var exDate = new Date();
                exDate = exDate.getDate() + 30;
                this.dataDom.expires = exDate.toUTCString();
            } catch (ex) {
                return false;
            }
        }
        return true;
    },
    set: function (key, value) {
        if (this.isLocalStorage) {
            window.localStorage.setItem(key, value);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                this.dataDom.setAttribute(key, value);
                this.dataDom.save(this.hname);
            }
        }
    },
    get: function (key) {
        if (this.isLocalStorage) {
            return window.localStorage.getItem(key);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                return this.dataDom.getAttribute(key);
            }
        }
    },
    remove: function (key) {
        if (this.isLocalStorage) {
            localStorage.removeItem(key);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                this.dataDom.removeAttribute(key);
                this.dataDom.save(this.hname);
            }
        }
    }
};
;
/*
 Highstock JS v4.2.4 (2016-04-14)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(J,ga){typeof module==="object"&&module.exports?module.exports=J.document?ga(J):ga:J.Highcharts=ga(J)})(typeof window!=="undefined"?window:this,function(J){function ga(a,b){var c="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(b)throw Error(c);J.console&&console.log(c)}function yb(a,b,c){this.options=b;this.elem=a;this.prop=c}function C(){var a,b=arguments,c,d={},e=function(a,b){var c,d;typeof a!=="object"&&(a={});for(d in b)b.hasOwnProperty(d)&&(c=b[d],a[d]=c&&typeof c==="object"&&
Object.prototype.toString.call(c)!=="[object Array]"&&d!=="renderTo"&&typeof c.nodeType!=="number"?e(a[d]||{},c):b[d]);return a};b[0]===!0&&(d=b[1],b=Array.prototype.slice.call(b,2));c=b.length;for(a=0;a<c;a++)d=e(d,b[a]);return d}function G(a,b){return parseInt(a,b||10)}function Da(a){return typeof a==="string"}function da(a){return a&&typeof a==="object"}function Ja(a){return Object.prototype.toString.call(a)==="[object Array]"}function ua(a){return typeof a==="number"}function Aa(a,b){for(var c=
a.length;c--;)if(a[c]===b){a.splice(c,1);break}}function s(a){return a!==t&&a!==null}function X(a,b,c){var d,e;if(Da(b))s(c)?a.setAttribute(b,c):a&&a.getAttribute&&(e=a.getAttribute(b));else if(s(b)&&da(b))for(d in b)a.setAttribute(d,b[d]);return e}function va(a){return Ja(a)?a:[a]}function $a(a,b,c){if(b)return setTimeout(a,b,c);a.call(0,c)}function F(a,b){if(Ka&&!ja&&b&&b.opacity!==t)b.filter="alpha(opacity="+b.opacity*100+")";x(a.style,b)}function ea(a,b,c,d,e){a=B.createElement(a);b&&x(a,b);e&&
F(a,{padding:0,border:"none",margin:0});c&&F(a,c);d&&d.appendChild(a);return a}function la(a,b){var c=function(){};c.prototype=new a;x(c.prototype,b);return c}function Na(a,b,c){return Array((b||2)+1-String(a).length).join(c||0)+a}function fb(a){return(gb&&gb(a)||zb||0)*6E4}function La(a,b){for(var c="{",d=!1,e,f,g,h,i,j=[];(c=a.indexOf(c))!==-1;){e=a.slice(0,c);if(d){f=e.split(":");g=f.shift().split(".");i=g.length;e=b;for(h=0;h<i;h++)e=e[g[h]];if(f.length)f=f.join(":"),g=/\.([0-9])/,h=N.lang,i=
void 0,/f$/.test(f)?(i=(i=f.match(g))?i[1]:-1,e!==null&&(e=z.numberFormat(e,i,h.decimalPoint,f.indexOf(",")>-1?h.thousandsSep:""))):e=ma(f,e)}j.push(e);a=a.slice(c+1);c=(d=!d)?"}":"{"}j.push(a);return j.join("")}function Ab(a){return Y.pow(10,V(Y.log(a)/Y.LN10))}function Bb(a,b,c,d,e){var f,g=a,c=q(c,1);f=a/c;b||(b=[1,2,2.5,5,10],d===!1&&(c===1?b=[1,2,5,10]:c<=0.1&&(b=[1/c])));for(d=0;d<b.length;d++)if(g=b[d],e&&g*c>=a||!e&&f<=(b[d]+(b[d+1]||b[d]))/2)break;g*=c;return g}function ob(a,b){var c=a.length,
d,e;for(e=0;e<c;e++)a[e].safeI=e;a.sort(function(a,c){d=b(a,c);return d===0?a.safeI-c.safeI:d});for(e=0;e<c;e++)delete a[e].safeI}function Oa(a){for(var b=a.length,c=a[0];b--;)a[b]<c&&(c=a[b]);return c}function Ea(a){for(var b=a.length,c=a[0];b--;)a[b]>c&&(c=a[b]);return c}function Pa(a,b){for(var c in a)a[c]&&a[c]!==b&&a[c].destroy&&a[c].destroy(),delete a[c]}function Va(a){pb||(pb=ea(Wa));a&&pb.appendChild(a);pb.innerHTML=""}function na(a,b){return parseFloat(a.toPrecision(b||14))}function ab(a,
b){b.renderer.globalAnimation=q(a,b.animation)}function hb(a){return da(a)?C(a):{duration:a?500:0}}function Ob(){var a=N.global,b=a.useUTC,c=b?"getUTC":"get",d=b?"setUTC":"set";fa=a.Date||J.Date;zb=b&&a.timezoneOffset;gb=b&&a.getTimezoneOffset;qb=function(a,c,d,h,i,j){var k;b?(k=fa.UTC.apply(0,arguments),k+=fb(k)):k=(new fa(a,c,q(d,1),q(h,0),q(i,0),q(j,0))).getTime();return k};Cb=c+"Minutes";Db=c+"Hours";Eb=c+"Day";bb=c+"Date";ib=c+"Month";jb=c+"FullYear";Pb=d+"Milliseconds";Qb=d+"Seconds";Rb=d+"Minutes";
Sb=d+"Hours";rb=d+"Date";Fb=d+"Month";Gb=d+"FullYear"}function wa(a){if(!(this instanceof wa))return new wa(a);this.init(a)}function Z(){}function cb(a,b,c,d){this.axis=a;this.pos=b;this.type=c||"";this.isNew=!0;!c&&!d&&this.addLabel()}function Tb(a,b,c,d,e){var f=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=b;this.x=d;this.total=null;this.points={};this.stack=e;this.rightCliff=this.leftCliff=0;this.alignOptions={align:b.align||(f?c?"left":"right":"center"),verticalAlign:b.verticalAlign||
(f?"middle":c?"bottom":"top"),y:q(b.y,f?4:c?14:-6),x:q(b.x,f?c?-6:6:0)};this.textAlign=b.textAlign||(f?c?"right":"left":"center")}function Hb(a){var b=a.options,c=b.navigator,d=c.enabled,b=b.scrollbar,e=b.enabled,f=d?c.height:0,g=e?b.height:0;this.handles=[];this.scrollbarButtons=[];this.elementsToDestroy=[];this.chart=a;this.setBaseSeries();this.height=f;this.scrollbarHeight=g;this.scrollbarEnabled=e;this.navigatorEnabled=d;this.navigatorOptions=c;this.scrollbarOptions=b;this.outlineHeight=f+g;this.init()}
function Ib(a){this.init(a)}var t,B=J.document,Y=Math,y=Y.round,V=Y.floor,Fa=Y.ceil,v=Y.max,E=Y.min,S=Y.abs,ba=Y.cos,ka=Y.sin,Ba=Y.PI,pa=Ba*2/360,Ma=J.navigator&&J.navigator.userAgent||"",Ub=J.opera,Ka=/(msie|trident|edge)/i.test(Ma)&&!Ub,sb=B&&B.documentMode===8,tb=!Ka&&/AppleWebKit/.test(Ma),Xa=/Firefox/.test(Ma),kb=/(Mobile|Android|Windows Phone)/.test(Ma),Qa="http://www.w3.org/2000/svg",ja=B&&B.createElementNS&&!!B.createElementNS(Qa,"svg").createSVGRect,Zb=Xa&&parseInt(Ma.split("Firefox/")[1],
10)<4,qa=B&&!ja&&!Ka&&!!B.createElement("canvas").getContext,Ya,db,Vb={},Jb=0,pb,N,ma,H,ra=function(){},$=[],lb=0,Wa="div",$b=/^[0-9]+$/,ub=["plotTop","marginRight","marginBottom","plotLeft"],fa,qb,zb,gb,Cb,Db,Eb,bb,ib,jb,Pb,Qb,Rb,Sb,rb,Fb,Gb,K={},z;z=J.Highcharts?ga(16,!0):{win:J};z.seriesTypes=K;var Ra=[],xa,sa,n,Sa,Kb,ta,D,T,M,eb,Ta;yb.prototype={dSetter:function(){var a=this.paths[0],b=this.paths[1],c=[],d=this.now,e=a.length,f;if(d===1)c=this.toD;else if(e===b.length&&d<1)for(;e--;)f=parseFloat(a[e]),
c[e]=isNaN(f)?a[e]:d*parseFloat(b[e]-f)+f;else c=b;this.elem.attr("d",c)},update:function(){var a=this.elem,b=this.prop,c=this.now,d=this.options.step;if(this[b+"Setter"])this[b+"Setter"]();else a.attr?a.element&&a.attr(b,c):a.style[b]=c+this.unit;d&&d.call(a,c,this)},run:function(a,b,c){var d=this,e=function(a){return e.stopped?!1:d.step(a)},f;this.startTime=+new fa;this.start=a;this.end=b;this.unit=c;this.now=this.start;this.pos=0;e.elem=this.elem;if(e()&&Ra.push(e)===1)e.timerId=setInterval(function(){for(f=
0;f<Ra.length;f++)Ra[f]()||Ra.splice(f--,1);Ra.length||clearInterval(e.timerId)},13)},step:function(a){var b=+new fa,c,d=this.options;c=this.elem;var e=d.complete,f=d.duration,g=d.curAnim,h;if(c.attr&&!c.element)c=!1;else if(a||b>=f+this.startTime){this.now=this.end;this.pos=1;this.update();a=g[this.prop]=!0;for(h in g)g[h]!==!0&&(a=!1);a&&e&&e.call(c);c=!1}else this.pos=d.easing((b-this.startTime)/f),this.now=this.start+(this.end-this.start)*this.pos,this.update(),c=!0;return c},initPath:function(a,
b,c){var b=b||"",d=a.shift,e=b.indexOf("C")>-1,f=e?7:3,g,b=b.split(" "),c=[].concat(c),h=a.isArea,i=h?2:1,j=function(a){for(g=a.length;g--;)(a[g]==="M"||a[g]==="L")&&a.splice(g+1,0,a[g+1],a[g+2],a[g+1],a[g+2])};e&&(j(b),j(c));if(d<=c.length/f&&b.length===c.length)for(;d--;)c=c.slice(0,f).concat(c),h&&(c=c.concat(c.slice(c.length-f)));a.shift=0;if(b.length)for(a=c.length;b.length<a;)d=b.slice().splice(b.length/i-f,f*i),e&&(d[f-6]=d[f-2],d[f-5]=d[f-1]),[].splice.apply(b,[b.length/i,0].concat(d));return[b,
c]}};var x=z.extend=function(a,b){var c;a||(a={});for(c in b)a[c]=b[c];return a},q=z.pick=function(){var a=arguments,b,c,d=a.length;for(b=0;b<d;b++)if(c=a[b],c!==t&&c!==null)return c},U=z.wrap=function(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(d);return c.apply(this,a)}};ma=function(a,b,c){if(!s(b)||isNaN(b))return N.lang.invalidDate||"";var a=q(a,"%Y-%m-%d %H:%M:%S"),d=new fa(b-fb(b)),e,f=d[Db](),g=d[Eb](),h=d[bb](),i=d[ib](),j=d[jb](),k=N.lang,l=k.weekdays,
m=k.shortWeekdays,d=x({a:m?m[g]:l[g].substr(0,3),A:l[g],d:Na(h),e:Na(h,2," "),w:g,b:k.shortMonths[i],B:k.months[i],m:Na(i+1),y:j.toString().substr(2,2),Y:j,H:Na(f),k:f,I:Na(f%12||12),l:f%12||12,M:Na(d[Cb]()),p:f<12?"AM":"PM",P:f<12?"am":"pm",S:Na(d.getSeconds()),L:Na(y(b%1E3),3)},z.dateFormats);for(e in d)for(;a.indexOf("%"+e)!==-1;)a=a.replace("%"+e,typeof d[e]==="function"?d[e](b):d[e]);return c?a.substr(0,1).toUpperCase()+a.substr(1):a};H={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,
week:6048E5,month:24192E5,year:314496E5};z.numberFormat=function(a,b,c,d){var a=+a||0,e=N.lang,f=(a.toString().split(".")[1]||"").length,g,h,i=Math.abs(a);b===-1?b=Math.min(f,20):isNaN(b)&&(b=2);g=String(G(i.toFixed(b)));h=g.length>3?g.length%3:0;c=q(c,e.decimalPoint);d=q(d,e.thousandsSep);a=a<0?"-":"";a+=h?g.substr(0,h)+d:"";a+=g.substr(h).replace(/(\d{3})(?=\d)/g,"$1"+d);+b&&(d=Math.abs(i-g+Math.pow(10,-Math.max(b,f)-1)),a+=c+d.toFixed(b).slice(2));return a};Math.easeInOutSine=function(a){return-0.5*
(Math.cos(Math.PI*a)-1)};xa=function(a,b){var c;if(b==="width")return Math.min(a.offsetWidth,a.scrollWidth)-xa(a,"padding-left")-xa(a,"padding-right");else if(b==="height")return Math.min(a.offsetHeight,a.scrollHeight)-xa(a,"padding-top")-xa(a,"padding-bottom");return(c=J.getComputedStyle(a,void 0))&&G(c.getPropertyValue(b))};sa=function(a,b){return b.indexOf?b.indexOf(a):[].indexOf.call(b,a)};Sa=function(a,b){return[].filter.call(a,b)};ta=function(a,b){for(var c=[],d=0,e=a.length;d<e;d++)c[d]=b.call(a[d],
a[d],d,a);return c};Kb=function(a){var b=B.documentElement,a=a.getBoundingClientRect();return{top:a.top+(J.pageYOffset||b.scrollTop)-(b.clientTop||0),left:a.left+(J.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}};Ta=function(a){for(var b=Ra.length;b--;)if(Ra[b].elem===a)Ra[b].stopped=!0};n=function(a,b){return Array.prototype.forEach.call(a,b)};D=function(a,b,c){function d(b){b.target=b.srcElement||J;c.call(a,b)}var e=a.hcEvents=a.hcEvents||{};if(a.addEventListener)a.addEventListener(b,c,!1);else if(a.attachEvent){if(!a.hcEventsIE)a.hcEventsIE=
{};a.hcEventsIE[c.toString()]=d;a.attachEvent("on"+b,d)}e[b]||(e[b]=[]);e[b].push(c)};T=function(a,b,c){function d(b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.attachEvent&&(c=a.hcEventsIE[c.toString()],a.detachEvent("on"+b,c))}function e(){var c,e,f;if(a.nodeName)for(f in b?(c={},c[b]=!0):c=g,c)if(g[f])for(e=g[f].length;e--;)d(f,g[f][e])}var f,g=a.hcEvents,h;if(g)b?(f=g[b]||[],c?(h=sa(c,f),h>-1&&(f.splice(h,1),g[b]=f),d(b,c)):(e(),g[b]=[])):(e(),a.hcEvents={})};M=function(a,b,c,d){var e;
e=a.hcEvents;var f,g,c=c||{};if(B.createEvent&&(a.dispatchEvent||a.fireEvent))e=B.createEvent("Events"),e.initEvent(b,!0,!0),e.target=a,x(e,c),a.dispatchEvent?a.dispatchEvent(e):a.fireEvent(b,e);else if(e){e=e[b]||[];f=e.length;if(!c.preventDefault)c.preventDefault=function(){c.defaultPrevented=!0};c.target=a;if(!c.type)c.type=b;for(b=0;b<f;b++)g=e[b],g.call(a,c)===!1&&c.preventDefault()}d&&!c.defaultPrevented&&d(c)};eb=function(a,b,c){var d,e="",f,g,h;da(c)||(d=arguments,c={duration:d[2],easing:d[3],
complete:d[4]});if(!ua(c.duration))c.duration=400;c.easing=typeof c.easing==="function"?c.easing:Math[c.easing]||Math.easeInOutSine;c.curAnim=C(b);for(h in b)g=new yb(a,c,h),f=null,h==="d"?(g.paths=g.initPath(a,a.d,b.d),g.toD=b.d,d=0,f=1):a.attr?d=a.attr(h):(d=parseFloat(xa(a,h))||0,h!=="opacity"&&(e="px")),f||(f=b[h]),f.match&&f.match("px")&&(f=f.replace(/px/g,"")),g.run(d,f,e)};if(J.jQuery)J.jQuery.fn.highcharts=function(){var a=[].slice.call(arguments);if(this[0])return a[0]?(new (z[Da(a[0])?a.shift():
"Chart"])(this[0],a[0],a[1]),this):$[X(this[0],"data-highcharts-chart")]};B&&!B.defaultView&&(xa=function(a,b){var c;c={width:"clientWidth",height:"clientHeight"}[b];if(a.style[b])return G(a.style[b]);b==="opacity"&&(b="filter");if(c)return a.style.zoom=1,Math.max(a[c]-2*xa(a,"padding"),0);c=a.currentStyle[b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()})];b==="filter"&&(c=c.replace(/alpha\(opacity=([0-9]+)\)/,function(a,b){return b/100}));return c===""?1:G(c)});Array.prototype.forEach||
(n=function(a,b){for(var c=0,d=a.length;c<d;c++)if(b.call(a[c],a[c],c,a)===!1)return c});Array.prototype.indexOf||(sa=function(a,b){var c,d=0;if(b)for(c=b.length;d<c;d++)if(b[d]===a)return d;return-1});Array.prototype.filter||(Sa=function(a,b){for(var c=[],d=0,e=a.length;d<e;d++)b(a[d],d)&&c.push(a[d]);return c});z.Fx=yb;z.inArray=sa;z.each=n;z.grep=Sa;z.offset=Kb;z.map=ta;z.addEvent=D;z.removeEvent=T;z.fireEvent=M;z.animate=eb;z.animObject=hb;z.stop=Ta;N={colors:"#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#2b908f,#f45b5b,#91e8e1".split(","),
symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),decimalPoint:".",numericSymbols:"k,M,G,T,P,E".split(","),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,
canvasToolsURL:"http://code.highcharts.com/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/stock/4.2.4/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",margin:15,style:{color:"#333333",fontSize:"18px"}},subtitle:{text:"",
align:"center",style:{color:"#555555"}},plotOptions:{line:{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},lineWidth:2,marker:{lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:!0,lineWidthPlus:1,radiusPlus:2},select:{fillColor:"#FFFFFF",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return this.y===null?"":z.numberFormat(this.y,-1)},style:{color:"contrast",fontSize:"11px",fontWeight:"bold",textShadow:"0 0 6px contrast, 0 0 3px contrast"},
verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{lineWidthPlus:1,marker:{},halo:{size:10,opacity:0.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3}},labels:{style:{position:"absolute",color:"#3E576F"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#909090",borderRadius:0,navigation:{activeColor:"#274b6d",inactiveColor:"#CCC"},shadow:!1,itemStyle:{color:"#333333",fontSize:"12px",
fontWeight:"bold"},itemHoverStyle:{color:"#000"},itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:!0,animation:ja,backgroundColor:"rgba(249, 249, 249, .85)",borderWidth:1,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',shadow:!0,snap:kb?25:10,style:{color:"#333333",cursor:"default",fontSize:"12px",padding:"8px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,text:"Highcharts.com",
href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"9px"}}};var W=N.plotOptions,ca=W.line;Ob();wa.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[G(a[1]),G(a[2]),G(a[3]),parseFloat(a[4],10)]}},{regex:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(a){return[G(a[1],16),G(a[2],16),G(a[3],16),1]}},
{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[G(a[1]),G(a[2]),G(a[3]),1]}}],init:function(a){var b,c,d,e;if((this.input=a)&&a.stops)this.stops=ta(a.stops,function(a){return new wa(a[1])});else for(d=this.parsers.length;d--&&!c;)e=this.parsers[d],(b=e.regex.exec(a))&&(c=e.parse(b));this.rgba=c||[]},get:function(a){var b=this.input,c=this.rgba,d;this.stops?(d=C(b),d.stops=[].concat(d.stops),n(this.stops,function(b,c){d.stops[c]=[d.stops[c][0],b.get(a)]})):
d=c&&!isNaN(c[0])?a==="rgb"||!a&&c[3]===1?"rgb("+c[0]+","+c[1]+","+c[2]+")":a==="a"?c[3]:"rgba("+c.join(",")+")":b;return d},brighten:function(a){var b,c=this.rgba;if(this.stops)n(this.stops,function(b){b.brighten(a)});else if(ua(a)&&a!==0)for(b=0;b<3;b++)c[b]+=G(a*255),c[b]<0&&(c[b]=0),c[b]>255&&(c[b]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this}};Z.prototype={opacity:1,textProps:"direction,fontSize,fontWeight,fontFamily,fontStyle,color,lineHeight,width,textDecoration,textOverflow,textShadow".split(","),
init:function(a,b){this.element=b==="span"?ea(b):B.createElementNS(Qa,b);this.renderer=a},animate:function(a,b,c){b=q(b,this.renderer.globalAnimation,!0);Ta(this);if(b){if(c)b.complete=c;eb(this,a,b)}else this.attr(a,null,c);return this},colorGradient:function(a,b,c){var d=this.renderer,e,f,g,h,i,j,k,l,m,o,p,r=[],A;a.linearGradient?f="linearGradient":a.radialGradient&&(f="radialGradient");if(f){g=a[f];i=d.gradients;k=a.stops;o=c.radialReference;Ja(g)&&(a[f]=g={x1:g[0],y1:g[1],x2:g[2],y2:g[3],gradientUnits:"userSpaceOnUse"});
f==="radialGradient"&&o&&!s(g.gradientUnits)&&(h=g,g=C(g,d.getRadialAttr(o,h),{gradientUnits:"userSpaceOnUse"}));for(p in g)p!=="id"&&r.push(p,g[p]);for(p in k)r.push(k[p]);r=r.join(",");i[r]?o=i[r].attr("id"):(g.id=o="highcharts-"+Jb++,i[r]=j=d.createElement(f).attr(g).add(d.defs),j.radAttr=h,j.stops=[],n(k,function(a){a[1].indexOf("rgba")===0?(e=wa(a[1]),l=e.get("rgb"),m=e.get("a")):(l=a[1],m=1);a=d.createElement("stop").attr({offset:a[0],"stop-color":l,"stop-opacity":m}).add(j);j.stops.push(a)}));
A="url("+d.url+"#"+o+")";c.setAttribute(b,A);c.gradient=r;a.toString=function(){return A}}},applyTextShadow:function(a){var b=this.element,c,d=a.indexOf("contrast")!==-1,e={},f=this.renderer.forExport,g=f||b.style.textShadow!==t&&!Ka;if(d)e.textShadow=a=a.replace(/contrast/g,this.renderer.getContrast(b.style.fill));if(tb||f)e.textRendering="geometricPrecision";g?this.css(e):(this.fakeTS=!0,this.ySetter=this.xSetter,c=[].slice.call(b.getElementsByTagName("tspan")),n(a.split(/\s?,\s?/g),function(a){var d=
b.firstChild,e,f,a=a.split(" ");e=a[a.length-1];(f=a[a.length-2])&&n(c,function(a,c){var g;c===0&&(a.setAttribute("x",b.getAttribute("x")),c=b.getAttribute("y"),a.setAttribute("y",c||0),c===null&&b.setAttribute("y",0));g=a.cloneNode(1);X(g,{"class":"highcharts-text-shadow",fill:e,stroke:e,"stroke-opacity":1/v(G(f),3),"stroke-width":f,"stroke-linejoin":"round"});b.insertBefore(g,d)})}))},attr:function(a,b,c){var d,e=this.element,f,g=this,h;typeof a==="string"&&b!==t&&(d=a,a={},a[d]=b);if(typeof a===
"string")g=(this[a+"Getter"]||this._defaultGetter).call(this,a,e);else{for(d in a){b=a[d];h=!1;this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(d)&&(f||(this.symbolAttr(a),f=!0),h=!0);if(this.rotation&&(d==="x"||d==="y"))this.doTransform=!0;h||(h=this[d+"Setter"]||this._defaultSetter,h.call(this,b,d,e),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d)&&this.updateShadows(d,b,h))}if(this.doTransform)this.updateTransform(),this.doTransform=!1}c&&
c();return g},updateShadows:function(a,b,c){for(var d=this.shadows,e=d.length;e--;)c.call(d[e],a==="height"?Math.max(b-(d[e].cutHeight||0),0):a==="d"?this.d:b,a,d[e])},addClass:function(a){var b=this.element,c=X(b,"class")||"";c.indexOf(a)===-1&&X(b,"class",c+" "+a);return this},symbolAttr:function(a){var b=this;n("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","),function(c){b[c]=q(a[c],b[c])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",
a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a){var b,c={},d,e=this.strokeWidth||0;d=y(e)%2/2;a.x=V(a.x||this.x||0)+d;a.y=V(a.y||this.y||0)+d;a.width=V((a.width||this.width||0)-2*d);a.height=V((a.height||this.height||0)-2*d);a.strokeWidth=e;for(b in a)this[b]!==a[b]&&(this[b]=c[b]=a[b]);return c},css:function(a){var b=this.styles,c={},d=this.element,e,f,g="";e=!b;if(a&&a.color)a.fill=a.color;if(b)for(f in a)a[f]!==b[f]&&(c[f]=a[f],e=!0);if(e){e=this.textWidth=a&&a.width&&d.nodeName.toLowerCase()===
"text"&&G(a.width)||this.textWidth;b&&(a=x(b,c));this.styles=a;e&&(qa||!ja&&this.renderer.forExport)&&delete a.width;if(Ka&&!ja)F(this.element,a);else{b=function(a,b){return"-"+b.toLowerCase()};for(f in a)g+=f.replace(/([A-Z])/g,b)+":"+a[f]+";";X(d,"style",g)}e&&this.added&&this.renderer.buildText(this)}return this},on:function(a,b){var c=this,d=c.element;db&&a==="click"?(d.ontouchstart=function(a){c.touchEventFired=fa.now();a.preventDefault();b.call(d,a)},d.onclick=function(a){(Ma.indexOf("Android")===
-1||fa.now()-(c.touchEventFired||0)>1100)&&b.call(d,a)}):d["on"+a]=b;return this},setRadialReference:function(a){var b=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;b&&b.radAttr&&b.animate(this.renderer.getRadialAttr(a,b.radAttr));return this},translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(){this.inverted=!0;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,b=this.translateY||0,c=this.scaleX,
d=this.scaleY,e=this.inverted,f=this.rotation,g=this.element;e&&(a+=this.attr("width"),b+=this.attr("height"));a=["translate("+a+","+b+")"];e?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+(g.getAttribute("x")||0)+" "+(g.getAttribute("y")||0)+")");(s(c)||s(d))&&a.push("scale("+q(c,1)+" "+q(d,1)+")");a.length&&g.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,c){var d,e,f,g,h={};e=this.renderer;f=e.alignedObjects;
if(a){if(this.alignOptions=a,this.alignByTranslate=b,!c||Da(c))this.alignTo=d=c||"renderer",Aa(f,this),f.push(this),c=null}else a=this.alignOptions,b=this.alignByTranslate,d=this.alignTo;c=q(c,e[d],e);d=a.align;e=a.verticalAlign;f=(c.x||0)+(a.x||0);g=(c.y||0)+(a.y||0);if(d==="right"||d==="center")f+=(c.width-(a.width||0))/{right:1,center:2}[d];h[b?"translateX":"x"]=y(f);if(e==="bottom"||e==="middle")g+=(c.height-(a.height||0))/({bottom:1,middle:2}[e]||1);h[b?"translateY":"y"]=y(g);this[this.placed?
"animate":"attr"](h);this.placed=!0;this.alignAttr=h;return this},getBBox:function(a,b){var c,d=this.renderer,e,f,g,h=this.element,i=this.styles;e=this.textStr;var j,k=h.style,l,m=d.cache,o=d.cacheKeys,p;f=q(b,this.rotation);g=f*pa;e!==t&&(p=["",f||0,i&&i.fontSize,h.style.width].join(","),p=e===""||$b.test(e)?"num:"+e.toString().length+p:e+p);p&&!a&&(c=m[p]);if(!c){if(h.namespaceURI===Qa||d.forExport){try{l=this.fakeTS&&function(a){n(h.querySelectorAll(".highcharts-text-shadow"),function(b){b.style.display=
a})},Xa&&k.textShadow?(j=k.textShadow,k.textShadow=""):l&&l("none"),c=h.getBBox?x({},h.getBBox()):{width:h.offsetWidth,height:h.offsetHeight},j?k.textShadow=j:l&&l("")}catch(r){}if(!c||c.width<0)c={width:0,height:0}}else c=this.htmlGetBBox();if(d.isSVG){d=c.width;e=c.height;if(Ka&&i&&i.fontSize==="11px"&&e.toPrecision(3)==="16.9")c.height=e=14;if(f)c.width=S(e*ka(g))+S(d*ba(g)),c.height=S(e*ba(g))+S(d*ka(g))}if(p){for(;o.length>250;)delete m[o.shift()];m[p]||o.push(p);m[p]=c}}return c},show:function(a){return this.attr({visibility:a?
"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function(){b.attr({y:-9999})}})},add:function(a){var b=this.renderer,c=this.element,d;if(a)this.parentGroup=a;this.parentInverted=a&&a.inverted;this.textStr!==void 0&&b.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)d=this.zIndexSetter();d||(a?a.element:b.box).appendChild(c);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var b=
a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},c=a.shadows,d=a.renderer.isSVG&&b.nodeName==="SPAN"&&a.parentGroup,e,f;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=null;Ta(a);if(a.clipPath)a.clipPath=a.clipPath.destroy();if(a.stops){for(f=0;f<a.stops.length;f++)a.stops[f]=a.stops[f].destroy();a.stops=null}a.safeRemoveChild(b);for(c&&n(c,function(b){a.safeRemoveChild(b)});d&&d.div&&d.div.childNodes.length===0;)b=d.parentGroup,a.safeRemoveChild(d.div),delete d.div,
d=b;a.alignTo&&Aa(a.renderer.alignedObjects,a);for(e in a)delete a[e];return null},shadow:function(a,b,c){var d=[],e,f,g=this.element,h,i,j,k;if(a){i=q(a.width,3);j=(a.opacity||0.15)/i;k=this.parentInverted?"(-1,-1)":"("+q(a.offsetX,1)+", "+q(a.offsetY,1)+")";for(e=1;e<=i;e++){f=g.cloneNode(0);h=i*2+1-2*e;X(f,{isShadow:"true",stroke:a.color||"black","stroke-opacity":j*e,"stroke-width":h,transform:"translate"+k,fill:"none"});if(c)X(f,"height",v(X(f,"height")-h,0)),f.cutHeight=h;b?b.element.appendChild(f):
g.parentNode.insertBefore(f,g);d.push(f)}this.shadows=d}return this},xGetter:function(a){this.element.nodeName==="circle"&&(a={x:"cx",y:"cy"}[a]||a);return this._defaultGetter(a)},_defaultGetter:function(a){a=q(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,b,c){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");c.setAttribute(b,a);this[b]=a},dashstyleSetter:function(a){var b,c=this["stroke-width"];c===
"inherit"&&(c=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=a.length;b--;)a[b]=G(a[b])*c;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},
opacitySetter:function(a,b,c){this[b]=a;c.setAttribute(b,a)},titleSetter:function(a){var b=this.element.getElementsByTagName("title")[0];b||(b=B.createElementNS(Qa,"title"),this.element.appendChild(b));b.appendChild(B.createTextNode(String(q(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){if(a!==this.textStr)delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this)},fillSetter:function(a,b,c){typeof a==="string"?c.setAttribute(b,a):a&&this.colorGradient(a,b,c)},visibilitySetter:function(a,
b,c){a==="inherit"?c.removeAttribute(b):c.setAttribute(b,a)},zIndexSetter:function(a,b){var c=this.renderer,d=this.parentGroup,c=(d||c).element||c.box,e,f,g=this.element,h;e=this.added;var i;if(s(a))g.zIndex=a,a=+a,this[b]===a&&(e=!1),this[b]=a;if(e){if((a=this.zIndex)&&d)d.handleZ=!0;d=c.childNodes;for(i=0;i<d.length&&!h;i++)if(e=d[i],f=e.zIndex,e!==g&&(G(f)>a||!s(a)&&s(f)))c.insertBefore(g,e),h=!0;h||c.appendChild(g)}return h},_defaultSetter:function(a,b,c){c.setAttribute(b,a)}};Z.prototype.yGetter=
Z.prototype.xGetter;Z.prototype.translateXSetter=Z.prototype.translateYSetter=Z.prototype.rotationSetter=Z.prototype.verticalAlignSetter=Z.prototype.scaleXSetter=Z.prototype.scaleYSetter=function(a,b){this[b]=a;this.doTransform=!0};Z.prototype["stroke-widthSetter"]=Z.prototype.strokeSetter=function(a,b,c){this[b]=a;if(this.stroke&&this["stroke-width"])this.strokeWidth=this["stroke-width"],Z.prototype.fillSetter.call(this,this.stroke,"stroke",c),c.setAttribute("stroke-width",this["stroke-width"]),
this.hasStroke=!0;else if(b==="stroke-width"&&a===0&&this.hasStroke)c.removeAttribute("stroke"),this.hasStroke=!1};var ya=function(){this.init.apply(this,arguments)};ya.prototype={Element:Z,init:function(a,b,c,d,e,f){var g,d=this.createElement("svg").attr({version:"1.1"}).css(this.getStyle(d));g=d.element;a.appendChild(g);a.innerHTML.indexOf("xmlns")===-1&&X(g,"xmlns",Qa);this.isSVG=!0;this.box=g;this.boxWrapper=d;this.alignedObjects=[];this.url=(Xa||tb)&&B.getElementsByTagName("base").length?J.location.href.replace(/#.*?$/,
"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(B.createTextNode("Created with Highstock 4.2.4"));this.defs=this.createElement("defs").add();this.allowHTML=f;this.forExport=e;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);var h;if(Xa&&a.getBoundingClientRect)this.subPixelFix=b=function(){F(a,{left:0,top:0});h=a.getBoundingClientRect();F(a,{left:Fa(h.left)-h.left+"px",top:Fa(h.top)-h.top+"px"})},b(),
D(J,"resize",b)},getStyle:function(a){return this.style=x({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();Pa(this.gradients||{});this.gradients=null;if(a)this.defs=a.destroy();this.subPixelFix&&T(J,"resize",this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var b=new this.Element;
b.init(this,a);return b},draw:function(){},getRadialAttr:function(a,b){return{cx:a[0]-a[2]/2+b.cx*a[2],cy:a[1]-a[2]/2+b.cy*a[2],r:b.r*a[2]}},buildText:function(a){for(var b=a.element,c=this,d=c.forExport,e=q(a.textStr,"").toString(),f=e.indexOf("<")!==-1,g=b.childNodes,h,i,j=X(b,"x"),k=a.styles,l=a.textWidth,m=k&&k.lineHeight,o=k&&k.textShadow,p=k&&k.textOverflow==="ellipsis",r=g.length,A=l&&!a.added&&this.box,P=function(a){return m?G(m):c.fontMetrics(/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:
k&&k.fontSize||c.style.fontSize||12,a).h},u=function(a){return a.replace(/&lt;/g,"<").replace(/&gt;/g,">")};r--;)b.removeChild(g[r]);!f&&!o&&!p&&e.indexOf(" ")===-1?b.appendChild(B.createTextNode(u(e))):(h=/<.*style="([^"]+)".*>/,i=/<.*href="(http[^"]+)".*>/,A&&A.appendChild(b),e=f?e.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g):[e],e[e.length-1]===
""&&e.pop(),n(e,function(e,f){var g,m=0,e=e.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");g=e.split("|||");n(g,function(e){if(e!==""||g.length===1){var o={},r=B.createElementNS(Qa,"tspan"),A;h.test(e)&&(A=e.match(h)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),X(r,"style",A));i.test(e)&&!d&&(X(r,"onclick",'location.href="'+e.match(i)[1]+'"'),F(r,{cursor:"pointer"}));e=u(e.replace(/<(.|\n)*?>/g,"")||" ");if(e!==" "){r.appendChild(B.createTextNode(e));if(m)o.dx=0;else if(f&&j!==null)o.x=
j;X(r,o);b.appendChild(r);!m&&f&&(!ja&&d&&F(r,{display:"block"}),X(r,"dy",P(r)));if(l){for(var o=e.replace(/([^\^])-/g,"$1- ").split(" "),q=g.length>1||f||o.length>1&&k.whiteSpace!=="nowrap",w,n,s,t=[],v=P(r),y=1,x=a.rotation,C=e,z=C.length;(q||p)&&(o.length||t.length);)a.rotation=0,w=a.getBBox(!0),s=w.width,!ja&&c.forExport&&(s=c.measureSpanWidth(r.firstChild.data,a.styles)),w=s>l,n===void 0&&(n=w),p&&n?(z/=2,C===""||!w&&z<0.5?o=[]:(w&&(n=!0),C=e.substring(0,C.length+(w?-1:1)*Fa(z)),o=[C+(l>3?"\u2026":
"")],r.removeChild(r.firstChild))):!w||o.length===1?(o=t,t=[],o.length&&(y++,r=B.createElementNS(Qa,"tspan"),X(r,{dy:v,x:j}),A&&X(r,"style",A),b.appendChild(r)),s>l&&(l=s)):(r.removeChild(r.firstChild),t.unshift(o.pop())),o.length&&r.appendChild(B.createTextNode(o.join(" ").replace(/- /g,"-")));n&&a.attr("title",a.textStr);a.rotation=x}m++}}})}),A&&A.removeChild(b),o&&a.applyTextShadow&&a.applyTextShadow(o))},getContrast:function(a){a=wa(a).rgba;return a[0]+a[1]+a[2]>384?"#000000":"#FFFFFF"},button:function(a,
b,c,d,e,f,g,h,i){var j=this.label(a,b,c,i,null,null,null,null,"button"),k=0,l,m,o,p,r,A,a={x1:0,y1:0,x2:0,y2:1},e=C({"stroke-width":1,stroke:"#CCCCCC",fill:{linearGradient:a,stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]},r:2,padding:5,style:{color:"black"}},e);o=e.style;delete e.style;f=C(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#FFF"],[1,"#ACF"]]}},f);p=f.style;delete f.style;g=C(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#9BD"],[1,"#CDF"]]}},g);r=g.style;delete g.style;h=C(e,{style:{color:"#CCC"}},
h);A=h.style;delete h.style;D(j.element,Ka?"mouseover":"mouseenter",function(){k!==3&&j.attr(f).css(p)});D(j.element,Ka?"mouseout":"mouseleave",function(){k!==3&&(l=[e,f,g][k],m=[o,p,r][k],j.attr(l).css(m))});j.setState=function(a){(j.state=k=a)?a===2?j.attr(g).css(r):a===3&&j.attr(h).css(A):j.attr(e).css(o)};return j.on("click",function(a){k!==3&&d.call(j,a)}).attr(e).css(x({cursor:"default"},o))},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=y(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=y(a[2])+b%2/
2);return a},path:function(a){var b={fill:"none"};Ja(a)?b.d=a:da(a)&&x(b,a);return this.createElement("path").attr(b)},circle:function(a,b,c){a=da(a)?a:{x:a,y:b,r:c};b=this.createElement("circle");b.xSetter=b.ySetter=function(a,b,c){c.setAttribute("c"+b,a)};return b.attr(a)},arc:function(a,b,c,d,e,f){if(da(a))b=a.y,c=a.r,d=a.innerR,e=a.start,f=a.end,a=a.x;a=this.symbol("arc",a||0,b||0,c||0,c||0,{innerR:d||0,start:e||0,end:f||0});a.r=c;return a},rect:function(a,b,c,d,e,f){var e=da(a)?a.r:e,g=this.createElement("rect"),
a=da(a)?a:a===t?{}:{x:a,y:b,width:v(c,0),height:v(d,0)};if(f!==t)g.strokeWidth=f,a=g.crisp(a);if(e)a.r=e;g.rSetter=function(a,b,c){X(c,{rx:a,ry:a})};return g.attr(a)},setSize:function(a,b,c){var d=this.alignedObjects,e=d.length;this.width=a;this.height=b;for(this.boxWrapper[q(c,!0)?"animate":"attr"]({width:a,height:b});e--;)d[e].align()},g:function(a){var b=this.createElement("g");return s(a)?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,c,d,e){var f={preserveAspectRatio:"none"};arguments.length>
1&&x(f,{x:b,y:c,width:d,height:e});f=this.createElement("image").attr(f);f.element.setAttributeNS?f.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):f.element.setAttribute("hc-svg-href",a);return f},symbol:function(a,b,c,d,e,f){var g=this,h,i=this.symbols[a],i=i&&i(y(b),y(c),d,e,f),j=/^url\((.*?)\)$/,k,l;if(i)h=this.path(i),x(h,{symbolName:a,x:b,y:c,width:d,height:e}),f&&x(h,f);else if(j.test(a))l=function(a,b){a.element&&(a.attr({width:b[0],height:b[1]}),a.alignByTranslate||a.translate(y((d-
b[0])/2),y((e-b[1])/2)))},k=a.match(j)[1],a=Vb[k]||f&&f.width&&f.height&&[f.width,f.height],h=this.image(k).attr({x:b,y:c}),h.isImg=!0,a?l(h,a):(h.attr({width:0,height:0}),ea("img",{onload:function(){this.width===0&&(F(this,{position:"absolute",top:"-999em"}),B.body.appendChild(this));l(h,Vb[k]=[this.width,this.height]);this.parentNode&&this.parentNode.removeChild(this);g.imgCount--;if(!g.imgCount&&$[g.chartIndex].onload)$[g.chartIndex].onload()},src:k}),this.imgCount++);return h},symbols:{circle:function(a,
b,c,d){var e=0.166*c;return["M",a+c/2,b,"C",a+c+e,b,a+c+e,b+d,a+c/2,b+d,"C",a-e,b+d,a-e,b,a+c/2,b,"Z"]},square:function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"]},triangle:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d,a,b+d,"Z"]},"triangle-down":function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c/2,b+d,"Z"]},diamond:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d/2,a+c/2,b+d,a,b+d/2,"Z"]},arc:function(a,b,c,d,e){var f=e.start,c=e.r||c||d,g=e.end-0.001,d=e.innerR,h=e.open,i=ba(f),j=ka(f),
k=ba(g),g=ka(g),e=e.end-f<Ba?0:1;return["M",a+c*i,b+c*j,"A",c,c,0,e,1,a+c*k,b+c*g,h?"M":"L",a+d*k,b+d*g,"A",d,d,0,e,0,a+d*i,b+d*j,h?"":"Z"]},callout:function(a,b,c,d,e){var f=E(e&&e.r||0,c,d),g=f+6,h=e&&e.anchorX,e=e&&e.anchorY,i;i=["M",a+f,b,"L",a+c-f,b,"C",a+c,b,a+c,b,a+c,b+f,"L",a+c,b+d-f,"C",a+c,b+d,a+c,b+d,a+c-f,b+d,"L",a+f,b+d,"C",a,b+d,a,b+d,a,b+d-f,"L",a,b+f,"C",a,b,a,b,a+f,b];h&&h>c&&e>b+g&&e<b+d-g?i.splice(13,3,"L",a+c,e-6,a+c+6,e,a+c,e+6,a+c,b+d-f):h&&h<0&&e>b+g&&e<b+d-g?i.splice(33,3,
"L",a,e+6,a-6,e,a,e-6,a,b+f):e&&e>d&&h>a+g&&h<a+c-g?i.splice(23,3,"L",h+6,b+d,h,b+d+6,h-6,b+d,a+f,b+d):e&&e<0&&h>a+g&&h<a+c-g&&i.splice(3,3,"L",h-6,b,h,b-6,h+6,b,c-f,b);return i}},clipRect:function(a,b,c,d){var e="highcharts-"+Jb++,f=this.createElement("clipPath").attr({id:e}).add(this.defs),a=this.rect(a,b,c,d,0).add(f);a.id=e;a.clipPath=f;a.count=0;return a},text:function(a,b,c,d){var e=qa||!ja&&this.forExport,f={};if(d&&(this.allowHTML||!this.forExport))return this.html(a,b,c);f.x=Math.round(b||
0);if(c)f.y=Math.round(c);if(a||a===0)f.text=a;a=this.createElement("text").attr(f);e&&a.css({position:"absolute"});if(!d)a.xSetter=function(a,b,c){var d=c.getElementsByTagName("tspan"),e,f=c.getAttribute(b),m;for(m=0;m<d.length;m++)e=d[m],e.getAttribute(b)===f&&e.setAttribute(b,a);c.setAttribute(b,a)};return a},fontMetrics:function(a,b){var c,d,a=a||this.style.fontSize;!a&&b&&J.getComputedStyle&&(b=b.element||b,a=(c=J.getComputedStyle(b,""))&&c.fontSize);a=/px/.test(a)?G(a):/em/.test(a)?parseFloat(a)*
12:12;c=a<24?a+3:y(a*1.2);d=y(c*0.8);return{h:c,b:d,f:a}},rotCorr:function(a,b,c){var d=a;b&&c&&(d=v(d*ba(b*pa),4));return{x:-a/3*ka(b*pa),y:d}},label:function(a,b,c,d,e,f,g,h,i){var j=this,k=j.g(i),l=j.text("",0,0,g).attr({zIndex:1}),m,o,p=0,r=3,A=0,q,u,w,O,R=0,ha={},v,z,L,E,B;L=function(){var a,b;a=l.element.style;o=(q===void 0||u===void 0||k.styles.textAlign)&&s(l.textStr)&&l.getBBox();k.width=(q||o.width||0)+2*r+A;k.height=(u||o.height||0)+2*r;v=r+j.fontMetrics(a&&a.fontSize,l).b;if(z){if(!m)a=
R,b=(h?-v:0)+R,k.box=m=d?j.symbol(d,a,b,k.width,k.height,ha):j.rect(a,b,k.width,k.height,0,ha["stroke-width"]),m.isImg||m.attr("fill","none"),m.add(k);m.isImg||m.attr(x({width:y(k.width),height:y(k.height)},ha));ha=null}};E=function(){var a=k.styles,a=a&&a.textAlign,b=A+r,c;c=h?0:v;if(s(q)&&o&&(a==="center"||a==="right"))b+={center:0.5,right:1}[a]*(q-o.width);if(b!==l.x||c!==l.y)l.attr("x",b),c!==t&&l.attr("y",c);l.x=b;l.y=c};B=function(a,b){m?m.attr(a,b):ha[a]=b};k.onAdd=function(){l.add(k);k.attr({text:a||
a===0?a:"",x:b,y:c});m&&s(e)&&k.attr({anchorX:e,anchorY:f})};k.widthSetter=function(a){q=a};k.heightSetter=function(a){u=a};k.paddingSetter=function(a){if(s(a)&&a!==r)r=k.padding=a,E()};k.paddingLeftSetter=function(a){s(a)&&a!==A&&(A=a,E())};k.alignSetter=function(a){a={left:0,center:0.5,right:1}[a];a!==p&&(p=a,o&&k.attr({x:w}))};k.textSetter=function(a){a!==t&&l.textSetter(a);L();E()};k["stroke-widthSetter"]=function(a,b){a&&(z=!0);R=a%2/2;B(b,a)};k.strokeSetter=k.fillSetter=k.rSetter=function(a,
b){b==="fill"&&a&&(z=!0);B(b,a)};k.anchorXSetter=function(a,b){e=a;B(b,y(a)-R-w)};k.anchorYSetter=function(a,b){f=a;B(b,a-O)};k.xSetter=function(a){k.x=a;p&&(a-=p*((q||o.width)+2*r));w=y(a);k.attr("translateX",w)};k.ySetter=function(a){O=k.y=y(a);k.attr("translateY",O)};var D=k.css;return x(k,{css:function(a){if(a){var b={},a=C(a);n(k.textProps,function(c){a[c]!==t&&(b[c]=a[c],delete a[c])});l.css(b)}return D.call(k,a)},getBBox:function(){return{width:o.width+2*r,height:o.height+2*r,x:o.x-r,y:o.y-
r}},shadow:function(a){m&&m.shadow(a);return k},destroy:function(){T(k.element,"mouseenter");T(k.element,"mouseleave");l&&(l=l.destroy());m&&(m=m.destroy());Z.prototype.destroy.call(k);k=j=L=E=B=null}})}};Ya=ya;x(Z.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&b.tagName==="SPAN"&&a.width)delete a.width,this.textWidth=b,this.updateTransform();if(a&&a.textOverflow==="ellipsis")a.whiteSpace="nowrap",a.overflow="hidden";this.styles=x(this.styles,a);F(this.element,a);return this},htmlGetBBox:function(){var a=
this.element;if(a.nodeName==="text")a.style.position="absolute";return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,c=this.translateX||0,d=this.translateY||0,e=this.x||0,f=this.y||0,g=this.textAlign||"left",h={left:0,center:0.5,right:1}[g],i=this.shadows,j=this.styles;F(b,{marginLeft:c,marginTop:d});i&&n(i,function(a){F(a,{marginLeft:c+1,marginTop:d+1})});this.inverted&&n(b.childNodes,function(c){a.invertChild(c,
b)});if(b.tagName==="SPAN"){var i=this.rotation,k=G(this.textWidth),l=j&&j.whiteSpace,m=[i,g,b.innerHTML,this.textWidth,this.textAlign].join(",");if(m!==this.cTT){j=a.fontMetrics(b.style.fontSize).b;s(i)&&this.setSpanRotation(i,h,j);if(b.offsetWidth>k&&/[ \-]/.test(b.textContent||b.innerText))F(b,{width:k+"px",display:"block",whiteSpace:l||"normal"}),this.hasTextWidth=!0;else if(this.hasTextWidth)F(b,{width:"",display:"",whiteSpace:l||"nowrap"}),this.hasTextWidth=!1;this.getSpanCorrection(this.hasTextWidth?
k:b.offsetWidth,j,h,i,g)}F(b,{left:e+(this.xCorr||0)+"px",top:f+(this.yCorr||0)+"px"});if(tb)j=b.offsetHeight;this.cTT=m}}else this.alignOnAdd=!0},setSpanRotation:function(a,b,c){var d={},e=Ka?"-ms-transform":tb?"-webkit-transform":Xa?"MozTransform":Ub?"-o-transform":"";d[e]=d.transform="rotate("+a+"deg)";d[e+(Xa?"Origin":"-origin")]=d.transformOrigin=b*100+"% "+c+"px";F(this.element,d)},getSpanCorrection:function(a,b,c){this.xCorr=-a*c;this.yCorr=-b}});x(ya.prototype,{html:function(a,b,c){var d=
this.createElement("span"),e=d.element,f=d.renderer,g=f.isSVG,h=function(a,b){n(["opacity","visibility"],function(c){U(a,c+"Setter",function(a,c,d,e){a.call(this,c,d,e);b[d]=c})})};d.textSetter=function(a){a!==e.innerHTML&&delete this.bBox;e.innerHTML=this.textStr=a;d.htmlUpdateTransform()};g&&h(d,d.element.style);d.xSetter=d.ySetter=d.alignSetter=d.rotationSetter=function(a,b){b==="align"&&(b="textAlign");d[b]=a;d.htmlUpdateTransform()};d.attr({text:a,x:y(b),y:y(c)}).css({position:"absolute",fontFamily:this.style.fontFamily,
fontSize:this.style.fontSize});e.style.whiteSpace="nowrap";d.css=d.htmlCss;if(g)d.add=function(a){var b,c=f.box.parentNode,g=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)g.push(a),a=a.parentGroup;n(g.reverse(),function(a){var d,e=X(a.element,"class");e&&(e={className:e});b=a.div=a.div||ea(Wa,e,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",opacity:a.opacity},b||c);d=b.style;x(a,{translateXSetter:function(b,c){d.left=b+"px";a[c]=b;a.doTransform=!0},translateYSetter:function(b,
c){d.top=b+"px";a[c]=b;a.doTransform=!0}});h(a,d)})}}else b=c;b.appendChild(e);d.added=!0;d.alignOnAdd&&d.htmlUpdateTransform();return d};return d}});var mb,aa;if(!ja&&!qa)aa={init:function(a,b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",";"],e=b===Wa;(b==="shape"||e)&&d.push("left:0;top:0;width:1px;height:1px;");d.push("visibility: ",e?"hidden":"visible");c.push(' style="',d.join(""),'"/>');if(b)c=e||b==="span"||b==="img"?c.join(""):a.prepVML(c),this.element=ea(c);this.renderer=
a},add:function(a){var b=this.renderer,c=this.element,d=b.box,e=a&&a.inverted,d=a?a.element||a:d;if(a)this.parentGroup=a;e&&b.invertChild(c,d);d.appendChild(c);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();return this},updateTransform:Z.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,b=ba(a*pa),c=ka(a*pa);F(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",b,", M12=",-c,", M21=",c,", M22=",
b,", sizingMethod='auto expand')"].join(""):"none"})},getSpanCorrection:function(a,b,c,d,e){var f=d?ba(d*pa):1,g=d?ka(d*pa):0,h=q(this.elemHeight,this.element.offsetHeight),i;this.xCorr=f<0&&-a;this.yCorr=g<0&&-h;i=f*g<0;this.xCorr+=g*b*(i?1-c:c);this.yCorr-=f*b*(d?i?c:1-c:1);e&&e!=="left"&&(this.xCorr-=a*c*(f<0?-1:1),d&&(this.yCorr-=h*c*(g<0?-1:1)),F(this.element,{textAlign:e}))},pathToVML:function(a){for(var b=a.length,c=[];b--;)if(ua(a[b]))c[b]=y(a[b]*10)-5;else if(a[b]==="Z")c[b]="x";else if(c[b]=
a[b],a.isArc&&(a[b]==="wa"||a[b]==="at"))c[b+5]===c[b+7]&&(c[b+7]+=a[b+7]>a[b+5]?1:-1),c[b+6]===c[b+8]&&(c[b+8]+=a[b+8]>a[b+6]?1:-1);return c.join(" ")||"x"},clip:function(a){var b=this,c;a?(c=a.members,Aa(c,b),c.push(b),b.destroyClip=function(){Aa(c,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:sb?"inherit":"rect(auto)"});return b.css(a)},css:Z.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&Va(a)},destroy:function(){this.destroyClip&&this.destroyClip();return Z.prototype.destroy.apply(this)},
on:function(a,b){this.element["on"+a]=function(){var a=J.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var c,a=a.split(/[ ,]/);c=a.length;if(c===9||c===11)a[c-4]=a[c-2]=G(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],e,f=this.element,g=this.renderer,h,i=f.style,j,k=f.path,l,m,o,p;k&&typeof k.value!=="string"&&(k="x");m=k;if(a){o=q(a.width,3);p=(a.opacity||0.15)/o;for(e=1;e<=3;e++){l=o*2+1-2*e;c&&(m=this.cutOffPath(k.value,l+0.5));j=['<shape isShadow="true" strokeweight="',
l,'" filled="false" path="',m,'" coordsize="10 10" style="',f.style.cssText,'" />'];h=ea(g.prepVML(j),null,{left:G(i.left)+q(a.offsetX,1),top:G(i.top)+q(a.offsetY,1)});if(c)h.cutOff=l+1;j=['<stroke color="',a.color||"black",'" opacity="',p*e,'"/>'];ea(g.prepVML(j),null,null,h);b?b.element.appendChild(h):f.parentNode.insertBefore(h,f);d.push(h)}this.shadows=d}return this},updateShadows:ra,setAttr:function(a,b){sb?this.element[a]=b:this.element.setAttribute(a,b)},classSetter:function(a){this.element.className=
a},dashstyleSetter:function(a,b,c){(c.getElementsByTagName("stroke")[0]||ea(this.renderer.prepVML(["<stroke/>"]),null,null,c))[b]=a||"solid";this[b]=a},dSetter:function(a,b,c){var d=this.shadows,a=a||[];this.d=a.join&&a.join(" ");c.path=a=this.pathToVML(a);if(d)for(c=d.length;c--;)d[c].path=d[c].cutOff?this.cutOffPath(a,d[c].cutOff):a;this.setAttr(b,a)},fillSetter:function(a,b,c){var d=c.nodeName;if(d==="SPAN")c.style.color=a;else if(d!=="IMG")c.filled=a!=="none",this.setAttr("fillcolor",this.renderer.color(a,
c,b,this))},"fill-opacitySetter":function(a,b,c){ea(this.renderer.prepVML(["<",b.split("-")[0],' opacity="',a,'"/>']),null,null,c)},opacitySetter:ra,rotationSetter:function(a,b,c){c=c.style;this[b]=c[b]=a;c.left=-y(ka(a*pa)+1)+"px";c.top=y(ba(a*pa))+"px"},strokeSetter:function(a,b,c){this.setAttr("strokecolor",this.renderer.color(a,c,b,this))},"stroke-widthSetter":function(a,b,c){c.stroked=!!a;this[b]=a;ua(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},
visibilitySetter:function(a,b,c){a==="inherit"&&(a="visible");this.shadows&&n(this.shadows,function(c){c.style[b]=a});c.nodeName==="DIV"&&(a=a==="hidden"?"-999em":0,sb||(c.style[b]=a?"visible":"hidden"),b="top");c.style[b]=a},xSetter:function(a,b,c){this[b]=a;b==="x"?b="left":b==="y"&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):c.style[b]=a},zIndexSetter:function(a,b,c){c.style[b]=a}},aa["stroke-opacitySetter"]=aa["fill-opacitySetter"],z.VMLElement=aa=la(Z,aa),aa.prototype.ySetter=
aa.prototype.widthSetter=aa.prototype.heightSetter=aa.prototype.xSetter,aa={Element:aa,isIE8:Ma.indexOf("MSIE 8.0")>-1,init:function(a,b,c,d){var e;this.alignedObjects=[];d=this.createElement(Wa).css(x(this.getStyle(d),{position:"relative"}));e=d.element;a.appendChild(d.element);this.isVML=!0;this.box=e;this.boxWrapper=d;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);if(!B.namespaces.hcv){B.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{B.createStyleSheet().cssText=
"hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(f){B.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,d){var e=this.createElement(),f=da(a);return x(e,{members:[],count:0,left:(f?a.x:a)+1,top:(f?a.y:b)+1,width:(f?a.width:c)-1,height:(f?a.height:d)-1,getCSS:function(a){var b=a.element,
c=b.nodeName,a=a.inverted,d=this.top-(c==="shape"?b.offsetTop:0),e=this.left,b=e+this.width,f=d+this.height,d={clip:"rect("+y(a?e:d)+"px,"+y(a?f:b)+"px,"+y(a?b:f)+"px,"+y(a?d:e)+"px)"};!a&&sb&&c==="DIV"&&x(d,{width:b+"px",height:f+"px"});return d},updateClipping:function(){n(e.members,function(a){a.element&&a.css(e.getCSS(a))})}})},color:function(a,b,c,d){var e=this,f,g=/^rgba/,h,i,j="none";a&&a.linearGradient?i="gradient":a&&a.radialGradient&&(i="pattern");if(i){var k,l,m=a.linearGradient||a.radialGradient,
o,p,r,A,q,u="",a=a.stops,w,O=[],R=function(){h=['<fill colors="'+O.join(",")+'" opacity="',r,'" o:opacity2="',p,'" type="',i,'" ',u,'focus="100%" method="any" />'];ea(e.prepVML(h),null,null,b)};o=a[0];w=a[a.length-1];o[0]>0&&a.unshift([0,o[1]]);w[0]<1&&a.push([1,w[1]]);n(a,function(a,b){g.test(a[1])?(f=wa(a[1]),k=f.get("rgb"),l=f.get("a")):(k=a[1],l=1);O.push(a[0]*100+"% "+k);b?(r=l,A=k):(p=l,q=k)});if(c==="fill")if(i==="gradient")c=m.x1||m[0]||0,a=m.y1||m[1]||0,o=m.x2||m[2]||0,m=m.y2||m[3]||0,u=
'angle="'+(90-Y.atan((m-a)/(o-c))*180/Ba)+'"',R();else{var j=m.r,ha=j*2,s=j*2,v=m.cx,t=m.cy,y=b.radialReference,x,j=function(){y&&(x=d.getBBox(),v+=(y[0]-x.x)/x.width-0.5,t+=(y[1]-x.y)/x.height-0.5,ha*=y[2]/x.width,s*=y[2]/x.height);u='src="'+N.global.VMLRadialGradientURL+'" size="'+ha+","+s+'" origin="0.5,0.5" position="'+v+","+t+'" color2="'+q+'" ';R()};d.added?j():d.onAdd=j;j=A}else j=k}else if(g.test(a)&&b.tagName!=="IMG")f=wa(a),d[c+"-opacitySetter"](f.get("a"),c,b),j=f.get("rgb");else{j=b.getElementsByTagName(c);
if(j.length)j[0].opacity=1,j[0].type="solid";j=a}return j},prepVML:function(a){var b=this.isIE8,a=a.join("");b?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=a.indexOf('style="')===-1?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:ya.prototype.html,path:function(a){var b={coordsize:"10 10"};Ja(a)?b.d=a:da(a)&&x(b,a);return this.createElement("shape").attr(b)},
circle:function(a,b,c){var d=this.symbol("circle");if(da(a))c=a.r,b=a.y,a=a.x;d.isCircle=!0;d.r=c;return d.attr({x:a,y:b})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement(Wa).attr(b)},image:function(a,b,c,d,e){var f=this.createElement("img").attr({src:a});arguments.length>1&&f.attr({x:b,y:c,width:d,height:e});return f},createElement:function(a){return a==="rect"?this.symbol(a):ya.prototype.createElement.call(this,a)},invertChild:function(a,
b){var c=this,d=b.style,e=a.tagName==="IMG"&&a.style;F(a,{flip:"x",left:G(d.width)-(e?G(e.top):1),top:G(d.height)-(e?G(e.left):1),rotation:-90});n(a.childNodes,function(b){c.invertChild(b,a)})},symbols:{arc:function(a,b,c,d,e){var f=e.start,g=e.end,h=e.r||c||d,c=e.innerR,d=ba(f),i=ka(f),j=ba(g),k=ka(g);if(g-f===0)return["x"];f=["wa",a-h,b-h,a+h,b+h,a+h*d,b+h*i,a+h*j,b+h*k];e.open&&!c&&f.push("e","M",a,b);f.push("at",a-c,b-c,a+c,b+c,a+c*j,b+c*k,a+c*d,b+c*i,"x","e");f.isArc=!0;return f},circle:function(a,
b,c,d,e){e&&(c=d=2*e.r);e&&e.isCircle&&(a-=c/2,b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"]},rect:function(a,b,c,d,e){return ya.prototype.symbols[!s(e)||!e.r?"square":"callout"].call(0,a,b,c,d,e)}}},z.VMLRenderer=mb=function(){this.init.apply(this,arguments)},mb.prototype=C(ya.prototype,aa),Ya=mb;ya.prototype.measureSpanWidth=function(a,b){var c=B.createElement("span"),d;d=B.createTextNode(a);c.appendChild(d);F(c,b);this.box.appendChild(c);d=c.offsetWidth;Va(c);return d};var Wb;if(qa)z.CanVGRenderer=
aa=function(){Qa="http://www.w3.org/1999/xhtml"},aa.prototype.symbols={},Wb=function(){function a(){var a=b.length,d;for(d=0;d<a;d++)b[d]();b=[]}var b=[];return{push:function(c,d){if(b.length===0){var e=B.getElementsByTagName("head")[0],f=B.createElement("script");f.type="text/javascript";f.src=d;f.onload=a;e.appendChild(f)}b.push(c)}}}(),Ya=aa;cb.prototype={addLabel:function(){var a=this.axis,b=a.options,c=a.chart,d=a.categories,e=a.names,f=this.pos,g=b.labels,h=a.tickPositions,i=f===h[0],j=f===
h[h.length-1],e=d?q(d[f],e[f],f):f,d=this.label,h=h.info,k;a.isDatetimeAxis&&h&&(k=b.dateTimeLabelFormats[h.higherRanks[f]||h.unitName]);this.isFirst=i;this.isLast=j;b=a.labelFormatter.call({axis:a,chart:c,isFirst:i,isLast:j,dateTimeLabelFormat:k,value:a.isLog?na(a.lin2log(e)):e});s(d)?d&&d.attr({text:b}):(this.labelLength=(this.label=d=s(b)&&g.enabled?c.renderer.text(b,0,0,g.useHTML).css(C(g.style)).add(a.labelGroup):null)&&d.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?
this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var b=this.axis,c=a.x,d=b.chart.chartWidth,e=b.chart.spacing,f=q(b.labelLeft,E(b.pos,e[3])),e=q(b.labelRight,v(b.pos+b.len,d-e[1])),g=this.label,h=this.rotation,i={left:0,center:0.5,right:1}[b.labelAlign],j=g.getBBox().width,k=b.getSlotWidth(),l=k,m=1,o,p={};if(h)h<0&&c-i*j<f?o=y(c/ba(h*pa)-f):h>0&&c+i*j>e&&(o=y((d-c)/ba(h*pa)));else if(d=c+(1-i)*j,c-i*j<f?l=a.x+l*(1-i)-f:d>e&&(l=e-a.x+l*i,m=-1),l=E(k,l),l<k&&b.labelAlign===
"center"&&(a.x+=m*(k-l-i*(k-E(j,l)))),j>l||b.autoRotation&&g.styles.width)o=l;if(o){p.width=o;if(!b.options.labels.style.textOverflow)p.textOverflow="ellipsis";g.css(p)}},getPosition:function(a,b,c,d){var e=this.axis,f=e.chart,g=d&&f.oldChartHeight||f.chartHeight;return{x:a?e.translate(b+c,null,null,d)+e.transB:e.left+e.offset+(e.opposite?(d&&f.oldChartWidth||f.chartWidth)-e.right-e.left:0),y:a?g-e.bottom+e.offset-(e.opposite?e.height:0):g-e.translate(b+c,null,null,d)-e.transB}},getLabelPosition:function(a,
b,c,d,e,f,g,h){var i=this.axis,j=i.transA,k=i.reversed,l=i.staggerLines,m=i.tickRotCorr||{x:0,y:0},o=e.y;s(o)||(o=i.side===0?c.rotation?-8:-c.getBBox().height:i.side===2?m.y+8:ba(c.rotation*pa)*(m.y-c.getBBox(!1,0).height/2));a=a+e.x+m.x-(f&&d?f*j*(k?-1:1):0);b=b+o-(f&&!d?f*j*(k?1:-1):0);l&&(c=g/(h||1)%l,i.opposite&&(c=l-c-1),b+=c*(i.labelOffset/l));return{x:a,y:y(b)}},getMarkPath:function(a,b,c,d,e,f){return f.crispLine(["M",a,b,"L",a+(e?0:-c),b+(e?c:0)],d)},render:function(a,b,c){var d=this.axis,
e=d.options,f=d.chart.renderer,g=d.horiz,h=this.type,i=this.label,j=this.pos,k=e.labels,l=this.gridLine,m=h?h+"Grid":"grid",o=h?h+"Tick":"tick",p=e[m+"LineWidth"],r=e[m+"LineColor"],A=e[m+"LineDashStyle"],m=d.tickSize(o),o=e[o+"Color"],P=this.mark,u=k.step,w=!0,n=d.tickmarkOffset,R=this.getPosition(g,j,n,b),ha=R.x,R=R.y,s=g&&ha===d.pos+d.len||!g&&R===d.pos?-1:1,c=q(c,1);this.isActive=!0;if(p){j=d.getPlotLinePath(j+n,p*s,b,!0);if(l===t){l={stroke:r,"stroke-width":p};if(A)l.dashstyle=A;if(!h)l.zIndex=
1;if(b)l.opacity=0;this.gridLine=l=p?f.path(j).attr(l).add(d.gridGroup):null}if(!b&&l&&j)l[this.isNew?"attr":"animate"]({d:j,opacity:c})}if(m)d.opposite&&(m[0]=-m[0]),h=this.getMarkPath(ha,R,m[0],m[1]*s,g,f),P?P.animate({d:h,opacity:c}):this.mark=f.path(h).attr({stroke:o,"stroke-width":m[1],opacity:c}).add(d.axisGroup);if(i&&!isNaN(ha))i.xy=R=this.getLabelPosition(ha,R,i,g,k,n,a,u),this.isFirst&&!this.isLast&&!q(e.showFirstLabel,1)||this.isLast&&!this.isFirst&&!q(e.showLastLabel,1)?w=!1:g&&!d.isRadial&&
!k.step&&!k.rotation&&!b&&c!==0&&this.handleOverflow(R),u&&a%u&&(w=!1),w&&!isNaN(R.y)?(R.opacity=c,i[this.isNew?"attr":"animate"](R),this.isNew=!1):i.attr("y",-9999)},destroy:function(){Pa(this,this.axis)}};z.PlotLineOrBand=function(a,b){this.axis=a;if(b)this.options=b,this.id=b.id};z.PlotLineOrBand.prototype={render:function(){var a=this,b=a.axis,c=b.horiz,d=a.options,e=d.label,f=a.label,g=d.width,h=d.to,i=d.from,j=s(i)&&s(h),k=d.value,l=d.dashStyle,m=a.svgElem,o=[],p,r=d.color,A=q(d.zIndex,0),n=
d.events,u={},w=b.chart.renderer,o=b.log2lin;b.isLog&&(i=o(i),h=o(h),k=o(k));if(g){if(o=b.getPlotLinePath(k,g),u={stroke:r,"stroke-width":g},l)u.dashstyle=l}else if(j){o=b.getPlotBandPath(i,h,d);if(r)u.fill=r;if(d.borderWidth)u.stroke=d.borderColor,u["stroke-width"]=d.borderWidth}else return;u.zIndex=A;if(m)if(o)m.show(),m.animate({d:o});else{if(m.hide(),f)a.label=f=f.destroy()}else if(o&&o.length&&(a.svgElem=m=w.path(o).attr(u).add(),n))for(p in d=function(b){m.on(b,function(c){n[b].apply(a,[c])})},
n)d(p);e&&s(e.text)&&o&&o.length&&b.width>0&&b.height>0&&!o.flat?(e=C({align:c&&j&&"center",x:c?!j&&4:10,verticalAlign:!c&&j&&"middle",y:c?j?16:10:j?6:-4,rotation:c&&!j&&90},e),this.renderLabel(e,o,j,A)):f&&f.hide();return a},renderLabel:function(a,b,c,d){var e=this.label,f=this.axis.chart.renderer;if(!e)e={align:a.textAlign||a.align,rotation:a.rotation},e.zIndex=d,this.label=e=f.text(a.text,0,0,a.useHTML).attr(e).css(a.style).add();d=[b[1],b[4],c?b[6]:b[1]];b=[b[2],b[5],c?b[7]:b[2]];c=Oa(d);f=Oa(b);
e.align(a,!1,{x:c,y:f,width:Ea(d)-c,height:Ea(b)-f});e.show()},destroy:function(){Aa(this.axis.plotLinesAndBands,this);delete this.axis;Pa(this)}};var I=z.Axis=function(){this.init.apply(this,arguments)};I.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,gridLineColor:"#D8D8D8",labels:{enabled:!0,style:{color:"#606060",cursor:"default",fontSize:"11px"},x:0},lineColor:"#C0D0E0",
lineWidth:1,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickColor:"#C0D0E0",tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#707070"}},type:"linear"},defaultYAxisOptions:{endOnTick:!0,gridLineWidth:1,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},lineWidth:0,maxPadding:0.05,minPadding:0.05,
startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return z.numberFormat(this.total,-1)},style:C(W.line.dataLabels.style,{color:"#000000"})}},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,b){var c=b.isX;this.chart=
a;this.horiz=a.inverted?!c:c;this.coll=(this.isXAxis=c)?"xAxis":"yAxis";this.opposite=b.opposite;this.side=b.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(b);var d=this.options,e=d.type;this.labelFormatter=d.labels.formatter||this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.reversed=d.reversed;this.visible=d.visible!==!1;this.zoomEnabled=d.zoomEnabled!==!1;this.categories=d.categories||e==="category";this.names=this.names||[];this.isLog=e==="logarithmic";
this.isDatetimeAxis=e==="datetime";this.isLinked=s(d.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.stacksTouched=0;this.min=this.max=null;this.crosshair=q(d.crosshair,va(a.options.tooltip.crosshairs)[c?0:1],!1);var f,d=this.options.events;sa(this,a.axes)===-1&&(c&&!this.isColorAxis?a.axes.splice(a.xAxis.length,
0,this):a.axes.push(this),a[this.coll].push(this));this.series=this.series||[];if(a.inverted&&c&&this.reversed===t)this.reversed=!0;this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(f in d)D(this,f,d[f]);if(this.isLog)this.val2lin=this.log2lin,this.lin2val=this.lin2log},setOptions:function(a){this.options=C(this.defaultOptions,this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],
C(N[this.coll],a))},defaultLabelFormatter:function(){var a=this.axis,b=this.value,c=a.categories,d=this.dateTimeLabelFormat,e=N.lang.numericSymbols,f=e&&e.length,g,h=a.options.labels.format,a=a.isLog?b:a.tickInterval;if(h)g=La(h,this);else if(c)g=b;else if(d)g=ma(d,b);else if(f&&a>=1E3)for(;f--&&g===t;)c=Math.pow(1E3,f+1),a>=c&&b*10%c===0&&e[f]!==null&&(g=z.numberFormat(b/c,-1)+e[f]);g===t&&(g=S(b)>=1E4?z.numberFormat(b,-1):z.numberFormat(b,-1,t,""));return g},getSeriesExtremes:function(){var a=this,
b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();n(a.series,function(c){if(c.visible||!b.options.chart.ignoreHiddenSeries){var d=c.options,e=d.threshold,f;a.hasVisibleSeries=!0;a.isLog&&e<=0&&(e=null);if(a.isXAxis){if(d=c.xData,d.length)a.dataMin=E(q(a.dataMin,d[0]),Oa(d)),a.dataMax=v(q(a.dataMax,d[0]),Ea(d))}else{c.getExtremes();f=c.dataMax;c=c.dataMin;if(s(c)&&s(f))a.dataMin=E(q(a.dataMin,c),c),a.dataMax=v(q(a.dataMax,
f),f);if(s(e))a.threshold=e;if(!d.softThreshold||a.isLog)a.softThreshold=!1}}})},translate:function(a,b,c,d,e,f){var g=this.linkedParent||this,h=1,i=0,j=d?g.oldTransA:g.transA,d=d?g.oldMin:g.min,k=g.minPixelPadding,e=(g.isOrdinal||g.isBroken||g.isLog&&e)&&g.lin2val;if(!j)j=g.transA;if(c)h*=-1,i=g.len;g.reversed&&(h*=-1,i-=h*(g.sector||g.len));b?(a=a*h+i,a-=k,a=a/j+d,e&&(a=g.lin2val(a))):(e&&(a=g.val2lin(a)),f==="between"&&(f=0.5),a=h*(a-d)*j+i+h*k+(ua(f)?j*f*g.pointRange:0));return a},toPixels:function(a,
b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,d,e){var f=this.chart,g=this.left,h=this.top,i,j,k=c&&f.oldChartHeight||f.chartHeight,l=c&&f.oldChartWidth||f.chartWidth,m;i=this.transB;var o=function(a,b,c){if(a<b||a>c)d?a=E(v(b,a),c):m=!0;return a},e=q(e,this.translate(a,null,null,c)),a=c=y(e+i);i=j=y(k-e-i);isNaN(e)?m=!0:this.horiz?(i=h,j=k-this.bottom,a=c=o(a,
g,g+this.width)):(a=g,c=l-this.right,i=j=o(i,h,h+this.height));return m&&!d?null:f.renderer.crispLine(["M",a,i,"L",c,j],b||1)},getLinearTickPositions:function(a,b,c){var d,e=na(V(b/a)*a),f=na(Fa(c/a)*a),g=[];if(b===c&&ua(b))return[b];for(b=e;b<=f;){g.push(b);b=na(b+a);if(b===d)break;d=b}return g},getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,c=this.minorTickInterval,d=[],e,f=this.pointRangePadding||0;e=this.min-f;var f=this.max+f,g=f-e;if(g&&g/c<this.len/3)if(this.isLog){f=
b.length;for(e=1;e<f;e++)d=d.concat(this.getLogTickPositions(c,b[e-1],b[e],!0))}else if(this.isDatetimeAxis&&a.minorTickInterval==="auto")d=d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c),e,f,a.startOfWeek));else for(b=e+(b[0]-e)%c;b<=f;b+=c)d.push(b);d.length!==0&&this.trimTicks(d,a.startOnTick,a.endOnTick);return d},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,e=this.dataMax-this.dataMin>=this.minRange,f,g,h,i,j,k;if(this.isXAxis&&this.minRange===t&&!this.isLog)s(a.min)||
s(a.max)?this.minRange=null:(n(this.series,function(a){i=a.xData;for(g=j=a.xIncrement?1:i.length-1;g>0;g--)if(h=i[g]-i[g-1],f===t||h<f)f=h}),this.minRange=E(f*5,this.dataMax-this.dataMin));if(c-b<this.minRange){k=this.minRange;d=(k-c+b)/2;d=[b-d,q(a.min,b-d)];if(e)d[2]=this.dataMin;b=Ea(d);c=[b+k,q(a.max,b+k)];if(e)c[2]=this.dataMax;c=Oa(c);c-b<k&&(d[0]=c-k,d[1]=q(a.min,c-k),b=Ea(d))}this.min=b;this.max=c},getClosest:function(){var a;n(this.series,function(b){var c=b.closestPointRange;!b.noSharedTooltip&&
s(c)&&(a=s(a)?E(a,c):c)});return a},setAxisTranslation:function(a){var b=this,c=b.max-b.min,d=b.axisPointRange||0,e,f=0,g=0,h=b.linkedParent,i=!!b.categories,j=b.transA,k=b.isXAxis;if(k||i||d)if(h?(f=h.minPointOffset,g=h.pointRangePadding):(e=b.getClosest(),n(b.series,function(a){var c=i?1:k?q(a.options.pointRange,e,0):b.axisPointRange||0,a=a.options.pointPlacement;d=v(d,c);b.single||(f=v(f,Da(a)?0:c/2),g=v(g,a==="on"?0:c))})),h=b.ordinalSlope&&e?b.ordinalSlope/e:1,b.minPointOffset=f*=h,b.pointRangePadding=
g*=h,b.pointRange=E(d,c),k)b.closestPointRange=e;if(a)b.oldTransA=j;b.translationSlope=b.transA=j=b.len/(c+g||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=j*f},minFromRange:function(){return this.max-this.range},setTickInterval:function(a){var b=this,c=b.chart,d=b.options,e=b.isLog,f=b.log2lin,g=b.isDatetimeAxis,h=b.isXAxis,i=b.isLinked,j=d.maxPadding,k=d.minPadding,l=d.tickInterval,m=d.tickPixelInterval,o=b.categories,p=b.threshold,r=b.softThreshold,A,P,u,w;!g&&!o&&!i&&this.getTickAmount();
u=q(b.userMin,d.min);w=q(b.userMax,d.max);i?(b.linkedParent=c[b.coll][d.linkedTo],c=b.linkedParent.getExtremes(),b.min=q(c.min,c.dataMin),b.max=q(c.max,c.dataMax),d.type!==b.linkedParent.options.type&&ga(11,1)):(!r&&s(p)&&(b.dataMin>=p?(A=p,k=0):b.dataMax<=p&&(P=p,j=0)),b.min=q(u,A,b.dataMin),b.max=q(w,P,b.dataMax));if(e)!a&&E(b.min,q(b.dataMin,b.min))<=0&&ga(10,1),b.min=na(f(b.min),15),b.max=na(f(b.max),15);if(b.range&&s(b.max))b.userMin=b.min=u=v(b.min,b.minFromRange()),b.userMax=w=b.max,b.range=
null;b.beforePadding&&b.beforePadding();b.adjustForMinRange();if(!o&&!b.axisPointRange&&!b.usePercentage&&!i&&s(b.min)&&s(b.max)&&(f=b.max-b.min))!s(u)&&k&&(b.min-=f*k),!s(w)&&j&&(b.max+=f*j);if(ua(d.floor))b.min=v(b.min,d.floor);if(ua(d.ceiling))b.max=E(b.max,d.ceiling);if(r&&s(b.dataMin))if(p=p||0,!s(u)&&b.min<p&&b.dataMin>=p)b.min=p;else if(!s(w)&&b.max>p&&b.dataMax<=p)b.max=p;b.tickInterval=b.min===b.max||b.min===void 0||b.max===void 0?1:i&&!l&&m===b.linkedParent.options.tickPixelInterval?l=b.linkedParent.tickInterval:
q(l,this.tickAmount?(b.max-b.min)/v(this.tickAmount-1,1):void 0,o?1:(b.max-b.min)*m/v(b.len,m));h&&!a&&n(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();if(b.postProcessTickInterval)b.tickInterval=b.postProcessTickInterval(b.tickInterval);if(b.pointRange&&!l)b.tickInterval=v(b.pointRange,b.tickInterval);a=q(d.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);if(!l&&b.tickInterval<a)b.tickInterval=
a;if(!g&&!e&&!l)b.tickInterval=Bb(b.tickInterval,null,Ab(b.tickInterval),q(d.allowDecimals,!(b.tickInterval>0.5&&b.tickInterval<5&&b.max>1E3&&b.max<9999)),!!this.tickAmount);if(!this.tickAmount&&this.len)b.tickInterval=b.unsquish();this.setTickPositions()},setTickPositions:function(){var a=this.options,b,c=a.tickPositions,d=a.tickPositioner,e=a.startOnTick,f=a.endOnTick,g;this.tickmarkOffset=this.categories&&a.tickmarkPlacement==="between"&&this.tickInterval===1?0.5:0;this.minorTickInterval=a.minorTickInterval===
"auto"&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.tickPositions=b=c&&c.slice();if(!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,d&&(d=d.apply(this,
[this.min,this.max]))))this.tickPositions=b=d;if(!this.isLinked)this.trimTicks(b,e,f),this.min===this.max&&s(this.min)&&!this.tickAmount&&(g=!0,this.min-=0.5,this.max+=0.5),this.single=g,!c&&!d&&this.adjustTickAmount()},trimTicks:function(a,b,c){var d=a[0],e=a[a.length-1],f=this.minPointOffset||0;if(b)this.min=d;else for(;this.min-f>a[0];)a.shift();if(c)this.max=e;else for(;this.max+f<a[a.length-1];)a.pop();a.length===0&&s(d)&&a.push((e+d)/2)},alignToOthers:function(){var a={},b,c=this.options;this.chart.options.chart.alignTicks!==
!1&&c.alignTicks!==!1&&n(this.chart[this.coll],function(c){var e=c.options,e=[c.horiz?e.left:e.top,e.width,e.height,e.pane].join(",");c.series.length&&(a[e]?b=!0:a[e]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,c=a.tickPixelInterval;!s(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Fa(this.len/c)+1);if(b<4)this.finalTickAmt=b,b=5;this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,
b=this.tickPositions,c=this.tickAmount,d=this.finalTickAmt,e=b&&b.length;if(e<c){for(;b.length<c;)b.push(na(b[b.length-1]+a));this.transA*=(e-1)/(c-1);this.max=b[b.length-1]}else e>c&&(this.tickInterval*=2,this.setTickPositions());if(s(d)){for(a=c=b.length;a--;)(d===3&&a%2===1||d<=2&&a>0&&a<c-1)&&b.splice(a,1);this.finalTickAmt=t}},setScale:function(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;n(this.series,function(b){if(b.isDirtyData||
b.isDirty||b.xAxis.isDirty)a=!0});if(b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()){if(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,!this.isDirty)this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax}else this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,c,d,e){var f=this,g=f.chart,
c=q(c,!0);n(f.series,function(a){delete a.kdTree});e=x(e,{min:a,max:b});M(f,"setExtremes",e,function(){f.userMin=a;f.userMax=b;f.eventArgs=e;c&&g.redraw(d)})},zoom:function(a,b){var c=this.dataMin,d=this.dataMax,e=this.options,f=E(c,q(e.min,c)),e=v(d,q(e.max,d));this.allowZoomOutside||(s(c)&&a<=f&&(a=f),s(d)&&b>=e&&(b=e));this.displayBtn=a!==t||b!==t;this.setExtremes(a,b,!1,t,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsetLeft||0,d=this.horiz,e=q(b.width,
a.plotWidth-c+(b.offsetRight||0)),f=q(b.height,a.plotHeight),g=q(b.top,a.plotTop),b=q(b.left,a.plotLeft+c),c=/%$/;c.test(f)&&(f=Math.round(parseFloat(f)/100*a.plotHeight));c.test(g)&&(g=Math.round(parseFloat(g)/100*a.plotHeight+a.plotTop));this.left=b;this.top=g;this.width=e;this.height=f;this.bottom=a.chartHeight-f-g;this.right=a.chartWidth-e-b;this.len=v(d?e:f,0);this.pos=d?b:g},getExtremes:function(){var a=this.isLog,b=this.lin2log;return{min:a?na(b(this.min)):this.min,max:a?na(b(this.max)):this.max,
dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=this.lin2log,d=b?c(this.min):this.min,b=b?c(this.max):this.max;a===null?a=b<0?b:d:d>a?a=d:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(q(a,0)-this.side*90+720)%360;return a>15&&a<165?"right":a>195&&a<345?"left":"center"},tickSize:function(a){var b=this.options,c=b[a+"Length"],d=q(b[a+"Width"],a==="tick"&&this.isXAxis?1:0);if(d&&c)return b[a+
"Position"]==="inside"&&(c=-c),[c,d]},labelMetrics:function(){return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize,this.ticks[0]&&this.ticks[0].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,c=this.tickInterval,d=c,e=this.len/(((this.categories?1:0)+this.max-this.min)/c),f,g=a.rotation,h=this.labelMetrics(),i,j=Number.MAX_VALUE,k,l=function(a){a/=e||1;a=a>1?Fa(a):1;return a*c};b?(k=!a.staggerLines&&!a.step&&(s(g)?[g]:e<q(a.autoRotationLimit,80)&&a.autoRotation))&&
n(k,function(a){var b;if(a===g||a&&a>=-90&&a<=90)i=l(S(h.h/ka(pa*a))),b=i+S(a/360),b<j&&(j=b,f=a,d=i)}):a.step||(d=l(h.h));this.autoRotation=k;this.labelRotation=q(f,g);return d},getSlotWidth:function(){var a=this.chart,b=this.horiz,c=this.options.labels,d=Math.max(this.tickPositions.length-(this.categories?0:1),1),e=a.margin[3];return b&&(c.step||0)<2&&!c.rotation&&(this.staggerLines||1)*a.plotWidth/d||!b&&(e&&e-a.spacing[3]||a.chartWidth*0.33)},renderUnsquish:function(){var a=this.chart,b=a.renderer,
c=this.tickPositions,d=this.ticks,e=this.options.labels,f=this.horiz,g=this.getSlotWidth(),h=v(1,y(g-2*(e.padding||5))),i={},j=this.labelMetrics(),k=e.style.textOverflow,l,m=0,o,p;if(!Da(e.rotation))i.rotation=e.rotation||0;if(this.autoRotation)n(c,function(a){if((a=d[a])&&a.labelLength>m)m=a.labelLength}),m>h&&m>j.h?i.rotation=this.labelRotation:this.labelRotation=0;else if(g&&(l={width:h+"px"},!k)){l.textOverflow="clip";for(o=c.length;!f&&o--;)if(p=c[o],h=d[p].label)if(h.styles.textOverflow==="ellipsis"?
h.css({textOverflow:"clip"}):d[p].labelLength>g&&h.css({width:g+"px"}),h.getBBox().height>this.len/c.length-(j.h-j.f))h.specCss={textOverflow:"ellipsis"}}if(i.rotation&&(l={width:(m>a.chartHeight*0.5?a.chartHeight*0.33:a.chartHeight)+"px"},!k))l.textOverflow="ellipsis";if(this.labelAlign=e.align||this.autoLabelAlign(this.labelRotation))i.align=this.labelAlign;n(c,function(a){var b=(a=d[a])&&a.label;if(b)b.attr(i),l&&b.css(C(l,b.specCss)),delete b.specCss,a.rotation=i.rotation});this.tickRotCorr=b.rotCorr(j.b,
this.labelRotation||0,this.side!==0)},hasData:function(){return this.hasVisibleSeries||s(this.min)&&s(this.max)&&!!this.tickPositions},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.tickPositions,f=a.ticks,g=a.horiz,h=a.side,i=b.inverted?[1,0,3,2][h]:h,j,k,l=0,m,o=0,p=d.title,r=d.labels,A=0,P=a.opposite,u=b.axisOffset,b=b.clipOffset,w=[-1,1,1,-1][h],O,R=a.axisParent,ha=this.tickSize("tick");j=a.hasData();a.showAxis=k=j||q(d.showEmpty,!0);a.staggerLines=a.horiz&&r.staggerLines;
if(!a.axisGroup)a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).add(R),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).add(R),a.labelGroup=c.g("axis-labels").attr({zIndex:r.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels").add(R);if(j||a.isLinked){if(n(e,function(b){f[b]?f[b].addLabel():f[b]=new cb(a,b)}),a.renderUnsquish(),r.reserveSpace!==!1&&(h===0||h===2||{1:"left",3:"right"}[h]===a.labelAlign||a.labelAlign==="center")&&n(e,function(a){A=v(f[a].getLabelSize(),A)}),a.staggerLines)A*=
a.staggerLines,a.labelOffset=A*(a.opposite?-1:1)}else for(O in f)f[O].destroy(),delete f[O];if(p&&p.text&&p.enabled!==!1){if(!a.axisTitle)a.axisTitle=c.text(p.text,0,0,p.useHTML).attr({zIndex:7,rotation:p.rotation||0,align:p.textAlign||{low:P?"right":"left",middle:"center",high:P?"left":"right"}[p.align]}).addClass("highcharts-"+this.coll.toLowerCase()+"-title").css(p.style).add(a.axisGroup),a.axisTitle.isNew=!0;if(k)l=a.axisTitle.getBBox()[g?"height":"width"],m=p.offset,o=s(m)?0:q(p.margin,g?5:10);
a.axisTitle[k?"show":"hide"](!0)}a.offset=w*q(d.offset,u[h]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};c=h===0?-a.labelMetrics().h:h===2?a.tickRotCorr.y:0;o=Math.abs(A)+o;A&&(o-=c,o+=w*(g?q(r.y,a.tickRotCorr.y+w*8):r.x));a.axisTitleMargin=q(m,o);u[h]=v(u[h],a.axisTitleMargin+l+w*a.offset,o,j&&e.length&&ha?ha[0]:0);d=d.offset?0:V(d.lineWidth/2)*2;b[i]=v(b[i],d)},getLinePath:function(a){var b=this.chart,c=this.opposite,d=this.offset,e=this.horiz,f=this.left+(c?this.width:0)+d,d=b.chartHeight-this.bottom-
(c?this.height:0)+d;c&&(a*=-1);return b.renderer.crispLine(["M",e?this.left:f,e?d:this.top,"L",e?b.chartWidth-this.right:f,e?d:b.chartHeight-this.bottom],a)},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,d=this.len,e=this.options.title,f=a?b:c,g=this.opposite,h=this.offset,i=e.x||0,j=e.y||0,k=G(e.style.fontSize||12),d={low:f+(a?0:d),middle:f+d/2,high:f+(a?d:0)}[e.align],b=(a?c+this.height:b)+(a?1:-1)*(g?-1:1)*this.axisTitleMargin+(this.side===2?k:0);return{x:a?d+i:b+(g?this.width:
0)+h+i,y:a?b+j-(g?this.height:0)+h:d+j}},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.isLog,f=a.lin2log,g=a.isLinked,h=a.tickPositions,i=a.axisTitle,j=a.ticks,k=a.minorTicks,l=a.alternateBands,m=d.stackLabels,o=d.alternateGridColor,p=a.tickmarkOffset,r=d.lineWidth,A,q=b.hasRendered&&s(a.oldMin)&&!isNaN(a.oldMin),u=a.showAxis,w=hb(c.globalAnimation),O,R;a.labelEdge.length=0;a.overlap=!1;n([j,k,l],function(a){for(var b in a)a[b].isActive=!1});if(a.hasData()||g){a.minorTickInterval&&
!a.categories&&n(a.getMinorTickPositions(),function(b){k[b]||(k[b]=new cb(a,b,"minor"));q&&k[b].isNew&&k[b].render(null,!0);k[b].render(null,!1,1)});if(h.length&&(n(h,function(b,c){if(!g||b>=a.min&&b<=a.max)j[b]||(j[b]=new cb(a,b)),q&&j[b].isNew&&j[b].render(c,!0,0.1),j[b].render(c)}),p&&(a.min===0||a.single)))j[-1]||(j[-1]=new cb(a,-1,null,!0)),j[-1].render(-1);o&&n(h,function(c,d){R=h[d+1]!==t?h[d+1]+p:a.max-p;if(d%2===0&&c<a.max&&R<=a.max+(b.polar?-p:p))l[c]||(l[c]=new z.PlotLineOrBand(a)),O=c+
p,l[c].options={from:e?f(O):O,to:e?f(R):R,color:o},l[c].render(),l[c].isActive=!0});if(!a._addedPlotLB)n((d.plotLines||[]).concat(d.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0}n([j,k,l],function(a){var c,d,e=[],f=w.duration;for(c in a)if(!a[c].isActive)a[c].render(c,!1,0),a[c].isActive=!1,e.push(c);$a(function(){for(d=e.length;d--;)a[e[d]]&&!a[e[d]].isActive&&(a[e[d]].destroy(),delete a[e[d]])},a===l||!b.hasRendered||!f?0:f)});if(r)A=a.getLinePath(r),a.axisLine?a.axisLine.animate({d:A}):
a.axisLine=c.path(A).attr({stroke:d.lineColor,"stroke-width":r,zIndex:7}).add(a.axisGroup),a.axisLine[u?"show":"hide"](!0);if(i&&u)i[i.isNew?"attr":"animate"](a.getTitlePosition()),i.isNew=!1;m&&m.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){this.visible&&(this.render(),n(this.plotLinesAndBands,function(a){a.render()}));n(this.series,function(a){a.isDirty=!0})},destroy:function(a){var b=this,c=b.stacks,d,e=b.plotLinesAndBands;a||T(b);for(d in c)Pa(c[d]),c[d]=null;n([b.ticks,b.minorTicks,
b.alternateBands],function(a){Pa(a)});for(a=e.length;a--;)e[a].destroy();n("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","),function(a){b[a]&&(b[a]=b[a].destroy())});this.cross&&this.cross.destroy()},drawCrosshair:function(a,b){var c,d=this.crosshair,e,f;if(!this.crosshair||(s(b)||!q(d.snap,!0))===!1)this.hideCrosshair();else if(q(d.snap,!0)?s(b)&&(c=this.isXAxis?b.plotX:this.len-b.plotY):c=this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos,c=this.isRadial?
this.getPlotLinePath(this.isXAxis?b.x:q(b.stackY,b.y))||null:this.getPlotLinePath(null,null,null,null,c)||null,c===null)this.hideCrosshair();else if(e=this.categories&&!this.isRadial,f=q(d.width,e?this.transA:1),this.cross)this.cross.attr({d:c,visibility:"visible","stroke-width":f});else{e={"stroke-width":f,stroke:d.color||(e?"rgba(155,200,255,0.2)":"#C0C0C0"),zIndex:q(d.zIndex,2)};if(d.dashStyle)e.dashstyle=d.dashStyle;this.cross=this.chart.renderer.path(c).attr(e).add()}},hideCrosshair:function(){this.cross&&
this.cross.hide()}};x(I.prototype,{getPlotBandPath:function(a,b){var c=this.getPlotLinePath(b,null,null,!0),d=this.getPlotLinePath(a,null,null,!0);d&&c?(d.flat=d.toString()===c.toString(),d.push(c[4],c[5],c[1],c[2])):d=null;return d},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(a,b){var c=(new z.PlotLineOrBand(this,a)).render(),d=this.userOptions;c&&(b&&(d[b]=d[b]||[],d[b].push(a)),
this.plotLinesAndBands.push(c));return c},removePlotBandOrLine:function(a){for(var b=this.plotLinesAndBands,c=this.options,d=this.userOptions,e=b.length;e--;)b[e].id===a&&b[e].destroy();n([c.plotLines||[],d.plotLines||[],c.plotBands||[],d.plotBands||[]],function(b){for(e=b.length;e--;)b[e].id===a&&Aa(b,b[e])})}});I.prototype.getTimeTicks=function(a,b,c,d){var e=[],f={},g=N.global.useUTC,h,i=new fa(b-fb(b)),j=a.unitRange,k=a.count;if(s(b)){i[Pb](j>=H.second?0:k*V(i.getMilliseconds()/k));if(j>=H.second)i[Qb](j>=
H.minute?0:k*V(i.getSeconds()/k));if(j>=H.minute)i[Rb](j>=H.hour?0:k*V(i[Cb]()/k));if(j>=H.hour)i[Sb](j>=H.day?0:k*V(i[Db]()/k));if(j>=H.day)i[rb](j>=H.month?1:k*V(i[bb]()/k));j>=H.month&&(i[Fb](j>=H.year?0:k*V(i[ib]()/k)),h=i[jb]());j>=H.year&&(h-=h%k,i[Gb](h));if(j===H.week)i[rb](i[bb]()-i[Eb]()+q(d,1));b=1;if(zb||gb)i=i.getTime(),i=new fa(i+fb(i));h=i[jb]();for(var d=i.getTime(),l=i[ib](),m=i[bb](),o=!g||!!gb,p=(H.day+(g?fb(i):i.getTimezoneOffset()*6E4))%H.day;d<c;)e.push(d),j===H.year?d=qb(h+
b*k,0):j===H.month?d=qb(h,l+b*k):o&&(j===H.day||j===H.week)?d=qb(h,l,m+b*k*(j===H.day?1:7)):d+=j*k,b++;e.push(d);n(Sa(e,function(a){return j<=H.hour&&a%H.day===p}),function(a){f[a]="day"})}e.info=x(a,{higherRanks:f,totalRange:j*k});return e};I.prototype.normalizeTimeTickInterval=function(a,b){var c=b||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]],d=
c[c.length-1],e=H[d[0]],f=d[1],g;for(g=0;g<c.length;g++)if(d=c[g],e=H[d[0]],f=d[1],c[g+1]&&a<=(e*f[f.length-1]+H[c[g+1][0]])/2)break;e===H.year&&a<5*e&&(f=[1,2,5]);c=Bb(a/e,f,d[0]==="year"?v(Ab(a/e),1):1);return{unitRange:e,count:c,unitName:d[0]}};I.prototype.getLogTickPositions=function(a,b,c,d){var e=this.options,f=this.len,g=this.lin2log,h=this.log2lin,i=[];if(!d)this._minorAutoInterval=null;if(a>=0.5)a=y(a),i=this.getLinearTickPositions(a,b,c);else if(a>=0.08)for(var f=V(b),j,k,l,m,o,e=a>0.3?
[1,2,4]:a>0.15?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<c+1&&!o;f++){k=e.length;for(j=0;j<k&&!o;j++)l=h(g(f)*e[j]),l>b&&(!d||m<=c)&&m!==t&&i.push(m),m>c&&(o=!0),m=l}else if(b=g(b),c=g(c),a=e[d?"minorTickInterval":"tickInterval"],a=q(a==="auto"?null:a,this._minorAutoInterval,(c-b)*(e.tickPixelInterval/(d?5:1))/((d?f/this.tickPositions.length:f)||1)),a=Bb(a,null,Ab(a)),i=ta(this.getLinearTickPositions(a,b,c),h),!d)this._minorAutoInterval=a/5;if(!d)this.tickInterval=a;return i};I.prototype.log2lin=function(a){return Y.log(a)/
Y.LN10};I.prototype.lin2log=function(a){return Y.pow(10,a)};var Lb=z.Tooltip=function(){this.init.apply(this,arguments)};Lb.prototype={init:function(a,b){var c=b.borderWidth,d=b.style,e=G(d.padding);this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.label=a.renderer.label("",0,0,b.shape||"callout",null,null,b.useHTML,null,"tooltip").attr({padding:e,fill:b.backgroundColor,"stroke-width":c,r:b.borderRadius,zIndex:8}).css(d).css({padding:0}).add().attr({y:-9999});
qa||this.label.shadow(b.shadow);this.shared=b.shared},destroy:function(){if(this.label)this.label=this.label.destroy();clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,b,c,d){var e=this,f=e.now,g=e.options.animation!==!1&&!e.isHidden&&(S(a-f.x)>1||S(b-f.y)>1),h=e.followPointer||e.len>1;x(f,{x:g?(2*f.x+a)/3:a,y:g?(f.y+b)/2:b,anchorX:h?t:g?(2*f.anchorX+c)/3:c,anchorY:h?t:g?(f.anchorY+d)/2:d});e.label.attr(f);if(g)clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&
e.move(a,b,c,d)},32)},hide:function(a){var b=this;clearTimeout(this.hideTimer);a=q(a,this.options.hideDelay,500);if(!this.isHidden)this.hideTimer=$a(function(){b.label[a?"fadeOut":"hide"]();b.isHidden=!0},a)},getAnchor:function(a,b){var c,d=this.chart,e=d.inverted,f=d.plotTop,g=d.plotLeft,h=0,i=0,j,k,a=va(a);c=a[0].tooltipPos;this.followPointer&&b&&(b.chartX===t&&(b=d.pointer.normalize(b)),c=[b.chartX-d.plotLeft,b.chartY-f]);c||(n(a,function(a){j=a.series.yAxis;k=a.series.xAxis;h+=a.plotX+(!e&&k?
k.left-g:0);i+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&j?j.top-f:0)}),h/=a.length,i/=a.length,c=[e?d.plotWidth-i:h,this.shared&&!e&&a.length>1&&b?b.chartY-f:e?d.plotHeight-h:i]);return ta(c,y)},getPosition:function(a,b,c){var d=this.chart,e=this.distance,f={},g=c.h||0,h,i=["y",d.chartHeight,b,c.plotY+d.plotTop,d.plotTop,d.plotTop+d.plotHeight],j=["x",d.chartWidth,a,c.plotX+d.plotLeft,d.plotLeft,d.plotLeft+d.plotWidth],k=!this.followPointer&&q(c.ttBelow,!d.inverted===!!c.negative),l=function(a,
b,c,d,h,i){var j=c<d-e,m=d+e+c<b,l=d-e-c;d+=e;if(k&&m)f[a]=d;else if(!k&&j)f[a]=l;else if(j)f[a]=E(i-c,l-g<0?l:l-g);else if(m)f[a]=v(h,d+g+c>b?d:d+g);else return!1},m=function(a,b,c,d){var g;d<e||d>b-e?g=!1:f[a]=d<c/2?1:d>b-c/2?b-c-2:d-c/2;return g},o=function(a){var b=i;i=j;j=b;h=a},p=function(){l.apply(0,i)!==!1?m.apply(0,j)===!1&&!h&&(o(!0),p()):h?f.x=f.y=0:(o(!0),p())};(d.inverted||this.len>1)&&o();p();return f},defaultFormatter:function(a){var b=this.points||va(this),c;c=[a.tooltipFooterHeaderFormatter(b[0])];
c=c.concat(a.bodyFormatter(b));c.push(a.tooltipFooterHeaderFormatter(b[0],!0));return c.join("")},refresh:function(a,b){var c=this.chart,d=this.label,e=this.options,f,g,h,i={},j,k=[];j=e.formatter||this.defaultFormatter;var i=c.hoverPoints,l,m=this.shared;clearTimeout(this.hideTimer);this.followPointer=va(a)[0].series.tooltipOptions.followPointer;h=this.getAnchor(a,b);f=h[0];g=h[1];m&&(!a.series||!a.series.noSharedTooltip)?(c.hoverPoints=a,i&&n(i,function(a){a.setState()}),n(a,function(a){a.setState("hover");
k.push(a.getLabelConfig())}),i={x:a[0].category,y:a[0].y},i.points=k,this.len=k.length,a=a[0]):i=a.getLabelConfig();j=j.call(i,this);i=a.series;this.distance=q(i.tooltipOptions.distance,16);j===!1?this.hide():(this.isHidden&&(Ta(d),d.attr("opacity",1).show()),d.attr({text:j}),l=e.borderColor||a.color||i.color||"#606060",d.attr({stroke:l}),this.updatePosition({plotX:f,plotY:g,negative:a.negative,ttBelow:a.ttBelow,h:h[2]||0}),this.isHidden=!1);M(c,"tooltipRefresh",{text:j,x:f+c.plotLeft,y:g+c.plotTop,
borderColor:l})},updatePosition:function(a){var b=this.chart,c=this.label,c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(y(c.x),y(c.y||0),a.plotX+b.plotLeft,a.plotY+b.plotTop)},getXDateFormat:function(a,b,c){var d,b=b.dateTimeLabelFormats,e=c&&c.closestPointRange,f,g={millisecond:15,second:12,minute:9,hour:6,day:3},h,i="millisecond";if(e){h=ma("%m-%d %H:%M:%S.%L",a.x);for(f in H){if(e===H.week&&+ma("%w",a.x)===c.options.startOfWeek&&h.substr(6)==="00:00:00.000"){f=
"week";break}if(H[f]>e){f=i;break}if(g[f]&&h.substr(g[f])!=="01-01 00:00:00.000".substr(g[f]))break;f!=="week"&&(i=f)}f&&(d=b[f])}else d=b.day;return d||b.year},tooltipFooterHeaderFormatter:function(a,b){var c=b?"footer":"header",d=a.series,e=d.tooltipOptions,f=e.xDateFormat,g=d.xAxis,h=g&&g.options.type==="datetime"&&ua(a.key),c=e[c+"Format"];h&&!f&&(f=this.getXDateFormat(a,e,g));h&&f&&(c=c.replace("{point.key}","{point.key:"+f+"}"));return La(c,{point:a,series:d})},bodyFormatter:function(a){return ta(a,
function(a){var c=a.series.tooltipOptions;return(c.pointFormatter||a.point.tooltipFormatter).call(a.point,c.pointFormat)})}};var oa;db=B&&B.documentElement.ontouchstart!==t;var Za=z.Pointer=function(a,b){this.init(a,b)};Za.prototype={init:function(a,b){var c=b.chart,d=c.events,e=qa?"":c.zoomType,c=a.inverted,f;this.options=b;this.chart=a;this.zoomX=f=/x/.test(e);this.zoomY=e=/y/.test(e);this.zoomHor=f&&!c||e&&c;this.zoomVert=e&&!c||f&&c;this.hasZoom=f||e;this.runChartClick=d&&!!d.click;this.pinchDown=
[];this.lastValidTouch={};if(z.Tooltip&&b.tooltip.enabled)a.tooltip=new Lb(a,b.tooltip),this.followTouchMove=q(b.tooltip.followTouchMove,!0);this.setDOMEvents()},normalize:function(a,b){var c,d,a=a||J.event;if(!a.target)a.target=a.srcElement;d=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;if(!b)this.chartPosition=b=Kb(this.chart.container);d.pageX===t?(c=v(a.x,a.clientX-b.left),d=a.y):(c=d.pageX-b.left,d=d.pageY-b.top);return x(a,{chartX:y(c),chartY:y(d)})},getCoordinates:function(a){var b=
{xAxis:[],yAxis:[]};n(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},runPointActions:function(a){var b=this.chart,c=b.series,d=b.tooltip,e=d?d.shared:!1,f=b.hoverPoint,g=b.hoverSeries,h,i=[Number.MAX_VALUE,Number.MAX_VALUE],j,k,l=[],m=[],o;if(!e&&!g)for(h=0;h<c.length;h++)if(c[h].directTouch||!c[h].options.stickyTracking)c=[];g&&(e?g.noSharedTooltip:g.directTouch)&&f?m=[f]:(n(c,function(b){j=b.noSharedTooltip&&e;k=
!e&&b.directTouch;b.visible&&!j&&!k&&q(b.options.enableMouseTracking,!0)&&(o=b.searchPoint(a,!j&&b.kdDimensions===1))&&l.push(o)}),n(l,function(a){a&&n(["dist","distX"],function(b,c){if(typeof a[b]==="number"){var d=a[b]===i[c]&&a.series.group.zIndex>=m[c].series.group.zIndex;if(a[b]<i[c]||d)i[c]=a[b],m[c]=a}})}));if(e)for(h=l.length;h--;)(l[h].clientX!==m[1].clientX||l[h].series.noSharedTooltip)&&l.splice(h,1);if(m[0]&&(m[0]!==this.prevKDPoint||d&&d.isHidden))if(e&&!m[0].series.noSharedTooltip)l.length&&
d&&d.refresh(l,a),n(l,function(b){b.onMouseOver(a,b!==(g&&g.directTouch&&f||m[0]))}),this.prevKDPoint=m[1];else{d&&d.refresh(m[0],a);if(!g||!g.directTouch)m[0].onMouseOver(a);this.prevKDPoint=m[0]}else c=g&&g.tooltipOptions.followPointer,d&&c&&!d.isHidden&&(c=d.getAnchor([{}],a),d.updatePosition({plotX:c[0],plotY:c[1]}));if(!this._onDocumentMouseMove)this._onDocumentMouseMove=function(a){if($[oa])$[oa].pointer.onDocumentMouseMove(a)},D(B,"mousemove",this._onDocumentMouseMove);n(e?l:[q(m[1],f)],function(c){n(b.axes,
function(b){(!c||c.series[b.coll]===b)&&b.drawCrosshair(a,c)})})},reset:function(a,b){var c=this.chart,d=c.hoverSeries,e=c.hoverPoint,f=c.hoverPoints,g=c.tooltip,h=g&&g.shared?f:e;a&&h&&n(va(h),function(b){b.series.isCartesian&&b.plotX===void 0&&(a=!1)});if(a)g&&h&&(g.refresh(h),e&&(e.setState(e.state,!0),n(c.axes,function(a){q(a.crosshair&&a.crosshair.snap,!0)?a.drawCrosshair(null,e):a.hideCrosshair()})));else{if(e)e.onMouseOut();f&&n(f,function(a){a.setState()});if(d)d.onMouseOut();g&&g.hide(b);
if(this._onDocumentMouseMove)T(B,"mousemove",this._onDocumentMouseMove),this._onDocumentMouseMove=null;n(c.axes,function(a){a.hideCrosshair()});this.hoverX=c.hoverPoints=c.hoverPoint=null}},scaleGroups:function(a,b){var c=this.chart,d;n(c.series,function(e){d=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&(e.group.attr(d),e.markerGroup&&(e.markerGroup.attr(d),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d))});c.clipRect.attr(b||c.clipBox)},dragStart:function(a){var b=
this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,e=a.chartY,f=this.zoomHor,g=this.zoomVert,h=b.plotLeft,i=b.plotTop,j=b.plotWidth,k=b.plotHeight,l,m=this.selectionMarker,o=this.mouseDownX,p=this.mouseDownY,r=c.panKey&&a[c.panKey+"Key"];if(!m||!m.touch)if(d<h?d=h:d>h+j&&(d=h+j),e<i?e=i:e>i+k&&(e=i+k),this.hasDragged=Math.sqrt(Math.pow(o-d,2)+Math.pow(p-e,2)),this.hasDragged>
10){l=b.isInsidePlot(o-h,p-i);if(b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&l&&!r&&!m)this.selectionMarker=m=b.renderer.rect(h,i,f?1:j,g?1:k,0).attr({fill:c.selectionMarkerFill||"rgba(69,114,167,0.25)",zIndex:7}).add();m&&f&&(d-=o,m.attr({width:S(d),x:(d>0?0:d)+o}));m&&g&&(d=e-p,m.attr({height:S(d),y:(d>0?0:d)+p}));l&&!m&&c.panning&&b.pan(a,c.panning)}},drop:function(a){var b=this,c=this.chart,d=this.hasPinched;if(this.selectionMarker){var e={originalEvent:a,xAxis:[],yAxis:[]},f=this.selectionMarker,
g=f.attr?f.attr("x"):f.x,h=f.attr?f.attr("y"):f.y,i=f.attr?f.attr("width"):f.width,j=f.attr?f.attr("height"):f.height,k;if(this.hasDragged||d)n(c.axes,function(c){if(c.zoomEnabled&&s(c.min)&&(d||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var f=c.horiz,o=a.type==="touchend"?c.minPixelPadding:0,p=c.toValue((f?g:h)+o),f=c.toValue((f?g+i:h+j)-o);e[c.coll].push({axis:c,min:E(p,f),max:v(p,f)});k=!0}}),k&&M(c,"selection",e,function(a){c.zoom(x(a,d?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();
d&&this.scaleGroups()}if(c)F(c.container,{cursor:c._cursor}),c.cancelClick=this.hasDragged>10,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[]},onContainerMouseDown:function(a){a=this.normalize(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(a){$[oa]&&$[oa].pointer.drop(a)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition,a=this.normalize(a,c);c&&!this.inClass(a.target,"highcharts-tracker")&&!b.isInsidePlot(a.chartX-b.plotLeft,
a.chartY-b.plotTop)&&this.reset()},onContainerMouseLeave:function(a){var b=$[oa];if(b&&(a.relatedTarget||a.toElement))b.pointer.reset(),b.pointer.chartPosition=null},onContainerMouseMove:function(a){var b=this.chart;if(!s(oa)||!$[oa]||!$[oa].mouseIsDown)oa=b.index;a=this.normalize(a);a.returnValue=!1;b.mouseIsDown==="mousedown"&&this.drag(a);(this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop))&&!b.openMenu&&this.runPointActions(a)},inClass:function(a,
b){for(var c;a;){if(c=X(a,"class")){if(c.indexOf(b)!==-1)return!0;if(c.indexOf("highcharts-container")!==-1)return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries,a=a.relatedTarget||a.toElement;if(b&&a&&!b.options.stickyTracking&&!this.inClass(a,"highcharts-tooltip")&&!this.inClass(a,"highcharts-series-"+b.index))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,e=b.plotTop,a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,
"highcharts-tracker")?(M(c.series,"click",x(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(x(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-e)&&M(b,"click",a)))},setDOMEvents:function(){var a=this,b=a.chart.container;b.onmousedown=function(b){a.onContainerMouseDown(b)};b.onmousemove=function(b){a.onContainerMouseMove(b)};b.onclick=function(b){a.onContainerClick(b)};D(b,"mouseleave",a.onContainerMouseLeave);lb===1&&D(B,"mouseup",a.onDocumentMouseUp);if(db)b.ontouchstart=function(b){a.onContainerTouchStart(b)},
b.ontouchmove=function(b){a.onContainerTouchMove(b)},lb===1&&D(B,"touchend",a.onDocumentTouchEnd)},destroy:function(){var a;T(this.chart.container,"mouseleave",this.onContainerMouseLeave);lb||(T(B,"mouseup",this.onDocumentMouseUp),T(B,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for(a in this)this[a]=null}};x(z.Pointer.prototype,{pinchTranslate:function(a,b,c,d,e,f){(this.zoomHor||this.pinchHor)&&this.pinchTranslateDirection(!0,a,b,c,d,e,f);(this.zoomVert||this.pinchVert)&&
this.pinchTranslateDirection(!1,a,b,c,d,e,f)},pinchTranslateDirection:function(a,b,c,d,e,f,g,h){var i=this.chart,j=a?"x":"y",k=a?"X":"Y",l="chart"+k,m=a?"width":"height",o=i["plot"+(a?"Left":"Top")],p,r,A=h||1,q=i.inverted,n=i.bounds[a?"h":"v"],w=b.length===1,O=b[0][l],s=c[0][l],v=!w&&b[1][l],t=!w&&c[1][l],y,c=function(){!w&&S(O-v)>20&&(A=h||S(s-t)/S(O-v));r=(o-s)/A+O;p=i["plot"+(a?"Width":"Height")]/A};c();b=r;b<n.min?(b=n.min,y=!0):b+p>n.max&&(b=n.max-p,y=!0);y?(s-=0.8*(s-g[j][0]),w||(t-=0.8*(t-
g[j][1])),c()):g[j]=[s,t];q||(f[j]=r-o,f[m]=p);f=q?1/A:A;e[m]=p;e[j]=b;d[q?a?"scaleY":"scaleX":"scale"+k]=A;d["translate"+k]=f*o+(s-f*O)},pinch:function(a){var b=this,c=b.chart,d=b.pinchDown,e=a.touches,f=e.length,g=b.lastValidTouch,h=b.hasZoom,i=b.selectionMarker,j={},k=f===1&&(b.inClass(a.target,"highcharts-tracker")&&c.runTrackerClick||b.runChartClick),l={};if(f>1)b.initiated=!0;h&&b.initiated&&!k&&a.preventDefault();ta(e,function(a){return b.normalize(a)});if(a.type==="touchstart")n(e,function(a,
b){d[b]={chartX:a.chartX,chartY:a.chartY}}),g.x=[d[0].chartX,d[1]&&d[1].chartX],g.y=[d[0].chartY,d[1]&&d[1].chartY],n(c.axes,function(a){if(a.zoomEnabled){var b=c.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,e=a.toPixels(q(a.options.min,a.dataMin)),f=a.toPixels(q(a.options.max,a.dataMax)),g=E(e,f),e=v(e,f);b.min=E(a.pos,g-d);b.max=v(a.pos+a.len,e+d)}}),b.res=!0;else if(d.length){if(!i)b.selectionMarker=i=x({destroy:ra,touch:!0},c.plotBox);b.pinchTranslate(d,e,j,i,l,g);b.hasPinched=h;b.scaleGroups(j,
l);if(!h&&b.followTouchMove&&f===1)this.runPointActions(b.normalize(a));else if(b.res)b.res=!1,this.reset(!1,0)}},touch:function(a,b){var c=this.chart,d;oa=c.index;if(a.touches.length===1)if(a=this.normalize(a),c.isInsidePlot(a.chartX-c.plotLeft,a.chartY-c.plotTop)&&!c.openMenu){b&&this.runPointActions(a);if(a.type==="touchmove")c=this.pinchDown,d=Math.sqrt(Math.pow(c[0].chartX-a.chartX,2)+Math.pow(c[0].chartY-a.chartY,2))>=4;q(d,!0)&&this.pinch(a)}else b&&this.reset();else a.touches.length===2&&
this.pinch(a)},onContainerTouchStart:function(a){this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(a){$[oa]&&$[oa].pointer.drop(a)}});if(J.PointerEvent||J.MSPointerEvent){var Ga={},Mb=!!J.PointerEvent,ac=function(){var a,b=[];b.item=function(a){return this[a]};for(a in Ga)Ga.hasOwnProperty(a)&&b.push({pageX:Ga[a].pageX,pageY:Ga[a].pageY,target:Ga[a].target});return b},Nb=function(a,b,c,d){if((a.pointerType==="touch"||a.pointerType===a.MSPOINTER_TYPE_TOUCH)&&
$[oa])d(a),d=$[oa].pointer,d[b]({type:c,target:a.currentTarget,preventDefault:ra,touches:ac()})};x(Za.prototype,{onContainerPointerDown:function(a){Nb(a,"onContainerTouchStart","touchstart",function(a){Ga[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){Nb(a,"onContainerTouchMove","touchmove",function(a){Ga[a.pointerId]={pageX:a.pageX,pageY:a.pageY};if(!Ga[a.pointerId].target)Ga[a.pointerId].target=a.currentTarget})},onDocumentPointerUp:function(a){Nb(a,
"onDocumentTouchEnd","touchend",function(a){delete Ga[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,Mb?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,Mb?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(B,Mb?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});U(Za.prototype,"init",function(a,b,c){a.call(this,b,c);this.hasZoom&&F(b.container,{"-ms-touch-action":"none","touch-action":"none"})});U(Za.prototype,"setDOMEvents",function(a){a.apply(this);
(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(D)});U(Za.prototype,"destroy",function(a){this.batchMSEvents(T);a.call(this)})}var vb=z.Legend=function(a,b){this.init(a,b)};vb.prototype={init:function(a,b){var c=this,d=b.itemStyle,e=b.itemMarginTop||0;this.options=b;if(b.enabled)c.itemStyle=d,c.itemHiddenStyle=C(d,b.itemHiddenStyle),c.itemMarginTop=e,c.padding=d=q(b.padding,8),c.initialItemX=d,c.initialItemY=d-5,c.maxItemWidth=0,c.chart=a,c.itemHeight=0,c.symbolWidth=q(b.symbolWidth,16),
c.pages=[],c.render(),D(c.chart,"endResize",function(){c.positionCheckboxes()})},colorizeItem:function(a,b){var c=this.options,d=a.legendItem,e=a.legendLine,f=a.legendSymbol,g=this.itemHiddenStyle.color,c=b?c.itemStyle.color:g,h=b?a.legendColor||a.color||"#CCC":g,g=a.options&&a.options.marker,i={fill:h},j;d&&d.css({fill:c,color:c});e&&e.attr({stroke:h});if(f){if(g&&f.isMarker)for(j in i.stroke=h,g=a.convertAttribs(g),g)d=g[j],d!==t&&(i[j]=d);f.attr(i)}},positionItem:function(a){var b=this.options,
c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,e=d[0],d=d[1],f=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?e:this.legendWidth-e-2*c-4,d);if(f)f.x=e,f.y=d},destroyItem:function(a){var b=a.checkbox;n(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&Va(a.checkbox)},destroy:function(){var a=this.group,b=this.box;if(b)this.box=b.destroy();if(a)this.group=a.destroy()},positionCheckboxes:function(a){var b=this.group.alignAttr,c,d=this.clipHeight||
this.legendHeight,e=this.titleHeight;if(b)c=b.translateY,n(this.allItems,function(f){var g=f.checkbox,h;g&&(h=c+e+g.y+(a||0)+3,F(g,{left:b.translateX+f.checkboxOffset+g.x-20+"px",top:h+"px",display:h>c-6&&h<c+d-6?"":"none"}))})},renderTitle:function(){var a=this.padding,b=this.options.title,c=0;if(b.text){if(!this.title)this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group);a=this.title.getBBox();c=a.height;this.offsetWidth=
a.width;this.contentGroup.attr({translateY:c})}this.titleHeight=c},setText:function(a){var b=this.options;a.legendItem.attr({text:b.labelFormat?La(b.labelFormat,a):b.labelFormatter.call(a)})},renderItem:function(a){var b=this.chart,c=b.renderer,d=this.options,e=d.layout==="horizontal",f=this.symbolWidth,g=d.symbolPadding,h=this.itemStyle,i=this.itemHiddenStyle,j=this.padding,k=e?q(d.itemDistance,20):0,l=!d.rtl,m=d.width,o=d.itemMarginBottom||0,p=this.itemMarginTop,r=this.initialItemX,A=a.legendItem,
n=a.series&&a.series.drawLegendSymbol?a.series:a,u=n.options,u=this.createCheckboxForItem&&u&&u.showCheckbox,w=d.useHTML;if(!A){a.legendGroup=c.g("legend-item").attr({zIndex:1}).add(this.scrollGroup);a.legendItem=A=c.text("",l?f+g:-g,this.baseline||0,w).css(C(a.visible?h:i)).attr({align:l?"left":"right",zIndex:2}).add(a.legendGroup);if(!this.baseline)this.fontMetrics=c.fontMetrics(h.fontSize,A),this.baseline=this.fontMetrics.f+3+p,A.attr("y",this.baseline);n.drawLegendSymbol(this,a);this.setItemEvents&&
this.setItemEvents(a,A,w,h,i);u&&this.createCheckboxForItem(a)}this.colorizeItem(a,a.visible);this.setText(a);c=A.getBBox();f=a.checkboxOffset=d.itemWidth||a.legendItemWidth||f+g+c.width+k+(u?20:0);this.itemHeight=g=y(a.legendItemHeight||c.height);if(e&&this.itemX-r+f>(m||b.chartWidth-2*j-r-d.x))this.itemX=r,this.itemY+=p+this.lastLineHeight+o,this.lastLineHeight=0;this.maxItemWidth=v(this.maxItemWidth,f);this.lastItemY=p+this.itemY+o;this.lastLineHeight=v(g,this.lastLineHeight);a._legendItemPos=
[this.itemX,this.itemY];e?this.itemX+=f:(this.itemY+=p+g+o,this.lastLineHeight=g);this.offsetWidth=m||v((e?this.itemX-r-k:f)+j,this.offsetWidth)},getAllItems:function(){var a=[];n(this.chart.series,function(b){var c=b.options;if(q(c.showInLegend,!s(c.linkedTo)?t:!1,!0))a=a.concat(b.legendItems||(c.legendType==="point"?b.data:b))});return a},adjustMargins:function(a,b){var c=this.chart,d=this.options,e=d.align.charAt(0)+d.verticalAlign.charAt(0)+d.layout.charAt(0);this.display&&!d.floating&&n([/(lth|ct|rth)/,
/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(f,g){f.test(e)&&!s(a[g])&&(c[ub[g]]=v(c[ub[g]],c.legend[(g+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][g]*d[g%2?"x":"y"]+q(d.margin,12)+b[g]))})},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.group,e,f,g,h,i=a.box,j=a.options,k=a.padding,l=j.borderWidth,m=j.backgroundColor;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;if(!d)a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),
a.scrollGroup=c.g().add(a.contentGroup);a.renderTitle();e=a.getAllItems();ob(e,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});j.reversed&&e.reverse();a.allItems=e;a.display=f=!!e.length;a.lastLineHeight=0;n(e,function(b){a.renderItem(b)});g=(j.width||a.offsetWidth)+k;h=a.lastItemY+a.lastLineHeight+a.titleHeight;h=a.handleOverflow(h);h+=k;if(l||m){if(i){if(g>0&&h>0)i[i.isNew?"attr":"animate"](i.crisp({width:g,height:h})),i.isNew=!1}else a.box=i=c.rect(0,
0,g,h,j.borderRadius,l||0).attr({stroke:j.borderColor,"stroke-width":l||0,fill:m||"none"}).add(d).shadow(j.shadow),i.isNew=!0;i[f?"show":"hide"]()}a.legendWidth=g;a.legendHeight=h;n(e,function(b){a.positionItem(b)});f&&d.align(x({width:g,height:h},j),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,d=c.renderer,e=this.options,f=e.y,f=c.spacingBox.height+(e.verticalAlign==="top"?-f:f)-this.padding,g=e.maxHeight,h,i=this.clipRect,j=e.navigation,
k=q(j.animation,!0),l=j.arrowSize||12,m=this.nav,o=this.pages,p=this.padding,r,A=this.allItems,P=function(a){i.attr({height:a});if(b.contentGroup.div)b.contentGroup.div.style.clip="rect("+p+"px,9999px,"+(p+a)+"px,0)"};e.layout==="horizontal"&&(f/=2);g&&(f=E(f,g));o.length=0;if(a>f&&j.enabled!==!1){this.clipHeight=h=v(f-20-this.titleHeight-p,0);this.currentPage=q(this.currentPage,1);this.fullHeight=a;n(A,function(a,b){var c=a._legendItemPos[1],d=y(a.legendItem.getBBox().height),e=o.length;if(!e||c-
o[e-1]>h&&(r||c)!==o[e-1])o.push(r||c),e++;b===A.length-1&&c+d-o[e-1]>h&&o.push(c);c!==r&&(r=c)});if(!i)i=b.clipRect=d.clipRect(0,p,9999,0),b.contentGroup.clip(i);P(h);if(!m)this.nav=m=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,l,l).on("click",function(){b.scroll(-1,k)}).add(m),this.pager=d.text("",15,10).css(j.style).add(m),this.down=d.symbol("triangle-down",0,0,l,l).on("click",function(){b.scroll(1,k)}).add(m);b.scroll(0);a=f}else if(m)P(c.chartHeight),m.hide(),this.scrollGroup.attr({translateY:1}),
this.clipHeight=0;return a},scroll:function(a,b){var c=this.pages,d=c.length,e=this.currentPage+a,f=this.clipHeight,g=this.options.navigation,h=g.activeColor,g=g.inactiveColor,i=this.pager,j=this.padding;e>d&&(e=d);if(e>0)b!==t&&ab(b,this.chart),this.nav.attr({translateX:j,translateY:f+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({fill:e===1?g:h}).css({cursor:e===1?"default":"pointer"}),i.attr({text:e+"/"+d}),this.down.attr({x:18+this.pager.getBBox().width,fill:e===d?g:h}).css({cursor:e===
d?"default":"pointer"}),c=-c[e-1]+this.initialItemY,this.scrollGroup.animate({translateY:c}),this.currentPage=e,this.positionCheckboxes(c)}};aa=z.LegendSymbolMixin={drawRectangle:function(a,b){var c=a.options.symbolHeight||a.fontMetrics.f;b.legendSymbol=this.chart.renderer.rect(0,a.baseline-c+1,a.symbolWidth,c,a.options.symbolRadius||0).attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=this.options,c=b.marker,d=a.symbolWidth,e=this.chart.renderer,f=this.legendGroup,a=a.baseline-
y(a.fontMetrics.b*0.3),g;if(b.lineWidth){g={"stroke-width":b.lineWidth};if(b.dashStyle)g.dashstyle=b.dashStyle;this.legendLine=e.path(["M",0,a,"L",d,a]).attr(g).add(f)}if(c&&c.enabled!==!1)b=c.radius,this.legendSymbol=c=e.symbol(this.symbol,d/2-b,a-b,2*b,2*b,c).add(f),c.isMarker=!0}};(/Trident\/7\.0/.test(Ma)||Xa)&&U(vb.prototype,"positionItem",function(a,b){var c=this,d=function(){b._legendItemPos&&a.call(c,b)};d();setTimeout(d)});var Ca=z.Chart=function(){this.getArgs.apply(this,arguments)};z.chart=
function(a,b,c){return new Ca(a,b,c)};Ca.prototype={callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(Da(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(a,b){var c,d=a.series;a.series=null;c=C(N,a);c.series=a.series=d;this.userOptions=a;d=c.chart;this.margin=this.splashArray("margin",d);this.spacing=this.splashArray("spacing",d);var e=d.events;this.bounds={h:{},v:{}};this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=
d.showAxes;var f=this,g;f.index=$.length;$.push(f);lb++;d.reflow!==!1&&D(f,"load",function(){f.initReflow()});if(e)for(g in e)D(f,g,e[g]);f.xAxis=[];f.yAxis=[];f.animation=qa?!1:q(d.animation,!0);f.pointCount=f.colorCounter=f.symbolCounter=0;f.firstRender()},initSeries:function(a){var b=this.options.chart;(b=K[a.type||b.type||b.defaultSeriesType])||ga(17,!0);b=new b;b.init(this,a);return b},isInsidePlot:function(a,b,c){var d=c?b:a,a=c?a:b;return d>=0&&d<=this.plotWidth&&a>=0&&a<=this.plotHeight},
redraw:function(a){var b=this.axes,c=this.series,d=this.pointer,e=this.legend,f=this.isDirtyLegend,g,h,i=this.hasCartesianSeries,j=this.isDirtyBox,k=c.length,l=k,m=this.renderer,o=m.isHidden(),p=[];ab(a,this);o&&this.cloneRenderTo();for(this.layOutTitles();l--;)if(a=c[l],a.options.stacking&&(g=!0,a.isDirty)){h=!0;break}if(h)for(l=k;l--;)if(a=c[l],a.options.stacking)a.isDirty=!0;n(c,function(a){a.isDirty&&a.options.legendType==="point"&&(a.updateTotals&&a.updateTotals(),f=!0)});if(f&&e.options.enabled)e.render(),
this.isDirtyLegend=!1;g&&this.getStacks();if(i&&!this.isResizing)this.maxTicks=null,n(b,function(a){a.setScale()});this.getMargins();i&&(n(b,function(a){a.isDirty&&(j=!0)}),n(b,function(a){var b=a.min+","+a.max;if(a.extKey!==b)a.extKey=b,p.push(function(){M(a,"afterSetExtremes",x(a.eventArgs,a.getExtremes()));delete a.eventArgs});(j||g)&&a.redraw()}));j&&this.drawChartBox();n(c,function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.reset(!0);m.draw();M(this,"redraw");o&&this.cloneRenderTo(!0);
n(p,function(a){a.call()})},get:function(a){var b=this.axes,c=this.series,d,e;for(d=0;d<b.length;d++)if(b[d].options.id===a)return b[d];for(d=0;d<c.length;d++)if(c[d].options.id===a)return c[d];for(d=0;d<c.length;d++){e=c[d].points||[];for(b=0;b<e.length;b++)if(e[b].id===a)return e[b]}return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis=va(b.xAxis||{}),b=b.yAxis=va(b.yAxis||{});n(c,function(a,b){a.index=b;a.isX=!0});n(b,function(a,b){a.index=b});c=c.concat(b);n(c,function(b){new I(a,
b)})},getSelectedPoints:function(){var a=[];n(this.series,function(b){a=a.concat(Sa(b.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return Sa(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var g;var d=this,e=d.options,f;f=e.title=C(e.title,a);g=e.subtitle=C(e.subtitle,b),e=g;n([["title",a,f],["subtitle",b,e]],function(a){var b=a[0],c=d[b],e=a[1],a=a[2];c&&e&&(d[b]=c=c.destroy());a&&a.text&&!c&&(d[b]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,
"class":"highcharts-"+b,zIndex:a.zIndex||4}).css(a.style).add())});d.layOutTitles(c)},layOutTitles:function(a){var b=0,c=this.title,d=this.subtitle,e=this.options,f=e.title,e=e.subtitle,g=this.renderer,h=this.spacingBox.width-44;if(c&&(c.css({width:(f.width||h)+"px"}).align(x({y:g.fontMetrics(f.style.fontSize,c).b-3},f),!1,"spacingBox"),!f.floating&&!f.verticalAlign))b=c.getBBox().height;d&&(d.css({width:(e.width||h)+"px"}).align(x({y:b+(f.margin-13)+g.fontMetrics(e.style.fontSize,c).b},e),!1,"spacingBox"),
!e.floating&&!e.verticalAlign&&(b=Fa(b+d.getBBox().height)));c=this.titleOffset!==b;this.titleOffset=b;if(!this.isDirtyBox&&c)this.isDirtyBox=c,this.hasRendered&&q(a,!0)&&this.isDirtyBox&&this.redraw()},getChartSize:function(){var a=this.options.chart,b=a.width,a=a.height,c=this.renderToClone||this.renderTo;if(!s(b))this.containerWidth=xa(c,"width");if(!s(a))this.containerHeight=xa(c,"height");this.chartWidth=v(0,b||this.containerWidth||600);this.chartHeight=v(0,q(a,this.containerHeight>19?this.containerHeight:
400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;a?b&&(this.renderTo.appendChild(c),Va(b),delete this.renderToClone):(c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),F(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&b.style.setProperty("display","block","important"),B.body.appendChild(b),c&&b.appendChild(c))},getContainer:function(){var a,b=this.options,c=b.chart,d,e;a=this.renderTo;
var f="highcharts-"+Jb++;if(!a)this.renderTo=a=c.renderTo;if(Da(a))this.renderTo=a=B.getElementById(a);a||ga(13,!0);d=G(X(a,"data-highcharts-chart"));!isNaN(d)&&$[d]&&$[d].hasRendered&&$[d].destroy();X(a,"data-highcharts-chart",this.index);a.innerHTML="";!c.skipClone&&!a.offsetWidth&&this.cloneRenderTo();this.getChartSize();d=this.chartWidth;e=this.chartHeight;this.container=a=ea(Wa,{className:"highcharts-container"+(c.className?" "+c.className:""),id:f},x({position:"relative",overflow:"hidden",width:d+
"px",height:e+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},c.style),this.renderToClone||a);this._cursor=a.style.cursor;this.renderer=new (z[c.renderer]||Ya)(a,d,e,c.style,c.forExport,b.exporting&&b.exporting.allowHTML);qa&&this.renderer.create(this,a,d,e);this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,c=this.margin,d=this.titleOffset;this.resetMargins();if(d&&!s(c[0]))this.plotTop=v(this.plotTop,d+this.options.title.margin+
b[0]);this.legend.adjustMargins(c,b);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&n(a.axes,function(a){a.visible&&a.getOffset()});n(ub,function(d,e){s(c[e])||(a[d]+=b[e])});a.setChartSize()},reflow:function(a){var b=this,c=b.options.chart,d=b.renderTo,e=c.width||xa(d,"width"),f=c.height||xa(d,"height"),
c=a?a.target:J;if(!b.hasUserSize&&!b.isPrinting&&e&&f&&(c===J||c===B)){if(e!==b.containerWidth||f!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=$a(function(){if(b.container)b.setSize(e,f,!1),b.hasUserSize=null},a?100:0);b.containerWidth=e;b.containerHeight=f}},initReflow:function(){var a=this,b=function(b){a.reflow(b)};D(J,"resize",b);D(a,"destroy",function(){T(J,"resize",b)})},setSize:function(a,b,c){var d=this,e,f,g=d.renderer;d.isResizing+=1;ab(c,d);d.oldChartHeight=d.chartHeight;
d.oldChartWidth=d.chartWidth;if(s(a))d.chartWidth=e=v(0,y(a)),d.hasUserSize=!!e;if(s(b))d.chartHeight=f=v(0,y(b));a=g.globalAnimation;(a?eb:F)(d.container,{width:e+"px",height:f+"px"},a);d.setChartSize(!0);g.setSize(e,f,c);d.maxTicks=null;n(d.axes,function(a){a.isDirty=!0;a.setScale()});n(d.series,function(a){a.isDirty=!0});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(c);d.oldChartHeight=null;M(d,"resize");$a(function(){d&&M(d,"endResize",null,function(){d.isResizing-=
1})},hb(a).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,e=this.chartHeight,f=this.options.chart,g=this.spacing,h=this.clipOffset,i,j,k,l;this.plotLeft=i=y(this.plotLeft);this.plotTop=j=y(this.plotTop);this.plotWidth=k=v(0,y(d-i-this.marginRight));this.plotHeight=l=v(0,y(e-j-this.marginBottom));this.plotSizeX=b?l:k;this.plotSizeY=b?k:l;this.plotBorderWidth=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:g[3],y:g[0],width:d-g[3]-g[1],height:e-g[0]-g[2]};
this.plotBox=c.plotBox={x:i,y:j,width:k,height:l};d=2*V(this.plotBorderWidth/2);b=Fa(v(d,h[3])/2);c=Fa(v(d,h[0])/2);this.clipBox={x:b,y:c,width:V(this.plotSizeX-v(d,h[1])/2-b),height:v(0,V(this.plotSizeY-v(d,h[2])/2-c))};a||n(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this;n(ub,function(b,c){a[b]=q(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,
d=this.chartHeight,e=this.chartBackground,f=this.plotBackground,g=this.plotBorder,h=this.plotBGImage,i=a.borderWidth||0,j=a.backgroundColor,k=a.plotBackgroundColor,l=a.plotBackgroundImage,m=a.plotBorderWidth||0,o,p=this.plotLeft,r=this.plotTop,A=this.plotWidth,q=this.plotHeight,n=this.plotBox,w=this.clipRect,O=this.clipBox;o=i+(a.shadow?8:0);if(i||j)if(e)e.animate(e.crisp({width:c-o,height:d-o}));else{e={fill:j||"none"};if(i)e.stroke=a.borderColor,e["stroke-width"]=i;this.chartBackground=b.rect(o/
2,o/2,c-o,d-o,a.borderRadius,i).attr(e).addClass("highcharts-background").add().shadow(a.shadow)}if(k)f?f.animate(n):this.plotBackground=b.rect(p,r,A,q,0).attr({fill:k}).add().shadow(a.plotShadow);if(l)h?h.animate(n):this.plotBGImage=b.image(l,p,r,A,q).add();w?w.animate({width:O.width,height:O.height}):this.clipRect=b.clipRect(O);if(m)g?(g.strokeWidth=-m,g.animate(g.crisp({x:p,y:r,width:A,height:q}))):this.plotBorder=b.rect(p,r,A,q,0,-m).attr({stroke:a.plotBorderColor,"stroke-width":m,fill:"none",
zIndex:1}).add();this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,e,f;n(["inverted","angular","polar"],function(g){c=K[b.type||b.defaultSeriesType];f=a[g]||b[g]||c&&c.prototype[g];for(e=d&&d.length;!f&&e--;)(c=K[d[e].type])&&c.prototype[g]&&(f=!0);a[g]=f})},linkSeries:function(){var a=this,b=a.series;n(b,function(a){a.linkedSeries.length=0});n(b,function(b){var d=b.options.linkedTo;if(Da(d)&&(d=d===":previous"?a.series[b.index-1]:a.get(d)))d.linkedSeries.push(b),
b.linkedParent=d,b.visible=q(b.options.visible,d.options.visible,b.visible)})},renderSeries:function(){n(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&n(b.items,function(c){var d=x(b.style,c.style),e=G(d.left)+a.plotLeft,f=G(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(c.html,e,f).attr({zIndex:2}).css(d).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,d,e,f,g;this.setTitle();this.legend=
new vb(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();d=this.plotWidth;e=this.plotHeight-=21;n(a,function(a){a.setScale()});this.getAxisMargins();f=d/this.plotWidth>1.1;g=e/this.plotHeight>1.05;if(f||g)this.maxTicks=null,n(a,function(a){(a.horiz&&f||!a.horiz&&g)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&n(a,function(a){a.visible&&a.render()});if(!this.seriesGroup)this.seriesGroup=b.g("series-group").attr({zIndex:3}).add();
this.renderSeries();this.renderLabels();this.showCredits(c.credits);this.hasRendered=!0},showCredits:function(a){if(a.enabled&&!this.credits)this.credits=this.renderer.text(a.text,0,0).on("click",function(){if(a.href)J.location.href=a.href}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position)},destroy:function(){var a=this,b=a.axes,c=a.series,d=a.container,e,f=d&&d.parentNode;M(a,"destroy");$[a.index]=t;lb--;a.renderTo.removeAttribute("data-highcharts-chart");T(a);for(e=b.length;e--;)b[e]=
b[e].destroy();for(e=c.length;e--;)c[e]=c[e].destroy();n("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","),function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy())});if(d)d.innerHTML="",T(d),f&&Va(d);for(e in a)delete a[e]},isReadyToRender:function(){var a=this;return!ja&&J==J.top&&B.readyState!=="complete"||qa&&!J.canvg?(qa?Wb.push(function(){a.firstRender()},a.options.global.canvasToolsURL):
B.attachEvent("onreadystatechange",function(){B.detachEvent("onreadystatechange",a.firstRender);B.readyState==="complete"&&a.firstRender()}),!1):!0},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();M(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();n(b.series||[],function(b){a.initSeries(b)});a.linkSeries();M(a,"beforeRender");if(z.Pointer)a.pointer=new Za(a,b);a.render();a.renderer.draw();if(!a.renderer.imgCount&&a.onload)a.onload();
a.cloneRenderTo(!0)}},onload:function(){var a=this;n([this.callback].concat(this.callbacks),function(b){b&&a.index!==void 0&&b.apply(a,[a])});M(a,"load");this.onload=null},splashArray:function(a,b){var c=b[a],c=da(c)?c:[c,c,c,c];return[q(b[a+"Top"],c[0]),q(b[a+"Right"],c[1]),q(b[a+"Bottom"],c[2]),q(b[a+"Left"],c[3])]}};var bc=z.CenteredSeriesMixin={getCenter:function(){var a=this.options,b=this.chart,c=2*(a.slicedOffset||0),d=b.plotWidth-2*c,b=b.plotHeight-2*c,e=a.center,e=[q(e[0],"50%"),q(e[1],"50%"),
a.size||"100%",a.innerSize||0],f=E(d,b),g,h;for(g=0;g<4;++g)h=e[g],a=g<2||g===2&&/%$/.test(h),e[g]=(/%$/.test(h)?[d,b,f,e[2]][g]*parseFloat(h)/100:parseFloat(h))+(a?c:0);e[3]>e[2]&&(e[3]=e[2]);return e}},Ha=function(){};Ha.prototype={init:function(a,b,c){this.series=a;this.color=a.color;this.applyOptions(b,c);this.pointAttr={};if(a.options.colorByPoint&&(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter++],a.colorCounter===b.length))a.colorCounter=0;a.chart.pointCount++;
return this},applyOptions:function(a,b){var c=this.series,d=c.options.pointValKey||c.pointValKey,a=Ha.prototype.optionsToObject.call(this,a);x(this,a);this.options=this.options?x(this.options,a):a;if(d)this.y=this[d];this.isNull=this.y===null;if(this.x===void 0&&c)this.x=b===void 0?c.autoIncrement():b;return this},optionsToObject:function(a){var b={},c=this.series,d=c.options.keys,e=d||c.pointArrayMap||["y"],f=e.length,g=0,h=0;if(typeof a==="number"||a===null)b[e[0]]=a;else if(Ja(a)){if(!d&&a.length>
f){c=typeof a[0];if(c==="string")b.name=a[0];else if(c==="number")b.x=a[0];g++}for(;h<f;){if(!d||a[g]!==void 0)b[e[h]]=a[g];g++;h++}}else if(typeof a==="object"){b=a;if(a.dataLabels)c._hasPointLabels=!0;if(a.marker)c._hasPointMarkers=!0}return b},destroy:function(){var a=this.series.chart,b=a.hoverPoints,c;a.pointCount--;if(b&&(this.setState(),Aa(b,this),!b.length))a.hoverPoints=null;if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)T(this),this.destroyElements();this.legendItem&&
a.legend.destroyItem(this);for(c in this)this[c]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],b,c=6;c--;)b=a[c],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var b=this.series,c=b.tooltipOptions,d=q(c.valueDecimals,""),
e=c.valuePrefix||"",f=c.valueSuffix||"";n(b.pointArrayMap||["y"],function(b){b="{point."+b;if(e||f)a=a.replace(b+"}",e+b+"}"+f);a=a.replace(b+"}",b+":,."+d+"f}")});return La(a,{point:this,series:this.series})},firePointEvent:function(a,b,c){var d=this,e=this.series.options;(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();a==="click"&&e.allowPointSelect&&(c=function(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});M(this,a,b,c)},visible:!0};var Q=
z.Series=function(){};Q.prototype={isCartesian:!0,type:"line",pointClass:Ha,sorted:!0,requireSorting:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor",r:"radius"},directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],init:function(a,b){var c=this,d,e,f=a.series,g=function(a,b){return q(a.options.index,a._i)-q(b.options.index,b._i)};c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();x(c,{name:b.name,state:"",pointAttr:{},
visible:b.visible!==!1,selected:b.selected===!0});if(qa)b.animation=!1;e=b.events;for(d in e)D(c,d,e[d]);if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();n(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);if(c.isCartesian)a.hasCartesianSeries=!0;f.push(c);c._i=f.length-1;ob(f,g);this.yAxis&&ob(this.yAxis.series,g);n(f,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)})},bindAxes:function(){var a=
this,b=a.options,c=a.chart,d;n(a.axisTypes||[],function(e){n(c[e],function(c){d=c.options;if(b[e]===d.index||b[e]!==t&&b[e]===d.id||b[e]===t&&d.index===0)c.series.push(a),a[e]=c,c.isDirty=!0});!a[e]&&a.optionalAxis!==e&&ga(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments;n(c.parallelArrays,typeof b==="number"?function(d){var f=d==="y"&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=f}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))})},autoIncrement:function(){var a=
this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,b=q(b,a.pointStart,0);this.pointInterval=c=q(this.pointInterval,a.pointInterval,1);d&&(a=new fa(b),d==="day"?a=+a[rb](a[bb]()+c):d==="month"?a=+a[Fb](a[ib]()+c):d==="year"&&(a=+a[Gb](a[jb]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options.plotOptions,b=b.userOptions||{},d=b.plotOptions||{},e=c[this.type];this.userOptions=a;c=C(e,c.series,a);this.tooltipOptions=C(N.tooltip,N.plotOptions[this.type].tooltip,
b.tooltip,d.series&&d.series.tooltip,d[this.type]&&d[this.type].tooltip,a.tooltip);e.marker===null&&delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();if((c.negativeColor||c.negativeFillColor)&&!c.zones)a.push({value:c[this.zoneAxis+"Threshold"]||c.threshold||0,color:c.negativeColor,fillColor:c.negativeFillColor});a.length&&s(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return c},getCyclic:function(a,b,c){var d=this.userOptions,e="_"+a+"Index",
f=a+"Counter";b||(s(d[e])?b=d[e]:(d[e]=b=this.chart[f]%c.length,this.chart[f]+=1),b=c[b]);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||W[this.type].color,this.chart.options.colors)},getSymbol:function(){var a=this.options.marker;this.getCyclic("symbol",a.symbol,this.chart.options.symbols);if(/^url/.test(this.symbol))a.radius=0},drawLegendSymbol:aa.drawLineMarker,setData:function(a,b,c,d){var e=this,f=e.points,g=f&&f.length||
0,h,i=e.options,j=e.chart,k=null,l=e.xAxis,m=l&&!!l.categories,o=i.turboThreshold,p=this.xData,r=this.yData,A=(h=e.pointArrayMap)&&h.length,a=a||[];h=a.length;b=q(b,!0);if(d!==!1&&h&&g===h&&!e.cropped&&!e.hasGroupedData&&e.visible)n(a,function(a,b){f[b].update&&a!==i.data[b]&&f[b].update(a,!1,null,!1)});else{e.xIncrement=null;e.colorCounter=0;n(this.parallelArrays,function(a){e[a+"Data"].length=0});if(o&&h>o){for(c=0;k===null&&c<h;)k=a[c],c++;if(ua(k)){m=q(i.pointStart,0);k=q(i.pointInterval,1);for(c=
0;c<h;c++)p[c]=m,r[c]=a[c],m+=k;e.xIncrement=m}else if(Ja(k))if(A)for(c=0;c<h;c++)k=a[c],p[c]=k[0],r[c]=k.slice(1,A+1);else for(c=0;c<h;c++)k=a[c],p[c]=k[0],r[c]=k[1];else ga(12)}else for(c=0;c<h;c++)if(a[c]!==t&&(k={series:e},e.pointClass.prototype.applyOptions.apply(k,[a[c]]),e.updateParallelArrays(k,c),m&&s(k.name)))l.names[k.x]=k.name;Da(r[0])&&ga(14,!0);e.data=[];e.options.data=e.userOptions.data=a;for(c=g;c--;)f[c]&&f[c].destroy&&f[c].destroy();if(l)l.minRange=l.userMinRange;e.isDirty=e.isDirtyData=
j.isDirtyBox=!0;c=!1}i.legendType==="point"&&(this.processData(),this.generatePoints());b&&j.redraw(c)},processData:function(a){var b=this.xData,c=this.yData,d=b.length,e;e=0;var f,g,h=this.xAxis,i,j=this.options;i=j.cropThreshold;var k=this.getExtremesFromAll||j.getExtremesFromAll,l=this.isCartesian,j=h&&h.val2lin,m=h&&h.isLog,o,p;if(l&&!this.isDirty&&!h.isDirty&&!this.yAxis.isDirty&&!a)return!1;if(h)a=h.getExtremes(),o=a.min,p=a.max;if(l&&this.sorted&&!k&&(!i||d>i||this.forceCrop))if(b[d-1]<o||
b[0]>p)b=[],c=[];else if(b[0]<o||b[d-1]>p)e=this.cropData(this.xData,this.yData,o,p),b=e.xData,c=e.yData,e=e.start,f=!0;for(i=b.length||1;--i;)d=m?j(b[i])-j(b[i-1]):b[i]-b[i-1],d>0&&(g===t||d<g)?g=d:d<0&&this.requireSorting&&ga(15);this.cropped=f;this.cropStart=e;this.processedXData=b;this.processedYData=c;this.closestPointRange=g},cropData:function(a,b,c,d){var e=a.length,f=0,g=e,h=q(this.cropShoulder,1),i;for(i=0;i<e;i++)if(a[i]>=c){f=v(0,i-h);break}for(c=i;c<e;c++)if(a[c]>d){g=c+h;break}return{xData:a.slice(f,
g),yData:b.slice(f,g),start:f,end:g}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,e=this.processedYData,f=this.pointClass,g=d.length,h=this.cropStart||0,i,j=this.hasGroupedData,k,l=[],m;if(!b&&!j)b=[],b.length=a.length,b=this.data=b;for(m=0;m<g;m++)i=h+m,j?(l[m]=(new f).init(this,[d[m]].concat(va(e[m]))),l[m].dataGroup=this.groupMap[m]):(b[i]?k=b[i]:a[i]!==t&&(b[i]=k=(new f).init(this,a[i],d[m])),l[m]=k),l[m].index=i;if(b&&(g!==(c=b.length)||j))for(m=0;m<
c;m++)if(m===h&&!j&&(m+=g),b[m])b[m].destroyElements(),b[m].plotX=t;this.data=b;this.points=l},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,d,e=[],f=0;d=this.xAxis.getExtremes();var g=d.min,h=d.max,i,j,k,l,a=a||this.stackedYData||this.processedYData;d=a.length;for(l=0;l<d;l++)if(j=c[l],k=a[l],i=k!==null&&k!==t&&(!b.isLog||k.length||k>0),j=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[l+1]||j)>=g&&(c[l-1]||j)<=h,i&&j)if(i=k.length)for(;i--;)k[i]!==null&&
(e[f++]=k[i]);else e[f++]=k;this.dataMin=Oa(e);this.dataMax=Ea(e)},translate:function(){this.processedXData||this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,e=this.yAxis,f=this.points,g=f.length,h=!!this.modifyValue,i=a.pointPlacement,j=i==="between"||ua(i),k=a.threshold,l=a.startFromThreshold?k:0,m,o,p,r,A=Number.MAX_VALUE,a=0;a<g;a++){var n=f[a],u=n.x,w=n.y;o=n.low;var O=b&&e.stacks[(this.negStacks&&w<(l?0:k)?"-":"")+this.stackKey];if(e.isLog&&
w!==null&&w<=0)n.y=w=null,ga(10);n.plotX=m=E(v(-1E5,c.translate(u,0,0,0,1,i,this.type==="flags")),1E5);if(b&&this.visible&&!n.isNull&&O&&O[u])r=this.getStackIndicator(r,u,this.index),O=O[u],w=O.points[r.key],o=w[0],w=w[1],o===l&&(o=q(k,e.min)),e.isLog&&o<=0&&(o=null),n.total=n.stackTotal=O.total,n.percentage=O.total&&n.y/O.total*100,n.stackY=w,O.setOffset(this.pointXOffset||0,this.barW||0);n.yBottom=s(o)?e.translate(o,0,1,0,1):null;h&&(w=this.modifyValue(w,n));n.plotY=o=typeof w==="number"&&w!==Infinity?
E(v(-1E5,e.translate(w,0,1,0,1)),1E5):t;n.isInside=o!==t&&o>=0&&o<=e.len&&m>=0&&m<=c.len;n.clientX=j?c.translate(u,0,0,0,1):m;n.negative=n.y<(k||0);n.category=d&&d[n.x]!==t?d[n.x]:n.x;n.isNull||(p!==void 0&&(A=E(A,S(m-p))),p=m)}this.closestPointRangePx=A},getValidPoints:function(a,b){var c=this.chart;return Sa(a||this.points||[],function(a){return b&&!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,e=b.inverted,f=this.clipBox,
g=f||b.clipBox,h=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,g.height,c.xAxis,c.yAxis].join(","),i=b[h],j=b[h+"m"];if(!i){if(a)g.width=0,b[h+"m"]=j=d.clipRect(-99,e?-b.plotLeft:-b.plotTop,99,e?b.chartWidth:b.chartHeight);b[h]=i=d.clipRect(g)}a&&(i.count+=1);if(c.clip!==!1)this.group.clip(a||f?i:b.clipRect),this.markerGroup.clip(j),this.sharedClipKey=h;a||(i.count-=1,i.count<=0&&h&&b[h]&&(f||(b[h]=b[h].destroy()),b[h+"m"]&&(b[h+"m"]=b[h+"m"].destroy())))},animate:function(a){var b=
this.chart,c=this.options.animation,d;if(c&&!da(c))c=W[this.type].animation;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();M(this,"afterAnimate")},drawPoints:function(){var a,b=this.points,c=this.chart,d,e,f,g,h,i,j,k,l=this.options.marker,m=this.pointAttr[""],o,p,r,A=this.markerGroup,n=q(l.enabled,this.xAxis.isRadial,this.closestPointRangePx>2*l.radius);
if(l.enabled!==!1||this._hasPointMarkers)for(f=b.length;f--;)if(g=b[f],d=V(g.plotX),e=g.plotY,k=g.graphic,o=g.marker||{},p=!!g.marker,a=n&&o.enabled===t||o.enabled,r=g.isInside,a&&e!==t&&!isNaN(e)&&g.y!==null)if(a=g.pointAttr[g.selected?"select":""]||m,h=a.r,i=q(o.symbol,this.symbol),j=i.indexOf("url")===0,k)k[r?"show":"hide"](!0).attr(a).animate(x({x:d-h,y:e-h},k.symbolName?{width:2*h,height:2*h}:{}));else{if(r&&(h>0||j))g.graphic=c.renderer.symbol(i,d-h,e-h,2*h,2*h,p?o:l).attr(a).add(A)}else if(k)g.graphic=
k.destroy()},convertAttribs:function(a,b,c,d){var e=this.pointAttrToOptions,f,g,h={},a=a||{},b=b||{},c=c||{},d=d||{};for(f in e)g=e[f],h[f]=q(a[g],b[f],c[f],d[f]);return h},getAttribs:function(){var a=this,b=a.options,c=W[a.type].marker?b.marker:b,d=c.states,e=d.hover,f,g=a.color,h=a.options.negativeColor;f={stroke:g,fill:g};var i=a.points||[],j,k,l=[],m=a.pointAttrToOptions;j=a.hasPointSpecificOptions;var o=c.lineColor,p=c.fillColor;k=b.turboThreshold;var r=a.zones,A=a.zoneAxis||"y",P;b.marker?(e.radius=
e.radius||c.radius+e.radiusPlus,e.lineWidth=e.lineWidth||c.lineWidth+e.lineWidthPlus):(e.color=e.color||wa(e.color||g).brighten(e.brightness).get(),e.negativeColor=e.negativeColor||wa(e.negativeColor||h).brighten(e.brightness).get());l[""]=a.convertAttribs(c,f);n(["hover","select"],function(b){l[b]=a.convertAttribs(d[b],l[""])});a.pointAttr=l;g=i.length;if(!k||g<k||j)for(;g--;){k=i[g];if((c=k.options&&k.options.marker||k.options)&&c.enabled===!1)c.radius=0;if(r.length){j=0;for(f=r[j];k[A]>=f.value;)f=
r[++j];k.color=k.fillColor=q(f.color,a.color)}j=b.colorByPoint||k.color;if(k.options)for(P in m)s(c[m[P]])&&(j=!0);if(j){c=c||{};j=[];d=c.states||{};f=d.hover=d.hover||{};if(!b.marker||k.negative&&!f.fillColor&&!e.fillColor)f[a.pointAttrToOptions.fill]=f.color||!k.options.color&&e[k.negative&&h?"negativeColor":"color"]||wa(k.color).brighten(f.brightness||e.brightness).get();f={color:k.color};if(!p)f.fillColor=k.color;if(!o)f.lineColor=k.color;c.hasOwnProperty("color")&&!c.color&&delete c.color;j[""]=
a.convertAttribs(x(f,c),l[""]);j.hover=a.convertAttribs(d.hover,l.hover,j[""]);j.select=a.convertAttribs(d.select,l.select,j[""])}else j=l;k.pointAttr=j}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(Ma),d,e=a.data||[],f,g,h;M(a,"destroy");T(a);n(a.axisTypes||[],function(b){if(h=a[b])Aa(h.series,a),h.isDirty=h.forceRedraw=!0});a.legendItem&&a.chart.legend.destroyItem(a);for(d=e.length;d--;)(f=e[d])&&f.destroy&&f.destroy();a.points=null;clearTimeout(a.animationTimeout);for(g in a)a[g]instanceof
Z&&!a[g].survive&&(d=c&&g==="group"?"hide":"destroy",a[g][d]());if(b.hoverSeries===a)b.hoverSeries=null;Aa(b.series,a);for(g in a)delete a[g]},getGraphPath:function(a,b,c){var d=this,e=d.options,f=e.step,g,h=[],i,a=a||d.points;(g=a.reversed)&&a.reverse();(f={right:1,center:2}[f]||f&&3)&&g&&(f=4-f);e.connectNulls&&!b&&!c&&(a=this.getValidPoints(a));n(a,function(g,k){var l=g.plotX,m=g.plotY,o=a[k-1];if((g.leftCliff||o&&o.rightCliff)&&!c)i=!0;g.isNull&&!s(b)&&k>0?i=!e.connectNulls:g.isNull&&!b?i=!0:
(k===0||i?o=["M",g.plotX,g.plotY]:d.getPointSpline?o=d.getPointSpline(a,g,k):f?(o=f===1?["L",o.plotX,m]:f===2?["L",(o.plotX+l)/2,o.plotY,"L",(o.plotX+l)/2,m]:["L",l,o.plotY],o.push("L",l,m)):o=["L",l,m],h.push.apply(h,o),i=!1)});return d.graphPath=h},drawGraph:function(){var a=this,b=this.options,c=[["graph",b.lineColor||this.color,b.dashStyle]],d=b.lineWidth,e=b.linecap!=="square",f=(this.gappedPath||this.getGraphPath).call(this),g=this.fillGraph&&this.color||"none";n(this.zones,function(d,e){c.push(["zoneGraph"+
e,d.color||a.color,d.dashStyle||b.dashStyle])});n(c,function(c,i){var j=c[0],k=a[j];if(k)k.animate({d:f});else if((d||g)&&f.length)k={stroke:c[1],"stroke-width":d,fill:g,zIndex:1},c[2]?k.dashstyle=c[2]:e&&(k["stroke-linecap"]=k["stroke-linejoin"]="round"),a[j]=a.chart.renderer.path(f).attr(k).add(a.group).shadow(i<2&&b.shadow)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,d=this.zones,e,f,g=this.clips||[],h,i=this.graph,j=this.area,k=v(b.chartWidth,b.chartHeight),l=this[(this.zoneAxis||
"y")+"Axis"],m,o=l.reversed,p=b.inverted,r=l.horiz,A,P,u,w=!1;if(d.length&&(i||j)&&l.min!==t)i&&i.hide(),j&&j.hide(),m=l.getExtremes(),n(d,function(d,n){e=o?r?b.plotWidth:0:r?0:l.toPixels(m.min);e=E(v(q(f,e),0),k);f=E(v(y(l.toPixels(q(d.value,m.max),!0)),0),k);w&&(e=f=l.toPixels(m.max));A=Math.abs(e-f);P=E(e,f);u=v(e,f);if(l.isXAxis){if(h={x:p?u:P,y:0,width:A,height:k},!r)h.x=b.plotHeight-h.x}else if(h={x:0,y:p?u:P,width:k,height:A},r)h.y=b.plotWidth-h.y;b.inverted&&c.isVML&&(h=l.isXAxis?{x:0,y:o?
P:u,height:h.width,width:b.chartWidth}:{x:h.y-b.plotLeft-b.spacingBox.x,y:0,width:h.height,height:b.chartHeight});g[n]?g[n].animate(h):(g[n]=c.clipRect(h),i&&a["zoneGraph"+n].clip(g[n]),j&&a["zoneArea"+n].clip(g[n]));w=d.value>m.max}),this.clips=g},invertGroups:function(){function a(){var a={width:b.yAxis.len,height:b.xAxis.len};n(["group","markerGroup"],function(c){b[c]&&b[c].attr(a).invert()})}var b=this,c=b.chart;if(b.xAxis)D(c,"resize",a),D(b,"destroy",function(){T(c,"resize",a)}),a(),b.invertGroups=
a},plotGroup:function(a,b,c,d,e){var f=this[a],g=!f;g&&(this[a]=f=this.chart.renderer.g(b).attr({zIndex:d||0.1}).add(e),f.addClass("highcharts-series-"+this.index));f.attr({visibility:c})[g?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;if(a.inverted)b=c,c=this.xAxis;return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,d=a.options,e=!!a.animate&&b.renderer.isSVG&&
hb(d.animation).duration,f=a.visible?"inherit":"hidden",g=d.zIndex,h=a.hasRendered,i=b.seriesGroup;c=a.plotGroup("group","series",f,g,i);a.markerGroup=a.plotGroup("markerGroup","markers",f,g,i);e&&a.animate(!0);a.getAttribs();c.inverted=a.isCartesian?b.inverted:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());n(a.points,function(a){a.redraw&&a.redraw()});a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&a.options.enableMouseTracking!==!1&&a.drawTracker();b.inverted&&a.invertGroups();
d.clip!==!1&&!a.sharedClipKey&&!h&&c.clip(b.clipRect);e&&a.animate();if(!h)a.animationTimeout=$a(function(){a.afterAnimate()},e);a.isDirty=a.isDirtyData=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirtyData,c=this.isDirty,d=this.group,e=this.xAxis,f=this.yAxis;d&&(a.inverted&&d.attr({width:a.plotWidth,height:a.plotHeight}),d.animate({translateX:q(e&&e.left,a.plotLeft),translateY:q(f&&f.top,a.plotTop)}));this.translate();this.render();b&&M(this,"updatedData");(c||b)&&delete this.kdTree},
kdDimensions:1,kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,e=this.chart.inverted;return this.searchKDTree({clientX:e?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?d.len-a.chartX+d.pos:a.chartY-d.pos},b)},buildKDTree:function(){function a(c,e,f){var g,h;if(h=c&&c.length)return g=b.kdAxisArray[e%f],c.sort(function(a,b){return a[g]-b[g]}),h=Math.floor(h/2),{point:c[h],left:a(c.slice(0,h),e+1,f),right:a(c.slice(h+1),e+1,f)}}var b=this,c=b.kdDimensions;delete b.kdTree;
$a(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c)},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,j,k){var l=b.point,m=d.kdAxisArray[j%k],o,p,r=l;p=s(a[e])&&s(l[e])?Math.pow(a[e]-l[e],2):null;o=s(a[f])&&s(l[f])?Math.pow(a[f]-l[f],2):null;o=(p||0)+(o||0);l.dist=s(o)?Math.sqrt(o):Number.MAX_VALUE;l.distX=s(p)?Math.sqrt(p):Number.MAX_VALUE;m=a[m]-l[m];o=m<0?"left":"right";p=m<0?"right":"left";b[o]&&(o=c(a,b[o],j+1,k),r=o[g]<r[g]?o:l);b[p]&&Math.sqrt(m*m)<r[g]&&(a=c(a,
b[p],j+1,k),r=a[g]<r[g]?a:r);return r}var d=this,e=this.kdAxisArray[0],f=this.kdAxisArray[1],g=b?"distX":"dist";this.kdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,this.kdDimensions,this.kdDimensions)}};Tb.prototype={destroy:function(){Pa(this,this.axis)},render:function(a){var b=this.options,c=b.format,c=c?La(c,this):b.formatter.call(this);this.label?this.label.attr({text:c,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(c,null,null,b.useHTML).css(b.style).attr({align:this.textAlign,
rotation:b.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,b){var c=this.axis,d=c.chart,e=d.inverted,f=c.reversed,f=this.isNegative&&!f||!this.isNegative&&f,g=c.translate(c.usePercentage?100:this.total,0,0,0,1),c=c.translate(0),c=S(g-c),h=d.xAxis[0].translate(this.x)+a,i=d.plotHeight,f={x:e?f?g:g-c:h,y:e?i-h-b:f?i-g-c:i-g,width:e?c:b,height:e?b:c};if(e=this.label)e.align(this.alignOptions,null,f),f=e.alignAttr,e[this.options.crop===!1||d.isInsidePlot(f.x,f.y)?"show":"hide"](!0)}};Ca.prototype.getStacks=
function(){var a=this;n(a.yAxis,function(a){if(a.stacks&&a.hasVisibleSeries)a.oldStacks=a.stacks});n(a.series,function(b){if(b.options.stacking&&(b.visible===!0||a.options.chart.ignoreHiddenSeries===!1))b.stackKey=b.type+q(b.options.stack,"")})};I.prototype.buildStacks=function(){var a=this.series,b,c=q(this.options.reversedStacks,!0),d=a.length,e;if(!this.isXAxis){this.usePercentage=!1;for(e=d;e--;)a[c?e:d-e-1].setStackedPoints();for(e=d;e--;)b=a[c?e:d-e-1],b.setStackCliffs&&b.setStackCliffs();if(this.usePercentage)for(e=
0;e<d;e++)a[e].setPercentStacks()}};I.prototype.renderStackTotals=function(){var a=this.chart,b=a.renderer,c=this.stacks,d,e,f=this.stackTotalGroup;if(!f)this.stackTotalGroup=f=b.g("stack-labels").attr({visibility:"visible",zIndex:6}).add();f.translate(a.plotLeft,a.plotTop);for(d in c)for(e in a=c[d],a)a[e].render(f)};I.prototype.resetStacks=function(){var a=this.stacks,b,c;if(!this.isXAxis)for(b in a)for(c in a[b])a[b][c].touched<this.stacksTouched?(a[b][c].destroy(),delete a[b][c]):(a[b][c].total=
null,a[b][c].cum=0)};I.prototype.cleanStacks=function(){var a,b,c;if(!this.isXAxis){if(this.oldStacks)a=this.stacks=this.oldStacks;for(b in a)for(c in a[b])a[b][c].cum=a[b][c].total}};Q.prototype.setStackedPoints=function(){if(this.options.stacking&&!(this.visible!==!0&&this.chart.options.chart.ignoreHiddenSeries!==!1)){var a=this.processedXData,b=this.processedYData,c=[],d=b.length,e=this.options,f=e.threshold,g=e.startFromThreshold?f:0,h=e.stack,e=e.stacking,i=this.stackKey,j="-"+i,k=this.negStacks,
l=this.yAxis,m=l.stacks,o=l.oldStacks,p,r,n,P,u,w,s;l.stacksTouched+=1;for(u=0;u<d;u++){w=a[u];s=b[u];p=this.getStackIndicator(p,w,this.index);P=p.key;n=(r=k&&s<(g?0:f))?j:i;m[n]||(m[n]={});if(!m[n][w])o[n]&&o[n][w]?(m[n][w]=o[n][w],m[n][w].total=null):m[n][w]=new Tb(l,l.options.stackLabels,r,w,h);n=m[n][w];if(s!==null)n.points[P]=n.points[this.index]=[q(n.cum,g)],n.touched=l.stacksTouched,p.index>0&&this.singleStacks===!1&&(n.points[P][0]=n.points[this.index+","+w+",0"][0]);e==="percent"?(r=r?i:
j,k&&m[r]&&m[r][w]?(r=m[r][w],n.total=r.total=v(r.total,n.total)+S(s)||0):n.total=na(n.total+(S(s)||0))):n.total=na(n.total+(s||0));n.cum=q(n.cum,g)+(s||0);if(s!==null)n.points[P].push(n.cum),c[u]=n.cum}if(e==="percent")l.usePercentage=!0;this.stackedYData=c;l.oldStacks={}}};Q.prototype.setPercentStacks=function(){var a=this,b=a.stackKey,c=a.yAxis.stacks,d=a.processedXData,e;n([b,"-"+b],function(b){var f;for(var g=d.length,h,i;g--;)if(h=d[g],e=a.getStackIndicator(e,h,a.index),f=(i=c[b]&&c[b][h])&&
i.points[e.key],h=f)i=i.total?100/i.total:0,h[0]=na(h[0]*i),h[1]=na(h[1]*i),a.stackedYData[g]=h[1]})};Q.prototype.getStackIndicator=function(a,b,c){!s(a)||a.x!==b?a={x:b,index:0}:a.index++;a.key=[c,b,a.index].join(",");return a};x(Ca.prototype,{addSeries:function(a,b,c){var d,e=this;a&&(b=q(b,!0),M(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();b&&e.redraw(c)}));return d},addAxis:function(a,b,c,d){var e=b?"xAxis":"yAxis",f=this.options,a=C(a,{index:this[e].length,
isX:b});new I(this,a);f[e]=va(f[e]||{});f[e].push(a);q(c,!0)&&this.redraw(d)},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,e=c.loading,f=function(){d&&F(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};if(!d)b.loadingDiv=d=ea(Wa,{className:"highcharts-loading"},x(e.style,{zIndex:10,display:"none"}),b.container),b.loadingSpan=ea("span",null,e.labelStyle,d),D(b,"redraw",f);b.loadingSpan.innerHTML=a||c.lang.loading;if(!b.loadingShown)F(d,
{opacity:0,display:""}),eb(d,{opacity:e.style.opacity},{duration:e.showDuration||0}),b.loadingShown=!0;f()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&eb(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){F(b,{display:"none"})}});this.loadingShown=!1}});x(Ha.prototype,{update:function(a,b,c,d){function e(){f.applyOptions(a);if(f.y===null&&h)f.graphic=h.destroy();if(da(a)&&!Ja(a))f.redraw=function(){if(h&&h.element&&a&&a.marker&&a.marker.symbol)f.graphic=h.destroy();
if(a&&a.dataLabels&&f.dataLabel)f.dataLabel=f.dataLabel.destroy();f.redraw=null};i=f.index;g.updateParallelArrays(f,i);if(l&&f.name)l[f.x]=f.name;k.data[i]=da(k.data[i])&&!Ja(k.data[i])?f.options:a;g.isDirty=g.isDirtyData=!0;if(!g.fixedBox&&g.hasCartesianSeries)j.isDirtyBox=!0;if(k.legendType==="point")j.isDirtyLegend=!0;b&&j.redraw(c)}var f=this,g=f.series,h=f.graphic,i,j=g.chart,k=g.options,l=g.xAxis&&g.xAxis.names,b=q(b,!0);d===!1?e():f.firePointEvent("update",{options:a},e)},remove:function(a,
b){this.series.removePoint(sa(this,this.series.data),a,b)}});x(Q.prototype,{addPoint:function(a,b,c,d){var e=this,f=e.options,g=e.data,h=e.graph,i=e.area,j=e.chart,k=e.xAxis&&e.xAxis.names,l=h&&h.shift||0,m=["graph","area"],h=f.data,o,p=e.xData;ab(d,j);if(c){for(d=e.zones.length;d--;)m.push("zoneGraph"+d,"zoneArea"+d);n(m,function(a){if(e[a])e[a].shift=l+(f.step?2:1)})}if(i)i.isArea=!0;b=q(b,!0);i={series:e};e.pointClass.prototype.applyOptions.apply(i,[a]);m=i.x;d=p.length;if(e.requireSorting&&m<
p[d-1])for(o=!0;d&&p[d-1]>m;)d--;e.updateParallelArrays(i,"splice",d,0,0);e.updateParallelArrays(i,d);if(k&&i.name)k[m]=i.name;h.splice(d,0,a);o&&(e.data.splice(d,0,null),e.processData());f.legendType==="point"&&e.generatePoints();c&&(g[0]&&g[0].remove?g[0].remove(!1):(g.shift(),e.updateParallelArrays(i,"shift"),h.shift()));e.isDirty=!0;e.isDirtyData=!0;b&&(e.getAttribs(),j.redraw())},removePoint:function(a,b,c){var d=this,e=d.data,f=e[a],g=d.points,h=d.chart,i=function(){g&&g.length===e.length&&
g.splice(a,1);e.splice(a,1);d.options.data.splice(a,1);d.updateParallelArrays(f||{series:d},"splice",a,1);f&&f.destroy();d.isDirty=!0;d.isDirtyData=!0;b&&h.redraw()};ab(c,h);b=q(b,!0);f?f.firePointEvent("remove",null,i):i()},remove:function(a,b){var c=this,d=c.chart;M(c,"remove",null,function(){c.destroy();d.isDirtyLegend=d.isDirtyBox=!0;d.linkSeries();q(a,!0)&&d.redraw(b)})},update:function(a,b){var c=this,d=this.chart,e=this.userOptions,f=this.type,g=K[f].prototype,h=["group","markerGroup","dataLabelsGroup"],
i;if(a.type&&a.type!==f||a.zIndex!==void 0)h.length=0;n(h,function(a){h[a]=c[a];delete c[a]});a=C(e,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1);for(i in g)this[i]=t;x(this,K[a.type||f].prototype);n(h,function(a){c[a]=h[a]});this.init(d,a);d.linkSeries();q(b,!0)&&d.redraw(!1)}});x(I.prototype,{update:function(a,b){var c=this.chart,a=c.options[this.coll][this.options.index]=C(this.userOptions,a);this.destroy(!0);this._addedPlotLB=this.chart._labelPanes=
t;this.init(c,x(a,{events:t}));c.isDirtyBox=!0;q(b,!0)&&c.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,d=this.series,e=d.length;e--;)d[e]&&d[e].remove(!1);Aa(b.axes,this);Aa(b[c],this);b.options[c].splice(this.options.index,1);n(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;q(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}});var Ia=la(Q);K.line=Ia;W.area=C(ca,{softThreshold:!1,threshold:0});
var za=la(Q,{type:"area",singleStacks:!1,getStackPoints:function(){var a=[],b=[],c=this.xAxis,d=this.yAxis,e=d.stacks[this.stackKey],f={},g=this.points,h=this.index,i=d.series,j=i.length,k,l=q(d.options.reversedStacks,!0)?1:-1,m,o;if(this.options.stacking){for(m=0;m<g.length;m++)f[g[m].x]=g[m];for(o in e)e[o].total!==null&&b.push(o);b.sort(function(a,b){return a-b});k=ta(i,function(){return this.visible});n(b,function(g,i){var o=0,q,u;if(f[g]&&!f[g].isNull)a.push(f[g]),n([-1,1],function(a){var c=
a===1?"rightNull":"leftNull",d=0,o=e[b[i+a]];if(o)for(m=h;m>=0&&m<j;)q=o.points[m],q||(m===h?f[g][c]=!0:k[m]&&(u=e[g].points[m])&&(d-=u[1]-u[0])),m+=l;f[g][a===1?"rightCliff":"leftCliff"]=d});else{for(m=h;m>=0&&m<j;){if(q=e[g].points[m]){o=q[1];break}m+=l}o=d.toPixels(o,!0);a.push({isNull:!0,plotX:c.toPixels(g,!0),plotY:o,yBottom:o})}})}return a},getGraphPath:function(a){var b=Q.prototype.getGraphPath,c=this.options,d=c.stacking,e=this.yAxis,f,g,h=[],i=[],j=this.index,k,l=e.stacks[this.stackKey],
m=c.threshold,o=e.getThreshold(c.threshold),p,c=c.connectNulls||d==="percent",r=function(b,c,f){var g=a[b],b=d&&l[g.x].points[j],p=g[f+"Null"]||0,f=g[f+"Cliff"]||0,r,n,g=!0;f||p?(r=(p?b[0]:b[1])+f,n=b[0]+f,g=!!p):!d&&a[c]&&a[c].isNull&&(r=n=m);r!==void 0&&(i.push({plotX:k,plotY:r===null?o:e.getThreshold(r),isNull:g}),h.push({plotX:k,plotY:n===null?o:e.getThreshold(n)}))},a=a||this.points;d&&(a=this.getStackPoints());for(f=0;f<a.length;f++)if(g=a[f].isNull,k=q(a[f].rectPlotX,a[f].plotX),p=q(a[f].yBottom,
o),!g||c){c||r(f,f-1,"left");if(!g||d||!c)i.push(a[f]),h.push({x:f,plotX:k,plotY:p});c||r(f,f+1,"right")}f=b.call(this,i,!0,!0);h.reversed=!0;g=b.call(this,h,!0,!0);g.length&&(g[0]="L");f=f.concat(g);b=b.call(this,i,!1,c);this.areaPath=f;return b},drawGraph:function(){this.areaPath=[];Q.prototype.drawGraph.apply(this);var a=this,b=this.areaPath,c=this.options,d=[["area",this.color,c.fillColor]];n(this.zones,function(b,f){d.push(["zoneArea"+f,b.color||a.color,b.fillColor||c.fillColor])});n(d,function(d){var f=
d[0],g=a[f];g?g.animate({d:b}):(g={fill:d[2]||d[1],zIndex:0},d[2]||(g["fill-opacity"]=q(c.fillOpacity,0.75)),a[f]=a.chart.renderer.path(b).attr(g).add(a.group))})},drawLegendSymbol:aa.drawRectangle});K.area=za;W.spline=C(ca);Ia=la(Q,{type:"spline",getPointSpline:function(a,b,c){var d=b.plotX,e=b.plotY,f=a[c-1],c=a[c+1],g,h,i,j;if(f&&!f.isNull&&c&&!c.isNull){a=f.plotY;i=c.plotX;var c=c.plotY,k=0;g=(1.5*d+f.plotX)/2.5;h=(1.5*e+a)/2.5;i=(1.5*d+i)/2.5;j=(1.5*e+c)/2.5;i!==g&&(k=(j-h)*(i-d)/(i-g)+e-j);
h+=k;j+=k;h>a&&h>e?(h=v(a,e),j=2*e-h):h<a&&h<e&&(h=E(a,e),j=2*e-h);j>c&&j>e?(j=v(c,e),h=2*e-j):j<c&&j<e&&(j=E(c,e),h=2*e-j);b.rightContX=i;b.rightContY=j}b=["C",q(f.rightContX,f.plotX),q(f.rightContY,f.plotY),q(g,d),q(h,e),d,e];f.rightContX=f.rightContY=null;return b}});K.spline=Ia;W.areaspline=C(W.area);za=za.prototype;Ia=la(Ia,{type:"areaspline",getStackPoints:za.getStackPoints,getGraphPath:za.getGraphPath,setStackCliffs:za.setStackCliffs,drawGraph:za.drawGraph,drawLegendSymbol:aa.drawRectangle});
K.areaspline=Ia;W.column=C(ca,{borderColor:"#FFFFFF",borderRadius:0,groupPadding:0.2,marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:!1,halo:!1},select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0});Ia=la(Q,{type:"column",pointAttrToOptions:{stroke:"borderColor",fill:"color",r:"borderRadius"},
cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){Q.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&n(b.series,function(b){if(b.type===a.type)b.isDirty=!0})},getColumnMetrics:function(){var a=this,b=a.options,c=a.xAxis,d=a.yAxis,e=c.reversed,f,g={},h=0;b.grouping===!1?h=1:n(a.chart.series,function(b){var c=b.options,e=b.yAxis,i;if(b.type===a.type&&b.visible&&d.len===e.len&&d.pos===e.pos)c.stacking?(f=b.stackKey,g[f]===t&&
(g[f]=h++),i=g[f]):c.grouping!==!1&&(i=h++),b.columnIndex=i});var i=E(S(c.transA)*(c.ordinalSlope||b.pointRange||c.closestPointRange||c.tickInterval||1),c.len),j=i*b.groupPadding,k=(i-2*j)/h,b=E(b.maxPointWidth||c.len,q(b.pointWidth,k*(1-2*b.pointPadding)));a.columnMetrics={width:b,offset:(k-b)/2+(j+((a.columnIndex||0)+(e?1:0))*k-i/2)*(e?-1:1)};return a.columnMetrics},crispCol:function(a,b,c,d){var e=this.chart,f=this.borderWidth,g=-(f%2?0.5:0),f=f%2?0.5:1;e.inverted&&e.renderer.isVML&&(f+=1);c=Math.round(a+
c)+g;a=Math.round(a)+g;c-=a;d=Math.round(b+d)+f;g=S(b)<=0.5&&d>0.5;b=Math.round(b)+f;d-=b;g&&d&&(b-=1,d+=1);return{x:a,y:b,width:c,height:d}},translate:function(){var a=this,b=a.chart,c=a.options,d=a.borderWidth=q(c.borderWidth,a.closestPointRange*a.xAxis.transA<2?0:1),e=a.yAxis,f=a.translatedThreshold=e.getThreshold(c.threshold),g=q(c.minPointLength,5),h=a.getColumnMetrics(),i=h.width,j=a.barW=v(i,1+2*d),k=a.pointXOffset=h.offset;b.inverted&&(f-=0.5);c.pointPadding&&(j=Fa(j));Q.prototype.translate.apply(a);
n(a.points,function(c){var d=E(q(c.yBottom,f),9E4),h=999+S(d),h=E(v(-h,c.plotY),e.len+h),p=c.plotX+k,r=j,n=E(h,d),s,u=v(h,d)-n;S(u)<g&&g&&(u=g,s=!e.reversed&&!c.negative||e.reversed&&c.negative,n=S(n-f)>g?d-g:f-(s?g:0));c.barX=p;c.pointWidth=i;c.tooltipPos=b.inverted?[e.len+e.pos-b.plotLeft-h,a.xAxis.len-p-r/2,u]:[p+r/2,h+e.pos-b.plotTop,u];c.shapeType="rect";c.shapeArgs=a.crispCol(p,n,r,u)})},getSymbol:ra,drawLegendSymbol:aa.drawRectangle,drawGraph:ra,drawPoints:function(){var a=this,b=this.chart,
c=a.options,d=b.renderer,e=c.animationLimit||250,f,g;n(a.points,function(h){var i=h.plotY,j=h.graphic;if(i!==t&&!isNaN(i)&&h.y!==null)f=h.shapeArgs,i=s(a.borderWidth)?{"stroke-width":a.borderWidth}:{},g=h.pointAttr[h.selected?"select":""]||a.pointAttr[""],j?(Ta(j),j.attr(i).attr(g)[b.pointCount<e?"animate":"attr"](C(f))):h.graphic=d[h.shapeType](f).attr(i).attr(g).add(h.group||a.group).shadow(c.shadow,null,c.stacking&&!c.borderRadius);else if(j)h.graphic=j.destroy()})},animate:function(a){var b=this,
c=this.yAxis,d=b.options,e=this.chart.inverted,f={};if(ja)a?(f.scaleY=0.001,a=E(c.pos+c.len,v(c.pos,c.toPixels(d.threshold))),e?f.translateX=a-c.len:f.translateY=a,b.group.attr(f)):(f[e?"translateX":"translateY"]=c.pos,b.group.animate(f,x(hb(b.options.animation),{step:function(a,c){b.group.attr({scaleY:c.pos})}})),b.animate=null)},remove:function(){var a=this,b=a.chart;b.hasRendered&&n(b.series,function(b){if(b.type===a.type)b.isDirty=!0});Q.prototype.remove.apply(a,arguments)}});K.column=Ia;W.bar=
C(W.column);za=la(Ia,{type:"bar",inverted:!0});K.bar=za;W.scatter=C(ca,{lineWidth:0,marker:{enabled:!0},tooltip:{headerFormat:'<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px;"> {series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}});za=la(Q,{type:"scatter",sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,kdDimensions:2,drawGraph:function(){this.options.lineWidth&&
Q.prototype.drawGraph.call(this)}});K.scatter=za;W.pie=C(ca,{borderColor:"#FFFFFF",borderWidth:1,center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.y===null?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,states:{hover:{brightness:0.1,shadow:!1}},stickyTracking:!1,tooltip:{followPointer:!0}});ca={type:"pie",isCartesian:!1,pointClass:la(Ha,{init:function(){Ha.prototype.init.apply(this,
arguments);var a=this,b;a.name=q(a.name,"Slice");b=function(b){a.slice(b.type==="select")};D(a,"select",b);D(a,"unselect",b);return a},setVisible:function(a,b){var c=this,d=c.series,e=d.chart,f=d.options.ignoreHiddenPoint,b=q(b,f);if(a!==c.visible){c.visible=c.options.visible=a=a===t?!c.visible:a;d.options.data[sa(c,d.data)]=c.options;n(["graphic","dataLabel","connector","shadowGroup"],function(b){if(c[b])c[b][a?"show":"hide"](!0)});c.legendItem&&e.legend.colorizeItem(c,a);!a&&c.state==="hover"&&
c.setState("");if(f)d.isDirty=!0;b&&e.redraw()}},slice:function(a,b,c){var d=this.series;ab(c,d.chart);q(b,!0);this.sliced=this.options.sliced=a=s(a)?a:!this.sliced;d.options.data[sa(this,d.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)},haloPath:function(a){var b=this.shapeArgs,c=this.series.chart;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.plotLeft+b.x,c.plotTop+b.y,
b.r+a,b.r+a,{innerR:this.shapeArgs.r,start:b.start,end:b.end})}}),requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color"},animate:function(a){var b=this,c=b.points,d=b.startAngleRad;if(!a)n(c,function(a){var c=a.graphic,g=a.shapeArgs;c&&(c.attr({r:a.startR||b.center[3]/2,start:d,end:d}),c.animate({r:g.r,start:g.start,end:g.end},b.options.animation))}),b.animate=null},
updateTotals:function(){var a,b=0,c=this.points,d=c.length,e,f=this.options.ignoreHiddenPoint;for(a=0;a<d;a++)e=c[a],b+=f&&!e.visible?0:e.y;this.total=b;for(a=0;a<d;a++)e=c[a],e.percentage=b>0&&(e.visible||!f)?e.y/b*100:0,e.total=b},generatePoints:function(){Q.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var b=0,c=this.options,d=c.slicedOffset,e=d+c.borderWidth,f,g,h,i=c.startAngle||0,j=this.startAngleRad=Ba/180*(i-90),i=(this.endAngleRad=Ba/
180*(q(c.endAngle,i+360)-90))-j,k=this.points,l=c.dataLabels.distance,c=c.ignoreHiddenPoint,m,o=k.length,p;if(!a)this.center=a=this.getCenter();this.getX=function(b,c){h=Y.asin(E((b-a[1])/(a[2]/2+l),1));return a[0]+(c?-1:1)*ba(h)*(a[2]/2+l)};for(m=0;m<o;m++){p=k[m];f=j+b*i;if(!c||p.visible)b+=p.percentage/100;g=j+b*i;p.shapeType="arc";p.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:y(f*1E3)/1E3,end:y(g*1E3)/1E3};h=(g+f)/2;h>1.5*Ba?h-=2*Ba:h<-Ba/2&&(h+=2*Ba);p.slicedTranslation={translateX:y(ba(h)*
d),translateY:y(ka(h)*d)};f=ba(h)*a[2]/2;g=ka(h)*a[2]/2;p.tooltipPos=[a[0]+f*0.7,a[1]+g*0.7];p.half=h<-Ba/2||h>Ba/2?1:0;p.angle=h;e=E(e,l/2);p.labelPos=[a[0]+f+ba(h)*l,a[1]+g+ka(h)*l,a[0]+f+ba(h)*e,a[1]+g+ka(h)*e,a[0]+f,a[1]+g,l<0?"center":p.half?"right":"left",h]}},drawGraph:null,drawPoints:function(){var a=this,b=a.chart.renderer,c,d,e=a.options.shadow,f,g,h,i;if(e&&!a.shadowGroup)a.shadowGroup=b.g("shadow").add(a.group);n(a.points,function(j){if(j.y!==null){d=j.graphic;h=j.shapeArgs;f=j.shadowGroup;
g=j.pointAttr[j.selected?"select":""];if(!g.stroke)g.stroke=g.fill;if(e&&!f)f=j.shadowGroup=b.g("shadow").add(a.shadowGroup);c=j.sliced?j.slicedTranslation:{translateX:0,translateY:0};f&&f.attr(c);if(d)d.setRadialReference(a.center).attr(g).animate(x(h,c));else{i={"stroke-linejoin":"round"};if(!j.visible)i.visibility="hidden";j.graphic=d=b[j.shapeType](h).setRadialReference(a.center).attr(g).attr(i).attr(c).add(a.group).shadow(e,f)}}})},searchPoint:ra,sortByAngle:function(a,b){a.sort(function(a,d){return a.angle!==
void 0&&(d.angle-a.angle)*b})},drawLegendSymbol:aa.drawRectangle,getCenter:bc.getCenter,getSymbol:ra};ca=la(Q,ca);K.pie=ca;Q.prototype.drawDataLabels=function(){var a=this,b=a.options,c=b.cursor,d=b.dataLabels,e=a.points,f,g,h=a.hasRendered||0,i,j,k=q(d.defer,!0),l=a.chart.renderer;if(d.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(d),j=a.plotGroup("dataLabelsGroup","data-labels",k&&!h?"hidden":"visible",d.zIndex||6),k&&(j.attr({opacity:+h}),h||D(a,"afterAnimate",function(){a.visible&&
j.show();j[b.animation?"animate":"attr"]({opacity:1},{duration:200})})),g=d,n(e,function(e){var h,k=e.dataLabel,r,n,P=e.connector,u=!0,w,v={};f=e.dlOptions||e.options&&e.options.dataLabels;h=q(f&&f.enabled,g.enabled)&&e.y!==null;if(k&&!h)e.dataLabel=k.destroy();else if(h){d=C(g,f);w=d.style;h=d.rotation;r=e.getLabelConfig();i=d.format?La(d.format,r):d.formatter.call(r,d);w.color=q(d.color,w.color,a.color,"black");if(k)if(s(i))k.attr({text:i}),u=!1;else{if(e.dataLabel=k=k.destroy(),P)e.connector=P.destroy()}else if(s(i)){k=
{fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":d.borderWidth,r:d.borderRadius||0,rotation:h,padding:d.padding,zIndex:1};if(w.color==="contrast")v.color=d.inside||d.distance<0||b.stacking?l.getContrast(e.color||a.color):"#000000";if(c)v.cursor=c;for(n in k)k[n]===t&&delete k[n];k=e.dataLabel=l[h?"text":"label"](i,0,-9999,d.shape,null,null,d.useHTML).attr(k).css(x(w,v)).add(j).shadow(d.shadow)}k&&a.alignDataLabel(e,k,d,null,u)}})};Q.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart,
g=f.inverted,h=q(a.plotX,-9999),i=q(a.plotY,-9999),j=b.getBBox(),k=f.renderer.fontMetrics(c.style.fontSize).b,l=c.rotation,m=c.align,o=this.visible&&(a.series.forceDL||f.isInsidePlot(h,y(i),g)||d&&f.isInsidePlot(h,g?d.x+1:d.y+d.height-1,g)),p=q(c.overflow,"justify")==="justify";if(o)d=x({x:g?f.plotWidth-i:h,y:y(g?f.plotHeight-h:i),width:0,height:0},d),x(c,{width:j.width,height:j.height}),l?(p=!1,g=f.renderer.rotCorr(k,l),g={x:d.x+c.x+d.width/2+g.x,y:d.y+c.y+d.height/2},b[e?"attr":"animate"](g).attr({align:c.align}),
h=(l+720)%360,h=h>180&&h<360,m==="left"?g.y-=h?j.height:0:m==="center"?(g.x-=j.width/2,g.y-=j.height/2):m==="right"&&(g.x-=j.width,g.y-=h?0:j.height)):(b.align(c,null,d),g=b.alignAttr),p?this.justifyDataLabel(b,c,g,j,d,e):q(c.crop,!0)&&(o=f.isInsidePlot(g.x,g.y)&&f.isInsidePlot(g.x+j.width,g.y+j.height)),c.shape&&!l&&b.attr({anchorX:a.plotX,anchorY:a.plotY});if(!o)Ta(b),b.attr({y:-9999}),b.placed=!1};Q.prototype.justifyDataLabel=function(a,b,c,d,e,f){var g=this.chart,h=b.align,i=b.verticalAlign,j,
k,l=a.box?0:a.padding||0;j=c.x+l;if(j<0)h==="right"?b.align="left":b.x=-j,k=!0;j=c.x+d.width-l;if(j>g.plotWidth)h==="left"?b.align="right":b.x=g.plotWidth-j,k=!0;j=c.y+l;if(j<0)i==="bottom"?b.verticalAlign="top":b.y=-j,k=!0;j=c.y+d.height-l;if(j>g.plotHeight)i==="top"?b.verticalAlign="bottom":b.y=g.plotHeight-j,k=!0;if(k)a.placed=!f,a.align(b,null,e)};if(K.pie)K.pie.prototype.drawDataLabels=function(){var a=this,b=a.data,c,d=a.chart,e=a.options.dataLabels,f=q(e.connectorPadding,10),g=q(e.connectorWidth,
1),h=d.plotWidth,i=d.plotHeight,j,k,l=q(e.softConnector,!0),m=e.distance,o=a.center,p=o[2]/2,r=o[1],A=m>0,s,u,w,t=[[],[]],x,z,C,B,L,D=[0,0,0,0],J=function(a,b){return b.y-a.y};if(a.visible&&(e.enabled||a._hasPointLabels)){Q.prototype.drawDataLabels.apply(a);n(b,function(a){if(a.dataLabel&&a.visible)t[a.half].push(a),a.dataLabel._pos=null});for(B=2;B--;){var G=[],K=[],I=t[B],F=I.length,H;if(F){a.sortByAngle(I,B-0.5);for(L=b=0;!b&&I[L];)b=I[L]&&I[L].dataLabel&&(I[L].dataLabel.getBBox().height||21),
L++;if(m>0){u=E(r+p+m,d.plotHeight);for(L=v(0,r-p-m);L<=u;L+=b)G.push(L);u=G.length;if(F>u){c=[].concat(I);c.sort(J);for(L=F;L--;)c[L].rank=L;for(L=F;L--;)I[L].rank>=u&&I.splice(L,1);F=I.length}for(L=0;L<F;L++){c=I[L];w=c.labelPos;c=9999;var M,N;for(N=0;N<u;N++)M=S(G[N]-w[1]),M<c&&(c=M,H=N);if(H<L&&G[L]!==null)H=L;else for(u<F-L+H&&G[L]!==null&&(H=u-F+L);G[H]===null;)H++;K.push({i:H,y:G[H]});G[H]=null}K.sort(J)}for(L=0;L<F;L++){c=I[L];w=c.labelPos;s=c.dataLabel;C=c.visible===!1?"hidden":"inherit";
c=w[1];if(m>0){if(u=K.pop(),H=u.i,z=u.y,c>z&&G[H+1]!==null||c<z&&G[H-1]!==null)z=E(v(0,c),d.plotHeight)}else z=c;x=e.justify?o[0]+(B?-1:1)*(p+m):a.getX(z===r-p-m||z===r+p+m?c:z,B);s._attr={visibility:C,align:w[6]};s._pos={x:x+e.x+({left:f,right:-f}[w[6]]||0),y:z+e.y-10};s.connX=x;s.connY=z;if(this.options.size===null)u=s.width,x-u<f?D[3]=v(y(u-x+f),D[3]):x+u>h-f&&(D[1]=v(y(x+u-h+f),D[1])),z-b/2<0?D[0]=v(y(-z+b/2),D[0]):z+b/2>i&&(D[2]=v(y(z+b/2-i),D[2]))}}}if(Ea(D)===0||this.verifyDataLabelOverflow(D))this.placeDataLabels(),
A&&g&&n(this.points,function(b){j=b.connector;w=b.labelPos;if((s=b.dataLabel)&&s._pos&&b.visible)C=s._attr.visibility,x=s.connX,z=s.connY,k=l?["M",x+(w[6]==="left"?5:-5),z,"C",x,z,2*w[2]-w[4],2*w[3]-w[5],w[2],w[3],"L",w[4],w[5]]:["M",x+(w[6]==="left"?5:-5),z,"L",w[2],w[3],"L",w[4],w[5]],j?(j.animate({d:k}),j.attr("visibility",C)):b.connector=j=a.chart.renderer.path(k).attr({"stroke-width":g,stroke:e.connectorColor||b.color||"#606060",visibility:C}).add(a.dataLabelsGroup);else if(j)b.connector=j.destroy()})}},
K.pie.prototype.placeDataLabels=function(){n(this.points,function(a){var b=a.dataLabel;if(b&&a.visible)(a=b._pos)?(b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999})})},K.pie.prototype.alignDataLabel=ra,K.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,d=c.center,e=c.minSize||80,f=e,g;d[0]!==null?f=v(b[2]-v(a[1],a[3]),e):(f=v(b[2]-a[1]-a[3],e),b[0]+=(a[3]-a[1])/2);d[1]!==null?f=v(E(f,b[2]-v(a[0],a[2])),e):(f=v(E(f,b[2]-a[0]-a[2]),e),
b[1]+=(a[0]-a[2])/2);f<b[2]?(b[2]=f,b[3]=Math.min(/%$/.test(c.innerSize||0)?f*parseFloat(c.innerSize||0)/100:parseFloat(c.innerSize||0),f),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):g=!0;return g};if(K.column)K.column.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart.inverted,g=a.series,h=a.dlBox||a.shapeArgs,i=q(a.below,a.plotY>q(this.translatedThreshold,g.yAxis.len)),j=q(c.inside,!!this.options.stacking);if(h){d=C(h);if(d.y<0)d.height+=d.y,d.y=0;h=d.y+d.height-g.yAxis.len;
h>0&&(d.height-=h);f&&(d={x:g.yAxis.len-d.y-d.height,y:g.xAxis.len-d.x-d.width,width:d.height,height:d.width});if(!j)f?(d.x+=i?0:d.width,d.width=0):(d.y+=i?d.height:0,d.height=0)}c.align=q(c.align,!f||j?"center":i?"right":"left");c.verticalAlign=q(c.verticalAlign,f||j?"middle":i?"top":"bottom");Q.prototype.alignDataLabel.call(this,a,b,c,d,e)};(function(a){var b=a.Chart,c=a.each,d=a.pick,e=a.addEvent;b.prototype.callbacks.push(function(a){function b(){var e=[];c(a.series,function(a){var b=a.options.dataLabels,
f=a.dataLabelCollections||["dataLabel"];(b.enabled||a._hasPointLabels)&&!b.allowOverlap&&a.visible&&c(f,function(b){c(a.points,function(a){if(a[b])a[b].labelrank=d(a.labelrank,a.shapeArgs&&a.shapeArgs.height),e.push(a[b])})})});a.hideOverlappingLabels(e)}b();e(a,"redraw",b)});b.prototype.hideOverlappingLabels=function(a){var b=a.length,d,e,j,k,l,m,o,p,n;for(e=0;e<b;e++)if(d=a[e])d.oldOpacity=d.opacity,d.newOpacity=1;a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(e=0;e<b;e++){j=
a[e];for(d=e+1;d<b;++d)if(k=a[d],j&&k&&j.placed&&k.placed&&j.newOpacity!==0&&k.newOpacity!==0&&(l=j.alignAttr,m=k.alignAttr,o=j.parentGroup,p=k.parentGroup,n=2*(j.box?0:j.padding),l=!(m.x+p.translateX>l.x+o.translateX+(j.width-n)||m.x+p.translateX+(k.width-n)<l.x+o.translateX||m.y+p.translateY>l.y+o.translateY+(j.height-n)||m.y+p.translateY+(k.height-n)<l.y+o.translateY)))(j.labelrank<k.labelrank?j:k).newOpacity=0}c(a,function(a){var b,c;if(a){c=a.newOpacity;if(a.oldOpacity!==c&&a.placed)c?a.show(!0):
b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b);a.isOld=!0}})}})(z);var nb=z.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,d=a.options.cursor,e=d&&{cursor:d},f=function(a){for(var c=a.target,d;c&&!d;)d=c.point,c=c.parentNode;if(d!==t&&d!==b.hoverPoint)d.onMouseOver(a)};n(a.points,function(a){if(a.graphic)a.graphic.element.point=a;if(a.dataLabel)a.dataLabel.element.point=a});if(!a._hasTracking)n(a.trackerGroups,function(b){if(a[b]&&
(a[b].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){c.onTrackerMouseOut(a)}).css(e),db))a[b].on("touchstart",f)}),a._hasTracking=!0},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,g=f.pointer,h=f.renderer,i=f.options.tooltip.snap,j=a.tracker,k=b.cursor,l=k&&{cursor:k},m=function(){if(f.hoverSeries!==a)a.onMouseOver()},o="rgba(192,192,192,"+(ja?1.0E-4:0.002)+")";if(e&&!c)for(k=e+1;k--;)d[k]===
"M"&&d.splice(k+1,0,d[k+1]-i,d[k+2],"L"),(k&&d[k]==="M"||k===e)&&d.splice(k,0,"L",d[k-2]+i,d[k-1]);j?j.attr({d:d}):(a.tracker=h.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:o,fill:c?o:"none","stroke-width":b.lineWidth+(c?0:2*i),zIndex:2}).add(a.group),n([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",m).on("mouseout",function(a){g.onTrackerMouseOut(a)}).css(l);if(db)a.on("touchstart",m)}))}};if(K.column)Ia.prototype.drawTracker=
nb.drawTrackerPoint;if(K.pie)K.pie.prototype.drawTracker=nb.drawTrackerPoint;if(K.scatter)za.prototype.drawTracker=nb.drawTrackerPoint;x(vb.prototype,{setItemEvents:function(a,b,c,d,e){var f=this;(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");b.css(f.options.itemHoverStyle)}).on("mouseout",function(){b.css(a.visible?d:e);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()},b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):
M(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=ea("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);D(a.checkbox,"click",function(b){M(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});N.legend.itemStyle.cursor="pointer";x(Ca.prototype,{showResetZoom:function(){var a=this,b=N.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f=c.relativeTo==="chart"?
null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).add().align(c.position,!1,f)},zoomOut:function(){var a=this;M(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?n(this.axes,function(a){b=a.zoom()}):n(a.xAxis.concat(a.yAxis),function(a){var e=a.axis,h=e.isXAxis;if(c[h?"zoomX":"zoomY"]||c[h?"pinchX":"pinchY"])b=
e.zoom(a.min,a.max),e.displayBtn&&(d=!0)});e=this.resetZoomButton;if(d&&!e)this.showResetZoom();else if(!d&&da(e))this.resetZoomButton=e.destroy();b&&this.redraw(q(this.options.chart.animation,a&&a.animation,this.pointCount<100))},pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&n(d,function(a){a.setState()});n(b==="xy"?[1,0]:[1],function(b){var b=c[b?"xAxis":"yAxis"][0],d=b.horiz,h=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",i=c[d],j=(b.pointRange||0)/2,k=b.getExtremes(),l=b.toValue(i-
h,!0)+j,j=b.toValue(i+b.len-h,!0)-j,i=i>h;if(b.series.length&&(i||l>E(k.dataMin,k.min))&&(!i||j<v(k.dataMax,k.max)))b.setExtremes(l,j,!1,!1,{trigger:"pan"}),e=!0;c[d]=h});e&&c.redraw(!1);F(c.container,{cursor:"move"})}});x(Ha.prototype,{select:function(a,b){var c=this,d=c.series,e=d.chart,a=q(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[sa(c,d.data)]=c.options;c.setState(a&&"select");b||n(e.getSelectedPoints(),function(a){if(a.selected&&
a!==c)a.selected=a.options.selected=!1,d.options.data[sa(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect")})})},onMouseOver:function(a,b){var c=this.series,d=c.chart,e=d.tooltip,f=d.hoverPoint;if(d.hoverSeries!==c)c.onMouseOver();if(f&&f!==this)f.onMouseOut();if(this.series&&(this.firePointEvent("mouseOver"),e&&(!e.shared||c.noSharedTooltip)&&e.refresh(this,a),this.setState("hover"),!b))d.hoverPoint=this},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;this.firePointEvent("mouseOut");
if(!b||sa(this,b)===-1)this.setState(),a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var a=C(this.series.options.point,this.options).events,b;this.events=a;for(b in a)D(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a,b){var c=V(this.plotX),d=this.plotY,e=this.series,f=e.options.states,g=W[e.type].marker&&e.options.marker,h=g&&!g.enabled,i=g&&g.states[a],j=i&&i.enabled===!1,k=e.stateMarkerGraphic,l=this.marker||{},m=e.chart,o=e.halo,p,a=a||"";p=this.pointAttr[a]||
e.pointAttr[a];if(!(a===this.state&&!b||this.selected&&a!=="select"||f[a]&&f[a].enabled===!1||a&&(j||h&&i.enabled===!1)||a&&l.states&&l.states[a]&&l.states[a].enabled===!1)){if(this.graphic)g=g&&this.graphic.symbolName&&p.r,this.graphic.attr(C(p,g?{x:c-g,y:d-g,width:2*g,height:2*g}:{})),k&&k.hide();else{if(a&&i)if(g=i.radius,l=l.symbol||e.symbol,k&&k.currentSymbol!==l&&(k=k.destroy()),k)k[b?"animate":"attr"]({x:c-g,y:d-g});else if(l)e.stateMarkerGraphic=k=m.renderer.symbol(l,c-g,d-g,2*g,2*g).attr(p).add(e.markerGroup),
k.currentSymbol=l;if(k)k[a&&m.isInsidePlot(c,d,m.inverted)?"show":"hide"](),k.element.point=this}if((c=f[a]&&f[a].halo)&&c.size){if(!o)e.halo=o=m.renderer.path().add(m.seriesGroup);o.attr(x({fill:this.color||e.color,"fill-opacity":c.opacity,zIndex:-1},c.attributes))[b?"animate":"attr"]({d:this.haloPath(c.size)})}else o&&o.attr({d:[]});this.state=a}},haloPath:function(a){var b=this.series,c=b.chart,d=b.getPlotBox(),e=c.inverted,f=Math.floor(this.plotX);return c.renderer.symbols.circle(d.translateX+
(e?b.yAxis.len-this.plotY:f)-a,d.translateY+(e?b.xAxis.len-f:this.plotY)-a,a*2,a*2)}});x(Q.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&M(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&M(this,"mouseOut");c&&!a.stickyTracking&&(!c.shared||this.noSharedTooltip)&&
c.hide();this.setState()},setState:function(a){var b=this.options,c=this.graph,d=b.states,e=b.lineWidth,b=0,a=a||"";if(this.state!==a&&(this.state=a,!(d[a]&&d[a].enabled===!1)&&(a&&(e=d[a].lineWidth||e+(d[a].lineWidthPlus||0)),c&&!c.dashstyle))){a={"stroke-width":e};for(c.attr(a);this["zoneGraph"+b];)this["zoneGraph"+b].attr(a),b+=1}},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,h=c.visible;f=(c.visible=a=c.userOptions.visible=a===t?!h:a)?"show":
"hide";n(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&n(d.series,function(a){if(a.options.stacking&&a.visible)a.isDirty=!0});n(c.linkedSeries,function(b){b.setVisible(a,!1)});if(g)d.isDirtyBox=!0;b!==!1&&d.redraw();M(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=
a=a===t?!this.selected:a;if(this.checkbox)this.checkbox.checked=a;M(this,a?"select":"unselect")},drawTracker:nb.drawTrackerGraph});U(Q.prototype,"init",function(a){var b;a.apply(this,Array.prototype.slice.call(arguments,1));(b=this.xAxis)&&b.options.ordinal&&D(this,"updatedData",function(){delete b.ordinalIndex})});U(I.prototype,"getTimeTicks",function(a,b,c,d,e,f,g,h){var i=0,j,k,l={},m,o,p,n=[],q=-Number.MAX_VALUE,v=this.options.tickPixelInterval;if(!this.options.ordinal&&!this.options.breaks||
!f||f.length<3||c===t)return a.call(this,b,c,d,e);o=f.length;for(j=0;j<o;j++){p=j&&f[j-1]>d;f[j]<c&&(i=j);if(j===o-1||f[j+1]-f[j]>g*5||p){if(f[j]>q){for(k=a.call(this,b,f[i],f[j],e);k.length&&k[0]<=q;)k.shift();k.length&&(q=k[k.length-1]);n=n.concat(k)}i=j+1}if(p)break}a=k.info;if(h&&a.unitRange<=H.hour){j=n.length-1;for(i=1;i<j;i++)ma("%d",n[i])!==ma("%d",n[i-1])&&(l[n[i]]="day",m=!0);m&&(l[n[0]]="day");a.higherRanks=l}n.info=a;if(h&&s(v)){h=a=n.length;j=[];var u;for(m=[];h--;)i=this.translate(n[h]),
u&&(m[h]=u-i),j[h]=u=i;m.sort();m=m[V(m.length/2)];m<v*0.6&&(m=null);h=n[a-1]>d?a-1:a;for(u=void 0;h--;)i=j[h],d=u-i,u&&d<v*0.8&&(m===null||d<m*0.8)?(l[n[h]]&&!l[n[h+1]]?(d=h+1,u=i):d=h,n.splice(d,1)):u=i}return n});x(I.prototype,{beforeSetTickPositions:function(){var a,b=[],c=!1,d,e=this.getExtremes(),f=e.min,g=e.max,h,i=this.isXAxis&&!!this.options.breaks;if((e=this.options.ordinal)||i){n(this.series,function(c,d){if(c.visible!==!1&&(c.takeOrdinalPosition!==!1||i))if(b=b.concat(c.processedXData),
a=b.length,b.sort(function(a,b){return a-b}),a)for(d=a-1;d--;)b[d]===b[d+1]&&b.splice(d,1)});a=b.length;if(a>2){d=b[1]-b[0];for(h=a-1;h--&&!c;)b[h+1]-b[h]!==d&&(c=!0);if(!this.options.keepOrdinalPadding&&(b[0]-f>d||g-b[b.length-1]>d))c=!0}c?(this.ordinalPositions=b,d=this.val2lin(v(f,b[0]),!0),h=v(this.val2lin(E(g,b[b.length-1]),!0),1),this.ordinalSlope=g=(g-f)/(h-d),this.ordinalOffset=f-d*g):this.ordinalPositions=this.ordinalSlope=this.ordinalOffset=t}this.isOrdinal=e&&c;this.groupIntervalFactor=
null},val2lin:function(a,b){var c=this.ordinalPositions,d;if(c){var e=c.length,f;for(d=e;d--;)if(c[d]===a){f=d;break}for(d=e-1;d--;)if(a>c[d]||d===0){c=(a-c[d])/(c[d+1]-c[d]);f=d+c;break}d=b?f:this.ordinalSlope*(f||0)+this.ordinalOffset}else d=a;return d},lin2val:function(a,b){var c=this.ordinalPositions;if(c){var d=this.ordinalSlope,e=this.ordinalOffset,f=c.length-1,g,h;if(b)a<0?a=c[0]:a>f?a=c[f]:(f=V(a),h=a-f);else for(;f--;)if(g=d*f+e,a>=g){d=d*(f+1)+e;h=(a-g)/(d-g);break}c=h!==t&&c[f]!==t?c[f]+
(h?h*(c[f+1]-c[f]):0):a}else c=a;return c},getExtendedPositions:function(){var a=this.chart,b=this.series[0].currentDataGrouping,c=this.ordinalIndex,d=b?b.count+b.unitName:"raw",e=this.getExtremes(),f,g;if(!c)c=this.ordinalIndex={};if(!c[d])f={series:[],getExtremes:function(){return{min:e.dataMin,max:e.dataMax}},options:{ordinal:!0},val2lin:I.prototype.val2lin},n(this.series,function(c){g={xAxis:f,xData:c.xData,chart:a,destroyGroupedData:ra};g.options={dataGrouping:b?{enabled:!0,forced:!0,approximation:"open",
units:[[b.unitName,[b.count]]]}:{enabled:!1}};c.processData.apply(g);f.series.push(g)}),this.beforeSetTickPositions.apply(f),c[d]=f.ordinalPositions;return c[d]},getGroupIntervalFactor:function(a,b,c){var d,c=c.processedXData,e=c.length,f=[];d=this.groupIntervalFactor;if(!d){for(d=0;d<e-1;d++)f[d]=c[d+1]-c[d];f.sort(function(a,b){return a-b});f=f[V(e/2)];a=v(a,c[0]);b=E(b,c[e-1]);this.groupIntervalFactor=d=e*f/(b-a)}return d},postProcessTickInterval:function(a){var b=this.ordinalSlope;return b?this.options.breaks?
this.closestPointRange:a/(b/this.closestPointRange):a}});U(Ca.prototype,"pan",function(a,b){var c=this.xAxis[0],d=b.chartX,e=!1;if(c.options.ordinal&&c.series.length){var f=this.mouseDownX,g=c.getExtremes(),h=g.dataMax,i=g.min,j=g.max,k=this.hoverPoints,l=c.closestPointRange,f=(f-d)/(c.translationSlope*(c.ordinalSlope||l)),m={ordinalPositions:c.getExtendedPositions()},l=c.lin2val,o=c.val2lin,p;if(m.ordinalPositions){if(S(f)>1)k&&n(k,function(a){a.setState()}),f<0?(k=m,p=c.ordinalPositions?c:m):(k=
c.ordinalPositions?c:m,p=m),m=p.ordinalPositions,h>m[m.length-1]&&m.push(h),this.fixedRange=j-i,f=c.toFixedRange(null,null,l.apply(k,[o.apply(k,[i,!0])+f,!0]),l.apply(p,[o.apply(p,[j,!0])+f,!0])),f.min>=E(g.dataMin,i)&&f.max<=v(h,j)&&c.setExtremes(f.min,f.max,!0,!1,{trigger:"pan"}),this.mouseDownX=d,F(this.container,{cursor:"move"})}else e=!0}else e=!0;e&&a.apply(this,Array.prototype.slice.call(arguments,1))});Q.prototype.gappedPath=function(){var a=this.options.gapSize,b=this.points.slice(),c=b.length-
1;if(a&&c>0)for(;c--;)b[c+1].x-b[c].x>this.closestPointRange*a&&b.splice(c+1,0,{isNull:!0});return this.getGraphPath(b)};(function(a){a(z)})(function(a){function b(){return Array.prototype.slice.call(arguments,1)}function c(a){a.apply(this);this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,d(this.pointArrayMap,["y"]))}var d=a.pick,e=a.wrap,f=a.each,g=a.extend,h=a.fireEvent,i=a.Axis,j=a.Series;g(i.prototype,{isInBreak:function(a,b){var c=a.repeat||Infinity,d=a.from,e=a.to-a.from,c=b>=d?
(b-d)%c:c-(d-b)%c;return a.inclusive?c<=e:c<e&&c!==0},isInAnyBreak:function(a,b){var c=this.options.breaks,e=c&&c.length,f,g,h;if(e){for(;e--;)this.isInBreak(c[e],a)&&(f=!0,g||(g=d(c[e].showPoints,this.isXAxis?!1:!0)));h=f&&b?f&&!g:f}return h}});e(i.prototype,"setTickPositions",function(a){a.apply(this,Array.prototype.slice.call(arguments,1));if(this.options.breaks){var b=this.tickPositions,c=this.tickPositions.info,d=[],e;for(e=0;e<b.length;e++)this.isInAnyBreak(b[e])||d.push(b[e]);this.tickPositions=
d;this.tickPositions.info=c}});e(i.prototype,"init",function(a,b,c){if(c.breaks&&c.breaks.length)c.ordinal=!1;a.call(this,b,c);if(this.options.breaks){var d=this;d.isBroken=!0;this.val2lin=function(a){var b=a,c,e;for(e=0;e<d.breakArray.length;e++)if(c=d.breakArray[e],c.to<=a)b-=c.len;else if(c.from>=a)break;else if(d.isInBreak(c,a)){b-=a-c.from;break}return b};this.lin2val=function(a){var b,c;for(c=0;c<d.breakArray.length;c++)if(b=d.breakArray[c],b.from>=a)break;else b.to<a?a+=b.len:d.isInBreak(b,
a)&&(a+=b.len);return a};this.setExtremes=function(a,b,c,d,e){for(;this.isInAnyBreak(a);)a-=this.closestPointRange;for(;this.isInAnyBreak(b);)b-=this.closestPointRange;i.prototype.setExtremes.call(this,a,b,c,d,e)};this.setAxisTranslation=function(a){i.prototype.setAxisTranslation.call(this,a);var b=d.options.breaks,a=[],c=[],e=0,f,g,k=d.userMin||d.min,j=d.userMax||d.max,l,m;for(m in b)g=b[m],f=g.repeat||Infinity,d.isInBreak(g,k)&&(k+=g.to%f-k%f),d.isInBreak(g,j)&&(j-=j%f-g.from%f);for(m in b){g=b[m];
l=g.from;for(f=g.repeat||Infinity;l-f>k;)l-=f;for(;l<k;)l+=f;for(;l<j;l+=f)a.push({value:l,move:"in"}),a.push({value:l+(g.to-g.from),move:"out",size:g.breakSize})}a.sort(function(a,b){return a.value===b.value?(a.move==="in"?0:1)-(b.move==="in"?0:1):a.value-b.value});b=0;l=k;for(m in a){g=a[m];b+=g.move==="in"?1:-1;if(b===1&&g.move==="in")l=g.value;b===0&&(c.push({from:l,to:g.value,len:g.value-l-(g.size||0)}),e+=g.value-l-(g.size||0))}d.breakArray=c;h(d,"afterBreaks");d.transA*=(j-d.min)/(j-k-e);d.min=
k;d.max=j}}});e(j.prototype,"generatePoints",function(a){a.apply(this,b(arguments));var c=this.xAxis,d=this.yAxis,e=this.points,f,g=e.length,h=this.options.connectNulls,i;if(c&&d&&(c.options.breaks||d.options.breaks))for(;g--;)if(f=e[g],i=f.y===null&&h===!1,!i&&(c.isInAnyBreak(f.x,!0)||d.isInAnyBreak(f.y,!0)))e.splice(g,1),this.data[g]&&this.data[g].destroyElements()});a.Series.prototype.drawBreaks=function(a,b){var c=this,e=c.points,g,i,j,n;f(b,function(b){g=a.breakArray||[];i=a.isXAxis?a.min:d(c.options.threshold,
a.min);f(e,function(c){n=d(c["stack"+b.toUpperCase()],c[b]);f(g,function(b){j=!1;if(i<b.from&&n>b.to||i>b.from&&n<b.from)j="pointBreak";else if(i<b.from&&n>b.from&&n<b.to||i>b.from&&n>b.to&&n<b.from)j="pointInBreak";j&&h(a,j,{point:c,brk:b})})})})};e(a.seriesTypes.column.prototype,"drawPoints",c);e(a.Series.prototype,"drawPoints",c)});var ia=Q.prototype,cc=ia.processData,dc=ia.generatePoints,ec=ia.destroy,fc={approximation:"average",groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L",
"%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"],minute:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],hour:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],week:["Week from %A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},Xb={line:{},spline:{},area:{},areaspline:{},column:{approximation:"sum",groupPixelWidth:10},arearange:{approximation:"range"},
areasplinerange:{approximation:"range"},columnrange:{approximation:"range",groupPixelWidth:10},candlestick:{approximation:"ohlc",groupPixelWidth:10},ohlc:{approximation:"ohlc",groupPixelWidth:5}},Yb=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",null]],Ua={sum:function(a){var b=a.length,c;if(!b&&a.hasNulls)c=null;else if(b)for(c=0;b--;)c+=a[b];return c},average:function(a){var b=
a.length,a=Ua.sum(a);typeof a==="number"&&b&&(a/=b);return a},open:function(a){return a.length?a[0]:a.hasNulls?null:t},high:function(a){return a.length?Ea(a):a.hasNulls?null:t},low:function(a){return a.length?Oa(a):a.hasNulls?null:t},close:function(a){return a.length?a[a.length-1]:a.hasNulls?null:t},ohlc:function(a,b,c,d){a=Ua.open(a);b=Ua.high(b);c=Ua.low(c);d=Ua.close(d);if(typeof a==="number"||typeof b==="number"||typeof c==="number"||typeof d==="number")return[a,b,c,d]},range:function(a,b){a=
Ua.low(a);b=Ua.high(b);if(typeof a==="number"||typeof b==="number")return[a,b]}};ia.groupData=function(a,b,c,d){var e=this.data,f=this.options.data,g=[],h=[],i=[],j=a.length,k,l,m=!!b,o=[[],[],[],[]],d=typeof d==="function"?d:Ua[d],p=this.pointArrayMap,n=p&&p.length,q,s=0;for(q=0;q<=j;q++)if(a[q]>=c[0])break;for(;q<=j;q++){for(;c[1]!==t&&a[q]>=c[1]||q===j;)if(k=c.shift(),l=d.apply(0,o),l!==t&&(g.push(k),h.push(l),i.push({start:s,length:o[0].length})),s=q,o[0]=[],o[1]=[],o[2]=[],o[3]=[],q===j)break;
if(q===j)break;if(p){k=this.cropStart+q;k=e&&e[k]||this.pointClass.prototype.applyOptions.apply({series:this},[f[k]]);var u;for(l=0;l<n;l++)if(u=k[p[l]],typeof u==="number")o[l].push(u);else if(u===null)o[l].hasNulls=!0}else if(k=m?b[q]:null,typeof k==="number")o[0].push(k);else if(k===null)o[0].hasNulls=!0}return[g,h,i]};ia.processData=function(){var a=this.chart,b=this.options.dataGrouping,c=this.allowDG!==!1&&b&&q(b.enabled,a.options._stock),d;this.forceCrop=c;this.groupPixelWidth=null;this.hasProcessed=
!0;if(cc.apply(this,arguments)!==!1&&c){this.destroyGroupedData();var e=this.processedXData,f=this.processedYData,g=a.plotSizeX,a=this.xAxis,h=a.options.ordinal,i=this.groupPixelWidth=a.getGroupPixelWidth&&a.getGroupPixelWidth();if(i){d=!0;this.points=null;var j=a.getExtremes(),c=j.min,j=j.max,h=h&&a.getGroupIntervalFactor(c,j,this)||1,g=i*(j-c)/g*h,i=a.getTimeTicks(a.normalizeTimeTickInterval(g,b.units||Yb),Math.min(c,e[0]),Math.max(j,e[e.length-1]),a.options.startOfWeek,e,this.closestPointRange),
e=ia.groupData.apply(this,[e,f,i,b.approximation]),f=e[0],h=e[1];if(b.smoothed){b=f.length-1;for(f[b]=Math.min(f[b],j);b--&&b>0;)f[b]+=g/2;f[0]=Math.max(f[0],c)}this.currentDataGrouping=i.info;this.closestPointRange=i.info.totalRange;this.groupMap=e[2];if(s(f[0])&&f[0]<a.dataMin){if(a.min===a.dataMin)a.min=f[0];a.dataMin=f[0]}this.processedXData=f;this.processedYData=h}else this.currentDataGrouping=this.groupMap=null;this.hasGroupedData=d}};ia.destroyGroupedData=function(){var a=this.groupedData;
n(a||[],function(b,c){b&&(a[c]=b.destroy?b.destroy():null)});this.groupedData=null};ia.generatePoints=function(){dc.apply(this);this.destroyGroupedData();this.groupedData=this.hasGroupedData?this.points:null};U(Lb.prototype,"tooltipFooterHeaderFormatter",function(a,b,c){var d=b.series,e=d.tooltipOptions,f=d.options.dataGrouping,g=e.xDateFormat,h,i=d.xAxis;return i&&i.options.type==="datetime"&&f&&ua(b.key)?(a=d.currentDataGrouping,f=f.dateTimeLabelFormats,a?(i=f[a.unitName],a.count===1?g=i[0]:(g=
i[1],h=i[2])):!g&&f&&(g=this.getXDateFormat(b,e,i)),g=ma(g,b.key),h&&(g+=ma(h,b.key+a.totalRange-1)),La(e[(c?"footer":"header")+"Format"],{point:x(b,{key:g}),series:d})):a.call(this,b,c)});ia.destroy=function(){for(var a=this.groupedData||[],b=a.length;b--;)a[b]&&a[b].destroy();ec.apply(this)};U(ia,"setOptions",function(a,b){var c=a.call(this,b),d=this.type,e=this.chart.options.plotOptions,f=W[d].dataGrouping;if(Xb[d])f||(f=C(fc,Xb[d])),c.dataGrouping=C(f,e.series&&e.series.dataGrouping,e[d].dataGrouping,
b.dataGrouping);if(this.chart.options._stock)this.requireSorting=!0;return c});U(I.prototype,"setScale",function(a){a.call(this);n(this.series,function(a){a.hasProcessed=!1})});I.prototype.getGroupPixelWidth=function(){var a=this.series,b=a.length,c,d=0,e=!1,f;for(c=b;c--;)(f=a[c].options.dataGrouping)&&(d=v(d,f.groupPixelWidth));for(c=b;c--;)if((f=a[c].options.dataGrouping)&&a[c].hasProcessed)if(b=(a[c].processedXData||a[c].data).length,a[c].groupPixelWidth||b>this.chart.plotSizeX/d||b&&f.forced)e=
!0;return e?d:0};I.prototype.setDataGrouping=function(a,b){var c,b=q(b,!0);a||(a={forced:!1,units:null});if(this instanceof I)for(c=this.series.length;c--;)this.series[c].update({dataGrouping:a},!1);else n(this.chart.options.series,function(b){b.dataGrouping=a},!1);b&&this.chart.redraw()};W.ohlc=C(W.column,{lineWidth:1,tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'},
states:{hover:{lineWidth:3}},threshold:null});ca=la(K.column,{type:"ohlc",pointArrayMap:["open","high","low","close"],toYData:function(a){return[a.open,a.high,a.low,a.close]},pointValKey:"high",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},upColorProp:"stroke",getAttribs:function(){K.column.prototype.getAttribs.apply(this,arguments);var a=this.options,b=a.states,a=a.upColor||this.color,c=C(this.pointAttr),d=this.upColorProp;c[""][d]=a;c.hover[d]=b.hover.upColor||a;c.select[d]=b.select.upColor||
a;n(this.points,function(a){if(a.open<a.close&&!a.options.color)a.pointAttr=c})},translate:function(){var a=this.yAxis;K.column.prototype.translate.apply(this);n(this.points,function(b){if(b.open!==null)b.plotOpen=a.translate(b.open,0,1,0,1);if(b.close!==null)b.plotClose=a.translate(b.close,0,1,0,1)})},drawPoints:function(){var a=this,b=a.chart,c,d,e,f,g,h,i,j;n(a.points,function(k){if(k.plotY!==t)i=k.graphic,c=k.pointAttr[k.selected?"selected":""]||a.pointAttr[""],f=c["stroke-width"]%2/2,j=y(k.plotX)-
f,g=y(k.shapeArgs.width/2),h=["M",j,y(k.yBottom),"L",j,y(k.plotY)],k.open!==null&&(d=y(k.plotOpen)+f,h.push("M",j,d,"L",j-g,d)),k.close!==null&&(e=y(k.plotClose)+f,h.push("M",j,e,"L",j+g,e)),i?i.attr(c).animate({d:h}):k.graphic=b.renderer.path(h).attr(c).add(a.group)})},animate:null});K.ohlc=ca;W.candlestick=C(W.column,{lineColor:"black",lineWidth:1,states:{hover:{lineWidth:2}},tooltip:W.ohlc.tooltip,threshold:null,upColor:"white"});ca=la(ca,{type:"candlestick",pointAttrToOptions:{fill:"color",stroke:"lineColor",
"stroke-width":"lineWidth"},upColorProp:"fill",getAttribs:function(){K.ohlc.prototype.getAttribs.apply(this,arguments);var a=this.options,b=a.states,c=a.upLineColor||a.lineColor,d=b.hover.upLineColor||c,e=b.select.upLineColor||c;n(this.points,function(a){if(a.open<a.close){if(a.lineColor)a.pointAttr=C(a.pointAttr),c=a.lineColor;a.pointAttr[""].stroke=c;a.pointAttr.hover.stroke=d;a.pointAttr.select.stroke=e}})},drawPoints:function(){var a=this,b=a.chart,c,d=a.pointAttr[""],e,f,g,h,i,j,k,l,m,o,p;n(a.points,
function(n){m=n.graphic;if(n.plotY!==t)c=n.pointAttr[n.selected?"selected":""]||d,k=c["stroke-width"]%2/2,l=y(n.plotX)-k,e=n.plotOpen,f=n.plotClose,g=Y.min(e,f),h=Y.max(e,f),p=y(n.shapeArgs.width/2),i=y(g)!==y(n.plotY),j=h!==n.yBottom,g=y(g)+k,h=y(h)+k,o=["M",l-p,h,"L",l-p,g,"L",l+p,g,"L",l+p,h,"Z","M",l,g,"L",l,i?y(n.plotY):g,"M",l,h,"L",l,j?y(n.yBottom):h],m?m.attr(c).animate({d:o}):n.graphic=b.renderer.path(o).attr(c).add(a.group).shadow(a.options.shadow)})}});K.candlestick=ca;var wb=ya.prototype.symbols;
W.flags=C(W.column,{fillColor:"white",lineWidth:1,pointRange:0,shape:"flag",stackDistance:12,states:{hover:{lineColor:"black",fillColor:"#FCFFC5"}},style:{fontSize:"11px",fontWeight:"bold",textAlign:"center"},tooltip:{pointFormat:"{point.text}<br/>"},threshold:null,y:-30});K.flags=la(K.column,{type:"flags",sorted:!1,noSharedTooltip:!0,allowDG:!1,takeOrdinalPosition:!1,trackerGroups:["markerGroup"],forceCrop:!0,init:Q.prototype.init,pointAttrToOptions:{fill:"fillColor",stroke:"color","stroke-width":"lineWidth",
r:"radius"},translate:function(){K.column.prototype.translate.apply(this);var a=this.options,b=this.chart,c=this.points,d=c.length-1,e,f,g=a.onSeries;e=g&&b.get(g);var a=a.onKey||"y",g=e&&e.options.step,h=e&&e.points,i=h&&h.length,j=this.xAxis,k=j.getExtremes(),l,m,o;if(e&&e.visible&&i){e=e.currentDataGrouping;m=h[i-1].x+(e?e.totalRange:0);c.sort(function(a,b){return a.x-b.x});for(a="plot"+a[0].toUpperCase()+a.substr(1);i--&&c[d];)if(e=c[d],l=h[i],l.x<=e.x&&l[a]!==void 0){if(e.x<=m)e.plotY=l[a],l.x<
e.x&&!g&&(o=h[i+1])&&o[a]!==t&&(e.plotY+=(e.x-l.x)/(o.x-l.x)*(o[a]-l[a]));d--;i++;if(d<0)break}}n(c,function(a,d){var e;if(a.plotY===t)a.x>=k.min&&a.x<=k.max?a.plotY=b.chartHeight-j.bottom-(j.opposite?j.height:0)+j.offset-b.plotTop:a.shapeArgs={};if((f=c[d-1])&&f.plotX===a.plotX){if(f.stackIndex===t)f.stackIndex=0;e=f.stackIndex+1}a.stackIndex=e})},drawPoints:function(){var a,b=this.pointAttr[""],c=this.points,d=this.chart,e=d.renderer,f,g,h=this.options,i=h.y,j,k,l,m,o,n,r=this.yAxis;for(k=c.length;k--;)if(l=
c[k],a=l.plotX>this.xAxis.len,f=l.plotX,f>0&&(f-=q(l.lineWidth,h.lineWidth)%2),m=l.stackIndex,j=l.options.shape||h.shape,g=l.plotY,g!==t&&(g=l.plotY+i-(m!==t&&m*h.stackDistance)),o=m?t:l.plotX,n=m?t:l.plotY,m=l.graphic,g!==t&&f>=0&&!a)a=l.pointAttr[l.selected?"select":""]||b,m?m.attr({x:f,y:g,r:a.r,anchorX:o,anchorY:n}):l.graphic=e.label(l.options.title||h.title||"A",f,g,j,o,n,h.useHTML).css(C(h.style,l.style)).attr(a).attr({align:j==="flag"?"left":"center",width:h.width,height:h.height}).add(this.markerGroup).shadow(h.shadow),
l.tooltipPos=d.inverted?[r.len+r.pos-d.plotLeft-g,this.xAxis.len-f]:[f,g];else if(m)l.graphic=m.destroy()},drawTracker:function(){var a=this.points;nb.drawTrackerPoint.apply(this);n(a,function(b){var c=b.graphic;c&&D(c.element,"mouseover",function(){if(b.stackIndex>0&&!b.raised)b._y=c.y,c.attr({y:b._y-8}),b.raised=!0;n(a,function(a){if(a!==b&&a.raised&&a.graphic)a.graphic.attr({y:a._y}),a.raised=!1})})})},animate:ra,buildKDTree:ra,setClip:ra});wb.flag=function(a,b,c,d,e){return["M",e&&e.anchorX||
a,e&&e.anchorY||b,"L",a,b+d,a,b,a+c,b,a+c,b+d,a,b+d,"Z"]};n(["circle","square"],function(a){wb[a+"pin"]=function(b,c,d,e,f){var g=f&&f.anchorX,f=f&&f.anchorY;a==="circle"&&e>d&&(b-=y((e-d)/2),d=e);b=wb[a](b,c,d,e);g&&f&&b.push("M",g,c>f?c:c+e,"L",g,f);return b}});Ya===z.VMLRenderer&&n(["flag","circlepin","squarepin"],function(a){mb.prototype.symbols[a]=wb[a]});var ca=[].concat(Yb),xb=function(a){var b=Sa(arguments,function(a){return typeof a==="number"});if(b.length)return Math[a].apply(0,b)};ca[4]=
["day",[1,2,3,4]];ca[5]=["week",[1,2,3]];x(N,{navigator:{handles:{backgroundColor:"#ebe7e8",borderColor:"#b2b1b6"},height:40,margin:25,maskFill:"rgba(128,179,236,0.3)",maskInside:!0,outlineColor:"#b2b1b6",outlineWidth:1,series:{type:K.areaspline===t?"line":"areaspline",color:"#4572A7",compare:null,fillOpacity:0.05,dataGrouping:{approximation:"average",enabled:!0,groupPixelWidth:2,smoothed:!0,units:ca},dataLabels:{enabled:!1,zIndex:2},id:"highcharts-navigator-series",lineColor:null,lineWidth:1,marker:{enabled:!1},
pointRange:0,shadow:!1,threshold:null},xAxis:{tickWidth:0,lineWidth:0,gridLineColor:"#EEE",gridLineWidth:1,tickPixelInterval:200,labels:{align:"left",style:{color:"#888"},x:3,y:-4},crosshair:!1},yAxis:{gridLineWidth:0,startOnTick:!1,endOnTick:!1,minPadding:0.1,maxPadding:0.1,labels:{enabled:!1},crosshair:!1,title:{text:null},tickWidth:0}},scrollbar:{height:kb?20:14,barBackgroundColor:"#bfc8d1",barBorderRadius:0,barBorderWidth:1,barBorderColor:"#bfc8d1",buttonArrowColor:"#666",buttonBackgroundColor:"#ebe7e8",
buttonBorderColor:"#bbb",buttonBorderRadius:0,buttonBorderWidth:1,minWidth:6,rifleColor:"#666",trackBackgroundColor:"#eeeeee",trackBorderColor:"#eeeeee",trackBorderWidth:1,liveRedraw:ja&&!kb}});Hb.prototype={drawHandle:function(a,b){var c=this.chart,d=c.renderer,e=this.elementsToDestroy,f=this.handles,g=this.navigatorOptions.handles,g={fill:g.backgroundColor,stroke:g.borderColor,"stroke-width":1},h;this.rendered||(f[b]=d.g("navigator-handle-"+["left","right"][b]).css({cursor:"ew-resize"}).attr({zIndex:10-
b}).add(),h=d.rect(-4.5,0,9,16,0,1).attr(g).add(f[b]),e.push(h),h=d.path(["M",-1.5,4,"L",-1.5,12,"M",0.5,4,"L",0.5,12]).attr(g).add(f[b]),e.push(h));f[b][c.isResizing?"animate":"attr"]({translateX:this.scrollerLeft+this.scrollbarHeight+parseInt(a,10),translateY:this.top+this.height/2-8})},drawScrollbarButton:function(a){var b=this.chart.renderer,c=this.elementsToDestroy,d=this.scrollbarButtons,e=this.scrollbarHeight,f=this.scrollbarOptions,g;this.rendered||(d[a]=b.g().add(this.scrollbarGroup),g=b.rect(-0.5,
-0.5,e+1,e+1,f.buttonBorderRadius,f.buttonBorderWidth).attr({stroke:f.buttonBorderColor,"stroke-width":f.buttonBorderWidth,fill:f.buttonBackgroundColor}).add(d[a]),c.push(g),g=b.path(["M",e/2+(a?-1:1),e/2-3,"L",e/2+(a?-1:1),e/2+3,e/2+(a?2:-2),e/2]).attr({fill:f.buttonArrowColor}).add(d[a]),c.push(g));a&&d[a].attr({translateX:this.scrollerWidth-e})},render:function(a,b,c,d){var e=this.chart,f=e.renderer,g,h,i,j,k=this.scrollbarGroup,l=this.navigatorGroup,m=this.scrollbar,l=this.xAxis,o=this.scrollbarTrack,
n=this.scrollbarHeight,r=this.scrollbarEnabled,A=this.navigatorOptions,t=this.scrollbarOptions,u=t.minWidth,w=this.height,x=this.top,z=this.navigatorEnabled,C=A.outlineWidth,B=C/2,D=0,G=this.outlineHeight,I=t.barBorderRadius,H=t.barBorderWidth,F=x+B,J;if(s(a)&&!isNaN(a)&&s(b)&&!(isNaN(b)||this.hasDragged&&!s(c))){this.navigatorLeft=g=q(l.left,e.plotLeft+n);this.navigatorWidth=h=q(l.len,e.plotWidth-2*n);this.scrollerLeft=i=g-n;this.scrollerWidth=j=j=h+2*n;l.getExtremes&&(J=this.getUnionExtremes(!0))&&
(J.dataMin!==l.min||J.dataMax!==l.max)&&l.setExtremes(J.dataMin,J.dataMax,!0,!1);c=q(c,l.translate(a));d=q(d,l.translate(b));if(isNaN(c)||S(c)===Infinity)c=0,d=j;if(!(l.translate(d,!0)-l.translate(c,!0)<e.xAxis[0].minRange)){this.zoomedMax=E(v(c,d,0),h);this.zoomedMin=E(v(this.fixedWidth?this.zoomedMax-this.fixedWidth:E(c,d),0),h);this.range=this.zoomedMax-this.zoomedMin;c=y(this.zoomedMax);b=y(this.zoomedMin);a=c-b;if(!this.rendered){if(z)this.navigatorGroup=l=f.g("navigator").attr({zIndex:3}).add(),
this.leftShade=f.rect().attr({fill:A.maskFill}).add(l),A.maskInside?this.leftShade.css({cursor:"ew-resize"}):this.rightShade=f.rect().attr({fill:A.maskFill}).add(l),this.outline=f.path().attr({"stroke-width":C,stroke:A.outlineColor}).add(l);if(r)this.scrollbarGroup=k=f.g("scrollbar").add(),m=t.trackBorderWidth,this.scrollbarTrack=o=f.rect().attr({x:0,y:-m%2/2,fill:t.trackBackgroundColor,stroke:t.trackBorderColor,"stroke-width":m,r:t.trackBorderRadius||0,height:n}).add(k),this.scrollbar=m=f.rect().attr({y:-H%
2/2,height:n,fill:t.barBackgroundColor,stroke:t.barBorderColor,"stroke-width":H,r:I}).add(k),this.scrollbarRifles=f.path().attr({stroke:t.rifleColor,"stroke-width":1}).add(k)}e=e.isResizing?"animate":"attr";if(z){this.leftShade[e](A.maskInside?{x:g+b,y:x,width:c-b,height:w}:{x:g,y:x,width:b,height:w});if(this.rightShade)this.rightShade[e]({x:g+c,y:x,width:h-c,height:w});this.outline[e]({d:["M",i,F,"L",g+b-B,F,g+b-B,F+G,"L",g+c-B,F+G,"L",g+c-B,F,i+j,F].concat(A.maskInside?["M",g+b+B,F,"L",g+c-B,F]:
[])});this.drawHandle(b+B,0);this.drawHandle(c+B,1)}if(r&&k)this.drawScrollbarButton(0),this.drawScrollbarButton(1),k[e]({translateX:i,translateY:y(F+w)}),o[e]({width:j}),g=n+b,h=a-H,h<u&&(D=(u-h)/2,h=u,g-=D),this.scrollbarPad=D,m[e]({x:V(g)+H%2/2,width:h}),u=n+b+a/2-0.5,this.scrollbarRifles.attr({visibility:a>12?"visible":"hidden"})[e]({d:["M",u-3,n/4,"L",u-3,2*n/3,"M",u,n/4,"L",u,2*n/3,"M",u+3,n/4,"L",u+3,2*n/3]});this.scrollbarPad=D;this.rendered=!0}}},addEvents:function(){var a=this.chart.container,
b=this.mouseDownHandler,c=this.mouseMoveHandler,d=this.mouseUpHandler,e;e=[[a,"mousedown",b],[a,"mousemove",c],[B,"mouseup",d]];db&&e.push([a,"touchstart",b],[a,"touchmove",c],[B,"touchend",d]);n(e,function(a){D.apply(null,a)});this._events=e},removeEvents:function(){n(this._events,function(a){T.apply(null,a)});this._events=t;this.navigatorEnabled&&this.baseSeries&&T(this.baseSeries,"updatedData",this.updatedDataHandler)},init:function(){var a=this,b=a.chart,c,d,e=a.scrollbarHeight,f=a.navigatorOptions,
g=a.height,h=a.top,i,j=a.baseSeries;a.mouseDownHandler=function(d){var d=b.pointer.normalize(d),e=a.zoomedMin,f=a.zoomedMax,h=a.top,j=a.scrollbarHeight,k=a.scrollerLeft,l=a.scrollerWidth,n=a.navigatorLeft,q=a.navigatorWidth,s=a.scrollbarPad,t=a.range,v=d.chartX,x=d.chartY,d=b.xAxis[0],y,z=kb?10:7;if(x>h&&x<h+g+j)if((h=!a.scrollbarEnabled||x<h+g)&&Y.abs(v-e-n)<z)a.grabbedLeft=!0,a.otherHandlePos=f,a.fixedExtreme=d.max,b.fixedRange=null;else if(h&&Y.abs(v-f-n)<z)a.grabbedRight=!0,a.otherHandlePos=e,
a.fixedExtreme=d.min,b.fixedRange=null;else if(v>n+e-s&&v<n+f+s)a.grabbedCenter=v,a.fixedWidth=t,i=v-e;else if(v>k&&v<k+l){f=h?v-n-t/2:v<n?e-t*0.2:v>k+l-j?e+t*0.2:v<n+e?e-t:f;if(f<0)f=0;else if(f+t>=q)f=q-t,y=a.getUnionExtremes().dataMax;if(f!==e)a.fixedWidth=t,e=c.toFixedRange(f,f+t,null,y),d.setExtremes(e.min,e.max,!0,!1,{trigger:"navigator"})}};a.mouseMoveHandler=function(c){var d=a.scrollbarHeight,e=a.navigatorLeft,f=a.navigatorWidth,g=a.scrollerLeft,h=a.scrollerWidth,j=a.range,k,l;if(!c.touches||
c.touches[0].pageX!==0)c=b.pointer.normalize(c),k=c.chartX,k<e?k=e:k>g+h-d&&(k=g+h-d),a.grabbedLeft?(l=!0,a.render(0,0,k-e,a.otherHandlePos)):a.grabbedRight?(l=!0,a.render(0,0,a.otherHandlePos,k-e)):a.grabbedCenter&&(l=!0,k<i?k=i:k>f+i-j&&(k=f+i-j),a.render(0,0,k-i,k-i+j)),l&&a.scrollbarOptions.liveRedraw&&setTimeout(function(){a.mouseUpHandler(c)},0),a.hasDragged=l};a.mouseUpHandler=function(d){var e,f;if(a.hasDragged){if(a.zoomedMin===a.otherHandlePos)e=a.fixedExtreme;else if(a.zoomedMax===a.otherHandlePos)f=
a.fixedExtreme;if(a.zoomedMax===a.navigatorWidth)f=a.getUnionExtremes().dataMax;e=c.toFixedRange(a.zoomedMin,a.zoomedMax,e,f);s(e.min)&&b.xAxis[0].setExtremes(e.min,e.max,!0,!1,{trigger:"navigator",triggerOp:"navigator-drag",DOMEvent:d})}if(d.type!=="mousemove")a.grabbedLeft=a.grabbedRight=a.grabbedCenter=a.fixedWidth=a.fixedExtreme=a.otherHandlePos=a.hasDragged=i=null};var k=b.xAxis.length,l=b.yAxis.length;b.extraBottomMargin=a.outlineHeight+f.margin;a.navigatorEnabled?(a.xAxis=c=new I(b,C({breaks:j&&
j.xAxis.options.breaks,ordinal:j&&j.xAxis.options.ordinal},f.xAxis,{id:"navigator-x-axis",isX:!0,type:"datetime",index:k,height:g,offset:0,offsetLeft:e,offsetRight:-e,keepOrdinalPadding:!0,startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,zoomEnabled:!1})),a.yAxis=d=new I(b,C(f.yAxis,{id:"navigator-y-axis",alignTicks:!1,height:g,offset:0,index:l,zoomEnabled:!1})),j||f.series.data?a.addBaseSeries():b.series.length===0&&U(b,"redraw",function(c,d){if(b.series.length>0&&!a.series)a.setBaseSeries(),
b.redraw=c;c.call(b,d)})):a.xAxis=c={translate:function(a,c){var d=b.xAxis[0],f=d.getExtremes(),g=b.plotWidth-2*e,h=xb("min",d.options.min,f.dataMin),d=xb("max",d.options.max,f.dataMax)-h;return c?a*d/g+h:g*(a-h)/d},toFixedRange:I.prototype.toFixedRange};U(b,"getMargins",function(b){var e=this.legend,f=e.options;b.apply(this,[].slice.call(arguments,1));a.top=h=a.navigatorOptions.top||this.chartHeight-a.height-a.scrollbarHeight-this.spacing[2]-(f.verticalAlign==="bottom"&&f.enabled&&!f.floating?e.legendHeight+
q(f.margin,10):0);if(c&&d)c.options.top=d.options.top=h,c.setAxisSize(),d.setAxisSize()});a.addEvents()},getUnionExtremes:function(a){var b=this.chart.xAxis[0],c=this.xAxis,d=c.options,e=b.options,f;if(!a||b.dataMin!==null)f={dataMin:q(d&&d.min,xb("min",e.min,b.dataMin,c.dataMin)),dataMax:q(d&&d.max,xb("max",e.max,b.dataMax,c.dataMax))};return f},setBaseSeries:function(a){var b=this.chart,a=a||b.options.navigator.baseSeries;this.series&&this.series.remove();this.baseSeries=b.series[a]||typeof a===
"string"&&b.get(a)||b.series[0];this.xAxis&&this.addBaseSeries()},addBaseSeries:function(){var a=this.baseSeries,b=a?a.options:{},c=b.data,d=this.navigatorOptions.series,e;e=d.data;this.hasNavigatorData=!!e;b=C(b,d,{enableMouseTracking:!1,group:"nav",padXAxis:!1,xAxis:"navigator-x-axis",yAxis:"navigator-y-axis",name:"Navigator",showInLegend:!1,stacking:!1,isInternal:!0,visible:!0});b.data=e||c.slice(0);this.series=this.chart.initSeries(b);if(a&&this.navigatorOptions.adaptToUpdatedData!==!1)D(a,"updatedData",
this.updatedDataHandler),a.userOptions.events=x(a.userOptions.event,{updatedData:this.updatedDataHandler})},updatedDataHandler:function(){var a=this.chart.scroller,b=a.baseSeries,c=b.xAxis,d=c.getExtremes(),e=d.min,f=d.max,g=d.dataMin,d=d.dataMax,h=f-e,i,j,k,l,m,o=a.series;i=o.xData;var n=!!c.setExtremes;j=f>=i[i.length-1]-(this.closestPointRange||0);i=e<=g;if(!a.hasNavigatorData)o.options.pointStart=b.xData[0],o.setData(b.options.data,!1),m=!0;i&&(l=g,k=l+h);j&&(k=d,i||(l=v(k-h,o.xData[0])));n&&
(i||j)?isNaN(l)||c.setExtremes(l,k,!0,!1,{trigger:"updatedData"}):(m&&this.chart.redraw(!1),a.render(v(e,g),E(f,d)))},destroy:function(){this.removeEvents();n([this.xAxis,this.yAxis,this.leftShade,this.rightShade,this.outline,this.scrollbarTrack,this.scrollbarRifles,this.scrollbarGroup,this.scrollbar],function(a){a&&a.destroy&&a.destroy()});this.xAxis=this.yAxis=this.leftShade=this.rightShade=this.outline=this.scrollbarTrack=this.scrollbarRifles=this.scrollbarGroup=this.scrollbar=null;n([this.scrollbarButtons,
this.handles,this.elementsToDestroy],function(a){Pa(a)})}};z.Scroller=Hb;U(I.prototype,"zoom",function(a,b,c){var d=this.chart,e=d.options,f=e.chart.zoomType,g=e.navigator,e=e.rangeSelector,h;if(this.isXAxis&&(g&&g.enabled||e&&e.enabled))if(f==="x")d.resetZoomButton="blocked";else if(f==="y")h=!1;else if(f==="xy")d=this.previousZoom,s(b)?this.previousZoom=[this.min,this.max]:d&&(b=d[0],c=d[1],delete this.previousZoom);return h!==t?h:a.call(this,b,c)});U(Ca.prototype,"init",function(a,b,c){D(this,
"beforeRender",function(){var a=this.options;if(a.navigator.enabled||a.scrollbar.enabled)this.scroller=new Hb(this)});a.call(this,b,c)});U(Q.prototype,"addPoint",function(a,b,c,d,e){var f=this.options.turboThreshold;f&&this.xData.length>f&&da(b)&&!Ja(b)&&this.chart.scroller&&ga(20,!0);a.call(this,b,c,d,e)});x(N,{rangeSelector:{buttonTheme:{width:28,height:18,fill:"#f7f7f7",padding:2,r:0,"stroke-width":0,style:{color:"#444",cursor:"pointer",fontWeight:"normal"},zIndex:7,states:{hover:{fill:"#e7e7e7"},
select:{fill:"#e7f0f9",style:{color:"black",fontWeight:"bold"}}}},height:35,inputPosition:{align:"right"},labelStyle:{color:"#666"}}});N.lang=C(N.lang,{rangeSelectorZoom:"Zoom",rangeSelectorFrom:"From",rangeSelectorTo:"To"});Ib.prototype={clickButton:function(a,b){var c=this,d=c.selected,e=c.chart,f=c.buttons,g=c.buttonOptions[a],h=e.xAxis[0],i=e.scroller&&e.scroller.getUnionExtremes()||h||{},j=i.dataMin,k=i.dataMax,l,m=h&&y(E(h.max,q(k,h.max))),o=g.type,p,i=g._range,r,s,x,u=g.dataGrouping;if(!(j===
null||k===null||a===c.selected)){e.fixedRange=i;if(u)this.forcedDataGrouping=!0,I.prototype.setDataGrouping.call(h||{chart:this.chart},u,!1);if(o==="month"||o==="year")if(h){if(o={range:g,max:m,dataMin:j,dataMax:k},l=h.minFromRange.call(o),typeof o.newMax==="number")m=o.newMax}else i=g;else if(i)l=v(m-i,j),m=E(l+i,k);else if(o==="ytd")if(h){if(k===t)j=Number.MAX_VALUE,k=Number.MIN_VALUE,n(e.series,function(a){a=a.xData;j=E(a[0],j);k=v(a[a.length-1],k)}),b=!1;m=new fa(k);l=m.getFullYear();l=r=v(j||
0,fa.UTC(l,0,1));m=m.getTime();m=E(k||m,m)}else{D(e,"beforeRender",function(){c.clickButton(a)});return}else o==="all"&&h&&(l=j,m=k);f[d]&&f[d].setState(0);if(f[a])f[a].setState(2),c.lastSelected=a;h?(h.setExtremes(l,m,q(b,1),0,{trigger:"rangeSelectorButton",rangeSelectorButton:g}),c.setSelected(a)):(p=e.options.xAxis[0],x=p.range,p.range=i,s=p.min,p.min=r,c.setSelected(a),D(e,"load",function(){p.range=x;p.min=s}))}},setSelected:function(a){this.selected=this.options.selected=a},defaultButtons:[{type:"month",
count:1,text:"1m"},{type:"month",count:3,text:"3m"},{type:"month",count:6,text:"6m"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"1y"},{type:"all",text:"All"}],init:function(a){var b=this,c=a.options.rangeSelector,d=c.buttons||[].concat(b.defaultButtons),e=c.selected,f=b.blurInputs=function(){var a=b.minInput,c=b.maxInput;a&&a.blur&&M(a,"blur");c&&c.blur&&M(c,"blur")};b.chart=a;b.options=c;b.buttons=[];a.extraTopMargin=c.height;b.buttonOptions=d;D(a.container,"mousedown",f);D(a,"resize",f);
n(d,b.computeButtonRange);e!==t&&d[e]&&this.clickButton(e,!1);D(a,"load",function(){D(a.xAxis[0],"setExtremes",function(c){this.max-this.min!==a.fixedRange&&c.trigger!=="rangeSelectorButton"&&c.trigger!=="updatedData"&&b.forcedDataGrouping&&this.setDataGrouping(!1,!1)});D(a.xAxis[0],"afterSetExtremes",function(){b.updateButtonStates(!0)})})},updateButtonStates:function(a){var b=this,c=this.chart,d=c.xAxis[0],e=c.scroller&&c.scroller.getUnionExtremes()||d,f=e.dataMin,g=e.dataMax,h=b.selected,i=b.options.allButtonsEnabled,
j=b.buttons;a&&c.fixedRange!==y(d.max-d.min)&&(j[h]&&j[h].setState(0),b.setSelected(null));n(b.buttonOptions,function(a,e){var m=y(d.max-d.min),o=a._range,n=a.type,q=a.count||1,s=o>g-f,t=o<d.minRange,u=a.type==="all"&&d.max-d.min>=g-f&&j[e].state!==2,w=a.type==="ytd"&&ma("%Y",f)===ma("%Y",g),v=c.renderer.forExport&&e===h,o=o===m,x=!d.hasVisibleSeries;if((n==="month"||n==="year")&&m>={month:28,year:365}[n]*864E5*q&&m<={month:31,year:366}[n]*864E5*q)o=!0;v||o&&e!==h&&e===b.lastSelected?(b.setSelected(e),
j[e].setState(2)):!i&&(s||t||u||w||x)?j[e].setState(3):j[e].state===3&&j[e].setState(0)})},computeButtonRange:function(a){var b=a.type,c=a.count||1,d={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5};if(d[b])a._range=d[b]*c;else if(b==="month"||b==="year")a._range={month:30,year:365}[b]*864E5*c},setInputValue:function(a,b){var c=this.chart.options.rangeSelector;if(s(b))this[a+"Input"].HCTime=b;this[a+"Input"].value=ma(c.inputEditDateFormat||"%Y-%m-%d",this[a+"Input"].HCTime);this[a+
"DateBox"].attr({text:ma(c.inputDateFormat||"%b %e, %Y",this[a+"Input"].HCTime)})},showInput:function(a){var b=this.inputGroup,c=this[a+"DateBox"];F(this[a+"Input"],{left:b.translateX+c.x+"px",top:b.translateY+"px",width:c.width-2+"px",height:c.height-2+"px",border:"2px solid silver"})},hideInput:function(a){F(this[a+"Input"],{border:0,width:"1px",height:"1px"});this.setInputValue(a)},drawInput:function(a){function b(){var a=j.value,b=(g.inputDateParser||fa.parse)(a),e=d.xAxis[0],f=e.dataMin,h=e.dataMax;
if(b!==j.previousValue)j.previousValue=b,isNaN(b)&&(b=a.split("-"),b=fa.UTC(G(b[0]),G(b[1])-1,G(b[2]))),isNaN(b)||(N.global.useUTC||(b+=(new fa).getTimezoneOffset()*6E4),i?b>c.maxInput.HCTime?b=t:b<f&&(b=f):b<c.minInput.HCTime?b=t:b>h&&(b=h),b!==t&&d.xAxis[0].setExtremes(i?b:e.min,i?e.max:b,t,t,{trigger:"rangeSelectorInput"}))}var c=this,d=c.chart,e=d.renderer.style,f=d.renderer,g=d.options.rangeSelector,h=c.div,i=a==="min",j,k,l=this.inputGroup;this[a+"Label"]=k=f.label(N.lang[i?"rangeSelectorFrom":
"rangeSelectorTo"],this.inputGroup.offset).attr({padding:2}).css(C(e,g.labelStyle)).add(l);l.offset+=k.width+5;this[a+"DateBox"]=f=f.label("",l.offset).attr({padding:2,width:g.inputBoxWidth||90,height:g.inputBoxHeight||17,stroke:g.inputBoxBorderColor||"silver","stroke-width":1}).css(C({textAlign:"center",color:"#444"},e,g.inputStyle)).on("click",function(){c.showInput(a);c[a+"Input"].focus()}).add(l);l.offset+=f.width+(i?10:0);this[a+"Input"]=j=ea("input",{name:a,className:"highcharts-range-selector",
type:"text"},x({position:"absolute",border:0,width:"1px",height:"1px",padding:0,textAlign:"center",fontSize:e.fontSize,fontFamily:e.fontFamily,left:"-9em",top:d.plotTop+"px"},g.inputStyle),h);j.onfocus=function(){c.showInput(a)};j.onblur=function(){c.hideInput(a)};j.onchange=b;j.onkeypress=function(a){a.keyCode===13&&b()}},getPosition:function(){var a=this.chart,b=a.options.rangeSelector,a=q((b.buttonPosition||{}).y,a.plotTop-a.axisOffset[0]-b.height);return{buttonTop:a,inputTop:a-10}},render:function(a,
b){var c=this,d=c.chart,e=d.renderer,f=d.container,g=d.options,h=g.exporting&&g.exporting.enabled!==!1&&g.navigation&&g.navigation.buttonOptions,i=g.rangeSelector,j=c.buttons,g=N.lang,k=c.div,k=c.inputGroup,l=i.buttonTheme,m=i.buttonPosition||{},o=i.inputEnabled,p=l&&l.states,r=d.plotLeft,t,v=this.getPosition(),u=c.group,w=c.rendered;if(!w&&(c.group=u=e.g("range-selector-buttons").add(),c.zoomText=e.text(g.rangeSelectorZoom,q(m.x,r),15).css(i.labelStyle).add(u),t=q(m.x,r)+c.zoomText.getBBox().width+
5,n(c.buttonOptions,function(a,b){j[b]=e.button(a.text,t,0,function(){c.clickButton(b);c.isActive=!0},l,p&&p.hover,p&&p.select,p&&p.disabled).css({textAlign:"center"}).add(u);t+=j[b].width+q(i.buttonSpacing,5);c.selected===b&&j[b].setState(2)}),c.updateButtonStates(),o!==!1))c.div=k=ea("div",null,{position:"relative",height:0,zIndex:1}),f.parentNode.insertBefore(k,f),c.inputGroup=k=e.g("input-group").add(),k.offset=0,c.drawInput("min"),c.drawInput("max");u[w?"animate":"attr"]({translateY:v.buttonTop});
o!==!1&&(k.align(x({y:v.inputTop,width:k.offset,x:h&&v.inputTop<(h.y||0)+h.height-d.spacing[0]?-40:0},i.inputPosition),!0,d.spacingBox),s(o)||(d=u.getBBox(),k[k.translateX<d.x+d.width+10?"hide":"show"]()),c.setInputValue("min",a),c.setInputValue("max",b));c.rendered=!0},destroy:function(){var a=this.minInput,b=this.maxInput,c=this.chart,d=this.blurInputs,e;T(c.container,"mousedown",d);T(c,"resize",d);Pa(this.buttons);if(a)a.onfocus=a.onblur=a.onchange=null;if(b)b.onfocus=b.onblur=b.onchange=null;
for(e in this)this[e]&&e!=="chart"&&(this[e].destroy?this[e].destroy():this[e].nodeType&&Va(this[e])),this[e]=null}};I.prototype.toFixedRange=function(a,b,c,d){var e=this.chart&&this.chart.fixedRange,a=q(c,this.translate(a,!0)),b=q(d,this.translate(b,!0)),c=e&&(b-a)/e;c>0.7&&c<1.3&&(d?a=b-e:b=a+e);isNaN(a)&&(a=b=void 0);return{min:a,max:b}};I.prototype.minFromRange=function(){var a=this.range,b={month:"Month",year:"FullYear"}[a.type],c,d=this.max,e,f,g=function(a,c){var d=new fa(a);d["set"+b](d["get"+
b]()+c);return d.getTime()-a};typeof a==="number"?(c=this.max-a,f=a):c=d+g(d,-a.count);e=q(this.dataMin,Number.MIN_VALUE);isNaN(c)&&(c=e);if(c<=e)c=e,f===void 0&&(f=g(c,a.count)),this.newMax=E(c+f,this.dataMax);isNaN(d)&&(c=void 0);return c};U(Ca.prototype,"init",function(a,b,c){D(this,"init",function(){if(this.options.rangeSelector.enabled)this.rangeSelector=new Ib(this)});a.call(this,b,c)});z.RangeSelector=Ib;Ca.prototype.callbacks.push(function(a){function b(){f=a.xAxis[0].getExtremes();g.render(f.min,
f.max)}function c(){f=a.xAxis[0].getExtremes();isNaN(f.min)||h.render(f.min,f.max)}function d(a){a.triggerOp!=="navigator-drag"&&g.render(a.min,a.max)}function e(a){h.render(a.min,a.max)}var f,g=a.scroller,h=a.rangeSelector;g&&(D(a.xAxis[0],"afterSetExtremes",d),U(a,"drawChartBox",function(a){var c=this.isDirtyBox;a.call(this);c&&b()}),b());h&&(D(a.xAxis[0],"afterSetExtremes",e),D(a,"resize",c),c());D(a,"destroy",function(){g&&T(a.xAxis[0],"afterSetExtremes",d);h&&(T(a,"resize",c),T(a.xAxis[0],"afterSetExtremes",
e))})});z.StockChart=z.stockChart=function(a,b,c){var d=Da(a)||a.nodeName,e=arguments[d?1:0],f=e.series,g,h=q(e.navigator&&e.navigator.enabled,!0)?{startOnTick:!1,endOnTick:!1}:null,i={marker:{enabled:!1,radius:2}},j={shadow:!1,borderWidth:0};e.xAxis=ta(va(e.xAxis||{}),function(a){return C({minPadding:0,maxPadding:0,ordinal:!0,title:{text:null},labels:{overflow:"justify"},showLastLabel:!0},a,{type:"datetime",categories:null},h)});e.yAxis=ta(va(e.yAxis||{}),function(a){g=q(a.opposite,!0);return C({labels:{y:-2},
opposite:g,showLastLabel:!1,title:{text:null}},a)});e.series=null;e=C({chart:{panning:!0,pinchType:"x"},navigator:{enabled:!0},scrollbar:{enabled:!0},rangeSelector:{enabled:!0},title:{text:null,style:{fontSize:"16px"}},tooltip:{shared:!0,crosshairs:!0},legend:{enabled:!1},plotOptions:{line:i,spline:i,area:i,areaspline:i,arearange:i,areasplinerange:i,column:j,columnrange:j,candlestick:j,ohlc:j}},e,{_stock:!0,chart:{inverted:!1}});e.series=f;return d?new Ca(a,e,c):new Ca(e,b)};U(Za.prototype,"init",
function(a,b,c){var d=c.chart.pinchType||"";a.call(this,b,c);this.pinchX=this.pinchHor=d.indexOf("x")!==-1;this.pinchY=this.pinchVert=d.indexOf("y")!==-1;this.hasZoom=this.hasZoom||this.pinchHor||this.pinchVert});U(I.prototype,"autoLabelAlign",function(a){var b=this.chart,c=this.options,b=b._labelPanes=b._labelPanes||{},d=this.options.labels;if(this.chart.options._stock&&this.coll==="yAxis"&&(c=c.top+","+c.height,!b[c]&&d.enabled)){if(d.x===15)d.x=0;if(d.align===void 0)d.align="right";b[c]=1;return"right"}return a.call(this,
[].slice.call(arguments,1))});U(I.prototype,"getPlotLinePath",function(a,b,c,d,e,f){var g=this,h=this.isLinked&&!this.series?this.linkedParent.series:this.series,i=g.chart,j=i.renderer,k=g.left,l=g.top,m,o,p,r,t=[],x=[],u,w;if(g.coll==="colorAxis")return a.apply(this,[].slice.call(arguments,1));x=g.isXAxis?s(g.options.yAxis)?[i.yAxis[g.options.yAxis]]:ta(h,function(a){return a.yAxis}):s(g.options.xAxis)?[i.xAxis[g.options.xAxis]]:ta(h,function(a){return a.xAxis});n(g.isXAxis?i.yAxis:i.xAxis,function(a){if(s(a.options.id)?
a.options.id.indexOf("navigator")===-1:1){var b=a.isXAxis?"yAxis":"xAxis",b=s(a.options[b])?i[b][a.options[b]]:i[b][0];g===b&&x.push(a)}});u=x.length?[]:[g.isXAxis?i.yAxis[0]:i.xAxis[0]];n(x,function(a){sa(a,u)===-1&&u.push(a)});w=q(f,g.translate(b,null,null,d));isNaN(w)||(g.horiz?n(u,function(a){var b;o=a.pos;r=o+a.len;m=p=y(w+g.transB);if(m<k||m>k+g.width)e?m=p=E(v(k,m),k+g.width):b=!0;b||t.push("M",m,o,"L",p,r)}):n(u,function(a){var b;m=a.pos;p=m+a.len;o=r=y(l+g.height-w);if(o<l||o>l+g.height)e?
o=r=E(v(l,o),g.top+g.height):b=!0;b||t.push("M",m,o,"L",p,r)}));return t.length>0?j.crispPolyLine(t,c||1):null});I.prototype.getPlotBandPath=function(a,b){var c=this.getPlotLinePath(b,null,null,!0),d=this.getPlotLinePath(a,null,null,!0),e=[],f;if(d&&c&&d.toString()!==c.toString())for(f=0;f<d.length;f+=6)e.push("M",d[f+1],d[f+2],"L",d[f+4],d[f+5],c[f+4],c[f+5],c[f+1],c[f+2]);else e=null;return e};ya.prototype.crispPolyLine=function(a,b){var c;for(c=0;c<a.length;c+=6)a[c+1]===a[c+4]&&(a[c+1]=a[c+4]=
y(a[c+1])-b%2/2),a[c+2]===a[c+5]&&(a[c+2]=a[c+5]=y(a[c+2])+b%2/2);return a};if(Ya===z.VMLRenderer)mb.prototype.crispPolyLine=ya.prototype.crispPolyLine;U(I.prototype,"hideCrosshair",function(a,b){a.call(this,b);if(this.crossLabel)this.crossLabel=this.crossLabel.hide()});U(I.prototype,"drawCrosshair",function(a,b,c){var d,e;a.call(this,b,c);if(s(this.crosshair.label)&&this.crosshair.label.enabled){var a=this.chart,f=this.options.crosshair.label,g=this.horiz,h=this.opposite,i=this.left,j=this.top,k=
this.crossLabel,l,m=f.format,n="",p=this.options.tickPosition==="inside",r=this.crosshair.snap!==!1;l=g?"center":h?this.labelAlign==="right"?"right":"left":this.labelAlign==="left"?"left":"center";if(!k)k=this.crossLabel=a.renderer.label(null,null,null,f.shape||"callout").attr({align:f.align||l,zIndex:12,fill:f.backgroundColor||this.series[0]&&this.series[0].color||"gray",padding:q(f.padding,8),stroke:f.borderColor||"","stroke-width":f.borderWidth||0,r:q(f.borderRadius,3)}).css(x({color:"white",fontWeight:"normal",
fontSize:"11px",textAlign:"center"},f.style)).add();g?(l=r?c.plotX+i:b.chartX,j+=h?0:this.height):(l=h?this.width+i:0,j=r?c.plotY+j:b.chartY);!m&&!f.formatter&&(this.isDatetimeAxis&&(n="%b %d, %Y"),m="{value"+(n?":"+n:"")+"}");b=r?c[this.isXAxis?"x":"y"]:this.toValue(g?b.chartX:b.chartY);k.attr({text:m?La(m,{value:b}):f.formatter.call(this,b),anchorX:g?l:this.opposite?0:a.chartWidth,anchorY:g?this.opposite?a.chartHeight:0:j,x:l,y:j,visibility:"visible"});b=k.getBBox();if(g){if(p&&!h||!p&&h)j=k.y-
b.height}else j=k.y-b.height/2;g?(d=i-b.x,e=i+this.width-b.x):(d=this.labelAlign==="left"?i:0,e=this.labelAlign==="right"?i+this.width:a.chartWidth);k.translateX<d&&(l+=d-k.translateX);k.translateX+b.width>=e&&(l-=k.translateX+b.width-e);k.attr({x:l,y:j,visibility:"visible"})}});var gc=ia.init,hc=ia.processData,ic=Ha.prototype.tooltipFormatter;ia.init=function(){gc.apply(this,arguments);this.setCompare(this.options.compare)};ia.setCompare=function(a){this.modifyValue=a==="value"||a==="percent"?function(b,
c){var d=this.compareValue;if(b!==t&&(b=a==="value"?b-d:b=100*(b/d)-100,c))c.change=b;return b}:null;if(this.chart.hasRendered)this.isDirty=!0};ia.processData=function(){var a,b=-1,c,d,e,f;hc.apply(this,arguments);if(this.xAxis&&this.processedYData){c=this.processedXData;d=this.processedYData;e=d.length;this.pointArrayMap&&(b=sa(this.pointValKey||"y",this.pointArrayMap));for(a=0;a<e;a++)if(f=b>-1?d[a][b]:d[a],typeof f==="number"&&c[a]>=this.xAxis.min&&f!==0){this.compareValue=f;break}}};U(ia,"getExtremes",
function(a){var b;a.apply(this,[].slice.call(arguments,1));if(this.modifyValue)b=[this.modifyValue(this.dataMin),this.modifyValue(this.dataMax)],this.dataMin=Oa(b),this.dataMax=Ea(b)});I.prototype.setCompare=function(a,b){this.isXAxis||(n(this.series,function(b){b.setCompare(a)}),q(b,!0)&&this.chart.redraw())};Ha.prototype.tooltipFormatter=function(a){a=a.replace("{point.change}",(this.change>0?"+":"")+z.numberFormat(this.change,q(this.series.tooltipOptions.changeDecimals,2)));return ic.apply(this,
[a])};U(Q.prototype,"render",function(a){if(this.chart.options._stock&&this.xAxis)!this.clipBox&&this.animate?(this.clipBox=C(this.chart.clipBox),this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len):this.chart[this.sharedClipKey]&&(Ta(this.chart[this.sharedClipKey]),this.chart[this.sharedClipKey].attr({width:this.xAxis.len,height:this.yAxis.len}));a.call(this)});x(z,{Color:wa,Point:Ha,Tick:cb,Renderer:Ya,SVGElement:Z,SVGRenderer:ya,arrayMin:Oa,arrayMax:Ea,charts:$,correctFloat:na,
dateFormat:ma,error:ga,format:La,pathAnim:void 0,getOptions:function(){return N},hasBidiBug:Zb,isTouchDevice:kb,setOptions:function(a){N=C(!0,N,a);Ob();return N},addEvent:D,removeEvent:T,createElement:ea,discardElement:Va,css:F,each:n,map:ta,merge:C,splat:va,stableSort:ob,extendClass:la,pInt:G,svg:ja,canvas:qa,vml:!ja&&!qa,product:"Highstock",version:"4.2.4"});return z});
+function($){
$.fn.multiPageForm = function(config){

    var validatePage = function(page) {
            return validateFormFields(page);
        },
        storeDataInCookie = function(page) {
            storeInCookie(page, true);
        },
        storeData = function(page) {
            storeDataInCookie(page);
            if(typeof(Storage)=='undefined'||!page) {
				return;
            }

            var serializedValues = page.find('input,select,textarea').serializeArrayObject();
            var serializedKeys = Object.keys(serializedValues);

            for(var i=0;i<serializedKeys.length;i++){
                var key = serializedKeys[i];
                var value = serializedValues[key];

				localStorage.setItem(config.prefix + key, JSON.stringify(value));
            }
        },
        getDataJson = function() {
            var obj = {};
			for(var s in localStorage) {
                if(s.indexOf(config.prefix)==0) {
                    var key = s.replace(config.prefix,'');
					obj[key] = JSON.parse(localStorage.getItem(s));
                }
            }
            return JSON.stringify(obj);
        },
        clearStorage = function() {
            for(var s in localStorage) {
                if(s.indexOf(config.prefix)==0) {
					localStorage.removeItem(s);
                }
            }
        },
        nextClicked = function(e) {

            e.preventDefault();

            var isOTP=false;
            var isCalculatorSubmit=false;
            var isNextPage=true;
            var error_message='';
            for(var i=0;i<e.currentTarget.classList.length;i++){
                if(e.currentTarget.classList[i]=="calculator-otp"){
					isOTP=true;
                }
                if(e.currentTarget.classList[i]=="calculator-submit"){
                    isCalculatorSubmit=true;
                }
            }

            if(isOTP){
                if($.fn.calculator!=='undefined') {
                    if($('#check-agree').length){
                        if($('#check-agree').is(':checked')){
                    		$('#calculator-container-form').calculator(nextHandler,$(this).parents('div.form-page'));
                        }else{
							alert("Disclaimer is not checked!");
                        }
                    }else{
                    	$('#calculator-container-form').calculator(nextHandler,$(this).parents('div.form-page'));
                    }
                }
            }else{
                if($(this).hasClass("back-to-top")){
                    backToTop();
                }
                nextHandler($(this).parents('div.form-page'));
            }
        },
        backToTop = function(){
            $('html, body').animate({scrollTop: 0});
        },
        nextHandler = function(page){

            if(page.length>0 && validatePage(page)) {
                storeData(page);
                page.removeClass('active');
                page.next('.form-page').addClass('active');
            }
        },
        previousClicked = function(e) {

            e.preventDefault();

            var page = $(this).parents('div.form-page');

            if(page.length>0) {
                page.removeClass('active');
                page.prev('.form-page').addClass('active');

                if($(this).hasClass("back-to-top")){
                    backToTop();
                }
            }
        },
        submitClicked = function(e) {

            e.preventDefault();

            var page = $(this).parents('div.form-page'),
                form = page.parent('form');

            if(page.length>0 && validatePage(page)) {
                storeData(page);

                var data = getDataJson();

                $.post(config.actionUrl,data).success(function(){
                	clearStorage();
                    if(config.analyticsTag!='') {
                        try {
							sendDirectCall(config.analyticsTag);
                        } catch (err) {

                        }
                    }
                    if(config.thankyouUrl!='') {
                        $.get(config.thankyouUrl+'/jcr:content/content.html').success(function(data) {
                            form.parent('div').html(data);
                        });
                    }
                }).fail(function(){
					alert('failed');
                });
            }
        },
        bindControls = function(form) {
            if(config.nextPageClass) {
form.on('click','.'+config.nextPageClass,nextClicked);
            }
            if(config.prevPageClass) {
				form.on('click','.'+config.prevPageClass,previousClicked);
            }
            if(config.submitPageClass) {
				form.on('click','.'+config.submitPageClass,submitClicked);
            }
        }

    config.prefix = this.attr('id') + '-';
    config.actionUrl = this.attr('action');
    config.thankyouUrl = this.attr('data-thankyou');
    config.analyticsTag = this.attr('data-analytics');

    bindControls(this);
}
}(jQuery);
!(function($) {
    if(window._q && window._q.length>0){
      $.each(window._q,function(index,f){
        f();
      });
    }
})($);

function validateFormFields(p, _storeInCookie) {
    var page = null;
    if(p instanceof jQuery) page = p;
    else page = $(p);

    page.find(".field-error").removeClass("field-error");
    page.find(".fieldError").html("");

    var _result = true;
    // input field, text area: RE test
    page.find("input[re], textarea[re]").each(function(i, e){
        if($(e).attr("re")) {
            var regExp = new RegExp($(e).attr("re"));

           /** comment according email : Website | Medium Vulnerabilities 2019-09-09 
            var testValue = $(e).val();
            try {
                testValue = eval(testValue);
            } catch(err){}

           **/

            if($(e).val().length > 0 && !regExp.test($(e).val())) {
                var idValue = $(e).attr("id");
                if(idValue) {
                    var msgField = $("#" + idValue + "_msg");
                    msgField.html($("<div />").html(msgField.attr("reMessage")).text());
                    $(e).addClass("field-error");
                }
                _result = false;
            }
        }
    });
    // textarea, textfield
    // country will change input type with other script, change all type of text with this calidationtype
    var result = page.find("input[required][validationtype='text'], textarea[required]").each(function(i, e){
        if(!$(e).val()) {
            var idValue = $(e).attr("id");
            if(idValue) {
                var msgField = $("#" + idValue + "_msg");
                msgField.html($("<div />").html(msgField.attr("requiredMessage")).text());
                $(e).addClass("field-error");
            }
            _result = false;
        }
    });
    // radiobutton, checkbox
    var result = page.find("input[required][type='radio'][index='0'], input[required][type='checkbox'][index='0']").each(function(i, e){
        var eName = $(e).attr("name");
        var result = page.find("input[required][type='radio'][name='"+eName+"']:checked, input[required][type='checkbox'][name='"+eName+"']:checked");
        if(result.length == 0) {
            var idValue = $(e).attr("groupID");
            if(idValue) {
                var msgField = $("#" + idValue + "_msg");
                msgField.html($("<div />").html(msgField.attr("requiredMessage")).text());
                $(e).addClass("field-error");
            }
            _result = false;
        }
    });
    // select box
    page.find("select[required]").each(function(i, e) {
        var selected = $(e).find("option:selected");
        if(selected.length <= 0 || !selected.attr("value") || selected.attr("value").length <= 0) {
            var idValue = $(e).attr("id");
            if(idValue) {
                var msgField = $("#" + idValue + "_msg");
                msgField.html($("<div />").html(msgField.attr("requiredMessage")).text());
                $(e).addClass("field-error");
            }
            _result = false;
        }
    });


    if(_storeInCookie && _result) {
        storeInCookie(page);
    }

    return _result;
}

function storeInCookie(p) {
    var page = null;
    if(p instanceof jQuery) page = p;
    else page = $(p);

    var COOKIE_PREFIX = "aiaform_";
    // store in cookie
    page.find("input[store='true']").each(function(i, e) {
        var eName = $(e).attr("name");
        if($(e).val()) {
            $.cookie(COOKIE_PREFIX + eName, $(e).val(), {path:'/'});
        }
    });
    page.find("textarea[store='true']").each(function(i, e) {
        var eName = $(e).attr("name");
        if($(e).val()) {
            $.cookie(COOKIE_PREFIX + eName, $(e).val(), {path:'/'});
        }
    });
    page.find("input[type='radio'][store='true']:checked").each(function(i,e){
        var eName = $(e).attr("name");
        if($(e).val()) {
            $.cookie(COOKIE_PREFIX + eName, $(e).val(), {path:'/'});
        }
    });
    page.find("input[type='checkbox'][store='true'][index='0']").each(function(i,e){
        var groupID = $(e).attr("groupid");
        var eName = $(e).attr("name");
        var list = page.find("input[type='checkbox'][store='true'][groupid='"+groupID+"']:checked");

        var result = new Array();
        for(var i=0;i<list.length;i++) {
            result.push($(list[i]).val());
        }
        if(eName) {
            $.cookie(COOKIE_PREFIX + eName, result.join(","), {path:'/'});
        }
    });
    page.find("select[store=true]").each(function(i, e) {
        var selected = $(e).find("option:selected");
        var eName = $(e).attr("name");
        if(selected.val() && eName) {
            $.cookie(COOKIE_PREFIX + eName, selected.val(), {path:'/'});
        }
    });
}

function setDatalayerCurator(list){
	if(typeof(aiaDatalayer)!="undefined"){
		aiaDatalayer.curator = list;
	}
}

function setDatalayerCalculatorItems(list){
	if(typeof(aiaDatalayer)!="undefined"){
		aiaDatalayer.calculator = list;
	}
}

function setDatalayerAddonItems(list){
	if(typeof(aiaDatalayer)!="undefined"){
		aiaDatalayer.addon = list;
	}
}

function setButtonTextData(buttonClicked,text){
	var parents = $(buttonClicked).parents(".slide-content.centered-content");
	
	if(parents.length > 0){
		var grandpa = $(parents[0]).parents(".collapsible-carousel-container");
		if(grandpa.length > 0 ){
			var title = $(parents[0]).find("h1").text();
			if(typeof(aiaDatalayer)!="undefined"){
				aiaDatalayer.carouselCollapible={'carouselTitle':title};
			}
			return;
		}
		grandpa = $(parents[0]).parents(".carousel-container");
		if(grandpa.length > 0){
			var title = $(parents[0]).find("h1").text();
			if(typeof(aiaDatalayer)!="undefined"){
				aiaDatalayer.carouselNavigation={'navigationTitle':title};
			}
			return;
		}
	}
	
	if(typeof(aiaDatalayer)!="undefined"){
		aiaDatalayer.button={'buttonText':text};
	}
}

function setAddonItemData(addTitle){
	if(typeof(aiaDatalayer)!="undefined"){
		aiaDatalayer.addonitem={'addontitle':addTitle};
	}
}

// track the video button is clicked.
function setVedioButtonClicked(title, buttonCTA){
	if(typeof(aiaDatalayer)!="undefined"){
		aiaDatalayer.videoButtonClick={'title':title,"buttonCTA":buttonCTA};
	}
}

function setCollapsibleContentSmall(contentTitle){
	if(typeof(aiaDatalayer)!="undefined"){
		aiaDatalayer.collapseContentSmall={'title':contentTitle};
	}
}

function setCollapsibleContentLarge(contentTitle){
	if(typeof(aiaDatalayer)!="undefined"){
		aiaDatalayer.collapseContentLarge={'title':contentTitle};
	}
}

function listBenefitClicked(benefitTitle){
	if(typeof(aiaDatalayer)!="undefined"){
		aiaDatalayer.listBenefit={'title':benefitTitle};
	}
}

function setListActionClicked(actionTitle){
	if(typeof(aiaDatalayer)!="undefined"){
		aiaDatalayer.actionList={'actionTitle':actionTitle};
	}
}

function setCollapsibleTableClicked(tableTitle){
	if(typeof(aiaDatalayer)!="undefined"){
		aiaDatalayer.collapsibleTable={'tableTitle':tableTitle};
	}
}


function sendDirectCall(trackKey){
    if(typeof _satellite != 'undefined')
    	_satellite.track(trackKey);
	//alert("send the direct call");
}

$(document).ready(function () {
    try{		
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
            var viewportmeta = document.querySelector('meta[name="viewport"]');
            if (viewportmeta) {
                viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
                document.body.addEventListener('orientationchange', function () {
                    if($(".topnav .navmenu").hasClass("canvas-slid")){
                    	$(".navbar-one button[data-target='.navmenu']").click();
                    }
                    setTimeout(disableZoom, 500);
                }, false);
                document.body.addEventListener('devicemotion', function () {
                    if($(".topnav .navmenu").hasClass("canvas-slid")){
                    	$(".navbar-one button[data-target='.navmenu']").click();
                    }
                    setTimeout(disableZoom, 500);
                }, false);


                function disableZoom(){
                        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
                        viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0';
                }
            }
        }

		toggleNavZero();
		
		$(document).on('hidden.bs.modal',closeModalVideo);

		$('#gotocontent').click(function(e){
			scrollToElement($($(this).attr('href')), 0, 0.1);
		});
        //Android icon bug fix
        var nua = navigator.userAgent;
        if((nua.indexOf("Android") >= 0 || nua.indexOf("iPhone") >= 0) && nua.indexOf("Mobile") >= 0){
            var rules = '.row{margin-left:0;margin-right:0;}';
            rules += '.row .col{padding-left:0;padding-right:0;}';
            $('<style>').attr('id','mobile-style').text(rules).appendTo('head');
        }
        if(nua.indexOf("Android") >= 0) {
            $(".modal").on("shown.bs.modal", function() {
                $(this).find(".submit .btn").each(function(){
                    var obj = $(this);
                    obj.width(obj.width());
                });
            });
    /*        $("button.navbar-btn").on("click", function() {
                $(".nav.navmenu-nav svg:not(.pull-right)").each(function(){
                    var obj = $(this);
                    obj.html(obj.html());
                    console.log(obj);
                })
            });*/
            $(".navbar-brand svg").each(function(){
                try {
                    var objParent = $(this).parent();
                    objParent.html(objParent.html().replace(/\n/gi, '').trim());

                    var obj = objParent.find("svg");
                    var classes = obj.attr("class");
                    classes = classes.replace("visible-xs-inline-block", "");
                    obj.attr("class", classes);
                }catch(e){}
            });
        }

        //Form Init
        $("form").bind("submit", function(e) { return validateFormFields(this, true)});
        $(".single-select-group").each(function(i, e){
             var groupID = $(e).attr("id");
             $(this).find("input[type='radio']").on('click', function(e) {
                var group = document.getElementById(groupID);
                if(group && group.selectedValue && group.selectedValue != null && group.selectedValue == $(this).attr("id")) {
                    group.selectedValue = null;
                    $(this).removeAttr("checked");
                }
                else {
                    group.selectedValue = $(this).attr("id");
                }
             });
         });
        $('.mobile-firstlevel a.dropdown-toggle').click(function(e){
            e.preventDefault();
            var menuNode = $(this).parents('li');
            menuNode.siblings('li').removeClass('open');
            menuNode.toggleClass('open');
        });

        //Add for form label
        setLabelForAttr();
		
        $('.navbar-nav .dropdown').focusin(function(){
            if(!$(this).hasClass('open')) {
                $('.dropdown').removeClass('open');
                $('.dropdown [aria-expanded]').attr('aria-expanded',false);
                $('.navbar .search-suggest-box').hide();
                $(this).addClass('open');
                var elem = $(this).find('[aria-expanded]');
                if (elem.length>0) {
                    elem.attr('aria-expanded',true);
                }/*
                window.setTimeout(function(){
                    $('body').on('*','click',function(e){
                        if(e.parents('.navbar-tools').length==0) {
                            $('.dropdown').removeClass('open');
                            $('.dropdown [aria-expanded]').attr('aria-expanded',false);
                        }
                        $('body').off('click');
                    });
                },500);*/
            }
        });
        $('.navbar-tools .dropdown').mousedown(function(){
            $(this).data('clicked','clicked');
        });
        $('.navbar-tools .dropdown').mouseup(function(){
            $(this).removeData('clicked');
        });
        $('.navbar-tools .dropdown').focus(function(){
            if($(this).data('clicked')!=='clicked') {
                $(this).children('.dropdown-toggle').dropdown('toggle');
            }
        });
        $('.close-nav-dropdown-btn').focusout(function(){
            $(this).trigger('click.aia.navbar');
        });
        $('.search-suggest-box').focusout(function(){
            $('.dismiss-search-btn').trigger('click.aia.navbar');
        });

        var closeSearch = function(){
            var dd = $(this).parents('.dropdown');
            $('.search-suggest-box').hide();
            window.setTimeout(function () {
                dd.removeClass('open');
                dd.find('.dropdown-toggle').attr('aria-expanded', 'false');
            }, 100);
        };
        $('.dismiss-search-btn').click(closeSearch);
        $('.dismiss-search-btn').focusout(closeSearch);
    } catch(ee){}
});

function setLabelForAttr(formObj){
	if(formObj) {
		$(formObj).find("label").each(function(){
			if(this.hasAttribute("form-target-name")){
				var formElementName=this.getAttribute("form-target-name");
				var inputElement=$(formObj).find("input[name="+formElementName+"],select[name="+formElementName+"],textarea[name="+formElementName+"]");
				if(inputElement.length>0){
					var inputElementID=inputElement.attr("id");
					this.setAttribute("for", inputElementID)
				}
			}
		});
	} else {
		$("label").each(function(){
			if(this.hasAttribute("form-target-name")){
				var formElementName=this.getAttribute("form-target-name");
				var inputElement=$("input[name="+formElementName+"],select[name="+formElementName+"],textarea[name="+formElementName+"]");
				if(inputElement.length>0){
					var inputElementID=inputElement.attr("id");
					this.setAttribute("for", inputElementID)
				}
			}
		});
	}
}
function alignCardHeight(){
    document.headHeight = 0, document.descHeight = 0;
    $(".nav-switch a[data-toggle='tab']").on("click", function(){
        setTimeout(addCardStyle, 300);
    });
    addCardStyle();
}

function addCardStyle() {
    $('head style#card-style').remove();
    $('.card-2').each(function(){
        var hh = $(this).find('.card-head').outerHeight(),
            dh = $(this).find('.card-desc').outerHeight();

        if (hh>document.headHeight) document.headHeight = hh;
        if (dh>document.descHeight) document.descHeight = dh;
    });

    var rules = '@media (min-width: 768px) {.card-2 .card-head {height:'+document.headHeight+'px} .card-2 .card-desc {height:'+document.descHeight+'px}}';
	
	var ieVersion = parseInt(navigator.userAgent.toLowerCase().split('msie')[1],10);
	if(isNaN(ieVersion) || ieVersion > 8) {
		$('<style>').attr('id','card-style').text(rules).appendTo('head');
	}
}

function scrollToElement($elem, offset, time) {
    var $nb = $('.navbar-title-slim'), $nb3 = $('.navbar-three');

    var pos = $elem.offset().top -
      ($nb.position().top + $nb.height()
      + ($nb3.length > 0?$nb3.height():0))
      - (offset!=undefined?offset:0);

    $('body, html').animate({
        scrollTop: pos
    }, (time || 500));
}

function buttonClick(obj){
	if(!$(obj).data('toggle') && $(obj).data('link')) {
		window.open($(obj).data('link'),$(obj).data('target'));
	}

	setButtonTextData(obj,$(obj).text());
}

function toggleNavZero() {

    var 
		protocolPattern = new RegExp(/^https?:\/\//),
    	navBarZero = $('.navbar-zero'),
        navMenuZero = $('.navmenu-zero');

    if(navMenuZero.length>0) {

        var matchedHref = null, matchedTitle = null;

        navMenuZero.find('ul li a').each(function(){
			var href = $(this).attr('href');
            if(href) {
                href = href.replace(protocolPattern,'');
                if(href.lastIndexOf('/') > 0) {
                    var substr = href.substring(0,href.lastIndexOf('/'));
                    if(new RegExp(substr).test(location.href)) {
						matchedHref = $(this).attr('href');
                        matchedTitle = $(this).text();
                        return false;
                    }
                }
            }
        });

        if(matchedHref && matchedTitle) {
			var anchor = navMenuZero.children('li').children('a');
            if(anchor.length>0) {
				anchor.attr('href',matchedHref);
                anchor.text(matchedTitle);
            }
        }
    }

    if(navBarZero.length>0) {
		navBarZero.find('li a').removeClass('w');
        navBarZero.find('li a').each(function(){
            var href = $(this).attr('href');
            if(href) {
                href = href.replace(protocolPattern,'');
                if(href.lastIndexOf('/') > 0) {
                    var substr = href.substring(0,href.lastIndexOf('/'));
                    if(new RegExp(substr).test(location.href)) {
                        $(this).addClass('w');
                        return false;
                    }
                }
            }
        });
    }
}

function closeModalVideo() {
	try {
		$('.video-modal iframe, .modal-container iframe').each(function(){
			$(this).attr('src',$(this).attr('src'));
		});
        $('.video-modal video').each(function(){
            $(this)[0].pause();
        });
	} catch (err) {
	}
}
jQuery(document).ready(function($){
    // initialize popovers specific to this template
    $('body').popover({
        container: 'body',
        trigger: 'focus',
        placement: 'bottom',
        selector:'[data-toggle=popover]',
        html: true,
        content: function() {
            return $('#' + $(this).data('target')).html();
        }
    });
    $('body').on('click','a[data-toggle=popover]',function(e){
		e.preventDefault();
    });
    $('[data-toggle=popover]').on('click', function(){
		$(this).focus();
    });
    $(window).bind('resize', function () {
        $(".popover[role='tooltip']").hide();
    }).trigger('resize');
});
/*
 * jQuery-ajaxTransport-XDomainRequest - v1.0.4 - 2015-03-05
 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
 * Copyright (c) 2015 Jason Moon (@JSONMOON)
 * Licensed MIT (/blob/master/LICENSE.txt)
 */
(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else if(typeof exports==='object'){module.exports=a(require('jquery'))}else{a(jQuery)}}(function($){if($.support.cors||!$.ajaxTransport||!window.XDomainRequest){return $}var n=/^(https?:)?\/\//i;var o=/^get|post$/i;var p=new RegExp('^(\/\/|'+location.protocol+')','i');$.ajaxTransport('* text html xml json',function(j,k,l){if(!j.crossDomain||!j.async||!o.test(j.type)||!n.test(j.url)||!p.test(j.url)){return}var m=null;return{send:function(f,g){var h='';var i=(k.dataType||'').toLowerCase();m=new XDomainRequest();if(/^\d+$/.test(k.timeout)){m.timeout=k.timeout}m.ontimeout=function(){g(500,'timeout')};m.onload=function(){var a='Content-Length: '+m.responseText.length+'\r\nContent-Type: '+m.contentType;var b={code:200,message:'success'};var c={text:m.responseText};try{if(i==='html'||/text\/html/i.test(m.contentType)){c.html=m.responseText}else if(i==='json'||(i!=='text'&&/\/json/i.test(m.contentType))){try{c.json=$.parseJSON(m.responseText)}catch(e){b.code=500;b.message='parseerror'}}else if(i==='xml'||(i!=='text'&&/\/xml/i.test(m.contentType))){var d=new ActiveXObject('Microsoft.XMLDOM');d.async=false;try{d.loadXML(m.responseText)}catch(e){d=undefined}if(!d||!d.documentElement||d.getElementsByTagName('parsererror').length){b.code=500;b.message='parseerror';throw'Invalid XML: '+m.responseText;}c.xml=d}}catch(parseMessage){throw parseMessage;}finally{g(b.code,b.message,c,a)}};m.onprogress=function(){};m.onerror=function(){g(500,'error',{text:m.responseText})};if(k.data){h=($.type(k.data)==='string')?k.data:$.param(k.data)}m.open(j.type,j.url);m.send(h)},abort:function(){if(m){m.abort()}}}});return $}));

$(function(){
	var amountScrolled = 300;

    $(window).scroll(function() {
      if ($(window).scrollTop() > amountScrolled) {
        $('a.back-to-top').fadeIn('slow');
      } else {
        $('a.back-to-top').fadeOut('slow');
      }
    });

    $('a.back-to-top, a.simple-back-to-top').click(function() {
      $('html,body').animate({
        scrollTop: 0
      }, 'fast');
      return false;
    });
});

/**
 * jQuery plugin for responsive & dynamic table data management
 */
;(function ( $ ) {
	'use strict';

	/**
	 * Table Manager plugin. This does a couple of things:
	 * 1. Sets up the responsible table headers
	 * 2. Adds data management to a table
	 */
	function TableManager() {
		// Plugin defaults
		this._defaults = {
			// Where to find the images
			imageBase: '/content/dam/aia/icons/',

			// register default data converters
			converters: {
				'string': function(data, options) {
					return (data).toString();
				},
				'date': function(data, options, colInfo) {

					var t,y,m,d,s='';
					t = new Date(data);
					y = t.getFullYear().toString();
					m = (t.getMonth()+1).toString();
					m = (m.length==1?'0'+m:m);
					d = (t.getDate()).toString();
					d = (d.length==1?'0'+d:d);
					
					if(colInfo.dateformat && colInfo.dateformat!='') {
						s = colInfo.dateformat.replace('y',y).replace('m',m).replace('d',d);
					} else {
						s = y + '-' + m + '-' + d;
					}
					
					return s;
				},
				'link': function(data, options, colInfo, rowData) {
					var link = $.tablemanager._templateString(colInfo.link, rowData);
					return $('<a>')
					  .attr('href', link)
					  .addClass('lk2')
					  .text(data);
				},
				'rating': function(data, options) {
					if (!data) data = '0';
					var $img = $.tablemanager._createSvgImageTag('rating-'+data+'star', 'rating-'+data+'star', options);

					// jQuery bug
					$img.attr('class', $img.attr('class')+' icon-xxs-rating-'+data+'star');
					var $tmp = $img.find('image')
					$tmp.attr('class', $tmp.attr('class')+' icon-fallback-rating-'+data+'star');

					return $img;
				},
				'stockMovement': function(data, options) {
					var val = Number(data); // todo: call the currency formatter?

					if (isNaN(val)) {
						return $('<span>').addClass('figure-none').html('&nbsp;');
					} else if (0 === val) {
						return $('<span>').addClass('figure-nochange').html('&nbsp;0');
					} else {
						return $('<span>').addClass('figure-'+(val>0?'up':'down')).text((val>0?'+':'')+val);
					}
				},
				'currency': function(data, options) {
					var val = Number(data); // todo: align right?
					var symbol = options.symbol || '';
					var postfix = options.postfix || false;

					return $('<span>').text((symbol!==''&&postfix===false?symbol+' ':'')+val+(symbol!==''&&postfix===true?' '+symbol:''));
				},
				'iconLink': function(data, options) {
					var fileType=(data).toString().match(/\.\w+?$/);
					fileType = (null === fileType)?'unknown':fileType[0].replace('\.', '').toLowerCase();

					  // jQuery bug
					  var $img = $.tablemanager._createSvgImageTag('file-'+fileType, 'file-'+fileType, options);
					  $img.attr('class', $img.attr('class')+' icon-xxs');

					return $('<a>')
					  .attr('href', data)
					  .append($img);
				}
			}
		};
	};

	/**
	 * Add secondary functions to be called
	 */
	$.extend(TableManager.prototype, {
		className: "TableManager",
		markerClassName: "hasTableManager",
		rowDataName: "row-data",

		/**
		 * Attach the table manager settings specific to this object, to
		 * to the object.
		 * @param target the target element
		 * @param settings additional settings to override the defaults
		 */
		_attachTableManager: function(target, settings) {
			var $target = $(target);
			if($target.hasClass(this.markerClassName)) return;

			// Store the dynamic table settings
			var localsettings = $.extend(true, {}, this._defaults, settings || {});
			$target.data(this.className, localsettings);

			// Add the responsive rules
			var id = '#'+$target.attr('id');
			var rules = '@media (max-width: 767px)  { ';

			// build the rules
			$target.find('th').each(function(ri) {
				ri++;
				rules += ' '+id+' td:nth-of-type('+ri+')::before {content: "'+$(this).text().trim().replace(/\s+/g,' ')+'";}';
			});
	
			rules += ' } ';
			$('<style>').text(rules).appendTo('head');
			$target.addClass(this.markerClassName);
		},

		/**
		 * Clear the contents (rows) from a table
		 * @param target the target element
		 */
		_clearTableManager: function(target) {
			$(target).find('tbody').empty();
		},

		/**
		 * Get the settings for a specific element
		 * @param the target element
		 */
		_getSettings: function(target) {
			var settings = $(target).data(this.className);
			return settings ? settings : this._defaults;
		},

		/**
		 * Load some data from an JSON source.
		 * This will automatically call any formatters registered on that
		 * column.
		 *
		 * @param target the target element
		 * @param src The URL of the data/web service location
		 * @param params The additional parameters to be passed to the service
		 * @param clear True if the existing table data should be removed
		 */
		_loadJSONTableManager: function(target, src, params, clear) {
			var $target = $(target);
			if (true === clear) this._clearTableManager(target);

			// Hide any error messages
			$('section[id^="'+$target.attr('id')+'-"]').not('.hide').addClass('hide');

			// get the table headers
			var tableHeaders = this._extractTableHeaders($target);

			// Converters to use
			var settings = this._getSettings(target);

			// Perform the data load
			$.ajax({
				url: src,
				data: params,
				cache: false,
				dataType: 'json'
			}).done(function(data, textStatus, jqXHR) {
				var row, col, rows=[];
				if (jqXHR.status == 204) { // no content
					$('#'+$target.attr('id')+'-no-data').removeClass('hide');
				}
				for(row=0; row<data.length; row++) {
					var $cols = $('<tr>')
					  .data($.tablemanager.rowDataName, data[row]);

					for (col=0; col<tableHeaders.length; col++) {
						var rowData = data[row][tableHeaders[col].name];
						if ('undefined' === typeof rowData) rowData = '';
						$('<td>')
						  .addClass('padding-right-xs padding-top-xxs ' + tableHeaders[col].name)
						  .html(settings.converters[tableHeaders[col].type](rowData, settings, tableHeaders[col], data[row])).appendTo($cols);
					}
					rows.push($cols[0]);
				}
				$target.find('tbody').append(rows);
			}).fail(function( jqXHR, textStatus, errorThrown ) {
				$('#'+$target.attr('id')+'-error').removeClass('hide');
			});
		},

		/**
		 * Load some data from an object
		 * This will automatically call any formatters registered on that
		 * column. The data object is:
		 * obj = {
		 *   data: [{},...],
		 *   columnHeaders: {...}
		 * }
		 *
		 * @param target the target element
		 * @param obj The object containing the data to load
		 * @param clear True if the existing table data should be removed
		 */
		_populateFromObjectTableManager: function(target, obj, clear) {
			var $target = $(target);
			if (true === clear) this._clearTableManager(target);

			// Hide any error messages
			$('section[id^="'+$target.attr('id')+'-"]').not('.hide').addClass('hide');

			// get the table headers
			var tableHeaders = this._extractTableHeaders($target, obj.columnHeaders);

			// Converters to use
			var settings = this._getSettings(target);

			// Perform the data load
			if(obj.data!=null) {
				var row, col, rows=[], data = obj.data;

				for(row=0; row<data.length; row++) {
					var $cols = $('<tr>')
					  .data($.tablemanager.rowDataName, data[row]);

					for (col=0; col<tableHeaders.length; col++) {
						var rowData = data[row][tableHeaders[col].name];
						if ('undefined' === typeof rowData) rowData = '';
						$('<td>')
						  .addClass('padding-right-xs padding-top-xxs ' + tableHeaders[col].name)
						  .html(settings.converters[tableHeaders[col].type](rowData, settings, tableHeaders[col], data[row])).appendTo($cols);
					}
					rows.push($cols[0]);
				}
				$target.find('tbody').append(rows);
			}
		},

		/**
		 * Load some from an array
		 * This will automatically call any formatters registered on that
		 * column. This assumes the data is in an array format
		 * obj = {
		 *   data: [[],...],
		 *   columnHeaders: {...}
		 * }
		 *
		 * @param target the target element
		 * @param obj The object containing the data to load
		 * @param clear True if the existing table data should be removed
		 */
		_populateFromArrayTableManager: function(target, obj, clear) {
			var $target = $(target);
			if (true === clear) this._clearTableManager(target);

			// Hide any error messages
			$('section[id^="'+$target.attr('id')+'-"]').not('.hide').addClass('hide');

			// get the table headers
			var tableHeaders = this._extractTableHeaders($target, obj.columnHeaders);

			// Converters to use
			var settings = this._getSettings(target);

			// Perform the data load
			if(obj.data!=null) {
				var row, col, rows=[], data = obj.data;

				for(row=0; row<data.length; row++) {
					var $cols = $('<tr>')
					  .data($.tablemanager.rowDataName, data[row]);

					for (col=0; col<tableHeaders.length; col++) {
						var rowData = data[row][col];
						if ('undefined' === typeof rowData) rowData = '';
						$('<td>')
						  .addClass('padding-right-xs padding-top-xxs ' + tableHeaders[col].name)
						  .html(settings.converters[tableHeaders[col].type](rowData, settings, tableHeaders[col], data[row])).appendTo($cols);
					}
					rows.push($cols[0]);
				}
				$target.find('tbody').append(rows);
			}
		},

		/**
		 * Extract/setup the table headers
		 * @param $target The jQuery object to target
		 * @param headers The headers to setup if needed
		 * @return an object containing the header definitions
		 */
		_extractTableHeaders: function($target, headers) {
			headers = headers || null;

			// get the table headers
			var tableHeaders = [];
			$target.find('tr th').each(function() {
				var $this = $(this);
				var dataName = $this.data('src-name');
				var dataType = $this.data('src-type');
				var linkDest = $this.data('src-link-dest');
				var dateformat = $this.data('dateformat');

				if(headers!==null && typeof headers[dataName]!=='undefined') {
					$this.text(headers[dataName]);
				}

				tableHeaders.push({
					name: dataName,
					type: dataType ? dataType : 'string',
					link: linkDest ? linkDest : '',
					dateformat: dateformat ? dateformat :''
				});
			});
			return tableHeaders;
		},
		
		/**
		 * Image helper
		 * This isnt table related but needs to move into some DLS helpers. Need to use DOM
		 * as jQuery cannot cope with namespaces.
		 * TODO: the title may not be helpful
		 */
		_createSvgImageTag: function(img, title, options) {
			var svgns = 'http://www.w3.org/2000/svg';
			var xlinkns = 'http://www.w3.org/1999/xlink';

			var cn, svgnode = document.createElementNS(svgns, 'svg');
			svgnode.setAttributeNS('', 'class', 'hide-on-fallback');
			svgnode.setAttributeNS('', 'role', 'img');
			svgnode.setAttributeNS('', 'title', title);

			cn = document.createElementNS(svgns, 'use');
			cn.setAttributeNS(xlinkns, 'xlink:href', options.imageBase+'icons.svg#'+img);
			svgnode.appendChild(cn);

			cn = document.createElementNS(svgns, 'image');
			cn.setAttributeNS('', 'src', options.imageBase+img+'.png');
			cn.setAttributeNS('', 'class', 'icon-fallback');
			cn.setAttributeNS(xlinkns, 'xlink:href', '');
			svgnode.appendChild(cn);

			return $(svgnode);
		},

		/**
		 * Template helper
		 * This is a cheap & cheerful templating engine for URLs etc.
		 * @param str The string to apply the template to.
		 * @param data The data map
		 * @return A formatted string
		 */
		_templateString: function(str, data) {
			str = str || '';
			var i, arr = str.match(/{{\w.+?}}/g);
			if (null === arr) return str;
			
			// Start the template
			for(i=0; i<arr.length; i++) {
				var attr = arr[i].replace(/[{}]+/g, '');
				str = str.replace(new RegExp(arr[i], 'g'), data[attr]?data[attr]:'');
			}
			return str;
		},

		/**
		 * Create a unique id
		 * @return a GUID
		 */
		_createId: function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		}
	});


	/**
	 * Plugin main function
	 */
	$.fn.tableManager = function(options) {
		if ( !this.length ) {
			return this;
		}

		var otherArgs = Array.prototype.slice.call(arguments, 1);

		// Standard calls
		this.filter('table').each(function(ti) {
			// Assign an ID if none exists - little hacky
			var $this = $(this);
			if ('undefined' === typeof $this.attr('id')) {
				$this.attr('id', $.tablemanager._createId());
			}
			typeof options === "string" ?
			  $.tablemanager["_" + options + "TableManager"].apply($.tablemanager, [this].concat(otherArgs)) :
			  $.tablemanager._attachTableManager(this, options);
		});

		return this;
	};

	// Store a global singleton reference
	$.tablemanager = new TableManager();

}( jQuery ));
;(function ($) {
  $.fn.ngResponsiveTables = function(options) {
    var defaults = {
    smallPaddingCharNo: 5,
    mediumPaddingCharNo: 10,
    largePaddingCharNo: 15
    },
    $selElement = this,
    ngResponsiveTables = {
      opt: '',
      dataContent: '',
      globalWidth: 0,
    init: function(){
      this.opt = $.extend( defaults, options );
      ngResponsiveTables.targetTable();
    },
    targetTable: function(){
      var that = this;
      $selElement.find('tr').each(function(){
        $(this).find('td').each(function(i, v){
          that.checkForTableHead( $(this), i );
          $(this).addClass('tdno' + i);
        });
      });
    },
    checkForTableHead: function(element, index){
      if( $selElement.find('th').length ){
        this.dataContent = $selElement.find('th')[index].textContent;
      }else{
        this.dataContent = $selElement.find('tr:first td')[index].textContent;
      }
      // This padding is for large texts inside header of table
      // Use small, medium and large paddingMax values from defaults to set-up offsets for each class
      if( this.opt.smallPaddingCharNo > $.trim(this.dataContent).length ){
        element.addClass('small-padding');
      }else if( this.opt.mediumPaddingCharNo > $.trim(this.dataContent).length ){
        element.addClass('medium-padding');
      }else{
        element.addClass('large-padding');
      }
      element.attr('data-content', this.dataContent);
    }
  };

  $(function(){
    ngResponsiveTables.init();
  });
    return this;
  };

}(jQuery));
(function(window, $) {
    "use strict";

    // Collapsible Carousel
    var collapsibleCarousel = $('[data-target="collapsible-carousel"]');

    if(collapsibleCarousel.length>0) {
	    $(collapsibleCarousel).slick({
	      autoplay: true,
	      arrows: false,
	      waitForAnimate: false,
	      dots: true,
	      infinite: true,
	      speed: 500,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      touchThreshold: 20,
	      mobileFirst: true,
	      responsive: [
	        {
	          breakpoint: 1200,
	          settings: {
	            arrows: true
	          }
	        }
	      ]
	    });
    }
    
})(window, jQuery); 
(function(window, $) {
    "use strict";

    // Carousel and Carousel Nav
    var tabs = $('[data-target="hero-carousel-nav"]').find(".carousel-tab");
    var carousel = $('[data-target="hero-carousel"]');
    var slides = $('[data-target="slide"]');

    if (carousel.length>0) {
    	$(carousel).slick({
	  	arrows: false,
	  	pauseOnHover: true,
	      autoplay: true,
	      waitForAnimate: false,
	      dots: true,
	      infinite: true,
	      speed: 500,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      touchThreshold: 20,
	      mobileFirst: true,
	      responsive: [
	        {
	          breakpoint: 1200,
	          settings: {
	            dots: false
	          }
	        }
	      ]
	    });
	    
	    // Pause carousel during mobile nav menu
	    $('.offcanvas').on('show.bs.offcanvas', function() {
	      $(carousel)[0].slick.slickPause();
	    });
	    $('.offcanvas').on('hidden.bs.offcanvas', function() {
	      $(carousel)[0].slick.slickPlay();
	    });
	
	    $(tabs).each(function(index) {
	      $(tabs[index]).attr("data-tab-index", index);
	    });
	
	    $(carousel).on('afterChange', function() {
	      var currentSlideIndex = $(carousel).slick('slickCurrentSlide');
	      $(tabs).removeClass("active");
	      $(tabs).eq(currentSlideIndex).addClass("active");
	    });
	
	    var currentTabIndex, tabIndex;
	
	    $(tabs).on('mouseover', function() {
	      var currentTabIndex = $(tabs).index(this);
	      $(tabs).removeClass("active");
	      $(tabs).eq(currentTabIndex).addClass("active");
	      $(carousel)[0].slick.slickGoTo(parseInt(currentTabIndex));
          $(".hero-carousel").slick("slickPause");
	    });
	    $(tabs).on('mouseout', function() {
          $(".hero-carousel").slick("slickPlay");
	    });
    
    }

})(window, jQuery); 
(function(window, $) {
    "use strict";

    // Text Carousel
    var initTextCarousel = function(textCarousel) {                
        $(textCarousel).slick({
            autoplay : true,
            arrows : false,
            dots : true,
            infinite : true,
            speed : 500,
            slidesToShow : 1,
            slidesToScroll : 1,
            touchThreshold : 20,
            mobileFirst : true,
            responsive : [{
                breakpoint : 1200,
                settings : {
                    arrows : true
                }
            }]
        });
    };
    
    if( $.cookie('wcmmode') != 'edit' ){
        $(function(){
            var textCarousel = $('[data-target="text-carousel"]');
            initTextCarousel(textCarousel);
        });
    } 
})(window, jQuery); 
$(function(){
	$(document).on('click', '.collapsible-table .expand-all', function () {
        var wrapper = $(this).parent();
        wrapper.find('.expand-all, .collapse-all').toggleClass('hide');
        wrapper.find('.collapsible-table-content').collapse('show');
        var title = wrapper.find('h4').text();
        setCollapsibleTableClicked(title);
    });
    $(document).on('click', '.collapsible-table .collapse-all', function () {
        var wrapper = $(this).parent();
        wrapper.find('.expand-all, .collapse-all').toggleClass('hide');
        wrapper.find('.collapsible-table-content').collapse('hide');
    });
});
/* jssocials - v1.0.0 - 2015-10-16
 * http://js-socials.com
 * Copyright (c) 2015 Artem Tabalin; Licensed MIT */
! function(a, b, c) {
    function d(a, c) {
        var d = b(a);
        d.data(f, this), this._$element = d, this.shares = [], this._init(c), this._render()
    }
    var e = "JSSocials",
        f = e,
        g = function(a, c) {
            return b.isFunction(a) ? a.apply(c, b.makeArray(arguments).slice(2)) : a
        },
        h = /(\.(jpeg|png|gif|bmp)$|^data:image\/(jpeg|png|gif|bmp);base64)/i,
        i = /(&?[a-zA-Z0-9]+=)\{([a-zA-Z0-9]+)\}/g,
        j = {
            G: 1e9,
            M: 1e6,
            K: 1e3
        },
        k = [];
    d.prototype = {
        url: "",
        text: "",
        showLabel: function(a) {
            return this.showCount === !1 ? a > this.smallScreenWidth : a >= this.largeScreenWidth
        },
        showCount: function(a) {
            return a <= this.smallScreenWidth ? "inside" : !0
        },
        smallScreenWidth: 640,
        largeScreenWidth: 1024,
        resizeTimeout: 200,
        elementClass: "jssocials",
        sharesClass: "jssocials-shares",
        shareClass: "jssocials-share",
        shareButtonClass: "jssocials-share-button",
        shareLinkClass: "jssocials-share-link",
        shareLogoClass: "jssocials-share-logo",
        shareLabelClass: "jssocials-share-label",
        shareLinkCountClass: "jssocials-share-link-count",
        shareCountBoxClass: "jssocials-share-count-box",
        shareCountClass: "jssocials-share-count",
        shareZeroCountClass: "jssocials-share-no-count",
        _init: function(a) {
            this._initDefaults(), b.extend(this, a), this._initShares(), this._attachWindowResizeCallback()
        },
        _initDefaults: function() {
            this.url = a.location.href, this.text = b.trim(b("head title").text() || b("meta[name=description]").attr("content"))
        },
        _initShares: function() {
            this.shares = b.map(this.shares, b.proxy(function(a) {
                "string" == typeof a && (a = {
                    share: a
                });
                var c = a.share && k[a.share];
                if (!c && !a.renderer) throw Error("Share '" + a.share + "' is not found");
                return b.extend({
                    url: this.url,
                    text: this.text
                }, c, a)
            }, this))
        },
        _attachWindowResizeCallback: function() {
            b(a).on("resize", b.proxy(this._windowResizeHandler, this))
        },
        _detachWindowResizeCallback: function() {
            b(a).off("resize", this._windowResizeHandler)
        },
        _windowResizeHandler: function() {
            (b.isFunction(this.showLabel) || b.isFunction(this.showCount)) && (a.clearTimeout(this._resizeTimer), this._resizeTimer = setTimeout(b.proxy(this.refresh, this), this.resizeTimeout))
        },
        _render: function() {
            this._clear(), this._defineOptionsByScreen(), this._$element.addClass(this.elementClass), this._$shares = b("<div>").addClass(this.sharesClass).appendTo(this._$element), this._renderShares()
        },
        _defineOptionsByScreen: function() {
            this._screenWidth = b(a).width(), this._showLabel = g(this.showLabel, this, this._screenWidth), this._showCount = g(this.showCount, this, this._screenWidth)
        },
        _renderShares: function() {
            b.each(this.shares, b.proxy(function(a, b) {
                this._renderShare(b)
            }, this))
        },
        _renderShare: function(a) {
            var c;
			if(!a.displayMode ||
				(a.displayMode === 'mobile' && this._isMobile()) ||
				(a.displayMode === 'desktop' && !this._isMobile()) ||
				(a.displayMode === 'mobile-not-ipad' && this._isMobile() && !this._isiPad())) {
				c = b.isFunction(a.renderer) ? b(a.renderer()) : this._createShare(a), c.addClass(this.shareClass).addClass(a.share ? "jssocials-share-" + a.share : "").addClass(a.css).appendTo(this._$shares)
			}
        },
		_isMobile:function(){
			return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		},
		_isiPad:function(){
			return /iPad/i.test(navigator.userAgent);
		},
        _createShare: function(a) {
            var c = b("<div>"),
                d = this._createShareLink(a).appendTo(c);
            if (this._showCount) {
                var e = "inside" === this._showCount,
                    f = e ? d : b("<div>").addClass(this.shareCountBoxClass).appendTo(c);
                f.addClass(e ? this.shareLinkCountClass : this.shareCountBoxClass), this._renderShareCount(a, f)
            }
            return c
        },
        _createShareLink: function(a) {
            var c = b("<a>").addClass(this.shareLinkClass).attr({
                href: this._getShareUrl(a),
                target: this._getShareUrl(a).substr(0, 6) === "mailto" ? "_self" : "_blank"
            }).append(this._createShareLogo(a));
            return b.each(this.on || {}, function(d, e) {
                b.isFunction(e) && c.on(d, b.proxy(e, a))
            }), this._showLabel && c.append(this._createShareLabel(a)), c
        },
        _getShareUrl: function(a) {
            var b = g(a.shareUrl, a);
            return this._formatShareUrl(b, a)
        },
        _createShareLogo: function(a) {
            var c = a.logo,
                d = h.test(c) ? b("<img>").attr({
                    "src": a.logo,
                    "alt": a.title
                }) : b("<i>").addClass(c);
            return d.addClass(this.shareLogoClass), d
        },
        _createShareLabel: function(a) {
            return b("<span>").addClass(this.shareLabelClass).text(a.label)
        },
        _renderShareCount: function(a, c) {
            var d = b("<span>").addClass(this.shareCountClass);
            c.addClass(this.shareZeroCountClass).append(d), this._loadCount(a).done(b.proxy(function(a) {
                a && (c.removeClass(this.shareZeroCountClass), d.text(a))
            }, this))
        },
        _loadCount: function(a) {
            var c = b.Deferred(),
                d = this._getCountUrl(a);
            if (!d) return c.resolve(0).promise();
            var e = b.proxy(function(b) {
                c.resolve(this._getCountValue(b, a))
            }, this);
            return b.getJSON(d).done(e).fail(function() {
                b.get(d).done(e).fail(function() {
                    c.resolve(0)
                })
            }), c.promise()
        },
        _getCountUrl: function(a) {
            var b = g(a.countUrl, a);
            return this._formatShareUrl(b, a)
        },
        _getCountValue: function(a, c) {
            var d = (b.isFunction(c.getCount) ? c.getCount(a) : a) || 0;
            return "string" == typeof d ? d : this._formatNumber(d)
        },
        _formatNumber: function(a) {
            return b.each(j, function(b, c) {
                return a >= c ? (a = parseFloat((a / c).toFixed(2)) + b, !1) : void 0
            }), a
        },
        _formatShareUrl: function(b, c) {
            return b.replace(i, function(b, d, e) {
                var f = c[e] || "";
                return f ? d + a.encodeURIComponent(f) : ""
            })
        },
        _clear: function() {
            a.clearTimeout(this._resizeTimer), this._$element.empty()
        },
        refresh: function() {
            this._render()
        },
        destroy: function() {
            this._clear(), this._detachWindowResizeCallback(), this._$element.removeClass(this.elementClass).removeData(f)
        },
        option: function(a, b) {
            return 1 === arguments.length ? this[a] : (this[a] = b, void this.refresh())
        }
    }, b.fn.jsSocials = function(a) {
        var e = b.makeArray(arguments),
            g = e.slice(1),
            h = this;
        return this.each(function() {
            var e, i = b(this),
                j = i.data(f);
            if (j)
                if ("string" == typeof a) {
                    if (e = j[a].apply(j, g), e !== c && e !== j) return h = e, !1
                } else j._detachWindowResizeCallback(), j._init(a), j._render();
            else new d(i, a)
        }), h
    };
    var l = function(a) {
        var c;
        b.isPlainObject(a) ? c = d.prototype : (c = k[a], a = arguments[1] || {}), b.extend(c, a)
    };
    a.jsSocials = {
        Socials: d,
        shares: k,
        setDefaults: l
    }
}(window, jQuery),
function(a, b, c) {
    b.extend(c.shares, {
        email: {
            label: "E-mail",
            logo: "fa fa-at",
            shareUrl: "mailto:?subject={text}&body={url}",
            countUrl: ""
        },
        twitter: {
            label: "Tweet",
            logo: "fa fa-twitter",
            shareUrl: "https://twitter.com/share?url={url}&text={text}&via={via}&hashtags={hashtags}",
            countUrl: "https://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
            getCount: function(a) {
                return a.count
            }
        },
        facebook: {
            label: "Like",
            logo: "fa fa-facebook",
            shareUrl: "https://facebook.com/sharer/sharer.php?u={url}",
            countUrl: function() {
                return "https://graph.facebook.com/fql?q=SELECT total_count FROM link_stat WHERE url='" + a.encodeURIComponent(this.url) + "'"
            },
            getCount: function(a) {
                return a.data.length && a.data[0].total_count || 0
            }
        },
        googleplus: {
            label: "+1",
            logo: "fa fa-google-plus",
            shareUrl: "https://plus.google.com/share?url={url}",
            countUrl: function() {
                return "https://cors-anywhere.herokuapp.com/https://plusone.google.com/_/+1/fastbutton?url=" + a.encodeURIComponent(this.url)
            },
            getCount: function(a) {
                return parseFloat((a.match(/\{c: ([.0-9E]+)/) || [])[1])
            }
        },
        linkedin: {
            label: "Share",
            logo: "fa fa-linkedin",
            shareUrl: "https://www.linkedin.com/shareArticle?url={url}",
            countUrl: "https://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
            getCount: function(a) {
                return a.count
            }
        },
        pinterest: {
            label: "Pin it",
            logo: "fa fa-pinterest",
            shareUrl: "https://pinterest.com/pin/create/bookmarklet/?media={media}&url={url}&description={text}",
            countUrl: "https://api.pinterest.com/v1/urls/count.json?&url={url}&callback=?",
            getCount: function(a) {
                return a.count
            }
        }
    })
}(window, jQuery, window.jsSocials);
jsSocials.shares.email = {
   logo: "/content/dam/common/en/icons/message-2nd.png",
   shareUrl: "mailto:?subject={text}&body={url}",
   countUrl: "",
   title: 'Email'
};

jsSocials.shares.twitter =  {
   logo: "/content/dam/common/en/icons/twitter-2nd.png",
   shareUrl: "https://twitter.com/share?url={url}&text={text}&via={via}&hashtags={hashtags}",
   countUrl: "https://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
   getCount: function(data) {
      return data.count;
   },
   title: 'Twitter'
};

//update facebook share link 20161012
//old link : shareUrl: "https://www.facebook.com/dialog/feed?link={url}",
jsSocials.shares.facebook =  {
   logo: "/content/dam/common/en/icons/facebook-2nd.png",
   shareUrl: "https://facebook.com/sharer/sharer.php?u={url}",
   countUrl: function() {
      return "https://graph.facebook.com/fql?q=SELECT total_count FROM link_stat WHERE url='" + window.encodeURIComponent(this.url) + "'";
   },
   getCount: function(data) {
      return (data.data.length && data.data[0].total_count) || 0;
   },
   title: 'Facebook'
};

jsSocials.shares.googleplus =  {
   logo: "/content/dam/common/en/icons/google-2nd.png",
   shareUrl: "https://plus.google.com/share?url={url}",
   countUrl: function() {
      return "https://cors-anywhere.herokuapp.com/https://plusone.google.com/_/+1/fastbutton?url="+ window.encodeURIComponent(this.url);
   },
   getCount: function(data) {
      return parseFloat((data.match(/\{c: ([.0-9E]+)/) || [])[1]);
   },
   title: 'Google Plus'
};

jsSocials.shares.linkedin =  {
   logo: "/content/dam/common/en/icons/linkedin-2nd.png",
   shareUrl: "https://www.linkedin.com/shareArticle?url={url}",
   countUrl: "https://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
   getCount: function(data) {
      return data.count;
   },
   title: 'LinkedIn'
};

jsSocials.shares.line =  {
   logo: "/content/dam/common/en/icons/line-2nd.png",
   shareUrl: "http://line.me/R/msg/text/?"+window.encodeURIComponent(document.title)+"%0D%0A"+window.encodeURIComponent(location.href),
   countUrl: "",
   title: 'Line'
};

jsSocials.shares.whatsapp =  {
   logo: "/content/dam/common/en/icons/whatsapp-2nd.png",
   shareUrl: "whatsapp://send?text="+window.encodeURIComponent(location.href),
   countUrl: "",
   title: 'WhatsApp',
   displayMode: 'mobile-not-ipad'
};

/*
 * numeral.js
 * version : 1.5.3
 * author : Adam Draper.
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

(function () {

    /************************************
        Constants
    ************************************/

    var numeral,
        VERSION = '1.5.3',
        // internal storage for language config files
        languages = {},
        currentLanguage = 'en',
        zeroFormat = null,
        defaultFormat = '0,0',
        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports);


    /************************************
        Constructors
    ************************************/


    // Numeral prototype object
    function Numeral (number) {
        this._value = number;
    }

    /**
     * Implementation of toFixed() that treats floats more like decimals
     *
     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
     * problems for accounting- and finance-related software.
     */
    function toFixed (value, precision, roundingFunction, optionals) {
        var power = Math.pow(10, precision),
            optionalsRegExp,
            output;
            
        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
        // Multiply up by precision, round accurately, then divide and use native toFixed():
        output = (roundingFunction(value * power) / power).toFixed(precision);

        if (optionals) {
            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
            output = output.replace(optionalsRegExp, '');
        }

        return output;
    }

    /************************************
        Formatting
    ************************************/

    // determine what type of formatting we need to do
    function formatNumeral (n, format, roundingFunction) {
        var output;

        // figure out what kind of format we are dealing with
        if (format.indexOf('$') > -1) { // currency!!!!!
            output = formatCurrency(n, format, roundingFunction);
        } else if (format.indexOf('%') > -1) { // percentage
            output = formatPercentage(n, format, roundingFunction);
        } else if (format.indexOf(':') > -1) { // time
            output = formatTime(n, format);
        } else { // plain ol' numbers or bytes
            output = formatNumber(n._value, format, roundingFunction);
        }

        // return string
        return output;
    }

    // revert to number
    function unformatNumeral (n, string) {
        var stringOriginal = string,
            thousandRegExp,
            millionRegExp,
            billionRegExp,
            trillionRegExp,
            suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            bytesMultiplier = false,
            power;

        if (string.indexOf(':') > -1) {
            n._value = unformatTime(string);
        } else {
            if (string === zeroFormat) {
                n._value = 0;
            } else {
                if (languages[currentLanguage].delimiters.decimal !== '.') {
                    string = string.replace(/\./g,'').replace(languages[currentLanguage].delimiters.decimal, '.');
                }

                // see if abbreviations are there so that we can multiply to the correct number
                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');

                // see if bytes are there so that we can multiply to the correct number
                for (power = 0; power <= suffixes.length; power++) {
                    bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;

                    if (bytesMultiplier) {
                        break;
                    }
                }

                // do some math to create our number
                n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length-1, string.split(')').length-1)) % 2)? 1: -1) * Number(string.replace(/[^0-9\.]+/g, ''));

                // round if we are talking about bytes
                n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
            }
        }
        return n._value;
    }

    function formatCurrency (n, format, roundingFunction) {
        var symbolIndex = format.indexOf('$'),
            openParenIndex = format.indexOf('('),
            minusSignIndex = format.indexOf('-'),
            space = '',
            spliceIndex,
            output;

        // check for space before or after currency
        if (format.indexOf(' $') > -1) {
            space = ' ';
            format = format.replace(' $', '');
        } else if (format.indexOf('$ ') > -1) {
            space = ' ';
            format = format.replace('$ ', '');
        } else {
            format = format.replace('$', '');
        }

        // format the number
        output = formatNumber(n._value, format, roundingFunction);

        // position the symbol
        if (symbolIndex <= 1) {
            if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
                output = output.split('');
                spliceIndex = 1;
                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex){
                    // the symbol appears before the "(" or "-"
                    spliceIndex = 0;
                }
                output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
                output = output.join('');
            } else {
                output = languages[currentLanguage].currency.symbol + space + output;
            }
        } else {
            if (output.indexOf(')') > -1) {
                output = output.split('');
                output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
                output = output.join('');
            } else {
                output = output + space + languages[currentLanguage].currency.symbol;
            }
        }

        return output;
    }

    function formatPercentage (n, format, roundingFunction) {
        var space = '',
            output,
            value = n._value * 100;

        // check for space before %
        if (format.indexOf(' %') > -1) {
            space = ' ';
            format = format.replace(' %', '');
        } else {
            format = format.replace('%', '');
        }

        output = formatNumber(value, format, roundingFunction);
        
        if (output.indexOf(')') > -1 ) {
            output = output.split('');
            output.splice(-1, 0, space + '%');
            output = output.join('');
        } else {
            output = output + space + '%';
        }

        return output;
    }

    function formatTime (n) {
        var hours = Math.floor(n._value/60/60),
            minutes = Math.floor((n._value - (hours * 60 * 60))/60),
            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
        return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    }

    function unformatTime (string) {
        var timeArray = string.split(':'),
            seconds = 0;
        // turn hours and minutes into seconds and add them all up
        if (timeArray.length === 3) {
            // hours
            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
            // minutes
            seconds = seconds + (Number(timeArray[1]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[2]);
        } else if (timeArray.length === 2) {
            // minutes
            seconds = seconds + (Number(timeArray[0]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[1]);
        }
        return Number(seconds);
    }

    function formatNumber (value, format, roundingFunction) {
        var negP = false,
            signed = false,
            optDec = false,
            abbr = '',
            abbrK = false, // force abbreviation to thousands
            abbrM = false, // force abbreviation to millions
            abbrB = false, // force abbreviation to billions
            abbrT = false, // force abbreviation to trillions
            abbrForce = false, // force abbreviation
            bytes = '',
            ord = '',
            abs = Math.abs(value),
            suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            min,
            max,
            power,
            w,
            precision,
            thousands,
            d = '',
            neg = false;

        // check if number is zero and a custom zero format has been set
        if (value === 0 && zeroFormat !== null) {
            return zeroFormat;
        } else {
            // see if we should use parentheses for negative number or if we should prefix with a sign
            // if both are present we default to parentheses
            if (format.indexOf('(') > -1) {
                negP = true;
                format = format.slice(1, -1);
            } else if (format.indexOf('+') > -1) {
                signed = true;
                format = format.replace(/\+/g, '');
            }

            // see if abbreviation is wanted
            if (format.indexOf('a') > -1) {
                // check if abbreviation is specified
                abbrK = format.indexOf('aK') >= 0;
                abbrM = format.indexOf('aM') >= 0;
                abbrB = format.indexOf('aB') >= 0;
                abbrT = format.indexOf('aT') >= 0;
                abbrForce = abbrK || abbrM || abbrB || abbrT;

                // check for space before abbreviation
                if (format.indexOf(' a') > -1) {
                    abbr = ' ';
                    format = format.replace(' a', '');
                } else {
                    format = format.replace('a', '');
                }

                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
                    // trillion
                    abbr = abbr + languages[currentLanguage].abbreviations.trillion;
                    value = value / Math.pow(10, 12);
                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
                    // billion
                    abbr = abbr + languages[currentLanguage].abbreviations.billion;
                    value = value / Math.pow(10, 9);
                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
                    // million
                    abbr = abbr + languages[currentLanguage].abbreviations.million;
                    value = value / Math.pow(10, 6);
                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
                    // thousand
                    abbr = abbr + languages[currentLanguage].abbreviations.thousand;
                    value = value / Math.pow(10, 3);
                }
            }

            // see if we are formatting bytes
            if (format.indexOf('b') > -1) {
                // check for space before
                if (format.indexOf(' b') > -1) {
                    bytes = ' ';
                    format = format.replace(' b', '');
                } else {
                    format = format.replace('b', '');
                }

                for (power = 0; power <= suffixes.length; power++) {
                    min = Math.pow(1024, power);
                    max = Math.pow(1024, power+1);

                    if (value >= min && value < max) {
                        bytes = bytes + suffixes[power];
                        if (min > 0) {
                            value = value / min;
                        }
                        break;
                    }
                }
            }

            // see if ordinal is wanted
            if (format.indexOf('o') > -1) {
                // check for space before
                if (format.indexOf(' o') > -1) {
                    ord = ' ';
                    format = format.replace(' o', '');
                } else {
                    format = format.replace('o', '');
                }

                ord = ord + languages[currentLanguage].ordinal(value);
            }

            if (format.indexOf('[.]') > -1) {
                optDec = true;
                format = format.replace('[.]', '.');
            }

            w = value.toString().split('.')[0];
            precision = format.split('.')[1];
            thousands = format.indexOf(',');

            if (precision) {
                if (precision.indexOf('[') > -1) {
                    precision = precision.replace(']', '');
                    precision = precision.split('[');
                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
                } else {
                    d = toFixed(value, precision.length, roundingFunction);
                }

                w = d.split('.')[0];

                if (d.split('.')[1].length) {
                    d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];
                } else {
                    d = '';
                }

                if (optDec && Number(d.slice(1)) === 0) {
                    d = '';
                }
            } else {
                w = toFixed(value, null, roundingFunction);
            }

            // format number
            if (w.indexOf('-') > -1) {
                w = w.slice(1);
                neg = true;
            }

            if (thousands > -1) {
                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
            }

            if (format.indexOf('.') === 0) {
                w = '';
            }

            return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
        }
    }

    /************************************
        Top Level Functions
    ************************************/

    numeral = function (input) {
        if (numeral.isNumeral(input)) {
            input = input.value();
        } else if (input === 0 || typeof input === 'undefined') {
            input = 0;
        } else if (!Number(input)) {
            input = numeral.fn.unformat(input);
        }

        return new Numeral(Number(input));
    };

    // version number
    numeral.version = VERSION;

    // compare numeral object
    numeral.isNumeral = function (obj) {
        return obj instanceof Numeral;
    };

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    numeral.language = function (key, values) {
        if (!key) {
            return currentLanguage;
        }

        if (key && !values) {
            if(!languages[key]) {
                throw new Error('Unknown language : ' + key);
            }
            currentLanguage = key;
        }

        if (values || !languages[key]) {
            loadLanguage(key, values);
        }

        return numeral;
    };
    
    // This function provides access to the loaded language data.  If
    // no arguments are passed in, it will simply return the current
    // global language object.
    numeral.languageData = function (key) {
        if (!key) {
            return languages[currentLanguage];
        }
        
        if (!languages[key]) {
            throw new Error('Unknown language : ' + key);
        }
        
        return languages[key];
    };

    numeral.language('en', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '$'
        }
    });

    numeral.zeroFormat = function (format) {
        zeroFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.defaultFormat = function (format) {
        defaultFormat = typeof(format) === 'string' ? format : '0.0';
    };

    /************************************
        Helpers
    ************************************/

    function loadLanguage(key, values) {
        languages[key] = values;
    }

    /************************************
        Floating-point helpers
    ************************************/

    // The floating-point helper functions and implementation
    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/

    /**
     * Array.prototype.reduce for browsers that don't support it
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
     */
    if ('function' !== typeof Array.prototype.reduce) {
        Array.prototype.reduce = function (callback, opt_initialValue) {
            'use strict';
            
            if (null === this || 'undefined' === typeof this) {
                // At the moment all modern browsers, that support strict mode, have
                // native implementation of Array.prototype.reduce. For instance, IE8
                // does not support strict mode, so this check is actually useless.
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }
            
            if ('function' !== typeof callback) {
                throw new TypeError(callback + ' is not a function');
            }

            var index,
                value,
                length = this.length >>> 0,
                isValueSet = false;

            if (1 < arguments.length) {
                value = opt_initialValue;
                isValueSet = true;
            }

            for (index = 0; length > index; ++index) {
                if (this.hasOwnProperty(index)) {
                    if (isValueSet) {
                        value = callback(value, this[index], index, this);
                    } else {
                        value = this[index];
                        isValueSet = true;
                    }
                }
            }

            if (!isValueSet) {
                throw new TypeError('Reduce of empty array with no initial value');
            }

            return value;
        };
    }

    
    /**
     * Computes the multiplier necessary to make x >= 1,
     * effectively eliminating miscalculations caused by
     * finite precision.
     */
    function multiplier(x) {
        var parts = x.toString().split('.');
        if (parts.length < 2) {
            return 1;
        }
        return Math.pow(10, parts[1].length);
    }

    /**
     * Given a variable number of arguments, returns the maximum
     * multiplier that must be used to normalize an operation involving
     * all of them.
     */
    function correctionFactor() {
        var args = Array.prototype.slice.call(arguments);
        return args.reduce(function (prev, next) {
            var mp = multiplier(prev),
                mn = multiplier(next);
        return mp > mn ? mp : mn;
        }, -Infinity);
    }        


    /************************************
        Numeral Prototype
    ************************************/


    numeral.fn = Numeral.prototype = {

        clone : function () {
            return numeral(this);
        },

        format : function (inputString, roundingFunction) {
            return formatNumeral(this, 
                  inputString ? inputString : defaultFormat, 
                  (roundingFunction !== undefined) ? roundingFunction : Math.round
              );
        },

        unformat : function (inputString) {
            if (Object.prototype.toString.call(inputString) === '[object Number]') { 
                return inputString; 
            }
            return unformatNumeral(this, inputString ? inputString : defaultFormat);
        },

        value : function () {
            return this._value;
        },

        valueOf : function () {
            return this._value;
        },

        set : function (value) {
            this._value = Number(value);
            return this;
        },

        add : function (value) {
            var corrFactor = correctionFactor.call(null, this._value, value);
            function cback(accum, curr, currI, O) {
                return accum + corrFactor * curr;
            }
            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
            return this;
        },

        subtract : function (value) {
            var corrFactor = correctionFactor.call(null, this._value, value);
            function cback(accum, curr, currI, O) {
                return accum - corrFactor * curr;
            }
            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;            
            return this;
        },

        multiply : function (value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = correctionFactor(accum, curr);
                return (accum * corrFactor) * (curr * corrFactor) /
                    (corrFactor * corrFactor);
            }
            this._value = [this._value, value].reduce(cback, 1);
            return this;
        },

        divide : function (value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = correctionFactor(accum, curr);
                return (accum * corrFactor) / (curr * corrFactor);
            }
            this._value = [this._value, value].reduce(cback);            
            return this;
        },

        difference : function (value) {
            return Math.abs(numeral(this._value).subtract(value).value());
        }

    };

    /************************************
        Exposing Numeral
    ************************************/

    // CommonJS module is defined
    if (hasModule) {
        module.exports = numeral;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `numeral` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this['numeral'] = numeral;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return numeral;
        });
    }
}).call(this);

/*
 * numeral.js language configuration
 * language : belgium-dutch (be-nl)
 * author : Dieter Luypaert : https://github.com/moeriki
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal  : ','
        },
        abbreviations: {
            thousand : 'k',
            million  : ' mln',
            billion  : ' mld',
            trillion : ' bln'
        },
        ordinal : function (number) {
            var remainder = number % 100;
            return (number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20) ? 'ste' : 'de';
        },
        currency: {
            symbol: '€ '
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('be-nl', language);
    }
}());
/*
 * numeral.js language configuration
 * language : simplified chinese
 * author : badplum : https://github.com/badplum
 */
(function () {
    var language = {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: '千',
            million: '百万',
            billion: '十亿',
            trillion: '兆'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '￥'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('chs', language);
    }
}());

/*
 * numeral.js language configuration
 * language : czech (cs)
 * author : Anatoli Papirovski : https://github.com/apapirovski
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'tis.',
            million: 'mil.',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function () {
            return '.';
        },
        currency: {
            symbol: 'K?'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('cs', language);
    }
}());

/*
 * numeral.js language configuration
 * language : danish denmark (dk)
 * author : Michael Storgaard : https://github.com/mstorgaard
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mio',
            billion: 'mia',
            trillion: 'b'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'DKK'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('da-dk', language);
    }
}());
/*
 * numeral.js language configuration
 * language : German in Switzerland (de-ch)
 * author : Michael Piefel : https://github.com/piefel (based on work from Marco Krage : https://github.com/sinky)
 */ 
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'CHF'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('de-ch', language);
    }
}());
/*
 * numeral.js language configuration
 * language : German (de) – generally useful in Germany, Austria, Luxembourg, Belgium
 * author : Marco Krage : https://github.com/sinky
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('de', language);
    }
}());
/*
 * numeral.js language configuration
 * language : english united kingdom (uk)
 * author : Dan Ristic : https://github.com/dristic
 */
(function () {
    var language = {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '￡'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('en-gb', language);
    }
}());
/*
 * numeral.js language configuration
 * language : spanish Spain
 * author : Hernan Garcia : https://github.com/hgarcia
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (b === 1 || b === 3) ? 'er' :
                (b === 2) ? 'do' :
                    (b === 7 || b === 0) ? 'mo' :
                        (b === 8) ? 'vo' :
                            (b === 9) ? 'no' : 'to';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('es', language);
    }
}());

/*
 * numeral.js language configuration
 * language : spanish
 * author : Hernan Garcia : https://github.com/hgarcia
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (b === 1 || b === 3) ? 'er' :
                (b === 2) ? 'do' :
                (b === 7 || b === 0) ? 'mo' : 
		(b === 8) ? 'vo' :
		(b === 9) ? 'no' : 'to';
        },
        currency: {
            symbol: '$'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('es', language);
    }
}());

/*
 * numeral.js language configuration
 * language : Estonian
 * author : Illimar Tambek : https://github.com/ragulka
 *
 * Note: in Estonian, abbreviations are always separated
 * from numbers with a space
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: ' tuh',
            million: ' mln',
            billion: ' mld',
            trillion: ' trl'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('et', language);
    }
}());

/*
 * numeral.js language configuration
 * language : Finnish
 * author : Sami Saada : https://github.com/samitheberber
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'M',
            billion: 'G',
            trillion: 'T'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('fi', language);
    }
}());

/*
 * numeral.js language configuration
 * language : french (Canada) (fr-CA)
 * author : Léo Renaud-Allaire : https://github.com/renaudleo
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'M',
            billion: 'G',
            trillion: 'T'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'e';
        },
        currency: {
            symbol: '$'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('fr-CA', language);
    }
}());
/*
 * numeral.js language configuration
 * language : french (fr-ch)
 * author : Adam Draper : https://github.com/adamwdraper
 */
(function () {
    var language = {
        delimiters: {
            thousands: '\'',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'e';
        },
        currency: {
            symbol: 'CHF'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('fr-ch', language);
    }
}());

/*
 * numeral.js language configuration
 * language : french (fr)
 * author : Adam Draper : https://github.com/adamwdraper
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'e';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('fr', language);
    }
}());
/*
 * numeral.js language configuration
 * language : Hungarian (hu)
 * author : Peter Bakondy : https://github.com/pbakondy
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'E',  // ezer
            million: 'M',   // millió
            billion: 'Mrd', // milliárd
            trillion: 'T'   // trillió
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: ' Ft'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('hu', language);
    }
}());
/*
 * numeral.js language configuration
 * language : italian Italy (it)
 * author : Giacomo Trombi : http://cinquepunti.it
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'mila',
            million: 'mil',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return 'o';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('it', language);
    }
}());
/*
 * numeral.js language configuration
 * language : japanese
 * author : teppeis : https://github.com/teppeis
 */
(function () {
    var language = {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: '千',
            million: '百万',
            billion: '十億',
            trillion: '兆'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '￥'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('ja', language);
    }
}());

/*
 * numeral.js language configuration
 * language : netherlands-dutch (nl-nl)
 * author : Dave Clayton : https://github.com/davedx
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal  : ','
        },
        abbreviations: {
            thousand : 'k',
            million  : 'mln',
            billion  : 'mrd',
            trillion : 'bln'
        },
        ordinal : function (number) {
            var remainder = number % 100;
            return (number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20) ? 'ste' : 'de';
        },
        currency: {
            symbol: '€ '
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('nl-nl', language);
    }
}());
/*
 * numeral.js language configuration
 * language : polish (pl)
 * author : Dominik Bulaj : https://github.com/dominikbulaj
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'tys.',
            million: 'mln',
            billion: 'mld',
            trillion: 'bln'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'PLN'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('pl', language);
    }
}());
/*
 * numeral.js language configuration
 * language : portuguese brazil (pt-br)
 * author : Ramiro Varandas Jr : https://github.com/ramirovjr
 */
(function () {
    var language = {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'mil',
            million: 'milh?es',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return 'o';
        },
        currency: {
            symbol: 'R$'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('pt-br', language);
    }
}());
/*
 * numeral.js language configuration
 * language : portuguese (pt-pt)
 * author : Diogo Resende : https://github.com/dresende
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal : function (number) {
            return 'o';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('pt-pt', language);
    }
}());

// numeral.js language configuration
// language : Russian for the Ukraine (ru-UA)
// author : Anatoli Papirovski : https://github.com/apapirovski
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'тыс.',
            million: 'млн',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function () {
            // not ideal, but since in Russian it can taken on 
            // different forms (masculine, feminine, neuter)
            // this is all we can do
            return '.'; 
        },
        currency: {
            symbol: '\u20B4'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('ru-UA', language);
    }
}());

/*
 * numeral.js language configuration
 * language : russian (ru)
 * author : Anatoli Papirovski : https://github.com/apapirovski
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'тыс.',
            million: 'млн',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function () {
            // not ideal, but since in Russian it can taken on 
            // different forms (masculine, feminine, neuter)
            // this is all we can do
            return '.'; 
        },
        currency: {
            symbol: 'руб.'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('ru', language);
    }
}());

/*
 * numeral.js language configuration
 * language : slovak (sk)
 * author : Ahmed Al Hafoudh : http://www.freevision.sk
 */
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'tis.',
            million: 'mil.',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function () {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('sk', language);
    }
}());

/*
 * numeral.js language configuration
 * language : thai (th)
 * author : Sathit Jittanupat : https://github.com/jojosati
 */
(function () {
    var language = {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: '???',
            million: '????',
            billion: '???????',
            trillion: '????????'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '?'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('th', language);
    }
}());

/*
 * numeral.js language configuration
 * language : turkish (tr)
 * author : Ecmel Ercan : https://github.com/ecmel, Erhan Gundogan : https://github.com/erhangundogan, Burak Yi?it Kaya: https://github.com/BYK
 */
(function () {
    var suffixes = {
            1: '\'inci',
            5: '\'inci',
            8: '\'inci',
            70: '\'inci',
            80: '\'inci',

            2: '\'nci',
            7: '\'nci',
            20: '\'nci',
            50: '\'nci',

            3: '\'üncü',
            4: '\'üncü',
            100: '\'üncü',

            6: '\'nc?',

            9: '\'uncu',
            10: '\'uncu',
            30: '\'uncu',

            60: '\'?nc?',
            90: '\'?nc?'
        },
        language = {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'bin',
                million: 'milyon',
                billion: 'milyar',
                trillion: 'trilyon'
            },
            ordinal: function (number) {
                if (number === 0) {  // special case for zero
                    return '\'?nc?';
                }

                var a = number % 10,
                    b = number % 100 - a,
                    c = number >= 100 ? 100 : null;

              return suffixes[a] || suffixes[b] || suffixes[c];
            },
            currency: {
                symbol: '\u20BA'
            }
        };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('tr', language);
    }
}());

// numeral.js language configuration
// language : Ukrainian for the Ukraine (uk-UA)
// author : Michael Piefel : https://github.com/piefel (with help from Tetyana Kuzmenko)
(function () {
    var language = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'тис.',
            million: 'млн',
            billion: 'млрд',
            trillion: 'блн'
        },
        ordinal: function () {
            // not ideal, but since in Ukrainian it can taken on 
            // different forms (masculine, feminine, neuter)
            // this is all we can do
            return ''; 
        },
        currency: {
            symbol: '\u20B4'
        }
    };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = language;
    }
    // Browser
    if (typeof window !== 'undefined' && this.numeral && this.numeral.language) {
        this.numeral.language('uk-UA', language);
    }
}());
/**
 * jQuery plugin for dynamic data management
 * Depends on moment.js, numeral.js
 */
;(function ( $ ) {
	'use strict';

	/**
	 * Data manager plugin. Loads data for a component from a dynamic source
	 */
	function DataManager() {
		// Plugin defaults
		this._defaults = {
			// Where to find the images
			imageBase: '/content/dam/aia/icons/',

			// The prefix for dynamic data areas
			dataPrefix: 'src-',

			// Default date format. Can be overriden with data-src-date-format='...'
			dateFormat: 'YYYY/MM/DD',

			// Default link class
			linkClasses: 'lk2',

			// Default currency format
			currencyFormat: '$0,0',

			// register default data converters
			converters: {
				'string': function(typeProps, data, settings) {
					return (data).toString();
				},
				'date': function(typeProps, data, settings, colInfo) {
					var ts = moment(data); // Needs to be a ms timestamp
					return ts.format(typeProps.format || settings.dateFormat);
				},
				'link': function(typeProps, data, settings, rowData) {
					var link = templateString(typeProps.format, rowData);
					return $('<a>')
					  .attr('href', link)
					  .addClass(typeProps.classes || settings.linkClasses)
					  .text((data).toString());
				},
				'rating': function(typeProps, data, settings) {
					if (!data) data = '0';
					var $img = createSvgImageTag('rating-'+data+'star', 'rating-'+data+'star', settings);

					// jQuery bug
					$img.attr('class', $img.attr('class')+' icon-xxs-rating-'+data+'star');
					var $tmp = $img.find('image')
					$tmp.attr('class', $tmp.attr('class')+' icon-fallback-rating-'+data+'star');

					return $img;
				},
				'currency': function(typeProps, data, settings) {
					var val = Number(data);
					if (isNaN(val)) {
						return '';
					} else {
						return numeral(val).format(typeProps.format || settings.currencyFormat);
					}
				},
				'fileIconLink': function(typeProps, data, settings, rowData) {
					var $link = settings.converters.link(typeProps, '', settings, rowData);
					var fileType=$link.attr('href').replace(/\?.*$/,'').match(/\.\w+?$/);
					fileType = (null === fileType)?'unknown':fileType[0].replace('\.', '').toLowerCase();

					// jQuery bug
					var $img = createSvgImageTag('file-'+fileType, 'file-'+fileType, settings);
					$img.attr('class', $img.attr('class')+' icon-xxs');

					return $('<a>')
					  .attr('href', data)
					  .empty()
					  .append($img);
				}
			}
		};
	}

	/**
 	 * Populate an object from an object
	 * @param $target The root of the object to locate dynamic data in
	 * @param data The data to populate the object from
	 * @param settings The plugin settings
	 */
	function populateData($target, data, settings) {

		$target.find('[data-'+settings.dataPrefix+'name]').each(function(index) {
			var $this = $(this);
			if (!data[$this.data(settings.dataPrefix+'name')]) return;

			// Set the default type
			if (!$this.data(settings.dataPrefix+'type'))
				$this.data(settings.dataPrefix+'type', 'string');

			if (settings.converters[$this.data(settings.dataPrefix+'type')]) {
				var typeProps = {};
				var d = $this.data();
				var p = settings.dataPrefix.replace('data-', '').replace('-', '');
				for (var k in d) {
					typeProps[k.replace(p, '').toLowerCase()] = d[k];
				}
				$this.append(settings.converters[$this.data(settings.dataPrefix+'type')](typeProps, data[$this.data(settings.dataPrefix+'name')], settings, data));
			}
		});
		return $target;
	}

	/**
 	 * Populate an object from an array opf objects
	 * @param $target The root of the object to locate dynamic data in
	 * @param data The data to populate the object from
	 * @param $template The template to load from
	 * @param settings The plugin settings
	 */
	function populateArrayData($target, data, $template, settings) {
		// Clean any IDs so that we can clone the template without causing problems
		$template.find('[id]').removeAttr('id');
		var targetid = $target.attr('id');

		var $res = $([]);
		for (var i=0; i<data.length; i++) {
			var $val = populateData($template.clone(), data[i], settings);
			// Create a targettable ID
			if(targetid) $val.attr('id', targetid+'-template-'+i);
			$res = $res.add($val);
		}
		$res.removeClass('template').insertAfter($template);
		return $target
	}

	/**
	 * Image helper
	 * This isnt table related but needs to move into some DLS helpers. Need to use DOM
	 * as jQuery cannot cope with namespaces.
	 */
	function createSvgImageTag(img, title, options) {
		var svgns = 'http://www.w3.org/2000/svg';
		var xlinkns = 'http://www.w3.org/1999/xlink';

		var cn, svgnode = document.createElementNS(svgns, 'svg');
		svgnode.setAttributeNS('', 'class', 'hide-on-fallback');
		svgnode.setAttributeNS('', 'role', 'img');
		svgnode.setAttributeNS('', 'title', title);

		cn = document.createElementNS(svgns, 'use');
		cn.setAttributeNS(xlinkns, 'xlink:href', options.imageBase+'icons.svg#'+img);
		svgnode.appendChild(cn);

		cn = document.createElementNS(svgns, 'image');
		cn.setAttributeNS('', 'src', options.imageBase+img+'.png');
		cn.setAttributeNS('', 'class', 'icon-fallback');
		cn.setAttributeNS(xlinkns, 'xlink:href', '');
		svgnode.appendChild(cn);

		return $(svgnode);
	}

	/**
	 * Template helper
	 * This is a cheap & cheerful templating engine for URLs etc.
	 * @param str The string to apply the template to.
	 * @param data The data map
	 * @return A formatted string
	 */
	function templateString(str, data) {
		str = str || '';
		var i, arr = str.match(/{{\w.+?}}/g);
		if (null === arr) return str;
		
		// Start the template
		for(i=0; i<arr.length; i++) {
			var attr = arr[i].replace(/[{}]+/g, '');
			str = str.replace(new RegExp(arr[i], 'g'), data[attr]?data[attr]:'');
		}
		return str;
	}

	/**
	 * Add secondary functions to be called
	 */
	$.extend(DataManager.prototype, {
		className: "DataManager",
		markerClassName: "hasDataManager",

		/**
		 * Attach the data manager settings specific to this object, to
		 * to the object.
		 * @param target the target element
		 * @param settings additional settings to override the defaults
		 */
		_attachDataManager: function(target, settings) {
			var $target = $(target);
			if($target.hasClass(this.markerClassName)) return;

			// Store the dynamic settings
			var localsettings = $.extend(true, {}, this._defaults, settings || {});
			$target.data(this.className, localsettings);

			$target.addClass(this.markerClassName);
		},

		/**
		 * Get the settings for a specific element
		 * @param the target element
		 */
		_getSettings: function(target) {
			var settings = $(target).data(this.className);
			return settings ? settings : this._defaults;
		},

		/**
		 * Clear/reset a component
		 * @param target the target element
		 */
		_clearDataManager: function(target) {
			var settings = this._getSettings(target);

			// Remove any array sub-objects
			var tid = $target.attr('id');
			if (tid) {
				$target.find('[id^="'+tid+'-template-"]').remove();
			}

			// Clean out anything left
			$(target).find('[data-'+settings.dataPrefix+'name]').empty();
		},

		/**
		 * Load some data from an JSON source.
		 * This will automatically call any formatters registered on that item.
		 *
		 * The response from the web service (or the data object) must be a flat formatted
		 * object. For example: {key1: "val1", key2: true, key3: 1234}
		 *
		 * The keys must match the relevant data-src-name attributes on HTML elements.
		 *
		 * @param target the target element
		 * {@param src One of
		 *   String: The URL of the data/web service location
		 *   Object: An object to load data from directly.
		 * }
		 * {@param options Any additional options:
 		 *   clear: Boolean true/false. Clear the component data before.
 		 *   extractor: Function. A function to extract the contents of the web services into a flat object.
 		 *   ajaxArgs: Refer to http://api.jquery.com/jquery.ajax/ (settings object)
                 * }
		 */
		_loadObjectDataManager: function(target, src, options) {
			var $target = $(target);
			if (!options) options={};
			var ret = $.Deferred();

			// Hide any error messages
			$target.find('.error-display').not('.hide').empty().addClass('hide');

			// Should we perform an Ajax request, or load directly?
			if (typeof src === 'object') {
				if (true === options.clear) this._clearDataManager(target);
				populateData($target, src, this._getSettings(target));
				$target.removeClass('hide');
				setTimeout(function() { ret.resolve($target); }, 0); // Schedule an immediate callback
				return ret.promise();
			}

			if (!options.ajaxArgs) options.ajaxArgs={};
			options.ajaxArgs.url = src;

			// If not explicitly told to cache, then don't
			if (!options.ajaxArgs.cache) options.ajaxArgs.cache = false;

			// If not an explicity data type, then expect JSON
			if (!options.ajaxArgs.dataType) options.ajaxArgs.dataType = 'json';

			// Perform the data load
			$.ajax(options.ajaxArgs).done(function(data, textStatus, jqXHR) {
				var row, col, rows=[];
				if (204 === jqXHR.status) { // no content
					// actually an error
					ret.reject($target, 204, $target.find('.error-display').not('.hide').removeClass('hide'));
				}
				
				if (options.extractor) data = options.extractor(data);

				// If the object is empty, then we will do a fixup. This is to give TSS
				// a workaround for bad services.
				var klen = 0;
				if (Object.keys) {
					klen = Object.keys(data).length;
				} else {
					for (var k in data) {klen+=1;}
				}
				if (0 === klen) { // fake no content
					ret.reject($target, 204, $target.find('.error-display').not('.hide').removeClass('hide'));
				}

				if (true === options.clear) this._clearDataManager(target);
				populateData($target, data, this._getSettings(target));
				$target.removeClass('hide');
				ret.resolve($target);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				ret.reject($target, jqXHR.status, $target.find('.error-display').not('.hide').removeClass('hide'));
			});
			return ret.promise();
		},

		/**
		 * Load some data from an JSON Array source.
		 * This will automatically call any formatters registered on that item.
		 *
		 * The response from the web service (or the data object) must be a flat formatted
		 * object. For example: [{key1: "val1", key2: true, key3: 1234},{key1: "val2", key2: false, key3: 5678}]
		 *
		 * The keys must match the relevant data-src-name attributes on HTML elements.
		 *
		 * @param target the target element
		 * {@param src One of:
		 *   String: The URL of the data/web service location
		 *   Object: An object to load data from directly.
		 * }
		 * @param template The template HTML to apply the data to. The resulting data will be appended to the DOM directly after the template
		 * {@param options Any additional options:
 		 *   clear: Boolean true/false. Clear the component data before.
 		 *   extractor: Function. A function to extract the contents of the web services into a flat object.
 		 *   ajaxArgs: Refer to http://api.jquery.com/jquery.ajax/ (settings object)
                 * }
		 */
		_loadObjectListDataManager: function(target, src, template, options) {
			var $target = $(target);
			var $template = $target.find('.template').first();
			if (!options) options={};
			var ret = $.Deferred();

			// Hide any error messages
			$target.find('.error-display').not('.hide').empty().addClass('hide');

			// Should we perform an Ajax request, or load directly?
			if (typeof src === 'object') {
				if (true === options.clear) this._clearDataManager(target);
				populateArrayData($target, src, $template, this._getSettings(target));
				$target.removeClass('hide');
				setTimeout(function() { ret.resolve($target); }, 0); // Schedule an immediate callback
				return ret.promise();
			}

			if (!options.ajaxArgs) options.ajaxArgs={};
			options.ajaxArgs.url = src;

			// If not explicitly told to cache, then don't
			if (!options.ajaxArgs.cache) options.ajaxArgs.cache = false;

			// If not an explicity data type, then expect JSON
			if (!options.ajaxArgs.dataType) options.ajaxArgs.dataType = 'json';

			// Perform the data load
			$.ajax(options.ajaxArgs).done(function(data, textStatus, jqXHR) {
				var row, col, rows=[];
				if (204 === jqXHR.status) { // no content
					// actually an error
					ret.reject($target, 204, $target.find('.error-display').not('.hide').removeClass('hide'));
				}
				
				if (options.extractor) data = options.extractor(data);

				// If the object is empty, then we will do a fixup. This is to give TSS
				// a workaround for bad services.
				if (0 === data.length) { // fake no content
					ret.reject($target, 204, $target.find('.error-display').not('.hide').removeClass('hide'));
				}

				if (true === options.clear) this._clearDataManager(target);
				populateArrayData($target, src, $template, this._getSettings(target));
				$target.removeClass('hide');
				ret.resolve($target);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				ret.reject($target, jqXHR.status, $target.find('.error-display').not('.hide').removeClass('hide'));
			});
			return ret.promise();
		}
	});


	/**
	 * Plugin main function
	 */
	$.fn.dataManager = function(options) {
		if ( !this.length ) {
			return this;
		}

		var otherArgs = Array.prototype.slice.call(arguments, 1);

		// Non-standard calls. These return specific objects
		if (options === 'loadObject' || options === 'loadObjectList') {
			  return $.datamanager["_" + options + "DataManager"].apply($.datamanager, [this].concat(otherArgs));
		}

		// Standard calls
		this.each(function(ti) {
			typeof options === "string" ?
			  $.datamanager["_" + options + "DataManager"].apply($.datamanager, [this].concat(otherArgs)) :
			  $.datamanager._attachDataManager(this, options);
		});

		return this;
	};

	// Store a global singleton reference
	$.datamanager = new DataManager();

}( jQuery ));

$(function(){

	$(".modal-header-btn").find(".icon-fallback").attr("class","icon icon-xs");

});

