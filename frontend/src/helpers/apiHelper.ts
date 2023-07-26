import axios from 'axios'
import {config} from '../config'
const api_server = config.api_url
const AUTH_KEY = 'auth-key'

console.log(config)
interface LoginUser {
    email: string;
    password: string
}

export const login = async (payload: LoginUser) => {
    try {
        const resp = await axios.post(api_server + '/auth/sign-in', payload,{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        if(resp?.data?.data?.accessToken){
            localStorage.setItem(AUTH_KEY, resp.data.data.accessToken)
            delete resp.data.data.accessToken
        }
        
        return resp.data;
    } catch (error: any) {
        if( error?.response?.data){
            const msg = error.response.data.message.join(', ')
            error.response.data.msg = msg
            return error.response.data
        }
        return {status: false, msg: 'Failed to login user.'};
    }
}

interface SignUpUser {
    fname?: string;
    lname?: string;
    email: string;
    password: string
}

export const signUp = async (payload: SignUpUser) => {
    try {
        const resp = await axios.post(api_server + '/auth/sign-up', payload,{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        console.log(resp.data)
        return resp.data;
    } catch (error: any) {
        console.log("error ==>", error)
        if( error?.response?.data){
            const msg = error.response.data.message.join(', ')
            error.response.data.msg = msg
            return error.response.data
        }
        return {status: false, msg: 'Failed to create user.'};
    }
}

interface FilterTasks {
    status: string;
    taskFilter: string;
    pages: number;
    counts: number;
}

export const getFilterTasks = async (payload: FilterTasks) => {
    try {
        const {status, taskFilter, pages, counts} = payload;
        const token = localStorage.getItem(AUTH_KEY);
        const url = `${api_server}/tasks?status=${status}&taskFilter=${taskFilter}&pages=${pages}&counts=${counts}`
        const resp = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })    
        return resp.data;
    } catch (error: any) {
        if( error?.response?.data){
            const msg = error.response.data.message.join(', ')
            error.response.data.msg = msg
            return error.response.data
        }
        return {status: false, msg: 'Failed to get filtered tasks.'};
    }
}

export const deleteTask = async (taskId: string) => {
    try {
        const token = localStorage.getItem(AUTH_KEY);
        const url = `${api_server}/tasks/${taskId}`
        const resp = await axios.delete(url,{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })    
        return resp.data;
    } catch (error: any) {
        if( error?.response?.data){
            const msg = error.response.data.message.join(', ')
            error.response.data.msg = msg
            return error.response.data
        }
        return {status: false, msg: 'Failed to delete task.'};
    }
}

export const getTask = async (taskId: string) => {
    try {
        const token = localStorage.getItem(AUTH_KEY);
        const url = `${api_server}/tasks/${taskId}`
        const resp = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })    
        return resp.data;
    } catch (error: any) {
        if( error?.response?.data){
            const msg = error.response.data.message.join(', ')
            error.response.data.msg = msg
            return error.response.data
        }
        return {status: false, msg: 'Failed to fetch task.'};
    }
}

interface Task {
    title: string,
    desc: string,
    status?: string,
    taskId?: string
}
export const addTask = async (task: Task) => {
    try {
        const token = localStorage.getItem(AUTH_KEY);
        const url = `${api_server}/tasks/`
        const resp = await axios.post(url, task, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })    
        return resp.data;
    } catch (error: any) {
        if( error?.response?.data){
            const msg = error.response.data.message.join(', ')
            error.response.data.msg = msg
            return error.response.data
        }
        return {status: false, msg: 'Failed to add task.'};
    }
}

export const updateTask = async (task: Task) => {
    try {
        const token = localStorage.getItem(AUTH_KEY);
        const url = `${api_server}/tasks/${task.taskId}`
        const resp = await axios.patch(url, task, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        })    
        return resp.data;
    } catch (error: any) {
        if( error?.response?.data){
            const msg = error.response.data.message.join(', ')
            error.response.data.msg = msg
            return error.response.data
        }
        return {status: false, msg: 'Failed to update task.'};
    }
}