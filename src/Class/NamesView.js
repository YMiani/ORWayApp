import 'react-native-gesture-handler';
import * as React from 'react';
import {  Text,  View,  TouchableOpacity } from "react-native";
import styles from '../Style/style'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Mix } from './InitialEntryView'
import { help2 } from "../Values/strings"

class NamesRegistration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name_products: [],
            name_resource: [],
        }
    }

    ArrayNameProd = []
    ArrayNameResc = []

    componentDidMount() {
        let aux = []
        for (let m = 0; m < Mix.state.problem.num_prod; m++) {
            aux[m] = ''
        }
        let aux2 = []
        for (let n = 0; n < Mix.state.problem.num_resource; n++) {
            aux2[n] = ''
        }
        this.ArrayNameProd = []
        this.ArrayNameResc = []
        this.setState({ name_products: aux, name_resource: aux2 })
    }

    saveInformation() {
        Mix.setProdName(this.ArrayNameProd)
        Mix.setResName(this.ArrayNameResc)
        this.props.navigation.navigate('RequestRelation')
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.titlePage}>Preenchimento dos nomes:</Text>
                    <Text style={styles.helpBox}>{help2}</Text>
                    <Text style={styles.titlePage}>Nomes dos produtos</Text>
                    <View style={styles.containerWeb}>
                        {
                            this.state.name_products.map((name_products, i) => {
                                return (
                                    <View key={'view' + i}>
                                        <Text key={'text' + i} style={styles.textBox}>Nome do produto {i + 1}:</Text>
                                        <TextInput key={'input' + i} style={styles.editBox} onChangeText={nameP => this.ArrayNameProd[i] = nameP} placeholder="Digite o nome do produto" ></TextInput>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <Text style={styles.titlePage}>Nome dos recursos</Text>
                    <View style={styles.containerWeb}>
                        {
                            this.state.name_resource.map((name_resource, j) => {
                                return (
                                    <View key={'view' + j} >
                                        <Text key={'text' + j} style={styles.textBox}>Nome do recurso {j + 1}:</Text>
                                        <TextInput key={'input' + j} style={styles.editBox} onChangeText={nameR => this.ArrayNameResc[j] = nameR} placeholder="Digite o nome do recurso" ></TextInput>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <TouchableOpacity onPress={() => this.saveInformation()} style={styles.btnNext}><Text>Próximo</Text></TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

export default NamesRegistration;  