import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, TouchableOpacity, Picker, Platform, Animated } from "react-native";
import styles from '../Style/style'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { fillArray } from './ResourceSpendingView'
import { help6 } from "../Values/strings"
import { Mix } from './InitialEntryView'
import Icon from 'react-native-vector-icons/FontAwesome'

class RequestRelationRegistration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num_prod: [],
            pickersArray: [],
            requestError: [],
            relation1: 'x1',
            relation2: 'x2',
            relationLimit: 'Limite máximo'
        }
    }

    relation = []

    componentDidMount() {
        let arrayFill = []
        this.demand = []
        this.clonePicker = []
        this.cloneInput = []
        this.edit = true
        this.alpha = []
        let aux = []
        for (let m = 0; m < Mix.state.problem.num_prod; m++) {
            aux[m] = 0
        }
        this.setState({ num_prod: aux })

    }

    saveInput(value, pos1) {
        this.relation[pos1] = value
        //Mix.setRequest(this.demand)
    }

    requiredFields() {
        //this.props.navigation.navigate('ReviewWeb', { itemId: 0 })
    }

    addRelation() {

    }

    getPickerLimit = () => {
        let pickerCreatorLimit = <Picker selectedValue={this.state.relationLimit} style={styles.combobox}
            onValueChange={(itemValue, itemIndex) => this.onPickerValueChange(itemValue, itemIndex, "limit")}
        >
            <Picker.Item label="Maior que" value={"max"} />
            <Picker.Item label="Menor que" value={"min"} />
            <Picker.Item label="Igual a" value={"igual"} />
        </Picker>
        return pickerCreatorLimit
    }

    render() {
        let onPickerValueChange = (value, index, i) => {
            if(i == "limit"){
                this.setState({ relationLimit: value })
                this.relation[Mix.state.problem.num_prod] = value
            }
            if(i == "variable"){
                this.setState({ relation1: value })
                this.relation[Mix.state.problem.num_prod+1] = value
            }
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.titlePage}>Relação de demanda entre os produtos:</Text>
                    <Text style={styles.helpBox}>{help6}</Text>
                    <Text style={styles.titlePage}>Defina a quantidade de cada produto:</Text>
                    {this.state.num_prod.map((num_prod, i) => {
                        return (
                            <View key={'view' + i}>
                                <Text key={'text' + i} style={styles.textBox}>Quantidade utilizada de {Mix.state.problem.name_product[i]}:</Text>
                                <TextInput key={'valuesInput' + i} style={styles.editBox} keyboardType="numeric" onChangeText={v => this.saveInput(v, i)} placeholder="Digite o valor aqui" ></TextInput>
                            </View>
                        )
                    })}
                    <Text style={styles.titlePage}>A limitação dessa relação é:</Text>
                    {this.getPickerLimit()}
                    <Text key={'text'} style={styles.textBoxRelation}>Quantidade do limitante:</Text>
                    <Picker selectedValue={this.state.relation1} style={styles.combobox}
                        onValueChange={(itemValue, itemIndex) => this.onPickerValueChange(itemValue, itemIndex, "variable")}
                    >
                        {
                            this.state.num_prod.map((num_prod, i) => {
                                return (
                                    <Picker.Item key={"picker" + i} label={Mix.state.problem.name_product[i]} value={Mix.state.problem.name_product[i]} />
                                )
                            })
                        }
                    </Picker>
                    <TextInput style={styles.editBox} keyboardType="numeric" placeholder="Digite o valor aqui" onChangeText={v => this.saveInput(v, Mix.state.problem.num_prod+2)} ></TextInput>
                    <TouchableOpacity onPress={() => this.addRelation()} style={styles.btnAdd}><Text>Adicionar a lista</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Request')} style={styles.btnNextWeb}><Text>Salvar e encerrar lista</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Request')} style={styles.btnBack}><Text>Voltar e descartar lista</Text></TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

export default RequestRelationRegistration;  