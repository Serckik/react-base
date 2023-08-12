import { Component } from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TodoList from "./TodoList";
import TodoAdd from "./TodoAdd";
import TodoDetail from "./TodoDetail";
import firebaseApp from "./firebase";
import Logout from "./logout";
import { getList } from "./auth";
import { setDone } from "./auth";
import { del } from "./auth";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [], 
      showMenu: false,
      currentUser: undefined
    }
    this.setDone = this.setDone.bind(this)
    this.delete = this.delete.bind(this)
    this.add = this.add.bind(this)
    this.showMenu = this.showMenu.bind(this)
    this.getDeed = this.getDeed.bind(this)
  }

  componentDidMount(){
    axios
      .get('http://26.245.229.110:8000/blog/api/v1/blog/')
      .then((response) => {
         this.setState((state) => ({
          data: response.data.results
         }))
      })
      .catch((err) => {
         console.log(err);
      });
  }

  async setDone(key){
    await setDone(this.state.currentUser, key)
    const beed = this.state.data.find((current) => current.key === key)
    if(beed)
      beed.done = true
    this.setState((state) => ({}))
  }

  async delete(key){
    await del(this.state.currentUser, key)
    const newData = this.state.data.filter(
      (current) => current.key !== key
    )
    this.setState((state) => ({data: newData}))
  }

  add(deed){
    this.state.data.push(deed)
    this.setState((state) => ({}))
  }

  showMenu(evt){
    evt.preventDefault()
    this.setState((state) => ({showMenu: !state.showMenu}))
  }

  getDeed(key){
    return this.state.data.find((current) => current.key === key)
  }

  render() {
    return (
      <HashRouter>
        <nav className="navbar is-light">
          <div className="navbar-brand">
            <NavLink to="/" className={({isActive}) => 'navbar-item is-uppercase' + (isActive ? 'is-active' : '')}>
              {
                this.state.currentUser ? this.state.currentUser.email : 'Todos'
              }
            </NavLink>
            <a href="/" className={this.state.showMenu ? 'navbar-burger is-active' : 'navbar-burger'} onClick={this.showMenu}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={this.state.showMenu ? 'navbar-menu is-active' : 'navbar-menu'} onClick={this.showMenu}>
            <div className="navbar-start">
              {this.state.currentUser && (
                <NavLink to="/add" className={({isActive}) => 'navbar-item is-uppercase' + (isActive ? 'is-active' : '')}>
                  Создать дело
                </NavLink>
              )}
              {this.state.currentUser && (
                  <div className="navbar-end">
                    <NavLink to="/logout" className={({isActive}) => 'navbar-item is-uppercase' + (isActive ? 'is-active' : '')}>
                      Выйти
                    </NavLink>
                  </div>
                )
              }
            </div>
          </div>
        </nav>
        <main className="context px-6 mt-6">
          <Routes>
            <Route path="/" element={
              <TodoList list={this.state.data} setDone={this.setDone} delete={this.delete} currentUser = {this.state.currentUser} />
            }></Route>
            <Route path="/add" element={
              <TodoAdd add={this.add} currentUser={this.state.currentUser} />
            }></Route>
            <Route path="/:key" element={
              <TodoDetail getDeed={this.getDeed} currentUser = {this.state.currentUser} />
            }></Route>
            <Route path="/logout" element={
              <Logout currentUser={this.state.currentUser}></Logout>
            }></Route>
          </Routes>
        </main>
      </HashRouter>
    )
  }
}