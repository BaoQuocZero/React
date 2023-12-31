import React from "react";
import './ListTodo.scss'
import AddTodo from "./AddTodo";
import { toast } from 'react-toastify';
import Color from "../HOC/Color";


class ListTodo extends React.Component {

    state = {
        listTodo: [
            { id: 'todo1', title: 'Doing homework' },
            { id: 'todo2', title: 'Making videos' },
            { id: 'todo3', title: 'Fixing bug' }
        ],
        editTodo: {}
    }

    addNewTodo = (todo) => {
        this.setState({
            listTodo: [...this.state.listTodo, todo]
        })

        toast.success("Wow so easy!")
    }

    handleDeleteTodo = (todo) => {
        let currenTodo = this.state.listTodo
        currenTodo = currenTodo.filter(item => item.id !== todo.id)
        this.setState({
            listTodo: currenTodo
        })

        toast.success("Đã xóa!")
    }

    handleEditTodo = (todo) => {
        let { editTodo, listTodo } = this.state
        let isEmptyObj = Object.keys(editTodo).length === 0;

        //save
        if (isEmptyObj === false && editTodo.id === todo.id) {

            let listTodoCopy = [...listTodo]

            let objIndex = listTodoCopy.findIndex((item => item.id === todo.id));

            listTodoCopy[objIndex].title = editTodo.title

            this.setState({
                listTodo: listTodoCopy,
                editTodo: {}
            })
            toast.success("Đã cập nhật!")
            return;
        }
        //edit
        this.setState({
            editTodo: todo
        })

    }

    handleOnchaneEditTodo = (event) => {
        let editTodoCopy = { ...this.state.editTodo }
        editTodoCopy.title = event.target.value
        this.setState({
            editTodo: editTodoCopy
        })
    }

    render() {
        let { listTodo, editTodo } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        return (
            <>
                <p>
                    Simple Todo app with React (Eric &amp; hoidanit)
                </p>
                <div className="list-todo-cantainer">
                    <AddTodo
                        addNewTodo={this.addNewTodo}
                    />
                    {listTodo && listTodo.length > 0 &&
                        listTodo.map((item, index) => {
                            return (
                                <div className="list-todo-content" key={item.id}>
                                    <div className="todo-child">
                                        {isEmptyObj === true ?
                                            <span>{index + 1} - {item.title}</span>
                                            :
                                            <>
                                                {editTodo.id === item.id ?
                                                    <span>
                                                        {index + 1} - <input
                                                            value={editTodo.title}
                                                            onChange={(event) => this.handleOnchaneEditTodo(event)}
                                                        />
                                                    </span>
                                                    :
                                                    <span>{index + 1} - {item.title}</span>
                                                }
                                            </>
                                        }

                                        <button className="edit" onClick={() => this.handleEditTodo(item)}                                       >
                                            {isEmptyObj === false && editTodo.id === item.id ?
                                                'Save' : 'Edit'
                                            }
                                        </button>
                                        <button className="delete"
                                            onClick={() => this.handleDeleteTodo(item)}
                                        >Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

export default Color(ListTodo);