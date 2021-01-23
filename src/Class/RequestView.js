import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, TouchableOpacity, Platform, ActivityIndicator, Picker } from "react-native";
import styles from '../Style/style'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { fillArray } from './ResourceSpendingView'
import { help6 } from "../Values/strings"
import { Mix } from './InitialEntryView'

class RequestRegistration extends React.Component {
    state = {
        num_prod: [],
        pickersArray: [],
        requestError: [],
        loading: false
    }
    demand = []
    clonePicker = []
    cloneInput = []
    edit = true
    alpha = []
    componentDidMount() {
        let arrayFill = []
        this.demand = []
        this.clonePicker = []
        this.cloneInput = []
        this.edit = true
        this.alpha = []
        for (let i = 0; i < Mix.state.problem.num_prod; i++) {
            arrayFill[i] = "Ilimitada"
            this.demand[i] = 0
        }
        let aux = []
        for (let m = 0; m < Mix.state.problem.num_prod; m++) {
            aux[m] = 0
            this.alpha[m] = 1
        }
        this.setState({ num_prod: aux, pickersArray: arrayFill })
    }

    saveInput(value, pos1) {
        this.demand[pos1] = value
        Mix.setRequest(this.demand)
    }

    requiredFields() {
        let position = []
        let empty = false
        for (let i = 0; i < Mix.state.problem.num_prod; i++) {
            if (this.state.pickersArray[i] != "Ilimitada" && this.demand[i] == null) {
                empty = true
                position[i] = "Preencha este campo."
            }
            if (this.state.pickersArray[i] != "Ilimitada" && this.demand[i] == "") {
                empty = true
                position[i] = "Preencha este campo."
            }
        }
        if (empty == true) {
            this.setState(() => ({ requestError: position }));
        } else {
            this.setState(() => ({ requestError: [] }));
        }
        if (empty == false) {
            if (Platform.OS == 'web') {
                this.setState({ loading: true })
                this.props.navigation.navigate('ReviewWeb', { itemId: 0 })
                this.setState({ loading: false })
            } else {
                this.setState({ loading: true })
                this.props.navigation.navigate('Review', { itemId: 0 })
                this.setState({ loading: false })
            }
        }
    }

    render() {
        let getPicker = i => {
            let pickerCreator = <Picker selectedValue={this.state.pickersArray[i]} style={styles.combobox}
                onValueChange={(itemValue, itemIndex) => onPickerValueChange(itemValue, itemIndex, i)}
            >
                <Picker.Item label="Ilimitada" value={"Ilimitada"} />
                <Picker.Item label="Limitada e no mínimo" value={"Limitada e no mínimo"} />
                <Picker.Item label="Limitada e no máximo" value={"Limitada e no máximo"} />
                <Picker.Item label="Limitada e igual" value={"Limitada e igual"} />
            </Picker>
            { this.state.pickersArray[i] === "Ilimitada" ? this.alpha[i] = 0.1 : this.alpha[i] = 1 }
            { this.state.pickersArray[i] === "Ilimitada" ? this.edit = false : this.edit = true }
            { fillArray(this.state.pickersArray, "Request") }
            return pickerCreator
        }

        let onPickerValueChange = (value, index, i) => {
            this.cloneInput = this.demand.slice(0)
            this.clonePicker = this.state.pickersArray.slice(0)
            this.clonePicker[i] = value
            this.setState({ pickersArray: this.clonePicker })
            Mix.setRequest(this.cloneInput)
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.titlePage}>Demandas de produção:</Text>
                    <Text style={styles.helpBox}>{help6}</Text>
                    <View style={styles.container}>
                        {
                            this.state.num_prod.map((num_prod, i) => {
                                return (
                                    <View key={'requestView' + i} >
                                        <Text key={'requestText' + i} style={styles.titlePage}>{Mix.state.problem.name_product[i]}</Text>
                                        <Text key={'requestText2' + i} style={styles.textBox}>A quantidade produzida de {Mix.state.problem.name_product[i]} deve ser: </Text>
                                        {getPicker(i)}
                                        <Text key={'requestText3' + i} style={{ opacity: this.alpha[i], paddingLeft: 20, paddingBottom: 10, paddingTop: 10, backgroundColor: "#C0C0C0", fontSize: 18 }}>Quantidade: *</Text>
                                        <TextInput key={'requestInput' + i} style={{ opacity: this.alpha[i], margin: 10, height: 40, borderColor: 'gray', borderWidth: 1 }} keyboardType="numeric" onChangeText={d => this.saveInput(d, i)} placeholder="Digite a quantidade, se limitada"
                                            editable={this.edit} ></TextInput>
                                        {!!this.state.requestError[i] && (<Text style={{ color: "red", marginLeft: 15 }}>{this.state.requestError[i]}</Text>)}
                                    </View>
                                )
                            })
                        }
                    </View>
                    <TouchableOpacity onPress={() => this.requiredFields()} style={styles.btnNext}>
                        {
                            this.state.loading ? (
                                <ActivityIndicator style={{ paddingBottom: 15 }} animating={this.state.loading} size={"large"} color={"white"} />
                            ) : (
                                    <Text style={styles.textButton}>Próximo</Text>
                                )
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}





export default RequestRegistration;  