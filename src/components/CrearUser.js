import React, { Component } from 'react';
import firebase from '../Firebase';

class CrearUser extends Component {

    //1
    _isMounted = false;

  constructor() {
    
    super();
    this.ref = firebase.firestore().collection('users');
    this.state = {
      nombre: '',
      apellidos: '',
      correo: '',
      contrasena: ''
    };
    
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    if (this._isMounted) {
      this.setState(state);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nombre, apellidos, correo, contrasena} = this.state;

    this.ref.add({
      nombre,
      apellidos,
      correo,
      contrasena
    }).then((docRef) => {
      this.setState({
        nombre: '',
        apellidos: '',
        correo: '',
        contrasena: ''
      });
      this.props.history.push("/")
      console.log("Usuario insertado correctamente");
    })
    .catch((error) => {
      console.error("Error en la inserción", error);
    });
  }

  //1
  componentDidMount() {
    this._isMounted = true;
  }

  //1
  componentWillUnmount() {
    this._isMounted = false;
  }
  
  render() {
    const { nombre, apellidos, correo, contrasena } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Añadir Usuario
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Nombre:</label>
                <input type="text" className="form-control" name="nombre" value={nombre} onChange={this.onChange} placeholder="Introduzca nombre" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Apellidos:</label>
                <input type="text" className="form-control" name="apellidos" value={apellidos} onChange={this.onChange} placeholder="Introduzca apellidos" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Correo:</label>
                <input type="email" className="form-control" name="correo" value={correo} onChange={this.onChange} placeholder="Introduzca correo" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Contraseña:</label>
                <input type="password" className="form-control" name="contrasena" value={contrasena} onChange={this.onChange} placeholder="Introduzca contraseña" />
              </div>
              <button type="submit" className="btn btn-success">Guardar</button>&nbsp;
              <button type="reset" className="btn btn-warning">Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CrearUser;
