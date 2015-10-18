var $ = require('jquery');
module.exports = {
    setMenu: function(id) {
        $('li', '#menuContainer').removeClass('am-active');
        $('#' + id).addClass('am-active');
    }
};