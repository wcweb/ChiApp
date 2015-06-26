var React = require('react-native');
var { View,Text,TabBarIOS, NavigatorIOS } = React;
// var LoginPage = require("./LoginPage");
var Empty = React.createClass({
  render:function(){
    return (
      <View >
        <Text> hahahah </Text>
      </View>
    )
  }
})
var App = React.createClass({
  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item title="React Native" selected={true}>
          <NavigatorIOS initialRoute={{ title: 'React Native' , component:Empty}} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});
module.exports = App;
