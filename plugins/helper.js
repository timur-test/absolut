import styleVars from '~/assets/styles/includes/_vars.scss'
import DEFAULT_IMAGES from '~/assets/defaults/images.js'
import DEFAULT_ROUTES from '~/assets/defaults/routes.js'

export default (ctx, inject) => {
  inject('notElClickListener', (elem, callback) => (e) => {
    if (!elem?.contains(e.target)) {
      callback(e)
    }
  })

  inject('keyGen', (idx) => {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let result = ''
    for (let i = 0; i < 5; i++)
      result += possible.charAt(Math.floor(Math.random() * possible.length))

    return result + idx
  })

  inject('styleVar', (v, replace = null) => {
    const result = styleVars[v]
    if (replace) return result.replace(replace, '')
    return result
  })

  inject('getComputedStyle', (el, property) => {
    if (process.browser) {
      const value = window.getComputedStyle(el, null).getPropertyValue(property)
      return parseFloat(value)
    }
  })

  inject('getDefault', (key, constName) => {
    switch (key) {
      case 'img':
        return DEFAULT_IMAGES[constName]
      case 'route':
        return DEFAULT_ROUTES[constName]
    }
  })

  inject(
    'dateConverter',
    (
      unixTimeStamp,
      options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      },
    ) => {
      const date = new Date(unixTimeStamp * 1000)
      return date.toLocaleString('ru-RU', options)
    },
  )

  inject('getSearchParam', (param) => {
    const url = new URL(location.href).searchParams
    return url.get(param)
  })
}
