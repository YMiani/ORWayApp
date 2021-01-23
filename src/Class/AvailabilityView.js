import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Picker } from "react-native";
import styles from '../Style/style'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { fillArray } from './ResourceSpendingView'
import { Mix } from './InitialEntryView'
import { help5 } from "../Values/strings"

class AvailabilityRegistration extends React.Component {
    state = {
        num_res: [],
        pickersArray: [],
        availError: [],
        loading: false
    }
    cloneInput = []
    clonePicker = []
    rightSide = []
    componentDidMount() {
        let aux = []
        this.cloneInput = []
        this.clonePicker = []
        this.rightSide = []
        for (let m = 0; m < Mix.state.problem.num_resource; m++) {
            aux[m] = 0
        }
        let arrayFill = []
        for (let i = 0; i < Mix.state.problem.num_resource; i++) {
            arrayFill[i] = "Inicial em"
        }
        this.setState({ num_res: aux, pickersArray: arrayFill })
    }

    saveInput(value, pos1) {
        this.rightSide[pos1] = value
        Mix.setRightSide(this.rightSide)
    }

    requiredFields() {
        let position = []
        let empty = false
        for (let i = 0; i < Mix.state.problem.num_resource; i++) {
            if (this.rightSide[i] == null) {
                empty = true
                position[i] = "Preencha este campo."
            }
            if (this.rightSide[i] == "") {
                empty = true
                position[i] = "Preencha este campo."
            }

        }
        if (empty == true) {
            this.setState(() => ({ availError: position }));
        } else {
            this.setState(() => ({ availError: [] }));
        }
        if (empty == false) {
            this.setState({ loading: true })
            this.props.navigation.navigate('Request')
            this.setState({ loading: false })
        }
    }

    render() {
        let getPicker = i => {
            let pickerCreator = <Picker selectedValue={this.state.pickersArray[i]} style={styles.combobox}
                onValueChange={(itemValue, itemIndex) => onPickerValueChange(itemValue, itemIndex, i)}
            >
                <Picker.Item label="Inicial em" value={"Inicial em"} />
                <Picker.Item label="No máximo" value={"No máximo"} />
                <Picker.Item label="Igual" value={"Igual"} />
            </Picker>
            { fillArray(this.state.pickersArray, "Avail") }
            return pickerCreator
        }

        let onPickerValueChange = (value, index, i) => {
            this.cloneInput = this.rightSide.slice(0)
            this.clonePicker = this.state.pickersArray.slice(0)
            this.clonePicker[i] = value
            this.setState({ pickersArray: this.clonePicker })
            Mix.setRightSide(this.cloneInput)
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.titlePage}>Disponibilidade dos recursos:</Text>
                    <Text style={styles.helpBox}>{help5}</Text>
                    <View style={styles.container}>
                        {
                            this.state.num_res.map((num_res, i) => {
                                return (
                                    <View key={'availView' + i}>
                                        <Text key={'availText' + i} style={styles.titlePage}>{Mix.state.problem.name_resource[i]}</Text>
                                        <Text style={styles.textBox}>Quantidade disponível de {Mix.state.problem.unity_resource[i].toLowerCase()} de {Mix.state.problem.name_resource[i]} é: *</Text>
                                        {getPicker(i)}

                                        <TextInput key={'availInput' + i} style={styles.editBox} keyboardType="numeric" onChangeText={r => this.saveInput(r, i)} placeholder="Digite a quantidade disponível" ></TextInput>
                                        {!!this.state.availError[i] && (<Text style={{ color: "red", marginLeft: 15 }}>{this.state.availError[i]}</Text>)}
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





export default AvailabilityRegistration;  