import 'react-native-gesture-handler';
import * as React from 'react';
import {Text,  View, TouchableOpacity, FlatList, Alert, Platform} from "react-native";
import styles from '../../Style/style'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from "@react-native-community/async-storage"
import Mix from '../InitialEntryView'
import {helpData, helpDataWeb} from '../../Values/strings'


let renderUpdate = false

export function setRenderUpdate(){
  console.log("entrou na função")
  renderUpdate = true
}

export default class DatabaseViewWeb extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      problem:[], 
      id:0,
    }
    
  }
  
  async forceUpdateComponent(){
    const databaseAll =  await AsyncStorage.getAllKeys();
    
    const databaseReal = databaseAll.filter(key => isNaN(key) == false);
    console.log(databaseReal)
    let values = []
    for(let i=0; i<databaseReal.length;i++){
      const value = await AsyncStorage.getItem(databaseReal[i]);
      values[i] = JSON.parse(value)
    }
    
    this.setState({ problem: values, id:this.state.id+1});
    alert("A lista de problemas foi atualizada!");
  };

  
  async componentDidMount() {
    
    const databaseAll =  await AsyncStorage.getAllKeys();
    
    const databaseReal = databaseAll.filter(key => isNaN(key) == false);
    
    let values = []
    for(let i=0; i<databaseReal.length;i++){
      const value = await AsyncStorage.getItem(databaseReal[i]);
      values[i] = JSON.parse(value)
    }
    console.log("teste")
    this.setState({ problem: values, id:this.state.id+1});
    
  }


  onDelete = async(id)=>{
    const problems = this.state.problem.filter(problem => problem.id !== id);
    const databaseAll =  await AsyncStorage.getAllKeys();
    const databaseReal = databaseAll.filter(key => isNaN(key) == false);
    for(let i=0; i < this.state.problem.length;i++){
      if(this.state.problem[i].id == id){
        
        await AsyncStorage.removeItem(databaseReal[i])
      }
    }
    this.setState({problem:problems})
  }

  render(){
    
    
    return (
      
      this.state.problem && 
      
      <View key={this.state.id} style={styles.container}>
            
          <Text style={styles.titlePage}>Problemas salvos:</Text>
          
          <Text style={styles.helpBox}>{helpDataWeb}</Text>
          <TouchableOpacity onPress={() => this.forceUpdateComponent()} style={styles.updateList}><Text style={styles.updateTex}>Atualizar</Text><Icon name="refresh" size={25} color="white"/></TouchableOpacity>

          <FlatList data={this.state.problem} keyExtractor={item=> `${item.name}`
            } renderItem={({ item }) => 
            
            <View key={'viewFlatList'+item.id} style={styles.flatView}>
              <TouchableOpacity key={'touchFlatList'+item.id} onPress={() => this.props.navigation.navigate('DatabaseInfo', {itemId:item})} style={styles.listViewWeb}><Text style={styles.textList}>{item.name}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.rightDeleteWeb} onPress={()=> this.onDelete && this.onDelete(item.id)}>
                <Icon name="trash-o" size={35} color="white"/>
                </TouchableOpacity>
            </View>
            } 
          />
            
      </View>
     
      )
  }

  
 

}

