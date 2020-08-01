import 'react-native-gesture-handler';
import * as React from 'react';

import { SafeAreaView, Text, StatusBar, View, Image, TouchableOpacity, Picker, Platform} from "react-native";

import moment from 'moment'
import 'moment/locale/pt-br'
import styles from '../Style/style'



import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { help8 } from '../Values/strings';
import {Mix} from './InitialEntryView'

let viewUser = <View></View>



function cancelChange(navigation, data){
    Mix.setTypeOpt(data)
    navigation.navigate('Review',{itemId:1})
}



class ReviewEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedValue:Mix.state.problem.type_optimization,
            selectedValue2:Mix.state.problem.unity_product,
            selectedValue3:"Dinheiro",
            selectedValue4:"Inicial em",
            selectedValue5:"Ilimitada", 
            item:0,
            itemParent:0, 
            id:0,
            fieldError:''
            
        }
    }
    
    name=''
    value=0
    name2=''
    avail=0
    request = 0
    itemResource = 0
    alpha = 1
    edit=true
    
    
    componentDidMount(){
        this.name=''
        this.value=0
        this.name2=''
        this.avail=0
        this.request = 0
        this.itemResource = 0
        this.edit = true
        this.alpha = 1
        
        
        const { itemId } = this.props.route.params;
        this.setState({id:JSON.stringify(itemId)})
        
        
        if(JSON.stringify(itemId) == 4){
            
            const { state } = this.props.route.params;
            this.setState({item:JSON.stringify(state)})
        }
        if(JSON.stringify(itemId) == 5){
            const { state } = this.props.route.params;
            const {stateParent} = this.props.route.params
            
            this.setState({itemParent:JSON.stringify(stateParent), selectedValue3:Mix.state.problem.unity_resource[JSON.stringify(stateParent)], item:JSON.stringify(state)})
            
        }
        if(JSON.stringify(itemId) == 6){
            const { state } = this.props.route.params;
            let pass = JSON.stringify(state)
            
            this.setState({item:pass, selectedValue4:Mix.state.problem.signal_restriction[JSON.stringify(state)] })
            
        }
        if(JSON.stringify(itemId) == 7){
            const { state } = this.props.route.params;
            this.setState({item:JSON.stringify(state), selectedValue5:Mix.state.problem.signal_restriction_x[JSON.stringify(state)]})
        }
        
    }

    backPageContext(number){
        if(Platform.OS === 'web'){
            
            this.props.navigation.navigate('ReviewWeb',{itemId:number})
        }else{
            
            this.props.navigation.navigate('Review',{itemId:number})
        }
        
    }
    
    viewChoose = i =>{
        if(i == 1){
            viewUser = <View><Text style={styles.textBox}>Deseja alterar o número de produtos? Todos dados deverão ser refeitos</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('InitialEntry')} style={styles.btnSaveEdit}><Text>Sim</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => this.backPageContext(1)} style={styles.btnBack}><Text>Não</Text></TouchableOpacity></View>
        }else if(i == 2){
            viewUser = <View><Text style={styles.textBox}>Deseja alterar o número de recursos? Todos dados deverão ser refeitos</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('InitialEntry')} style={styles.btnSaveEdit}><Text>Sim</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => this.backPageContext(2)} style={styles.btnBack}><Text>Não</Text></TouchableOpacity></View>
        }else if(i == 3){
            
            viewUser = 
            <View>
                <Text style={styles.textBox}>Qual objetivo esperado? </Text>

                <Picker
                    selectedValue={this.state.selectedValue}
                    style={styles.combobox}
                    onValueChange={(itemValue, itemIndex)=>this.setState({selectedValue:itemValue})}
                    > 
                    
                    <Picker.Item label="Aumentar lucro" value="Aumentar lucro" />
                    <Picker.Item label="Diminuir gastos " value="Diminuir gastos" />
                </Picker>
            
                <TouchableOpacity onPress={() => {this.saveChange(this.props.navigation, 3, this.state.selectedValue)}} style={styles.btnSaveEdit}><Text>Salvar</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.backPageContext(3)} style={styles.btnBack}><Text>Cancelar</Text></TouchableOpacity>
            
            </View>
        }else if(i == 4){
            
            viewUser = 
            <View>
                <Text style={styles.textBox}>Nome do produto atual: {Mix.state.problem.name_product[this.state.item]}</Text>
                <TextInput key={'text1'}  style={styles.editBox} onChangeText={nameP => this.name=nameP} placeholder= "Alterar nome do produto" ></TextInput>
                <Text style={styles.textBox}>Unidade do produto:</Text>
                <Picker
                    selectedValue={this.state.selectedValue2}
                    style={styles.combobox}
                    onValueChange={(itemValue, itemIndex)=>this.setState({selectedValue2:itemValue})}
                    > 
                    
                    <Picker.Item label="Dinheiro" value="Dinheiro" />
                    <Picker.Item label="Unidade" value="Unidades" />
                    <Picker.Item label="Horas" value="Horas" />
                </Picker>
                <Text style={styles.textBox}>Valor do produto atual: {Mix.state.problem.coef_goal[this.state.item]}</Text>
                <TextInput key={'input1'} keyboardType="numeric" style={styles.editBox} onChangeText={val => this.value = val} placeholder= "Alterar valor do produto" ></TextInput>


                <TouchableOpacity onPress={() => {this.saveChange(this.props.navigation, 4, this.state.selectedValue2, this.state.item, this.name, this.value)}} style={styles.btnSaveEdit}><Text>Salvar</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.backPageContext(4)} style={styles.btnBack}><Text>Cancelar</Text></TouchableOpacity>
            
            </View>
        }else if(i == 5){
            
            viewUser = 
            <View>
                <Text style={styles.textBox}>Nome do produto atual: {Mix.state.problem.name_product[this.state.item]}</Text>
                <TextInput key={'text2'}  style={styles.editBox} onChangeText={nameP => this.name=nameP} placeholder= "Alterar nome do produto" ></TextInput>
                <Text style={styles.textBox}>Nome do recurso atual: {Mix.state.problem.name_resource[this.state.itemParent]}</Text>
                <TextInput key={'text3'}  style={styles.editBox} onChangeText={nameP => this.name2=nameP} placeholder= "Alterar nome do produto" ></TextInput>
                <Text style={styles.textBox}>Unidade do recurso:</Text>
                
                <Picker
                    selectedValue={this.state.selectedValue3}
                    style={styles.combobox}
                    onValueChange={(itemValue, itemIndex)=>this.setState({selectedValue3:itemValue})}
                    > 
                    
                    <Picker.Item label="Dinheiro" value="Dinheiro" />
                    <Picker.Item label="Unidade" value="Unidades" />
                    <Picker.Item label="Horas" value="Horas" />
                </Picker>
                <Text style={styles.textBox}>Valor consumido do recurso atual pelo produto: {Mix.state.problem.itemPerResource[this.state.itemParent][this.state.item]}</Text>
                <TextInput key={'input2'} keyboardType="numeric" style={styles.editBox} onChangeText={val => this.itemResource = val} placeholder= "Alterar valor do consumo" ></TextInput>


                <TouchableOpacity onPress={() => {this.saveChange(this.props.navigation, 5, this.state.selectedValue3, this.state.item, this.name, this.itemResource, this.state.itemParent, this.name2)}} style={styles.btnSaveEdit}><Text>Salvar</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.backPageContext(5)} style={styles.btnBack}><Text>Cancelar</Text></TouchableOpacity>
            
            </View>
        }else if(i == 6){
            viewUser = 
            <View>
                <Text style={styles.textBox}>Nome do recurso atual: {Mix.state.problem.name_resource[this.state.item]}</Text>
                <TextInput key={'text4'}  style={styles.editBox} onChangeText={nameP => this.name2=nameP} placeholder= "Alterar nome do recurso" ></TextInput>
                <Text style={styles.textBox}>Tipo de disponibilidade: </Text>
                
                <Picker
                    selectedValue={this.state.selectedValue4}
                    style={styles.combobox}
                    onValueChange={(itemValue, itemIndex)=>this.setState({selectedValue4:itemValue})}
                    > 
                    
                    <Picker.Item label="Inicial em" value={"Inicial em"} />
                    <Picker.Item label="No máximo" value={"No máximo"} />
                    <Picker.Item label="Igual" value={"Igual"} />
                </Picker>
                <Text style={styles.textBox}>Quantidade atual: {Mix.state.problem.right_side[this.state.item]}</Text>
                <TextInput key={'input3'} keyboardType="numeric" style={styles.editBox} onChangeText={val => this.avail = val} placeholder= "Alterar quantidade" ></TextInput>


                <TouchableOpacity onPress={() => {this.saveChange(this.props.navigation, 6, this.state.selectedValue4, this.state.item, this.name2, this.avail)}} style={styles.btnSaveEdit}><Text>Salvar</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.backPageContext(6)} style={styles.btnBack}><Text>Cancelar</Text></TouchableOpacity>
            
            </View>
        }else if(i == 7){
            
            viewUser = 
            <View>
                <Text style={styles.textBox}>Nome do produto atual: {Mix.state.problem.name_product[this.state.item]}</Text>
                <TextInput key={'text5'}  style={styles.editBox} onChangeText={nameP => this.name=nameP} placeholder= "Alterar nome do produto" ></TextInput>
                <Text style={styles.textBox}>Demanda do produto:</Text>
                {this.getPicker(this.state.selectedValue5)}
                <Text  style={{opacity:this.alpha, paddingLeft:20, paddingBottom:10, paddingTop:10, backgroundColor:"#C0C0C0", fontSize:18} }>Quantidade atual: {Mix.state.problem.request_x[this.state.item]}</Text>
                <TextInput key={'requestInput'}  style={{opacity: this.alpha,  margin:10, height: 40,borderColor: 'gray', borderWidth: 1}} keyboardType="numeric" onChangeText={d => this.request = d} placeholder= "Digite a nova quantidade, se limitada"
                editable={this.edit} ></TextInput>
                {!!this.state.fieldError && (<Text style={{ color: "red", marginLeft:15 }}>{this.state.fieldError}</Text>)}
                <TouchableOpacity onPress={() => {this.saveChange(this.props.navigation, 7, this.state.selectedValue5, this.state.item, this.name, this.request)}} style={styles.btnSaveEdit}><Text>Salvar</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.backPageContext(7)} style={styles.btnBack}><Text>Cancelar</Text></TouchableOpacity>
            
            </View>
        }

        return viewUser
    }

    getPicker= (selectedValue5) =>{
        let pickerCreator = <Picker
                                selectedValue={selectedValue5}
                                style={styles.combobox}
                                onValueChange={(itemValue, itemIndex)=>this.setState({selectedValue5:itemValue})}
                                > 
                                
                                <Picker.Item label="Ilimitada" value={"Ilimitada"} />
                                <Picker.Item label="Limitada e no mínimo" value={"Limitada e no mínimo"} />
                                <Picker.Item label="Limitada e no máximo" value={"Limitada e no máximo"} />
                                <Picker.Item label="Limitada e igual" value={"Limitada e igual"} />
                            </Picker>
                            
                            {this.state.selectedValue5 == "Ilimitada" ? this.alpha = 0.1 : this.alpha = 1}
                            {this.state.selectedValue5 == "Ilimitada" ? this.edit = false : this.edit = true}
                            
                            
            
        return pickerCreator
    }


    saveChange = (navigation, position, value, state, var1, var2, stateParent, varParent) =>{
        if(position == 3){
            Mix.setTypeOpt(value)
            if(Platform.OS == 'web'){
                navigation.navigate('ReviewWeb', {itemId:position})
            }else{
                navigation.navigate('Review',{itemId:position})
            }
            
        }
        if(position == 4){
            let clone = Mix.state.problem.name_product.slice(0)
            let clone2 = Mix.state.problem.coef_goal.slice(0)
            if(var1!=""){
                clone[state] = var1
                Mix.setProdName(clone)
            }
            if(var2!=""){
                clone2[state] = var2
                Mix.setCoef(clone2)
            }
            
        
            Mix.setProd_Uni(value)
            if(Platform.OS == 'web'){
                navigation.navigate('ReviewWeb', {itemId:position})
            }else{
                navigation.navigate('Review',{itemId:position})
            }
            
        }
        if(position == 5){
            let clone = Mix.state.problem.name_product.slice(0)
            if(var1 != ""){
                clone[state] = var1
                Mix.setProdName(clone)
            }
            let clone2 = Mix.state.problem.name_resource.slice(0)
            if(varParent != ""){
                clone2[stateParent] = varParent
                Mix.setResName(clone2)
            }
            let clone3 = Mix.state.problem.itemPerResource.slice(0)
            if(var2!=""){
                clone3[stateParent][state] = var2
                Mix.setItemResource(clone3)
            }
            
            let clone4 = Mix.state.problem.unity_resource.slice(0)
            clone4[stateParent] = value
            Mix.setRes_Uni(clone4)
            if(Platform.OS == 'web'){
                navigation.navigate('ReviewWeb', {itemId:position})
            }else{
                navigation.navigate('Review',{itemId:position})
            }
            
        }
        if(position == 6){
            let clone = Mix.state.problem.name_resource.slice(0)
            if(var1 != ""){
                clone[state] = var1
                Mix.setResName(clone)
            }
            let clone2 = Mix.state.problem.right_side.slice(0)
            if(var2!=""){
                clone2[state] = var2
                Mix.setRightSide(clone2)
            }
            
            let clone3 = Mix.state.problem.signal_restriction.slice(0)
            clone3[state] = value
            console.log("restrição é:"+value)
            Mix.setSignal(clone3)
            console.log(Mix.state.problem.signal_restriction)
            if(Platform.OS == 'web'){
                navigation.navigate('ReviewWeb', {itemId:position})
            }else{
                navigation.navigate('Review',{itemId:position})
            }
            
        }
        if(position == 7){
            if(value != "Ilimitada" && var2 == "" && Mix.state.problem.request_x[state] == null){
                
                this.setState({fieldError:"Preencha este campo"})
                
            }else{
                this.setState({fieldError:''})
                let clone = Mix.state.problem.name_product.slice(0)
                if(var1!=""){
                    clone[state] = var1
                    Mix.setProdName(clone)
                }
                let clone2 = Mix.state.problem.request_x.slice(0)
                if(var2!=""){
                    
                    clone2[state] = var2
                    Mix.setRequest(clone2)
                }
                
                let clone3 = Mix.state.problem.signal_restriction_x.slice(0)
                clone3[state] = value
                Mix.setSignal_X(clone3)
                
                }
            if(Platform.OS == 'web'){
                navigation.navigate('ReviewWeb', {itemId:position})
            }else{
                navigation.navigate('Review',{itemId:position})
            }    
        }

        

    }


    render(){
        
        return (
            
            <ScrollView key={this.state.id}>
                    <View style={styles.container}>
                        <Text style={styles.titlePage}>Alterar dado:</Text>
                        <Text style={styles.helpBox}>{help8}</Text>
                    
                        {this.viewChoose(this.state.id)}
                        
                    </View>
                </ScrollView>
            
        )}
}


export default ReviewEdit;





