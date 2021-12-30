import 'vue-material-design-icons/styles.css'

import menu from 'vue-material-design-icons/Menu.vue'
import chevronDown from 'vue-material-design-icons/ChevronDown.vue'
import chevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import chevronRight from 'vue-material-design-icons/ChevronRight.vue'

// import shoppingBag from 'vue-material-design-icons/Shopping.vue'
import cart from 'vue-material-design-icons/Cart.vue'
import sun from 'vue-material-design-icons/WhiteBalanceSunny.vue'
import moon from 'vue-material-design-icons/WeatherNight.vue'
import arrowRightThin from 'vue-material-design-icons/ArrowRight.vue'
import check from 'vue-material-design-icons/Check.vue'
import filter from 'vue-material-design-icons/Filter.vue'
import filterCheck from 'vue-material-design-icons/FilterCheck.vue'
import grid from 'vue-material-design-icons/ViewGrid.vue'
import gridOutline from 'vue-material-design-icons/ViewGridOutline.vue'
import close from 'vue-material-design-icons/Close.vue'
import windowClose from 'vue-material-design-icons/WindowClose.vue'
import sortVariant from 'vue-material-design-icons/SortVariant.vue'
import plus from 'vue-material-design-icons/Plus.vue'
import minus from 'vue-material-design-icons/Minus.vue'
import blankCheckbox from 'vue-material-design-icons/CheckboxBlankOutline.vue'
import checkbox from 'vue-material-design-icons/CheckboxMarked.vue'
import magnify from 'vue-material-design-icons/Magnify.vue'
import star from 'vue-material-design-icons/Star.vue'

import heart from 'vue-material-design-icons/Heart.vue'
import heartOutline from 'vue-material-design-icons/HeartOutline.vue'

import copy from 'vue-material-design-icons/ClipboardEdit.vue'
import copied from 'vue-material-design-icons/ClipboardCheck.vue'
import copyError from 'vue-material-design-icons/ClipboardAlert.vue'

import facebook from 'vue-material-design-icons/Facebook.vue'
import instagram from 'vue-material-design-icons/Instagram.vue'
import twitter from 'vue-material-design-icons/Twitter.vue'
import { capitalize } from './main'

export default function registerComponents(Vue) {
  const icons = {
    menu,
    chevronDown,
    chevronLeft,
    chevronRight,

    // shoppingBag,
    cart,
    sun,
    moon,
    arrowRightThin,
    check,
    filter,
    filterCheck,
    grid,
    gridOutline,
    close,
    windowClose,
    sortVariant,
    plus,
    minus,
    blankCheckbox,
    checkbox,
    magnify,
    star,
    heart,
    heartOutline,
    copy,
    copied,
    copyError,
    facebook,
    instagram,
    twitter
  }

  Object.entries(icons).forEach((entry) => {
    Vue.component(`Mdi${capitalize(entry[0])}`, entry[1])
  })
}
