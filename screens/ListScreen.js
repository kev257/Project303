import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListScreen() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    loadTaskList();
  }, []);

  const loadTaskList = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('taskList');
      if (savedTasks !== null) {
        setTaskList(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading task list:', error);
    }
  };

  const saveTaskList = async (updatedList) => {
    try {
      await AsyncStorage.setItem('taskList', JSON.stringify(updatedList));
    } catch (error) {
      console.error('Error saving task list:', error);
    }
  };

  const handleAddTask = () => {
    const newTask = { title: task, date: Date.now(), id: Math.random() };
    const updatedList = [...taskList, newTask];
    setTaskList(updatedList);
    saveTaskList(updatedList);
    setTask("");
  };

const handleRefreshTime = () => {
    setTaskList([...taskList]);
  };

const getTimeDifference = (date) => {
    const currentDate = new Date();
    const itemDate = new Date(date);
    const diffInMilliseconds = currentDate - itemDate;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day(s) ago`;
    } else if (hours > 0) {
      return `${hours} hour(s) ago`;
    } else if (minutes > 0) {
      return `${minutes} minute(s) ago`;
    } else {
      return "Just now";
    }
  };

  const handleDeleteTask = (id) => {
     Alert.alert(
          'Confirm Delete',
          'Are you sure you want to delete this task?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              onPress: () => {
                const updatedList = taskList.filter((task) => task.id !== id);
                setTaskList(updatedList);
                saveTaskList(updatedList);
              },
            },
          ],
          { cancelable: false }
        );
  };

  const renderTasks = ({ item }) => {
    const timeAgo = getTimeDifference(item.date);
    return (
      <View style={{
        backgroundColor: "#C850A0",
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 8,
        marginBottom: 12,
        margin: 10
      }}>
        <Text style={{ color: "#50C878", fontSize: 20, fontWeight: "800", flex: 1,textShadowColor:'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius:10}}>
          {item.title}
        </Text>
        <Text>
          Added {timeAgo}
        </Text>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={{
          backgroundColor: "#C87850",
          borderRadius: 6,
          paddingVertical: 6,
          paddingHorizontal: 12,
          marginTop: 8,
          width: 65,
          alignSelf: 'flex-end'
        }}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#50C878",
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
        placeholder="Enter tasks"
        value={task}
        onChangeText={(userText) => setTask(userText)}
      />

      <FlatList
        data={taskList}
        renderItem={renderTasks}
        keyExtractor={(item) => item.id.toString()}
      />

    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10 }}>
      <TouchableOpacity
        style={{
          backgroundColor: "#50C878",
          borderRadius: 6,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 15,
          marginBottom: 15,
        }}
        onPress={() => handleAddTask()}
      >
        <Text style={{ color: 'white' }}>Add Task</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#50C878",
          borderRadius: 6,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 15,
          marginBottom: 15,
        }}
        onPress={() => handleRefreshTime()}
      >
        <Text style={{ color: 'white' }}>Refresh</Text>
      </TouchableOpacity>
    </View>


    </View>
  );
}

