import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, TouchableOpacity, Platform, ActivityIndicator, Picker } from "react-native";
//import { Picker } from "@react-native-community/picker"
import styles from '../Style/style'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Mix } from './InitialEntryView'
import { help3 } from "../Values/strings"
export let type = ''

class ValuesRegistration extends React.Component {
    state = {
        num_prod: [],
        selectedValue: "Aumentar lucro",
        selectedValue2: "Dinheiro",
        coefError: [],
        loading: false
    }
    componentDidMount() {
        let aux = []
        this.coef = []
        for (let m = 0; m < Mix.state.problem.num_prod; m++) {
            aux[m] = 0
        }
        this.setState({ num_prod: aux })
    }

    saveInput(value, pos1) {
        this.coef[pos1] = value
        Mix.setCoef(this.coef)
    }

    requiredFields() {
        let empty = false
        let position = []
        for (let i = 0; i < Mix.state.problem.num_prod; i++) {
            if (this.coef[i] == null) {
                empty = true
                position[i] = "Preencha este campo."
            }
            if (this.coef[i] == "") {
                empty = true
                position[i] = "Preencha este campo."
            }
        }

        if (empty == true) {
            this.setState(() => ({ coefError: position }));
        } else {
            this.setState(() => ({ coefError: [] }));
        }

        if (empty == false) {
            this.setState({ loadin: true })
            this.props.navigation.navigate('ResourceSpending')
            this.setState({ loadin: false })
        }
    }

    render() {
        let onPickerValueChange = (value, index) => {
            let cloneInput = this.coef.slice(0)
            this.setState({ selectedValue2: value })
            Mix.setCoef(cloneInput)
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.titlePage}>Valores dos produtos:</Text>
                    <Text style={styles.helpBox}>{help3}</Text>
                    <Text style={styles.textBox}>Qual o objetivo esperado?</Text>
                    <Picker
                        selectedValue={this.state.selectedValue}
                        style={styles.combobox}
                        onValueChange={(itemValue, itemIndex) => this.setState({ selectedValue: itemValue })}
                    >
                        <Picker.Item label="Aumentar lucro" value="Aumentar lucro" />
                        <Picker.Item label="Diminuir gastos " value="Diminuir gastos" />
                    </Picker>
                    <Text style={styles.textBox}>Unidade utilizada:</Text>
                    <Picker
                        selectedValue={this.state.selectedValue2}
                        style={styles.combobox}
                        onValueChange={onPickerValueChange}
                    >
                        <Picker.Item label="Dinheiro" value="Dinheiro" />
                        <Picker.Item label="Unidade" value="Unidades" />
                        <Picker.Item label="Horas" value="Horas" />
                    </Picker>
                    <View style={styles.container}>
                        {
                            this.state.num_prod.map((num_prod, i) => {
                                return (
                                    <View key={'valuesView' + i}>
                                        <Text key={'valuesText' + i} style={styles.titlePage}>Qual o valor em {this.state.selectedValue2.toLowerCase()} de {Mix.state.problem.name_product[i]}: *</Text>
                                        <TextInput key={'valuesInput' + i} style={styles.editBox} keyboardType="numeric" onChangeText={v => this.saveInput(v, i)} placeholder="Digite o valor aqui" ></TextInput>
                                        {!!this.state.coefError[i] && (<Text style={{ color: "red", marginLeft: 15 }}>{this.state.coefError[i]}</Text>)}
                                    </View>
                                )
                            })
                        }
                    </View>
                    {Mix.setTypeOpt(this.state.selectedValue)}
                    {Mix.setProd_Uni(this.state.selectedValue2)}

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

export default ValuesRegistration;  