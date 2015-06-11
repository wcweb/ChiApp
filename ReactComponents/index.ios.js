var React = require('react-native');

var {
  AppRegistry,
  Text,
  View
} = React;

var hello = require('LocalImage/empty.js');

// var {LocalImage} = require('NativeModules');
var LocalImage = require('LocalImage/maper.js');
// console.log(LocalImage);



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
        <LocalImage />
      </View>;
  }
}

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);