var React = require('react');
var $ = require('jquery');
var Utils = require('../utils/utils');
require('statics/libs/gridster/jquery.gridster.min');

var Home = React.createClass({
    componentDidMount: function() {
        Utils.setMenu('menu_home');
        $(this.refs.container.getDOMNode()).gridster({
            widget_margins: [10, 10],
            widget_base_dimensions: [120, 120],
            resize: {
                enabled: true
            }
        });
    },
    componentWillUnmount: function() {
        var dashboard = $(this.refs.container.getDOMNode()).data('gridster');
        dashboard.destroy();
    },
    render: function() {
        return (
            <div className="app-page am-padding">
                <div className="gridster">
                    <ul ref="container">
                        <li data-row="1" data-col="1" data-sizex="1" data-sizey="1"></li>
                        <li data-row="2" data-col="1" data-sizex="1" data-sizey="1"></li>
                        <li data-row="3" data-col="1" data-sizex="1" data-sizey="1"></li>

                        <li data-row="1" data-col="2" data-sizex="2" data-sizey="1"></li>
                        <li data-row="2" data-col="2" data-sizex="2" data-sizey="2"></li>

                        <li data-row="1" data-col="4" data-sizex="1" data-sizey="1"></li>
                        <li data-row="2" data-col="4" data-sizex="2" data-sizey="1"></li>
                        <li data-row="3" data-col="4" data-sizex="1" data-sizey="1"></li>

                        <li data-row="1" data-col="5" data-sizex="1" data-sizey="1"></li>
                        <li data-row="3" data-col="5" data-sizex="1" data-sizey="1"></li>

                        <li data-row="1" data-col="6" data-sizex="1" data-sizey="1"></li>
                        <li data-row="2" data-col="6" data-sizex="1" data-sizey="2"></li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Home;