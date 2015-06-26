'use strict';

var React = require('react-native');
var {
  NavigatorIOS,
  Text,
  View,
} = React;
var LoginPage = require('./LoginPage');

var Nav = React.createClass({
  render(){
    return (
      <NavigatorIOS initialRoute={{
        component: LoginPage,
        title: 'Login In',
        rightButtonTitle: 'Back',
        onRightButtonPress:() => {
          // this.props.onExit();
        },
        passProps:{
            text: 'this is pass Props',
        },

      }}
      />
    )
  }
});

module.exports = Nav;
