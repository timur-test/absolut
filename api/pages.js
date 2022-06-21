export default ($axios) => ({
  getMainPage() {
    return $axios.get('/main_page')
  },

  getProjectsPage() {
    return $axios.get('/projects_page')
  },

  getContestsPage() {
    return $axios.get('/contests')
  },
  getContestsArchivePage() {
    return $axios.get('/contests/archive')
  },
  getContestById(id) {
    return $axios.get('/contests/archive/' + id)
  },

  getSchoolPage() {
    return $axios.get('/school')
  },
})
