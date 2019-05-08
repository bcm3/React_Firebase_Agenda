import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import logoUser from './logo-user.png';

class App extends Component {

  //1
  _isMounted = false;

  constructor(props) {
    //pantalla principal
    super(props);
    this.ref = firebase.firestore().collection('contactos');
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

    //1
    this._isMounted = true;
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

    //login
    firebase.auth().onAuthStateChanged(usuario => {
      this.setState({ usuario });
    });
  }

    //1
    componentWillUnmount() {
      this._isMounted = false;
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
        console.log("Deconectado correctamente");
      }).catch(function(error) {
        console.log(error);
      });
    }

    renderCompruebaUsuario(){
      if(this.state.usuario){
        return(
          <div className="container">
          <div className="panel panel-default">
          <Link to="/create" className="btn btn-primary izquierda">Añadir Contacto</Link>
          <Link to="#" onClick={this.handleSalir} className="btn btn-primary derecha">Salir</Link>
            <div className="panel-heading">
              <h3 className="panel-title">
                Agenda de contactos
              </h3>
            </div>
            <div className="panel-body">
              <table className="table table-stripe">
                <tbody>
                  <tr>
                    <td> </td>
                    <td><b>Nombre</b></td>
                    <td><b>Apellidos</b></td>
                    <td><b>Teléfono</b></td>
                    <td><b>Correo</b></td>
                    <td><b>Dirección</b></td>
                    <td><b>Sexo</b></td>
                  </tr>
                </tbody>
                <tbody>
                  {this.state.users.map(user =>
                    <tr>
                      {/* WARNING BUSCAR SOLUCION */}
                      <Link to={`/show/${user.key}`}><img src={logoUser} alt="logo"/></Link>
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
      //si el usuario no esta logueado en la APP llevara aquí
      <Link to="#" onClick={this.handleAuth} className="btn btn-primary">Usuario registrado google</Link>
      );
    }

    render() {
      return (
        <div className="App">
          <div className="App-header">
            <h1>Bienvenido a tu agenda de contactos</h1>
          </div>
          <div className="App-Section">
            {/* comprobar si un usuario esta loogueado */}
            {this.renderCompruebaUsuario()}
          </div>
          <div className="App-Footer">
            <p>Copyright - Borja Castaño Montes</p>
          </div>
        </div>
      );
    }
}

export default App;