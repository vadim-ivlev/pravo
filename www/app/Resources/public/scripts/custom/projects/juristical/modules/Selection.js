/**
 * Created by esolovyev on 02.11.2015.
 */

var getSelected = () => {

        if(window.getSelection) {

            return window.getSelection();
        } else if(document.getSelection) {

            return document.getSelection();
        } else {

            var selection = document.selection && document.selection.createRange();
            if(selection.text) {
                return selection.text;
            }
            return false;
        }
        return false;
    },

    selectText = id => {

        let node = $(id)[0], // document.getElementById(id),
            range = null;

        if (document.selection) {

            range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {

            range = document.createRange();
            range.selectNodeContents(node);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    };

  module.exports = {

      getSelected,
      selectText
  };
