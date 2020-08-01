import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Button, SafeAreaView, Modal, Text, StatusBar, StyleSheet, View, Image, TouchableOpacity } from "react-native";

import styles from '../Style/style'
import { ScrollView, TextInput, State } from 'react-native-gesture-handler';

import Names from './NamesView'


import { help1 } from "../Values/strings"
import style from '../Style/style';
import { color } from 'react-native-reanimated';

import moment from 'moment'
import 'moment/locale/pt-br'

import {MixProblem} from './MixProblem'


export let Mix = MixProblem

class InitialEntry extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:"", 
            product:"",
            resource:"", 
            id:0
        }
    }
  
  componentDidMount(){
    if(this.props.route.params){
        const {itemId} = this.props.route.params;
        this.setState({id:JSON.parse(itemId)})
        
    }else{
        this.setState({id:0})
    }

    Mix = new MixProblem
    console.log(Mix)
    const today = moment().locale('pt-br').format('D [de] MMMM [de] YYYY')
    Mix.setDate(today)
    console.log("entrou no didiMount")
  }

  requiredFields(){
    
    if (this.state.name.trim() === "") {
        this.setState(() => ({ nameError: "Preencha este campo." }));
    } else {
        this.setState(() => ({ nameError: null }));
    }

    if (this.state.product.trim() === "") {
        this.setState(() => ({ productError: "Preencha este campo." }));
    } else {
        this.setState(() => ({ productError: null }));
    }

    if (this.state.resource.trim() === "") {
        
        this.setState(() => ({ resourceError: "Preencha este campo." }));
    } else {
        
        this.setState(() => ({ resourceError: null }));
    }

    if(this.state.name.trim() !== "" && this.state.product.trim() !== "" && this.state.resource.trim() !== ""){
        Mix.setName(this.state.name)
        Mix.setResNum(this.state.resource)
        Mix.setProdNum(this.state.product)
        this.props.navigation.navigate('Names')
        
    }
}

    render(){
        
        return (
            <ScrollView key={this.state.id}>
                <View style={styles.container}>
                    <Text style={styles.titlePage}>Dados básicos:</Text>
                    <Text style={styles.helpBox}>{help1}</Text>
                    <Text style={styles.textBox}>Nome do problema: *</Text>

                    <TextInput style={styles.editBox} onChangeText={name => this.setState({name:name})} placeholder="Digite o nome do problema" ></TextInput>
                    
                    {!!this.state.nameError && (<Text style={{ color: "red", marginLeft:15 }}>{this.state.nameError}</Text>)}

                    <Text style={styles.textBox}>Descrição:</Text>
                    <TextInput style={styles.editBox} onChangeText={desc => Mix.setDesc(desc)} placeholder="Breve descrição do problema"></TextInput>
                    <Text style={styles.titlePage}>Produtos/Recursos</Text>
                    <Text style={styles.textBox}>Quantidade de produtos diferentes a serem produzidos: *</Text>
                   
                    <TextInput style={styles.editBox} onChangeText={col => this.setState({product:col})} keyboardType="numeric" placeholder="Digite aqui a quantidade de produtos"></TextInput>
                    {!!this.state.productError && (<Text style={{ color: "red", marginLeft:15 }}>{this.state.productError}</Text>)}
                    
                    <Text style={styles.textBox}>Quantidade de recursos necessários para a produção: *</Text>
                    
                    <TextInput style={styles.editBox} onChangeText={line => this.setState({resource:line})} keyboardType="numeric" placeholder="Digite aqui a quantidade de recursos" ></TextInput>
                    {!!this.state.resourceError && (<Text style={{ color: "red", marginLeft:15 }}>{this.state.resourceError}</Text>)}
                    
                    
                    <TouchableOpacity onPress={() => this.requiredFields() } style={styles.btnNext}><Text>Próximo</Text></TouchableOpacity>
                    
                </View>
            </ScrollView>
        )}

}


export default InitialEntry;  