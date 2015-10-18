var React = require('react');
var CSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

var Home = require('./home');
var URIcode = require('./uricode');
var Base64App = require('./base64');
var Http = require('./http');

var App = React.createClass({
    render: function() {
        var key = this.props.location.pathname;
        return(
            <CSSTransitionGroup component='div' transitionName='router'>
                {React.cloneElement(this.props.children || <div />, { key: key })}
            </CSSTransitionGroup>
        )
    }
});

React.render((
    <Router>
        <Route path='/' component={App}>
            <Route path='home' component={Home} />
            <Route path='uricode' component={URIcode} />
            <Route path='base64' component={Base64App} />
            <Route path='http' component={Http} />
        </Route>
    </Router>
), document.getElementById('main'));