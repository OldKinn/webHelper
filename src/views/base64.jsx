var React = require('react');
var Utils = require('../utils/utils');

var Base64App = React.createClass({
    getInitialState: function () {
        return {
            code: '',
            hasContentType: true,
            imgClass: 'am-margin-top am-hide',
            imgData: ''
        };
    },
    componentDidMount: function () {
        Utils.setMenu('menu_base64');
    },
    onChange: function (e) {
        this.setState({code: e.target.value});
    },
    encode: function () {
        this.setState({code: encodeBase64(this.state.code)});
    },
    decode: function () {
        this.setState({code: decodeBase64(this.state.code)});
    },
    changeSelect: function (e) {
        var _this = this, file = e.target.value;
        encodeImg(file, function (error, code) {
            if (error) {
                _this.setState({code: error.message});
                return false;
            }
            var changeObject = new Object();
            changeObject.code = code;
            if (_this.state.hasContentType) {
                var ncode = 'data:' + contentType(file) + ';base64,' + code;
                changeObject.code = ncode;
                changeObject.imgClass = 'am-margin-top';
                changeObject.imgData = ncode;
            }
            _this.setState(changeObject);
        });
    },
    clear: function () {
        this.setState({
            imgClass: 'am-margin-top am-hide',
            imgData: '',
            code: ''
        });
        this.refs.appForm.getDOMNode().reset();
    },
    changeCheck: function () {
        this.setState({hasContentType: !this.state.hasContentType});
    },
    render: function () {
        var btnStyle = {marginRight: '5px'};
        var textStyle = {resize: 'none'};
        var uploadStyle = {display: 'inline-table', marginRight: '5px'};
        var cssDemo = '.demoImg{ background-image: url("data:image/jpg;base64,/9j/4QMZRXhpZgAASUkqAAgAAAAL....");}';
        var domDemo = '<img width="40" height="30" src="data:image/jpg;base64,/9j/4QMZRXhpZgAASUkqAAgAAAAL...." />';
        return (
            <div className="app-page am-padding">
                <form className="am-form" ref="appForm">
                    <div className="am-form-group">
                        <textarea onChange={this.onChange} value={this.state.code}
                                  style={textStyle} placeholder="要编码的字符串" rows="12"></textarea>
                    </div>
                    <div>
                        <button style={btnStyle} type="button" className="am-btn am-btn-danger"
                                onClick={this.encode}>编码
                        </button>
                        <button style={btnStyle} type="button" className="am-btn am-btn-danger"
                                onClick={this.decode}>解码
                        </button>
                        <label className="am-checkbox-inline am-margin-horizontal">
                            <input type="checkbox" onChange={this.changeCheck}
                                   checked={this.state.hasContentType}/> Web元素
                        </label>

                        <div className="am-form-group am-form-file" style={uploadStyle}>
                            <button type="button" className="am-btn am-btn-danger">
                                <i className="am-icon-cloud-upload"></i> 选择图片
                            </button>
                            <input onChange={this.changeSelect} id="doc-form-file" type="file"
                                   style={{height: '38px'}}/>
                        </div>
                        <button style={btnStyle} type="button" className="am-btn am-btn-danger"
                                onClick={this.clear}>清空
                        </button>
                    </div>
                    <div>
                        <p className="am-margin-0">Base64格式</p>
                        <code>data:[][;charset=][;base64],</code>

                        <p className="am-margin-0">Base64 在CSS中的使用</p>
                        <code>{cssDemo}</code>

                        <p className="am-margin-0">Base64 在HTML中的使用</p>
                        <code>{domDemo}</code>
                    </div>
                    <div className={this.state.imgClass}>
                        <img className="am-img-thumbnail" src={this.state.imgData}/>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = Base64App;