import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, ScrollView } from "react-native";
import styles from '../../Style/style'

export default class DatabaseInfo extends React.Component {
  state = {
    problem: [],
    arrayX: [],
    arrayRestriction: []
  }

  componentDidMount = async () => {
    const { itemId } = this.props.route.params;
    let arrayNull = [];
    let arrayNull2 = [];
    for (let i = 0; i < itemId.num_prod; i++) {
      arrayNull[i] = ' ';
    }
    for (let i = 0; i < itemId.num_resource; i++) {
      arrayNull2[i] = ' ';
    }
    this.setState({ problem: itemId })
    this.setState({ arrayX: arrayNull })
    this.setState({ arrayRestriction: arrayNull2 })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.titlePage}>Dados do problema:</Text>
          <Text style={styles.textBox}>Data: {this.state.problem.date}</Text>
          <Text style={styles.textBox}>Nome: {this.state.problem.name}</Text>
          <Text style={styles.textBox}>Descrição: {this.state.problem.desc}</Text>
          <Text style={styles.textBox}>Número de produtos: {this.state.problem.num_prod}</Text>
          <Text style={styles.textBox}>Número de recursos: {this.state.problem.num_resource}</Text>
          <Text style={styles.textBox}>Tipo de otimização: {this.state.problem.type_optimization} </Text>
          <Text style={styles.textBox}>Função objetivo: {this.state.problem.z} </Text>
          <Text style={styles.textBox}>Variáveis de decisão:</Text>
          <View style={styles.container}>
            {this.state.arrayX.map((arrayX, i) => {
              return (
                <View key={'viewData' + i}>
                  <Text key={'textData' + i} style={styles.textBox}>{this.state.problem.name_product[i]}: {this.state.problem.x[i]}</Text>
                </View>
              )
            })}
          </View>
          <Text style={styles.textBox}>Restrições:</Text>
          <View style={styles.container}>
            {this.state.arrayRestriction.map((num_res, i) => {
              return (
                <View key={'view2Data' + i}>
                  <Text key={'text2Data' + i} style={styles.textBox}>{this.state.problem.name_resource[i]}: {this.state.problem.restrictionResult[i]} </Text>
                </View>
              )
            })}
          </View>
          <Text style={styles.textBox}>Tipo de solução: {this.state.problem.answerType} </Text>
        </ScrollView>
      </View>
    )
  }
}

