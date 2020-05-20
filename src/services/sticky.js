import _ from 'lodash'

export default function (selector, offset) {
  const element = document.getElementById(selector)

  document.addEventListener('scroll', _.throttle(event => {
    element.classList.toggle('»stuck', element.offsetTop <= (window.scrollY + offset))
  }, 100))
}
