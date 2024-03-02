import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, StatusBar, TouchableOpacity, TextInput, Alert } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({todos,setTodos}) => {

    const [input, setInput] = useState("");
    const [editedTodo, setEditedTodo] = useState(null);

    const handleAddTodo = async() => {
         try {
            if (input == "")
            return;
            const newTodo = {
              id: Date.now().toString(),
              title: input
            }
            await AsyncStorage.setItem("todos",JSON.stringify([...todos,newTodo]));
            setTodos([...todos, newTodo]);
            setInput("");
         } catch (error) {
            console.warn(error);
         }
    }

    const handleDeleteTodo = async(id) => {
      try {
        const newTodoList = todos.filter((item)=> item.id != id);

        await AsyncStorage.setItem("todos",JSON.stringify(newTodoList));
        setTodos(newTodoList);
      } catch (error) {
        console.warn(error);
      }
    }

    const handleEditTodo = (item) => {
      setInput(item.title);
      setEditedTodo(item);
    }

    const handleUpdateTodo = async()=>{
          try {
            const updatedTodoList = todos.map((element)=>{
                if(element.id === editedTodo.id)
                return {...editedTodo,title:input};
                else{
                    return element;
                }
              });
             
              await AsyncStorage.setItem("todos",JSON.stringify(updatedTodoList));
              setTodos(updatedTodoList);
              setInput("");
              setEditedTodo(null);
          } catch (error) {
            console.warn(error);
          }
    }
    const render = ({ item }) => {
        return (
            <View style={styles.todoContainer}>
                <Text style={styles.todoTitle}>{item.title}</Text>
                <View style={styles.todoButtonContainer}>
                    <TouchableOpacity style={styles.todoButton} activeOpacity={0.7} onPress={()=>handleEditTodo(item)}>
                        <AntDesign name='edit' size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.todoButton} activeOpacity={0.7} onPress={()=>handleDeleteTodo(item.id)} >
                        <Entypo name='trash' size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <>
            <StatusBar hidden={false} backgroundColor={"#279ec8"} barStyle={"light-content"} />
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>To Do List</Text>
                <TextInput style={styles.input} placeholder="Add a Task" value={input} onChangeText={setInput} />
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => (editedTodo===null)?handleAddTodo():handleUpdateTodo()}>
                    <Text style={styles.buttonText}>{(editedTodo===null)?"Add":"Save"}</Text>
                </TouchableOpacity>
                <FlatList style={styles.list} keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false} data={todos} renderItem={render} />
                { (todos.length===0 && 
                  <Text style={{alignSelf:"center",justifyContent:"center",flex:1}}>Add A Task</Text>)}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        //    padding:10,
        //    backgroundColor:"aqua",
        //    alignItems:"center"
    },
    header: {
        backgroundColor: "#279ec8",
        color: "white",
        paddingVertical: 20,
        paddingHorizontal: 30,
        fontSize: 20
    },
    list: {
        // paddingBottom:10,
        // marginBottom:20
        // backgroundColor:"white"
    },
    input: {
        //   backgroundColor:"red",
        padding: 15,
        marginHorizontal: 10,
        marginVertical:6,
        //   borderWidth:1,
        //   borderColor:"red",
        //   borderRadius:10,
        elevation: 2
    },
    button: {
        backgroundColor: "black",
        padding: 10,
        margin: 8,
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight:"700"
    }, 
    todoContainer:{
        backgroundColor:"white",
        // backgroundColor:"red",
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:10,
        marginHorizontal:15,
        marginVertical:10,
        borderRadius:10,
        shadowColor:"black",
        shadowOffset:{width:5,height:5},
        elevation:8,
        shadowRadius:10,
        shadowOpacity:0.5,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
      },
      todoTitle:{
        // backgroundColor:"yellow",
        fontSize:18,
        fontWeight:"400",
        width:"60%"
      },
      todoButtonContainer:{
        // backgroundColor:"yellow",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        // width:"20%"
        // padding:20
      },
      todoButton:{
        padding:20,   
      }
});
export default Home;