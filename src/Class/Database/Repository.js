import AsyncStorage from "@react-native-community/async-storage"
import { Mix } from '../InitialEntryView'
import { Platform } from "react-native"

export let saveData = async () => {
  const databaseAll = await AsyncStorage.getAllKeys()
  let text = ''
  if (Platform.OS == 'web') {
    let lastTrue = ''
    let biggerKey = 0

    for (let i = 0; i < databaseAll.length; i++) {
      if (!isNaN(databaseAll[i]) && biggerKey <= parseInt(databaseAll[i])) {
        lastTrue = '' + (parseInt(databaseAll[i]) + 1)
        biggerKey = parseInt(databaseAll[i])
      }
    }

    if (lastTrue == '') {
      text = '' + 0

    } else {
      text = '' + lastTrue

    }
    Mix.setId(text)
    await AsyncStorage.setItem(text, JSON.stringify(Mix.state.problem))

  } else {
    if (databaseAll.length != 0) {
      text = '' + (parseInt(databaseAll[databaseAll.length - 1]) + 1)
    } else {
      text = '' + 0
    }
    Mix.setId(text)
    await AsyncStorage.setItem(text, JSON.stringify(Mix.state.problem))
  }
}

export let readData = async () => {
  const databaseAll = await AsyncStorage.getAllKeys();
  let txt = '' + databaseAll.length
  return txt
}