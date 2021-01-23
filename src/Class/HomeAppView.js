import 'react-native-gesture-handler';
import * as React from 'react';

import { SafeAreaView, Text, StatusBar, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";


import styles from '../Style/style'
import { setDate, restartProblem } from './MixProblem'

import Icon from 'react-native-vector-icons/FontAwesome'


class HomeApp extends React.Component {
  state = {
    loading: false
  }
  componentDidMount() {
    this.setState({ loading: false })
  }

  loadButton = () => {
    this.setState({ loading: true })
    this.props.navigation.navigate('InitialEntry', { itemId: 1 })
    this.setState({ loading: false })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#008B8B" Icon={<Icon name="trash-o" size={35} color="white" />} />
        <View>
          <Image source={require('../../assets/img/logo-orway-transp-semmoldura.png')} style={styles.imagem} />
        </View>
        <View>
          <Image source={require('../../assets/img/logo_gpsiscom.jpg')} style={styles.imagemLogoMenor} />
        </View>
        <TouchableOpacity onPress={() => this.loadButton()} style={styles.btnNext}>
          {
            this.state.loading ? (
              <ActivityIndicator style={{ paddingBottom: 15 }} animating={this.state.loading} size={"large"} color={"white"} />
            ) : (
                <Text style={styles.textButton}>Iniciar</Text>
              )
          }
        </TouchableOpacity>
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

export default HomeApp;





