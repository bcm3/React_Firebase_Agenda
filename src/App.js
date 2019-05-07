import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import logoUser from './logo-user.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.state = {
      users: [],
      usuario: null //para hacer el login de la base de datos
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { nombre, apellidos, direccion, telefono, sexo, correo } = doc.data();
      users.push({
        key: doc.id,
        doc, 
        nombre,
        apellidos,
        direccion,
        telefono,
        sexo,
        correo
      });
    });
    this.setState({
      users
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

    //login
    firebase.auth().onAuthStateChanged(usuario => {
      this.setState({ usuario });
    });
  }

  //METODO PARA REALIZAR LA AUTENTIFICACION
  handleAuth() {
    //realiza la conexion con google para realizar la autentificación
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      //correcto login
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      //error en login
      .catch(error => console.log(`Error , ${error.code}: ${error.mensaje}`));
  }

    //Se encargar de salir de la app y desloguearse de google, sesion registrada previamente
    handleSalir() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Salir");
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
    }

    renderCompruebaUsuario(){
      if(this.state.usuario){
        return(
          <div className="container">
          <div className="panel panel-default">
          <Link to="#" onClick={this.handleSalir} className="btn btn-primary">Salir</Link>
            <div className="panel-heading">
              <h3 className="panel-title">
                Agenda de contactos
              </h3>
            </div>
            <div className="panel-body">
              <Link to="/create" className="btn btn-primary">Añadir Contacto</Link>
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Dirección</th>
                    <th>Sexo</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map(user =>
                    <tr>
                      <Link to={`/show/${user.key}`}><img src={logoUser} alt="logo"/> </Link>
                      <td>{user.nombre}</td>
                      <td>{user.apellidos}</td>
                      <td>{user.telefono}</td>
                      <td>{user.correo}</td>
                      <td>{user.direccion}</td>
                      <td>{user.sexo}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        );

      }return (
      //si el usuario no esta logueado con llevara aquí
      <Link to="#" onClick={this.handleAuth} className="btn btn-primary">Entrar</Link>
      );
    }

    render() {
      return (
        <div className="App">
          <div>{this.renderCompruebaUsuario()}</div>
        </div>
      );
    }
  
}

export default App;