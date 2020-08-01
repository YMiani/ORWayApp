import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView, Text, StatusBar, StyleSheet, View, Image, TouchableOpacity, Picker} from "react-native";
import styles from '../Style/style'
import { ScrollView, TextInput, createNativeWrapper } from 'react-native-gesture-handler';


import {Mix} from './InitialEntryView'

import {help4} from "../Values/strings"


export function fillArray(pickersArray, page){
    let array = []
    if(page == "Resource"){
        for(let i=0; i < Mix.state.problem.num_resource; i++){
            array[i] = pickersArray[i]
        }
        Mix.setRes_Uni(array)

       
    }
    if(page === "Avail"){
        for(let i=0; i < Mix.state.problem.num_resource; i++){
            array[i] = pickersArray[i]
        }
        Mix.setSignal(array)
    } 
    if(page === "Request"){
        for(let i=0; i < Mix.state.problem.num_prod; i++){
            array[i] = pickersArray[i]
        }
        Mix.setSignal_X(array)
          
    }
    
}


class ResourceSpendingRegistration extends React.Component{
    constructor(props){
        super(props)
        this.state={
            num_resource:[],
            num_prod:[], 
            pickersArray:[], 
            spendingError:[]
        }
    }
    
    itemResource=[]
    cloneInput = []
    clonePicker = []
    
    componentDidMount(){
        let position = []
        this.itemResource=[]
        this.cloneInput = []
        this.clonePicker = []

        for(let i=0; i < Mix.state.problem.num_resource; i++){
            this.itemResource[i] = []
            position[i] = []
        }
        let aux =  []
        for(let m = 0; m < Mix.state.problem.num_prod; m++){
            aux[m] = 0
        }
        let aux2 =  []
        let arrayFill = []
        for(let n = 0; n < Mix.state.problem.num_resource; n++){
            aux2[n] = 0  
            arrayFill[n] = "Dinheiro"
        }
        this.setState({num_resource:aux2, num_prod:aux, pickersArray:arrayFill, spendingError:position})
    }

    saveInput(value, pos1, pos2){
        this.itemResource[pos1][pos2] = value
        Mix.setItemResource(this.itemResource)
    }

    requiredFields(){
        let position = []
        let empty = false
        let emptyArray = []
        
        for(let i=0; i< Mix.state.problem.num_resource;i++){
            position[i] = []
            emptyArray[i] = []
        }

        for(let i=0; i< Mix.state.problem.num_resource;i++){
            for(let j = 0; j<Mix.state.problem.num_prod;j++){
                if(this.itemResource[i][j] == null){
                    empty = true
                    position[i][j] = "Preencha este campo."     
                }
                if(this.itemResource[i][j] == ""){
                    empty = true
                    position[i][j] = "Preencha este campo."
                }
            }
        }
        
        if(empty == true){
            
            this.setState(() => ({ spendingError: position }));
        }else{
            this.setState(() => ({ spendingError: emptyArray }));
        }
        
        if(empty == false){
            
            this.props.navigation.navigate('Avail')
            
        }
    }

    render(){
        
        let getPicker= i =>{
            let pickerCreator = <View key={'pickerView'+i}>
                                    <Picker key={'picker'+i} selectedValue={this.state.pickersArray[i]} style={styles.combobox}
                                    onValueChange={(itemValue, itemIndex) => onPickerValueChange(itemValue, itemIndex, i)} 
                                    >
                                        <Picker.Item label="Dinheiro" value={"Dinheiro"} />
                                        <Picker.Item label="Unidade" value={"Unidade"} />
                                        <Picker.Item label="Horas" value={"Horas"} />
                                    </Picker>
                                        {fillArray(this.state.pickersArray, "Resource")}
                                        
                                </View>
                                
                                

            return pickerCreator
        }

        let onPickerValueChange = (value, index, i) =>{
            this.cloneInput = this.itemResource.slice(0)
            this.clonePicker = this.state.pickersArray.slice(0)
            this.clonePicker[i] = value
            this.setState({pickersArray:this.clonePicker})
            Mix.setItemResource(this.cloneInput)
        }
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.titlePage}>Gastos Recursos/Produtos:</Text>
                    <Text style={styles.helpBox}>{help4}</Text>
                    <View style={styles.container}>
                        {this.state.num_resource.map((num_resource, i)=>{
                            return(
                                <View key={'resourceView'+i}>
                                    <Text key={'resourceText'+i} style={styles.titlePage}>Quantidade de {Mix.state.problem.name_resource[i]}</Text>
                                    <Text  key={'resourceText2'+i} style={styles.textBox}>Unidade utilizada por {Mix.state.problem.name_resource[i]}</Text>
                                    {getPicker(i)}

                                    <View>
                                        {this.state.num_prod.map((num_prod, j)=>{
                                            return(
                                                <View key={'viewProduct'+j}>
                                                    <Text key={'resourceTextInitial'+j} style={styles.textBox}>Quantidade por valor de {this.state.pickersArray[i].toLowerCase()} de {Mix.state.problem.name_product[j]}: *</Text>
                                                    <TextInput key={'resourceInputInitial'+j} style={styles.editBox} keyboardType="numeric" onChangeText={v => this.saveInput(v, i, j)} placeholder= {"Digite a quantidade de "+Mix.state.problem.name_resource[i]+ " utilizado"} ></TextInput>
                                                    {!!this.state.spendingError[i][j] && (<Text style={{ color: "red", marginLeft:15 }}>{this.state.spendingError[i][j]}</Text>)}
                                                </View>
                                            )
                                        })}
                                    </View>
                                    
                                    
                                    
                                </View>
                                
                            ) 
                        })
                            
                        }

                    </View>
                    
            
                    
                    <TouchableOpacity onPress={() => this.requiredFields()} style={styles.btnNext}><Text>Próximo</Text></TouchableOpacity>
        
                    </View>

                    
            </ScrollView>
        
        )}
}

export default ResourceSpendingRegistration;  