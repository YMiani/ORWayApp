import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, Text, StatusBar, StyleSheet, View, Image, TouchableOpacity, Platform} from "react-native";
import styles from '../Style/style'
import { ScrollView, TextInput, createNativeWrapper } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
//import Mix, {setRightSide, setRequest, setTypeOpt} from './MixProblem'
import RequestRegistration, {demand} from './RequestView'
import {help7} from "../Values/strings"
import {Mix} from './InitialEntryView'


class ReviewRegistration extends React.Component{
    constructor(props){
        super(props)
        this.state={
            num_prod:[],
            num_res:[], 
            id:''
        }
    }

    componentDidMount(){
        const { itemId } = this.props.route.params;
        
        this.setState({id:JSON.stringify(itemId)})

        let aux =  []
        for(let m = 0; m < Mix.state.problem.num_prod; m++){
            aux[m] = ''
        }
        let aux2 =  []
        for(let n = 0; n < Mix.state.problem.num_resource; n++){
            aux2[n] = ''
        }
        
        this.setState({num_prod:aux, num_res:aux2})
    }

    render(){
        
        return(
            <ScrollView key={this.state.id}>
                <View style={styles.container}>
                    <Text style={styles.titlePage}>Revisão:</Text>
                    <Text style={styles.helpBox}>{help7}</Text>
                    <View style={styles.container}>

                        <Text style={styles.textBox}>Número de produtos: {Mix.state.problem.num_prod}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ReviewEdit', {itemId:1})} style={styles.btnEdit}><Icon name="pencil-square" size={35} color="white"/></TouchableOpacity>  
                        
                        <Text style={styles.textBox}>Número de recursos: {Mix.state.problem.num_resource}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ReviewEdit', {itemId:2})} style={styles.btnEdit}><Icon   name="pencil-square" size={35} color="white"/></TouchableOpacity>
                        
                        <Text style={styles.textBox}>Tipo de otimização: {Mix.state.problem.type_optimization} </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ReviewEdit', {itemId:3})} style={styles.btnEdit}><Icon name="pencil-square" size={35} color="white"/></TouchableOpacity>
                        
                        <View style={styles.container}>
                            {this.state.num_prod.map((num_prod, i)=>{
                                return(
                                    <View key={'view'+i}>
                                        <Text key={'text'+i} style={styles.textBox}>O valor de {Mix.state.problem.name_product[i]} em {Mix.state.problem.unity_product.toLocaleLowerCase()} é {Mix.state.problem.coef_goal[i]} </Text>
                                        <TouchableOpacity key={'touchable'+i} onPress={() => this.props.navigation.navigate('ReviewEdit', {itemId:4, state:i})} style={styles.btnEdit}><Icon name="pencil-square" size={35} color="white"/></TouchableOpacity>
                                    </View>
                                    )
                            })}
                        </View>
                        <View style={styles.container}>
                            {this.state.num_res.map((num_res, i)=>{
                                return(
                                    <View key={'viewRes'+i}>
                                        {this.state.num_prod.map((num_prod, j)=>{
                                        return(
                                            <View key={'viewProd'+j}>
                                                
                                                <Text key={'textProd'+j} style={styles.textBox}>{Mix.state.problem.name_product[j]} consome {Mix.state.problem.itemPerResource[i][j]} em {Mix.state.problem.unity_resource[i].toLowerCase()} de {Mix.state.problem.name_resource[i]}</Text>
                                                <TouchableOpacity key={'touchableProd'+j} onPress={() => this.props.navigation.navigate('ReviewEdit', {itemId:5, state:j, stateParent:i})} style={styles.btnEdit}><Icon name="pencil-square" size={35} color="white"/></TouchableOpacity>
                                            </View>
                                            )
                                        })}
                                        
                                    </View>
                                )
                            })}
                        </View>

                        <View style={styles.container}>
                            {this.state.num_res.map((num_res, i)=>{
                                return(
                                    <View key={'viewAvail'+i}>
                                        <Text key={'textAvail'+i} style={styles.textBox}>A disponibilidade de {Mix.state.problem.name_resource[i]} é {Mix.state.problem.signal_restriction[i].toLowerCase()} {Mix.state.problem.right_side[i]} </Text>
                                        <TouchableOpacity key={'touchableAvail'+i} onPress={() => this.props.navigation.navigate('ReviewEdit', {itemId:6, state:i})} style={styles.btnEdit}><Icon name="pencil-square" size={35} color="white"/></TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>

                        <View style={styles.container}>
                            {this.state.num_prod.map((num_prod, i)=>{
                                return(
                                    <View key={'viewSpend'+i}>
                                        {Mix.state.problem.signal_restriction_x[i] != "Ilimitada" ? <Text key={'textSpendTrue'+i} style={styles.textBox}>A demanda de {Mix.state.problem.name_product[i]} é {Mix.state.problem.signal_restriction_x[i].toLowerCase()} a {Mix.state.problem.request_x[i]} </Text> :
                                        <Text key={'textSpend'+i} style={styles.textBox}>A demanda de {Mix.state.problem.name_product[i]} é ilimitada </Text>}
                                        <TouchableOpacity key={'touchableSpend'+i} onPress={() => this.props.navigation.navigate('ReviewEdit', {itemId:7,state:i})} style={styles.btnEdit}><Icon name="pencil-square" size={35} color="white"/></TouchableOpacity>
                                    </View>
                                    )
                            })}
                        </View>
                    </View>
                    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Resolution')} style={styles.btnNext}><Text>Próximo</Text></TouchableOpacity>
                </View>
            </ScrollView>
        )}
}


export default ReviewRegistration;  