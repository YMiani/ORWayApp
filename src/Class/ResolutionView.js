import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import styles from '../Style/style'
import Icon from 'react-native-vector-icons/FontAwesome'
import solverGLPK from './Solver/resolution'
import { help9 } from "../Values/strings"
import { saveData } from './Database/Repository';
import { Mix } from './InitialEntryView'
import { setRenderUpdate } from './Database/DatabaseView';

class Resolution extends React.Component {
  state = {
    num_prod: [],
    num_res: [],
    counter: 0,
    loading: false
  }
  componentDidMount() {
    let aux = []
    let auxCounter = this.state.counter
    for (let m = 0; m < Mix.state.problem.num_prod; m++) {
      aux[m] = ''
    }
    let aux2 = []
    for (let n = 0; n < Mix.state.problem.num_resource; n++) {
      aux2[n] = ''
    }
    auxCounter++
    this.setState({ num_prod: aux, num_res: aux2, counter: auxCounter })
    solverGLPK();
    saveData()
  }
  restartContext() {
    setRenderUpdate()
    this.setState({ loading: true })
    this.props.navigation.navigate('MyDrawer')
    this.setState({ loading: false })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titulo}>Resolução:</Text>
          <Text style={styles.helpBox}>{help9}</Text>
          <Text style={styles.linha}>Função Objetivo:</Text>
          <Text style={styles.resposta}>{Mix.state.problem.z}</Text>
          <Text style={styles.linha}>Variáveis de decisão:</Text>
          <View style={styles.container}>
            {this.state.num_prod.map((num_prod, i) => {
              return (
                <View key={'view' + i}>
                  <Text key={'text' + i} style={styles.resposta}>{Mix.state.problem.name_product[i]}: {Mix.state.problem.x[i]}</Text>
                </View>
              )
            })}
          </View>
          <Text style={styles.linha}>Restrições:</Text>
          <View style={styles.container}>
            {this.state.num_res.map((num_res, i) => {
              return (
                <View key={'viewRes' + i}>
                  <Text key={'textRes' + i} style={styles.resposta}>{Mix.state.problem.name_resource[i]}: {Mix.state.problem.restrictionResult[i]} </Text>
                </View>
              )
            })}
          </View>
          <Text style={styles.linha}>Tipo de solução:</Text>
          {Mix.state.problem.answerType == "Solução ótima" ? <Text style={styles.respostaOtima}><Icon name="check" size={20} color="white" /> {Mix.state.problem.answerType}</Text> : <Text style={styles.respostaNaoOtima}><Icon name="exclamation-triangle" size={20} color="white" /> {Mix.state.problem.answerType}</Text>}
          <TouchableOpacity onPress={() => this.restartContext()} style={styles.btnBack}>
            {
              this.state.loading ? (
                <ActivityIndicator style={{ paddingBottom: 15 }} animating={this.state.loading} size={"large"} color={"white"} />
              ) : (
                  <Text style={styles.textButton}>Voltar a página inicial</Text>
                )
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default Resolution;