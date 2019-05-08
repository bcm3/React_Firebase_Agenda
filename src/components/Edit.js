import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  //1
  _isMounted = false;

  //constructor vacio con los campos de la tabla
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellidos: '',
      telefono: '',
      correo: '',
      direccion: '',
      sexo: ''
    };
  }

  componentDidMount() {

    //1
    this._isMounted = true;

    const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);
    ref.get().then((doc) => {
        if (doc.exists) {
            const user = doc.data();
            this.setState({
            //recuperamos los objetos (datos) de la base de datos
            key: doc.id,
            nombre: user.nombre,
            apellidos: user.apellidos,
            direccion: user.direccion,
            telefono: user.telefono,
            sexo: user.sexo,
            correo: user.correo
            });
        console.log("Estoy dentro de editar");
      } else {
        console.log("Conexión fallida BD erronea");
      }
    });
  }

  //1
  componentWillUnmount() {
    this._isMounted = false;
  }

  onChange = (e) => {
    //metodo para hacer el cambio de todos los imputs que estan en el formulario
    //con state controlamos el estado del imput todos los valores
    //retornamos el estado al usuario
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({user:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { nombre, apellidos, direccion, telefono, sexo, correo } = this.state;

    const updateRef = firebase.firestore().collection('contactos').doc(this.state.key);
    updateRef.set({
      nombre,
      apellidos,
      direccion,
      telefono,
      sexo,
      correo
    }).then((docRef) => {
      this.setState({
        key: '',
        nombre: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        sexo: '',
        correo: ''
      });
      //una vez actualizado volvemos al listado
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error no actualize el usuario: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>Edicción de {this.state.nombre} {this.state.apellidos}</h2>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Nombre:</label>
                <input type="text" className="form-control" name="nombre" value={this.state.nombre} onChange={this.onChange} placeholder="Sin datos"/>
              </div>
              <div className="form-group">
                <label htmlFor="title">Apellidos:</label>
                <input type="text" className="form-control" name="apellidos" value={this.state.apellidos} onChange={this.onChange} placeholder="Sin datos" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Teléfono</label>
                <input type="tel" className="form-control" name="telefono" value={this.state.telefono} onChange={this.onChange} placeholder="Sin datos" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Dirección</label>
                <input type="text" className="form-control" name="direccion" value={this.state.direccion} onChange={this.onChange} placeholder="Sin datos" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Correo</label>
                <input type="email" className="form-control" name="correo" value={this.state.correo} onChange={this.onChange} placeholder="Sin datos" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Sexo</label>
                <select className="form-control" name="sexo"  value={this.state.sexo} onChange={this.onChange}>
                  <option>Seleccione sexo</option>
                  <option onChange={this.onChange}>Hombre</option>
                  <option onChange={this.onChange}>Mujer</option>
                </select>
              </div>
              <Link to={`/show/${this.state.key}`} className="btn btn-primary">Volver</Link>&nbsp;
              <button type="submit" className="btn btn-success">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;