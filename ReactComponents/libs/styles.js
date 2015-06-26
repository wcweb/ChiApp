var React = require("react-native");

let {StyleSheet} = React;

let Styles = StyleSheet.create({
  appNavigator:{
    height:30,
    marginTop: 20,
      backgroundColor: "#202020"
  },
  appWrapper:{
    flex:1,
  },
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202020"
  },

  appLogo: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 14
  },

  appMessage: {
    fontSize: 20,
    color: "white",
    fontFamily: "Avenir-Medium",
    alignSelf: "center"
  },

  appSubMessage: {
    fontSize: 14,
    opacity: 0.7
  }
});

module.exports =  Styles;
