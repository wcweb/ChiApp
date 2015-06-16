'use strict';
var React = require('react-native');
// var NativeMethodsMixin = require('NativeMethodsMixin');
// var PropTypes = require('ReactPropTypes');
//
// var ReactNativeViewAttributes = require('ReactNativeViewAttributes');
// var StyleSheet = require('StyleSheet');
// var createReactIOSNativeComponentClass =
//       require('createReactNativeComponentClass');
// var merge = require('merge');


// var viewConfig = {
//   validAttributes: merge(ReactNativeViewAttributes.UIView, {
//     onTintColor: true,
//     tintColor: true,
//     thumbTintColor:true,
//     on:true,
//     enabled: true,
//   }),
//   uiViewClassName: 'CALocalImage',
// }
// var RCTLocalImage = createReactIOSNativeComponentClass(viewConfig);


// var LOCALIMAGE = 'localimage';


// type DefaultProps = {
//   value: boolean;
//   disabled: boolean;
// };
//
//
// type Event = Object;
      // <TouchableHighlight>
      // <Text>touch me fuck ;</Text>
      // </TouchableHighlight>

// var LocalImage = React.createClass({
//   // mixins: [NativeMethodsMixin],
//   // propTypes: {},
//   // getDefaultProps: function(){
//   //   return {
//   //     value: false,
//   //     disabled: false,
//   //   };
//   // },
//   //
//   // _onChange: function(event) {
//   //   this.props.onChange && this.props.onChange(event);
//   //   this.props.onValueChange && this.props.onValueChange(event.nativeEvent.value);
//   //   this.refs[LOCALIMAGE].setNativeProps({on: this.props.value});
//   // },
//   render: function(){
//     return (
//       <View>
//         <Text>fuckckckckck</Text>
//       </View>
//     )
//   }
//
// });


// var CALocalImage = requireNativeComponent('CALocalImage', MapViewer);



// MapView.js

var { requireNativeComponent,
    View,
  // TouchableHighlight,
  Text } = React;

class LocalImage extends React.Component {
  render() {
    return <View>
      <Text>hhahahahhahah</Text>
      <CALocalImage {...this.props} />
    </View>;
  }
}

LocalImage.propTypes = {
  /**
   * When this property is set to `true` and a valid camera is associated
   * with the map, the camera’s pitch angle is used to tilt the plane
   * of the map. When this property is set to `false`, the camera’s pitch
   * angle is ignored and the map is always displayed as if the user
   * is looking straight down onto it.
   */
  src: React.PropTypes.string,
  downloadBook: React.PropTypes.func
  // src: React.PropTypes.,
};

var CALocalImage = requireNativeComponent('CALocalImage', LocalImage);




 // <RCTLocalImage ref={LOCALIMAGE} style={this.props.style} onChange={this._onChange} on={this.props.value} enabled={!this.props.disabled} />
// var LocalImage = React.createClass({
//   render:function(){
//     return (
//       <Text>Fuck you !</Text>
//     )
//   }
// })
module.exports = LocalImage;
