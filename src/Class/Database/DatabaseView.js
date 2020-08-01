import 'react-native-gesture-handler';
import * as React from 'react';
import {Text,  View, TouchableOpacity, FlatList, Alert} from "react-native";
import styles from '../../Style/style'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from "@react-native-community/async-storage"
import Mix from '../InitialEntryView'
import {helpData} from '../../Values/strings'


let renderUpdate = false

export function setRenderUpdate(){
  console.log("entrou na função")
  renderUpdate = true
}

export default class DatabaseView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      problem:[], 
      id:0,
    }
    
  }
  
  async forceUpdateComponent(){
    const databaseAll =  await AsyncStorage.getAllKeys();
    let values = []
    for(let i=0; i<databaseAll.length;i++){
      const value = await AsyncStorage.getItem(databaseAll[i]);
      values[i] = JSON.parse(value)
    }
    this.setState({ problem: values, id:this.state.id+1});
    Alert.alert("Atualizado", "A lista de problemas foi atualizada!");
  };

  
  async componentDidMount() {
    const databaseAll =  await AsyncStorage.getAllKeys();
    let values = []
    for(let i=0; i<databaseAll.length;i++){
      const value = await AsyncStorage.getItem(databaseAll[i]);
      values[i] = JSON.parse(value)
    }
    this.setState({ problem: values, id:this.state.id+1});
  }
  
  getRightContent = (id) =>{
    return(
      <TouchableOpacity style={styles.rightDelete} onPress={()=> this.onDelete && this.onDelete(id)}>
       <Icon name="trash-o" size={35} color="white"/>
      </TouchableOpacity>
    )
  }

  getLeftContent = () =>{
    return(
      <View style={styles.leftDelete}>
        <Icon name="trash-o" size={35} color="white"/>
        <Text style={styles.delete}>Excluir</Text>
      </View>
    )
  }

  onDelete = async(id)=>{
    const problems = this.state.problem.filter(problem => problem.id !== id);
    const databaseAll =  await AsyncStorage.getAllKeys();
    for(let i=0; i < this.state.problem.length;i++){
      if(this.state.problem[i].id == id){
        await AsyncStorage.removeItem(databaseAll[i])
      }
    }
    this.setState({problem:problems})
  }

  render(){
    return (
      this.state.problem && 
      <View key={this.state.id} style={styles.container}>
            
          <Text style={styles.titlePage}>Problemas salvos:</Text>
          
          <Text style={styles.helpBox}>{helpData}</Text>
          <TouchableOpacity onPress={() => this.forceUpdateComponent()} style={styles.updateList}><Text style={styles.updateTex}>Atualizar</Text><Icon name="refresh" size={25} color="white"/></TouchableOpacity>

          <FlatList data={this.state.problem} keyExtractor={item=> `${item.name}`
            } renderItem={({ item }) => 
            <Swipeable 
            renderRightActions={() => this.getRightContent(item.id)}
            renderLeftActions={this.getLeftContent}
            onSwipeableLeftOpen={() => this.onDelete && this.onDelete(item.id)}
            >
            <View key={'viewFlatList'+item.id}>
              <TouchableOpacity key={'touchFlatList'+item.id} onPress={() => this.props.navigation.navigate('DatabaseInfo', {itemId:item})} style={styles.listView}><Text style={styles.textList}>{item.name}</Text></TouchableOpacity>
            </View>
            </Swipeable> } 
          />
            
      </View>
     
      )
  }

  
 

}

