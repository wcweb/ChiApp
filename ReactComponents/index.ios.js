var React = require('react-native');

var {
  AppRegistry,
  Text,
  View
} = React;

var hello = require('libs/empty.js');

// var {LocalImage} = require('NativeModules');
var Maper = require('libs/maper');
// console.log(LocalImage);

var LocalImage = require('libs/LocalImage');
console.log(LocalImage);

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
});

class SimpleApp extends React.Component {
  render() {
    return <View style={styles.container}>

        <Text>This is a simple application.{hello.hello}</Text>
        <Maper />
        <LocalImage />
      </View>;
  }
}

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
