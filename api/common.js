export default ($axios) => ({
  getNavbar() {
    return $axios.get('/get_navigation_bar')
  },
  getFooter() {
    return $axios.get('/footer')
  },
})
