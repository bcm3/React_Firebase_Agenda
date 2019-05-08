import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import logoUser from '../logo-user.png';

class Show extends Component {

      //1
      _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      key: ''
    };
  }

  componentDidMount() {

    this._isMounted = true;

    const ref = firebase.firestore().collection('contactos').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if ( this._isMounted && doc.exists) {
        this.setState({
          user: doc.data(),
          key: doc.id,
          isLoading: false
        });
        console.log("Estoy dentro del SHOW");
      } else {
        console.log("Conexión fallida BD erronea");
      }
    });
  }

      //1
      componentWillUnmount() {
        this._isMounted = false;
      }

  delete(id){
    
    firebase.firestore().collection('contactos').doc(id).delete().then(() => {
      console.log("Borrado!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error en borrar. ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>Vista de {this.state.user.nombre} {this.state.user.apellidos}</h2>
          </div>
          <div className="panel-body">
            <dl>
              <dd> <img src={logoUser} className="App-logo-user" alt="logo"/> </dd>
              <dt>Nombre:</dt>
              <dd>{this.state.user.nombre}</dd>
              <dt>Apellidos:</dt>
              <dd>{this.state.user.apellidos}</dd>
              <dt>Teléfono:</dt>
              <dd>{this.state.user.telefono}</dd>
              <dt>Dirección:</dt>
              <dd>{this.state.user.direccion}</dd>
              <dt>Correo:</dt>
              <dd>{this.state.user.correo}</dd>
              <dt>Sexo:</dt>
              <dd>{this.state.user.sexo}</dd>
            </dl>
            <Link to={`/`} className="btn btn-primary">Volver</Link>&nbsp;
            <Link to={`/edit/${this.state.key}`} className="btn btn-warning">Editar contacto</Link>&nbsp;
             <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Borrar Contacto</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
