var React = require('react');
var Utils = require('../utils/utils');

var HttpApp = React.createClass({
    componentDidMount: function() {
        Utils.setMenu('menu_http');
    },
    render: function() {
        return (
            <div className="app-page am-padding">模拟HTTP请求</div>
        );
    }
});

module.exports = HttpApp;