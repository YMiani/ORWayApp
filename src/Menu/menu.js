import * as React from 'react';
import { Button, View, TouchableOpacity, Alert, Modal, Platform } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import styles from '../Style/style'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createStackNavigator } from '@react-navigation/stack';
import HomeApp from '../Class/HomeAppView'
import DataSave from '../Class/Database/DatabaseView'
import DataSaveWeb from '../Class/Database/DatabaseView.web'
import About from '../Class/AboutView'
import InitialEntry from '../Class/InitialEntryView'
import Names from '../Class/NamesView'
import Values from '../Class/ValuesView'
import ResourceSpending from '../Class/ResourceSpendingView'
import Availability from '../Class/AvailabilityView'
import Request from '../Class/RequestView'
import Review from '../Class/ReviewView'
import ReviewWeb from '../Class/ReviewView.web'
import Resolution from '../Class/ResolutionView'
import ReviewEdit from '../Class/ReviewEditView'
import DatabaseInfo from '../Class/Database/DatabaseInfoView'
import { dialog2, dialog3, dialog4, dialog5, dialog6, dialog7, dialog8, dialog9, dialog10, dialogData, dialogDataAcess, dialog8Web } from '../Values/strings'

const Drawer = createDrawerNavigator();
//const AppContainer = createAppContainer(AppNavigator);
function MyDrawer() {
  return (
    <Drawer.Navigator drawerContentOptions={{ activeTintColor: '#2E8B57' }} drawerStyle={{ backgroundColor: '#FFF', paddingTop: 40 }}  >
      <Drawer.Screen name="Página Inicial" component={HomeApp} options={{ drawerLabel: 'Página Inicial' }} />
      <Drawer.Screen name="Sobre" component={About} options={{ drawerLabel: 'Sobre' }} />
      <Drawer.Screen name="Problemas salvos" component={Platform.OS == 'web' ? DataSaveWeb : DataSave} />

    </Drawer.Navigator>

  );
}

const Stack = createStackNavigator();

const MenuIcon = () => {

  const navigationMenu = useNavigation();

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => navigationMenu.dispatch(DrawerActions.openDrawer())}>
        <Icon style={{ marginLeft: 10 }} name="bars" size={30} color="white" /></TouchableOpacity>
    </View>
  );
};

export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#008080',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}>

        <Stack.Screen component={MyDrawer} name="MyDrawer" options={{
          title: 'ORWay App', headerLeft: () => <MenuIcon />
        }} />

        <Stack.Screen name="Home" component={HomeApp} options={{
          title: 'Página inicial'
        }}
        />

        <Stack.Screen name="InitialEntry" component={InitialEntry} options={{
          title: 'ORWay - Página 2', headerRight: () => (
            <TouchableOpacity style={styles.helpDialog} onPress={() => { Platform.OS == 'web' ? alert(dialog2) : Alert.alert("Ajuda", dialog2) }
            }
            >
              <Icon style={{ marginRight: 15 }}
                name="question-circle" size={35} color="white" /></TouchableOpacity>
          )
        }} />

        <Stack.Screen name="Names" component={Names} options={{
          title: 'ORWay - Página 3', headerRight: () => (
            <TouchableOpacity style={styles.helpDialog} onPress={() => { Platform.OS == 'web' ? alert(dialog3) : Alert.alert("Ajuda", dialog3) }} ><Icon style={{ marginRight: 15 }}
              name="question-circle" size={35} color="white" /></TouchableOpacity>
          )
        }} />

        <Stack.Screen name="Values" component={Values} options={{
          title: 'ORWay - Página 4', headerRight: () => (
            <TouchableOpacity style={styles.helpDialog} onPress={() => { Platform.OS == 'web' ? alert(dialog4) : Alert.alert("Ajuda", dialog4) }} ><Icon style={{ marginRight: 15 }}
              name="question-circle" size={35} color="white" /></TouchableOpacity>
          )
        }} />

        <Stack.Screen name="ResourceSpending" component={ResourceSpending} options={{
          title: 'ORWay - Página 5', headerRight: () => (
            <TouchableOpacity style={styles.helpDialog} onPress={() => { Platform.OS == 'web' ? alert(dialog5) : Alert.alert("Ajuda", dialog5) }} ><Icon style={{ marginRight: 15 }}
              name="question-circle" size={35} color="white" /></TouchableOpacity>
          )
        }} />

        <Stack.Screen name="Avail" component={Availability} options={{
          title: 'ORWay - Página 6', headerRight: () => (
            <TouchableOpacity style={styles.helpDialog} onPress={() => { Platform.OS == 'web' ? alert(dialog6) : Alert.alert("Ajuda", dialog6) }} ><Icon style={{ marginRight: 15 }}
              name="question-circle" size={35} color="white" /></TouchableOpacity>
          )
        }} />

        <Stack.Screen name="Request" component={Request} options={{
          title: 'ORWay - Página 7', headerRight: () => (
            <TouchableOpacity style={styles.helpDialog} onPress={() => { Platform.OS == 'web' ? alert(dialog7) : Alert.alert("Ajuda", dialog7) }} ><Icon style={{ marginRight: 15 }}
              name="question-circle" size={35} color="white" /></TouchableOpacity>
          )
        }} />

        <Stack.Screen name="Review" component={Review} options={{
          title: 'ORWay - Página 8', headerRight: () => (
            <TouchableOpacity style={styles.helpDialog} onPress={() => { Platform.OS == 'web' ? alert(dialog8) : Alert.alert("Ajuda", dialog8) }} ><Icon style={{ marginRight: 15 }}
              name="question-circle" size={35} color="white" /></TouchableOpacity>
          )
        }} />
        <Stack.Screen name="ReviewWeb" component={ReviewWeb} options={{
          title: 'ORWay - Página 8', headerRight: () => (
            <TouchableOpacity style={styles.helpDialog} onPress={() => alert(dialog8Web)} ><Icon style={{ marginRight: 15 }}
              name="question-circle" size={35} color="white" /></TouchableOpacity>
          )
        }} />

        <Stack.Screen name="ReviewEdit" component={ReviewEdit} options={{
          title: 'ORWay - Página 9', headerRight: () => (
            <TouchableOpacity style={styles.helpDialog} onPress={() => { Platform.OS == 'web' ? alert(dialog9) : Alert.alert("Ajuda", dialog9) }} ><Icon style={{ marginRight: 15 }}
              name="question-circle" size={35} color="white" /></TouchableOpacity>
          )
        }} />

        <Stack.Screen name="Resolution" component={Resolution} options={{
          title: 'ORWay - Página 10', headerRight: () => (
            <TouchableOpacity style={styles.helpDialog} onPress={() => { Platform.OS == 'web' ? alert(dialog10) : Alert.alert("Ajuda", dialog10) }} ><Icon style={{ marginRight: 15 }}
              name="question-circle" size={35} color="white" /></TouchableOpacity>
          )
        }} />



        <Stack.Screen name="DatabaseInfo" component={DatabaseInfo} options={{
          title: 'Problemas salvos'
        }} />


      </Stack.Navigator>

    </NavigationContainer>

  );
}
