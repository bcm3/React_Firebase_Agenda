import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('users');
    this.state = {
      nombre: '',
      apellidos: '',
      telefono: '',
      correo: '',
      direccion: '',
      sexo: ''
    };
    
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nombre, apellidos, direccion, telefono, sexo, correo} = this.state;

    this.ref.add({
      nombre,
      apellidos,
      direccion,
      telefono,
      sexo,
      correo
    }).then((docRef) => {
      this.setState({
        nombre: '',
        apellidos: '',
        telefono: '',
        correo: '',
        direccion: '',
        sexo: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error", error);
    });
  }

  render() {
    const { nombre, apellidos, telefono, direccion, correo, sexo } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Añadir contacto
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Agenda</Link></h4>
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
                <label htmlFor="title">Teléfono:</label>
                <input type="tel" className="form-control" name="telefono" value={telefono} onChange={this.onChange} placeholder="Introduzca teléfono" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Dirección:</label>
                <input type="text" className="form-control" name="direccion" value={direccion} onChange={this.onChange} placeholder="Introduzca dirección" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Correo:</label>
                <input type="email" className="form-control" name="correo" value={correo} onChange={this.onChange} placeholder="Introduzca correo" />
              </div>
              <div className="form-group">
                <label htmlFor="title" placeholder="Sexo">Sexo:</label>
                <select className="form-control" name="sexo" value={sexo} onChange={this.onChange}>
                <option>Seleccione sexo</option>
                <option onChange={this.onChange}>Hombre</option>
                <option onChange={this.onChange}>Mujer</option>
              </select>
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

export default Create;
