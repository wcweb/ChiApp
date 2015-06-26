var React = require("react-native");
var Reflux = require("reflux");

var Styles = require("../styles");
var Actions = require("../actions");
var AppMessageStore = require("../stores/app_message_store.js");

var LocalImage = require("./LocalImage.js");
var Nav = require("./nav.js");
var LoginPage = require("./LoginPage");

let {
  View,
  Text,
  TabBarIOS,
  Navigator,
  NavigatorIOS,
  Image,
  StatusBarIOS,
  StyleSheet,
  TouchableOpacity
} = React;

var Empty = React.createClass({
  render:function(){
    return (
      <View style={Styles.appContainer, styles.emptyPage}>
      <Image
        style={Styles.appLogo}
        source={{uri: "http://facebook.github.io/react/img/logo_og.png"}}/>
        <Text style={[Styles.appMessage, Styles.appSubMessage]}> hahahah </Text>
      </View>
    )
  }
})

var MySceneComponent = React.createClass({

  mixins: [Reflux.connect(AppMessageStore, "message")],

  componentDidMount() {
    // Get the initial message from the store
    Actions.updateMessage();
  },
  gotoLogin(){
    this.props.navigator.push({component:LoginPage, title:"Login In"});
  },
  render(){
    return (
            <View style={Styles.appContainer}>
      <View >
      <TouchableOpacity onPress={() => this.props.onForward()}>
      <Text style={[Styles.appMessage, Styles.appSubMessage]}>
        forward
      </Text>
      </TouchableOpacity>
        <Text style={[Styles.appMessage, Styles.appSubMessage]}>My Scene Component {this.props.name }</Text>
      </View>



        <TouchableOpacity
          onPress={Actions.updateMessage}>
          <Image
            style={Styles.appLogo}
            source={{uri: "http://facebook.github.io/react/img/logo_og.png"}}/>
        </TouchableOpacity>

        <Text style={Styles.appMessage}>{this.state.message}</Text>
        <TouchableOpacity onPress={() => this.gotoLogin()}>
        <Text style={[Styles.appMessage, Styles.appSubMessage]}>
          Login
        </Text>
        </TouchableOpacity>

      </View>
    )
  }
});

var EmptyPage = React.createClass({
  mixins: [Reflux.connect(AppMessageStore, "message")],

  componentDidMount() {
    // Get the initial message from the store
    Actions.updateMessage();
  },
  render: function() {
    return (

      <View style={styles.emptyPage, Styles.appContainer }>
<View >
<TouchableOpacity onPress={() => this.props.onForward()}>
<Text style={[Styles.appMessage, Styles.appSubMessage]}>
  forward
</Text>
</TouchableOpacity>
  <Text style={[Styles.appMessage, Styles.appSubMessage]}>My Scene Component {this.props.name }</Text>
</View>


<View style={styles.emptyPage}>
  <Text style={styles.emptyPageText}>
    {this.props.text}
  </Text>
</View>

  <TouchableOpacity
    onPress={Actions.updateMessage}>
    <Image
      style={Styles.appLogo}
      source={{uri: "http://facebook.github.io/react/img/logo_og.png"}}/>
  </TouchableOpacity>

  <Text style={Styles.appMessage}>{this.state.message}</Text>
  <TouchableOpacity onPress={() => this.gotoLogin()}>
  <Text style={[Styles.appMessage, Styles.appSubMessage]}>
    Login
  </Text>
  </TouchableOpacity>

</View>
    );
  },

});

var NavigatorIOSColors = React.createClass({

  statics: {
    title: '<NavigatorIOS> - Custom',
    description: 'iOS navigation with custom nav bar colors',
  },

  render: function() {
    // Set StatusBar with light contents to get better contrast
    // StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);

    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: EmptyPage,
          title: '<NavigatorIOS>',
          rightButtonTitle: 'Done',
          onRightButtonPress: () => {
            // StatusBarIOS.setStyle(StatusBarIOS.Style['default']);
            this.props.onExampleExit();
          },
          passProps: {
            text: 'The nav bar has custom colors with tintColor, ' +
              'barTintColor and titleTextColor props.',
          },
        }}
        tintColor="#FFFFFF"
        barTintColor="#183E63"
        titleTextColor="#FFFFFF"
      />
    );
  },

});


var MyNavigators = React.createClass({
  _handleNavigationRequest: function() {
    // this.refs.nav.push();
  },
  render: () => (
    <NavigatorIOS

    navigationBarHidden={false}
    itemWrapperStyle={Styles.appContainer}
    barTintColor="black"
    titleTextColor="white"
    tintColor="red"
        initialRoute={{
          component: Empty,
          title:'ChiApp',
          wrapperStyle: Styles.appContainer,
          leftButtonTitle:"left button",
          onLeftButtonPress:() => {
            console.log("press");
          },
          }}
          renderScene={(route,navigator) =>
            <MySceneComponent />
          }
    />
  ),
});

let App = React.createClass({

  componentDidMount() {
    // Do stuff when the App top-level component is ready,
    // such as change the color of the iOS status bar:

  //  StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);
    // StatusBarIOS.setStyle('light-content', true);


  },

  render() {
//     // Render the top-level element that will contain the complete UI
//     // of your application. You may also choose to use this element
//     // as the single source of data, that is then passed down to
//     // child components.
//
    return (
<Navigator
  initialRoute={{name:'chiapp'}}
  renderScene={(route, navigator) =>{
    if(route.component){
          var Comp = route.component;
          return (
            <Comp navigator={navigator} route={route}/>
          )
    }else{
      return (
      <View style={Styles.appContainer}>

        <TouchableOpacity onPress={() =>{
          navigator.push({
            component:NavigatorIOSColors
          })
          }
        }>
        <Text style={[Styles.appMessage, Styles.appSubMessage]}>
          hello world
        </Text>
        </TouchableOpacity>

        </View>
        )
    }
  }


} />


    );
  }
});
// renderScene={ (route, navigator) => {
//   if(route.component){
//     var Comp = route.component;
//     return (
//       <Comp navigator={navigator} route={route}/>
//     )
//   }else{
//     return (
//       <MySceneComponent
//   name={route.name}
//   gotoLogin={() =>{
//     navigator.push({
//       component:LoginPage,
//       name: 'Scene ' ,
//       index: 1,
//       leftButtonTitle: 'Custom Left',
//     })
//   }}
//   onForward={() => {
//    var nextIndex = route.index + 1;
//    navigator.push({
//      name: 'Scene ' + nextIndex,
//      index: nextIndex,
//    });
//   }}
//   onBack={() => {
//    if (route.index > 0) {
//      navigator.pop();
//    }
//   }}/>
//     )
//   }
//
// }}


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyPage: {
    flex: 1,
    paddingTop: 64,
  },
  emptyPageText: {
    margin: 10,
  },
});
module.exports = App;
