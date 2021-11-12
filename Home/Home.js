import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons ,MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backgroundColor } from 'styled-system';


export default class Home extends React.Component {
    constructor() {
        super()
        this.state= {
            value : "",
            pendingTask : [],
            completeTask : [],
        }
    }

    doneFunc = async(value,ind) => {
        console.log(value)
        let { pendingTask, completeTask} = this.state
        try {
            completeTask.push({value : value, done: true})
            pendingTask.splice(ind , 1)
          const jsonValue = JSON.stringify(completeTask)
          await AsyncStorage.setItem('completeTask', jsonValue)
          const Pending = JSON.stringify(pendingTask)
          await AsyncStorage.setItem('pendingTask', Pending)
          this.setState({pendingTask: pendingTask , completeTask: completeTask})
        } catch (e) {
          // saving error
        }
    }

    deleteFunc = async(value, ind) => {
      let { completeTask} = this.state
      try {
      completeTask.splice(ind , 1)
      const complete = JSON.stringify(completeTask)
      await AsyncStorage.setItem('completeTask', complete)
      alert(value  ," is Deleted")
      this.setState({ completeTask: completeTask})
    } catch (e) {
      // saving error
    }

    }

    addTodo = async()=> {
        let {value , pendingTask} = this.state
            try {
              pendingTask.push({value : value, done: false})
              const jsonValue = JSON.stringify(pendingTask)
              await AsyncStorage.setItem('pendingTask', jsonValue)
              this.setState({pendingTask: pendingTask ,value: ""})
            } catch (e) {
              // saving error
              console.log(e)
            }
    }

    ClearCompleted  =async () => {
      alert("All Completed Task Deleted")
      try {
        await AsyncStorage.removeItem("completeTask")
        this.setState({completeTask: []})
      }catch (e) {

      }
    }

    componentDidMount = async() => {
        try {
           let pending = await AsyncStorage.getItem('pendingTask')
           pending = pending != null ? JSON.parse(pending) : [];

           console.log(pending)

           let complete = await AsyncStorage.getItem('completeTask')
           complete = complete != null ? JSON.parse(complete) : [];
           this.setState({pendingTask: pending, completeTask:complete})
          } catch(e) {
            // error reading value
          }
    }
    render() {  
        let { pendingTask,completeTask ,value} = this.state
        console.log(value)
        return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo List App</Text>
      <View style={styles.ManiView}>
          <View style={styles.addView}>
              <TextInput style={styles.input} value = {value} placeholder= "Add The Task" placeholderTextColor= "black"
               onChangeText = {(text)=> this.setState({value :text })}/>
              <TouchableOpacity style={styles.addbutton} onPress= {()=> this.addTodo()}>
                  <Ionicons name="md-add" size={32} color="white" />
              </TouchableOpacity>
          </View>
          <ScrollView style={styles.ScrollView}>
          <View>
              <View style= {styles.paddingHeader}>
                <Text style= {styles.paddingText}>Padding</Text>
                {/* <TouchableOpacity style= {styles.clearButton} onPress= {()=>this.pendingClear()}>
                    <Text style= {styles.clearText}>Clear All</Text>
                </TouchableOpacity> */}
              </View>
            {pendingTask.length ? pendingTask.map((val, ind)=> {

                return (
                    <View style={styles.todoItem}key= {ind}>
                      <Text style={styles.itemText}>{val.value}</Text>
                    <TouchableOpacity style = {styles.doneButton} onPress= {()=> this.doneFunc(val.value, ind)}><Text style={styles.doneText} >Done</Text></TouchableOpacity>
                    </View>
                )
            }) : <Text style= {styles.empty}>Padding Task Are Empty</Text>}

          </View>

          <View>
              <View style= {styles.paddingHeader}>
                <Text style= {styles.paddingText}>Completed</Text>
                <TouchableOpacity style= {styles.clearButton} onPress= {()=>this.ClearCompleted()}>
                    <Text style= {styles.clearText} >Clear All</Text>
                </TouchableOpacity>
              </View>
            {completeTask.length ? completeTask.map((val, ind)=> {

                return (
                    <View style={styles.todoItem} key= {ind}>
                     <Ionicons name="checkmark-done" size={24} color="green" />   
                     <Text style={styles.itemText}>{val.value}</Text>
                     <MaterialIcons name="delete-forever" size={24} color="red" onPress= {() => this.deleteFunc(val.value,ind)}/> 
                    </View>
                )
            }) : <Text style= {styles.empty}>Padding Task Are Empty</Text>}

          </View>
          </ScrollView>
      </View>

    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#76afa2',
    alignItems: 'center',
    paddingTop: 20,
  },
  text : {
      fontSize: 30,
      color: "white"
  },
  input : {
      borderWidth: 2,
      borderColor: "black",
      width: "80%",
      textAlign : "center",
      color: 'black'
  },
  addView : {
      flexDirection : "row"
  },
  ManiView :{
      backgroundColor: "white",
      padding: 20,
      minHeight: 200,
      borderColor: "black",
      borderWidth: 2,
      borderRadius: 20,
      marginTop: 50,
      width: "90%",
      marginBottom: 80

  },
  addbutton : {
      backgroundColor: "#9999ff",
      marginLeft: 10,
      borderWidth: 1
  },
  paddingText  : {
      fontSize: 15,
      fontWeight: "bold",
      width: "80%",
      textAlign: "center"

  },
  paddingHeader : {
      flexDirection: "row",
      margin: 20,
    //   justifyContent: "space-between"
  },
  clearButton : {
      backgroundColor: "gray",
      padding: 5,
      borderRadius: 5
  },
  clearText : {
      color: "white"
  },
  todoItem : {
      flexDirection: "row",
      justifyContent: 'space-between',
      margin: 5,
    //   width: "90%",
    borderWidth: 1,
    padding: 5
  },
  doneButton : {
      backgroundColor: "green",
      // margin: 5,
      padding: 5,
  },
  doneText : {
      color: "white"
  },
  empty : {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
  },
  itemText : {
      width: "70%",
      justifyContent: "center",
      padding: 5
  },

});
