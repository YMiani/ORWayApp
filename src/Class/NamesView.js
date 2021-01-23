import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, Text, StatusBar, StyleSheet, View, Image, TouchableOpacity, Platform } from "react-native";
import styles from '../Style/style'
import { ScrollView, TextInput, createNativeWrapper } from 'react-native-gesture-handler';


import { Mix } from './InitialEntryView'



import { help2 } from "../Values/strings"


class NamesRegistration extends React.Component {
    state = {
        loading: false,
        name_products: [],
        name_resource: [],
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
        this.setState({ loading: true })
        this.props.navigation.navigate('Values')
        this.setState({ loading: false })
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
                    <TouchableOpacity onPress={() => this.saveInformation()} style={styles.btnNext}>
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

export default NamesRegistration;  