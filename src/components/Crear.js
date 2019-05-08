import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

    //1
    _isMounted = false;

  constructor() {
    
    super();
    this.ref = firebase.firestore().collection('contactos');
    this.state = {
      nombre: '',
      apellidos: '',
      telefono: '',
      correo: '',
      direccion: '',
      sexo: '',
      foto: ''
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
      console.log("Usuario insertado correctamente");
    })
    .catch((error) => {
      console.error("Error en la inserción", error);
    });
  }

  onUpload (event) {

    const bd = firebase.firestore();

    const file = event.target.files[0];
    //tenemos el fichero vemos

    const storageRef = firebase.storage().ref(`/fotos/${file.name}`)
    const task=storageRef.put(file); 

    task.on('state_change', snapshot =>{
        let porcentaje = (snapshot.bytesTransferreed / snapshot.totalBytes) * 100;
        this.setState({
          uploadValue: porcentaje
        })
    }, error => {console.log(error.message)
    }, () => {  this.setState({
        uploadValue: 100,
        picture: task.snapshot.downloadURL
        //donde esta el fichero ubicado
      });
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
              <div className="form-group">
                <label htmlFor="title">Imagen:</label>
                <input type="file" className="form-control" name="foto" onChange={this.onUpload} placeholder="Introduzca correo" />
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
