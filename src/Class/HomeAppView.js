import 'react-native-gesture-handler';
import * as React from 'react';

import { SafeAreaView, Text, StatusBar, View, Image, TouchableOpacity} from "react-native";


import styles from '../Style/style'
import {setDate, restartProblem} from './MixProblem'

import Icon from 'react-native-vector-icons/FontAwesome'


 class HomeApp extends React.Component {
  constructor(props){
    super(props)
    
  }


  componentDidMount(){
   
  }
  
  render(){
    
   
    return (
      

      <View  style={styles.container}>
        <StatusBar backgroundColor="#008B8B" Icon={<Icon name="trash-o" size={35} color="white"/>}/>
          
          <Text style={styles.titulo}>Architecture - No Equation Optimization Solver</Text>
          <View>
          <Image source={require('../../assets/img/logo_gpsiscom.jpg') } style={styles.image} />
          
          </View>
          
          <TouchableOpacity onPress={() => this.props.navigation.navigate('InitialEntry', {itemId:1})} style={styles.btnNext}><Text>Iniciar</Text></TouchableOpacity>
            
        </View>
      
    )
  }
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source='../Class/img/neos_new.png'
    />
  );
}




/*const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  InitialEntry: { screen: InitialEntry},
  Names: { screen: Names},
  Values: { screen: Values},

});*/

export default HomeApp;





