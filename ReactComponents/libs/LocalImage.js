'use strict';
var React = require('React');
var {
  Text
}= React;
var NativeMethodsMixin = require('NativeMethodsMixin');
var PropTypes = require('ReactPropTypes');

var ReactNativeViewAttributes = require('ReactNativeViewAttributes');
var StyleSheet = require('StyleSheet');
var createReactIOSNativeComponentClass =
      require('createReactNativeComponentClass');
var merge = require('merge');


var viewConfig = {
  validAttributes: merge(ReactNativeViewAttributes.UIView, {
    onTintColor: true,
    tintColor: true,
    thumbTintColor:true,
    on:true,
    enabled: true,
  }),
  uiViewClassName: 'RCTLocalImage',
}
var RCTLocalImage = createReactIOSNativeComponentClass(viewConfig);


var LOCALIMAGE = 'localimage';


// type DefaultProps = {
//   value: boolean;
//   disabled: boolean;
// };
//
//
// type Event = Object;


var LocalImage = React.createClass({
  mixins: [NativeMethodsMixin],
  propTypes: {},
  getDefaultProps: function(){
    return {
      value: false,
      disabled: false,
    };
  },

  _onChange: function(event) {
    this.props.onChange && this.props.onChange(event);
    this.props.onValueChange && this.props.onValueChange(event.nativeEvent.value);
    this.refs[LOCALIMAGE].setNativeProps({on: this.props.value});
  },
  render: function(){
    return (
      <RCTLocalImage ref={LOCALIMAGE} style={this.props.style} onChange={this._onChange} on={this.props.value} enabled={!this.props.disabled} />
    )
  }

})
// var LocalImage = React.createClass({
//   render:function(){
//     return (
//       <Text>Fuck you !</Text>
//     )
//   }
// })
module.exports = LocalImage;
