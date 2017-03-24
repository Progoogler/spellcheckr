let gitLink = new Vue ({
  el: '#github-click-container',
  data: {
    link: 'https://github.com/progoogler/spellcheckr'
  },
  methods: {
    locate: function() {
      window.location = this.link;
      return false;
    }
  }
});