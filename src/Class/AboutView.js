import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View } from "react-native";
import styles from '../Style/style'

class About extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titlePage}>Descrição:</Text>
        <Text style={styles.desc}>O ORWay é um aplicativo com o intuito de proporcionar que qualquer pessoa seja capaz de resolver problemas que envolvam o melhor uso de tarefas, ou seja, otimização, através da metodologia Wizard.
        Para isso, o usuário não necessita ter conhecimento prévio sobre as técnicas envolvidas na resolução. A aplicação conta com uma arquitetura expansível, ARC-NEOS, que é uma continuação do trabalho realizado em 2017 por João Paulo Lemos Rodrigues, NEOS.
      A ideia da arquitetura é acoplar diferentes modelos de resolução para as categorias apresentadas de problemas de Pesquisa Operacional.</Text>
      </View>
    );
  }
}

export default About;  