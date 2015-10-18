var React = require('react');
var $ = require('jquery');
var Utils = require('../utils/utils');

var URIcode = React.createClass({
    getInitialState: function () {
        return {
            source: '',
            result: ''
        };
    },
    componentDidMount: function() {
        Utils.setMenu('menu_code');
    },
    onChange: function (e) {
        this.setState({source: e.target.value});
    },
    encode: function () {
        this.setState({result: encodeURI(this.state.source)});
    },
    decode: function () {
        try {
            this.setState({result: decodeURI(this.state.source)});
        } catch (e) {
            this.setState({result: '解码异常：' + e.message});
        }
    },
    encodeComponent: function () {
        this.setState({result: encodeURIComponent(this.state.source)});
    },
    decodeComponent: function () {
        try {
            this.setState({result: decodeURIComponent(this.state.source)});
        } catch (e) {
            this.setState({result: '解码异常：' + e.message});
        }
    },
    clear: function () {
        this.setState({source: '', result: ''});
    },
    render: function () {
        var btnStyle = {marginRight: '5px'};
        var textStyle = {resize: 'none'};
        return (
            <div className="app-page am-padding">
                <form className="am-form">
                    <div className="am-form-group">
                        <label>源代码</label>
                        <textarea style={textStyle} rows="8" placeholder="在此录入要编码、解码的字符串！" onChange={this.onChange}
                                  value={this.state.source}></textarea>
                    </div>
                    <p>
                        <button style={btnStyle} type="button" className="am-btn am-btn-danger" onClick={this.encode}>
                            encodeURI()
                        </button>
                        <button style={btnStyle} type="button" className="am-btn am-btn-danger" onClick={this.decode}>
                            decodeURI()
                        </button>
                        <button style={btnStyle} type="button" className="am-btn am-btn-success"
                                onClick={this.encodeComponent}>encodeURIComponent()
                        </button>
                        <button style={btnStyle} type="button" className="am-btn am-btn-success"
                                onClick={this.decodeComponent}>decodeURIComponent()
                        </button>
                        <button style={btnStyle} type="button" className="am-btn am-btn-warning" onClick={this.clear}>
                            清空
                        </button>
                    </p>
                    <div className="am-form-group">
                        <label>结果</label>
                        <textarea style={textStyle} rows="8" value={this.state.result}></textarea>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = URIcode;