let vueButton = new Vue({
  el: '#check-button',
  data: {
    errors: null
  },
  methods: {
    check: async function() {
      if (this.errors !== null) this.errors = null;
      let errors;
      try {
        this.errors = await spellCheck(editor.getValue());
      } catch(e) {
        console.log('Caugh exception: ', e);
      }
      return this.post(this.errors);
    },
    post: function(errors) {
      let para = document.createElement("P");
      let node = document.createTextNode(Object.keys(errors).length + ' potential spelling errors found:');
      let errNote = document.getElementById('error-notification');
      para.setAttribute('id', 'errorHeader');
      if (document.getElementById('columnOne') !== null && document.getElementById('columnOne').childElementCount > 0) {
        document.getElementById('columnOne').parentNode.removeChild(columnOne);
        if (document.getElementById('columnTwo') !== null) document.getElementById('columnTwo').parentNode.removeChild(columnTwo);
        if (document.getElementById('columnThree') !== null) document.getElementById('columnThree').parentNode.removeChild(columnThree);
      }
      if (Object.keys(this.errors).length === 0) {
        if (errNote.childElementCount > 0) {
          errNote.removeChild(errorHeader);
        }
        node = document.createTextNode('No spelling errors found!');
        para.appendChild(node);
        errNote.appendChild(para);  console.log(errNote); 
        return;     
      }
      if (errNote.childElementCount > 0) {
        errNote.removeChild(errorHeader);
        if (document.getElementById('columnOne') !== null) {
          document.getElementById('columnOne').parentNode.removeChild(columnOne);
        }
        let newColumn = document.createElement("DIV");
        newColumn.setAttribute('id', 'columnOne');
        document.getElementById('error-container').appendChild(newColumn);
      }

      para.appendChild(node);
      errNote.appendChild(para);
      let list = document.getElementById('columnOne');
      let counter = 0;
      for (let err in errors) {
        let dataContainer = document.createElement("P");
        let data = document.createTextNode(err);
        if (counter === 7) { console.log("it's at 7")
          list = document.createElement("DIV");
          list.setAttribute('id', 'columnTwo'); console.log(list)
          document.getElementById('error-container').appendChild(list);
        }
        if (counter === 14) {
          list = document.createElement("DIV");
          list.setAttribute('id', 'columnThree'); console.log('its at 14 ', list)
          document.getElementById('error-container').appendChild(list);        
        }
        dataContainer.appendChild(data);
        list.appendChild(dataContainer);
        counter++;
      }
    }
  }
});