var React = require("react-native");
var Styles = require("../styles");

var {
  Text,
  View,
  Navigator,
  NavigatorIOS,
  DatePickerIOS,
  TouchableOpacity,
} = React;
console.log(NavigatorIOS);



var Empty = React.createClass({
  render:function(){
    return (
      <View >
        <Text> hahahah </Text>
      </View>
    )
  }
})
var LoginPage = React.createClass({
  getDefaultProps () {
   return {
     date: new Date(),
     timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
   };
 },

 getInitialState() {
   return {
     date: this.props.date,
     timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
   };
 },

 onDateChange(date) {
   this.setState({date: date});
 },

 onTimezoneChange(event) {
   var offset = parseInt(event.nativeEvent.text, 10);
   if (isNaN(offset)) {
     return;
   }
   this.setState({timeZoneOffsetInHours: offset});
 },
  _back(){
    this.props.navigator.pop();
  },
  render(){
    return (
      <NavigatorIOS
      initialRoute={{title: ' Logoin',component:Empty}}
      renderScene={(route, navigator)=>
        <View style={Styles.appContainer}>
          <Text>
              This is login page {this.props.text}



          </Text>
          <TouchableOpacity onPress={() => this._back()}>
          <Text style={[Styles.appMessage, Styles.appSubMessage]}>
            back
          </Text>
          </TouchableOpacity>

          <DatePickerIOS
         date={this.state.date}
         mode="datetime"
         timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
         onDateChange={this.onDateChange}
       />
        </View>

      }
      />


    );
  }
})

module.exports = LoginPage;
