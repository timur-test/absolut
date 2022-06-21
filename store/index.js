export const state = () => ({
  windowWidth: 0,
  scrollTop: 0,
  isSideNavbarOpen: false,
  isHeaderSticky: false,
  lang: 'ru',
})

export const getters = {
  isDesktop: (state) => state.windowWidth > 1439,
  isMobile: (state) => state.windowWidth < 767,
  isSideNavbar: (state, getters) =>
    state.isSideNavbarOpen && !getters.isDesktop,
  getHeaderSticky: (state) => state.isHeaderSticky,
}

export const mutations = {
  updateWindowWidth(state, payload) {
    state.windowWidth = payload
  },
  updateScrollTop(state, payload) {
    state.scrollTop = payload
  },
  isSideNavbarOpen(state, payload) {
    state.isSideNavbarOpen = payload
  },
  setHeaderSticky(state, payload) {
    state.isHeaderSticky = payload
  },
  changeLang(state, payload) {
    state.lang = payload
  },
}
