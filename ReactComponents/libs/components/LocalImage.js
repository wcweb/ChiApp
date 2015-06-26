'use strict';
var React = require('react-native');

var EventEmitter = require('EventEmitter');

var CustomizedEventEmitter = new EventEmitter();

// var NativeMethodsMixin = require('NativeMethodsMixin');
var PropTypes = require('ReactPropTypes');
//
var ReactNativeViewAttributes = require('ReactNativeViewAttributes');
// var StyleSheet = require('StyleSheet');
var createReactIOSNativeComponentClass =
      require('createReactNativeComponentClass');
var merge = require('merge');


var DeviceEventEmitter = React.DeviceEventEmitter;
var NativeAppEventEmitter = React.NativeAppEventEmitter;



var
  requireNativeComponent = React.requireNativeComponent,
  NativeMethodsMixin = React.NativeMethodsMixin,
    View = React.View,
  TouchableHighlight = React.TouchableHighlight,
  Text = React.Text;

var NativeModules = require('NativeModules');



var viewConfig = {
  validAttributes: merge(ReactNativeViewAttributes.UIView, {
    onTintColor: true,
    tintColor: true,
    thumbTintColor:true,
    on:true,
    enabled: true,
  }),
  uiViewClassName: 'CALocalImage',
}
// var CALocalImage = createReactIOSNativeComponentClass(viewConfig);
var CALocalImage = requireNativeComponent('CALocalImage', LocalImage);

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
var subscriptions = [];
subscriptions.push( CustomizedEventEmitter.addListener(
  'customEvent',function(ev){
    console.log("before: "+ev);
  }
))
// subscriptions.push( NativeAppEventEmitter.addListener(
//   'clickDownloadBtn',function(ev){
//     console.log("before: "+ev);
//   }
// ))
// subscriptions.push( NativeAppEventEmitter.addListener(
//   'initCALocalImage',
//   function(ev){
//     console.log("before: "+ev);
//   }
// ));
// console.log(subscriptions);


var LocalImage = React.createClass({
  mixins: [NativeMethodsMixin],
  propTypes: {
    src: React.PropTypes.string,
    downloadBook: React.PropTypes.func
  },
  getInitialState: function () {
    return {
      score:0
    };
  },
  componentWillMount:function(){
    console.log("mount");
    subscriptions.push( NativeAppEventEmitter.addListener(
      'clickDownloadBtn',function(ev){
        console.log(ev);
      }
    ))
    subscriptions.push( NativeAppEventEmitter.addListener(
      'initCALocalImage',
      function(ev){
        console.log(ev);
      }
    ));
    console.log(subscriptions);
  },
  componentWillUnmount:function(){
    for (var ii = 0; ii < subscriptions.length; ii++) {
      if (subscriptions[ii]) {
        subscriptions[ii].remove() ; // still valid subscriptions
      }
    }

  },
  // getDefaultProps: function(){
  //   return {
  //     value: false,
  //     disabled: false,
  //   };
  // },
  //
  // _onChange: function(event) {
  //   this.props.onChange && this.props.onChange(event);
  //   this.props.onValueChange && this.props.onValueChange(event.nativeEvent.value);
  //   this.refs[LOCALIMAGE].setNativeProps({on: this.props.value});
  // },
  _ondownloadBookClicked:function(){
    NativeModules.CALocalImageManager.downloadBook(function(e){
      console.log("callbck queue"+e);
    });
    //  if(!this.props.downloadBook){
    //    return ;
    //  }
    //  this.props.downloadBook();
   },
   _sendEvent:function(){
     NativeModules.CALocalImageManager.sendEvent();
   },
  render: function(){
    return (
      <View>
          <TouchableHighlight  activeOpacity={0.6}
                underlayColor={'white'}
                onPress={() => this.setState({score: ++this.state.score})}>
            <Text>hhahahahhahah</Text>


          </TouchableHighlight>



                <TouchableHighlight  activeOpacity={0.6}
                      underlayColor={'white'}
                      onPress={this._ondownloadBookClicked}>
                  <Text>download</Text>


                </TouchableHighlight>
            <CALocalImage {...this.props} ref="ca" />
                 <Text>{'Score: ' + this.state.score}</Text>


                 <TouchableHighlight  activeOpacity={0.6}
                       underlayColor={'white'}
                       onPress={this._sendEvent}>
                   <Text>send event</Text>


                 </TouchableHighlight>

          </View>
    )
  }

});





// MapView.js

// var {
//   requireNativeComponent,
//   NativeMethodsMixin,
//     View,
//   TouchableHighlight,
//   Text } = React;
//
// var NativeModules = require('NativeModules');
// console.log(NativeModules);
// console.log(NativeMethodsMixin);
// class LocalImage extends React.Component {
//
//   constructor(){
//     super();
//
//     this._getInitialState = this._getInitialState.bind(this);
//     this.state = this._getInitialState();
//     this._ondownloadBookClicked = this._ondownloadBookClicked.bind(this);
//     // this.propTypes= {};
//     // this.mixins = [NativeMethodsMixin];
//   }
//   // static propTypes = {
//   //   /**
//   //    * When this property is set to `true` and a valid camera is associated
//   //    * with the map, the camera’s pitch angle is used to tilt the plane
//   //    * of the map. When this property is set to `false`, the camera’s pitch
//   //    * angle is ignored and the map is always displayed as if the user
//   //    * is looking straight down onto it.
//   //    */
//   //   src: React.PropTypes.string,
//   //   downloadBook: React.PropTypes.func
//   //   // src: React.PropTypes.,
//   // }
//
//   _getInitialState(){
//     return {
//       score : 0
//     };
//   }
//   // initialize(props) {
//   //    return {
//   //      score: 0
//   //    }
//   //  }
//   _ondownloadBookClicked(){
//     // LocalImage.propTypes.downloadBook();\
//     NativeModules.CALocalImageManager.downloadBook();
//     if(!this.props.downloadBook){
//       return ;
//     }
//     this.props.downloadBook();
//   }
//
//   render(props, state) {
//     return <View>
//     <TouchableHighlight  activeOpacity={0.6}
//           underlayColor={'white'}
//           onPress={() => this.setState({score: ++this.state.score})}>
//       <Text>hhahahahhahah</Text>
//
//
//     </TouchableHighlight>
//
//
//
//           <TouchableHighlight  activeOpacity={0.6}
//                 underlayColor={'white'}
//                 onPress={this._ondownloadBookClicked}>
//             <Text>download</Text>
//
//
//           </TouchableHighlight>
//       <CALocalImage {...this.props} ref="ca" />
//            <Text>{'Score: ' + this.state.score}</Text>
//     </View>;
//   }
// }
//
// LocalImage.propTypes = {
//   /**
//    * When this property is set to `true` and a valid camera is associated
//    * with the map, the camera’s pitch angle is used to tilt the plane
//    * of the map. When this property is set to `false`, the camera’s pitch
//    * angle is ignored and the map is always displayed as if the user
//    * is looking straight down onto it.
//    */
//   src: React.PropTypes.string,
//   downloadBook: React.PropTypes.func
//   // src: React.PropTypes.,
// };
//
//
// var CALocalImage = requireNativeComponent('CALocalImage', LocalImage);
//


 // <RCTLocalImage ref={LOCALIMAGE} style={this.props.style} onChange={this._onChange} on={this.props.value} enabled={!this.props.disabled} />
// var LocalImage = React.createClass({
//   render:function(){
//     return (
//       <Text>Fuck you !</Text>
//     )
//   }
// })
module.exports = LocalImage;
