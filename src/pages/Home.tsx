import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface ITaskEdit {
  id: number;
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.filter(task => task.title === newTaskTitle);

    console.log(taskExists)
    
    if(taskExists.length > 0) {
   
      Alert.alert(

        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {
            text: "Ok",
          }
        ],
        
      )
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks([...tasks, data])
    }
  }

  function handleToggleTaskDone(id: number) {
    const index = tasks.findIndex(task => task.id === id);
    const updatedTasks = tasks.map(task => ({ ...task }))
    updatedTasks[index].done = !updatedTasks[index].done
    
    setTasks([...updatedTasks])
  }

  function handleRemoveTask(id: number) {
    Alert.alert(

      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id))
        }
      ],
      
    )
  }

  function handleEditTask(value : ITaskEdit) {
    const index = tasks.findIndex(task => task.id === value.id);
    const updatedTasks = tasks.map(task => ({ ...task }))
    updatedTasks[index].title = value.taskNewTitle
    
    setTasks([...updatedTasks])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})