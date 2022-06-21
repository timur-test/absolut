import apiClient from '~/api/index.js'

export default (ctx, inject) => {
  inject('api', apiClient(ctx.$axios))
}
