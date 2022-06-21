import commonEndpoints from '~/api/common'
import pagesEndpoints from '~/api/pages'

export default ($axios) => ({
  common: commonEndpoints($axios),
  pages: pagesEndpoints($axios),
})
