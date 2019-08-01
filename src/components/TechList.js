import React, { Component } from "react";

import TechItem from "./TechItem";

class TechList extends Component {
  state = {
    newTech: "",
    techs: []
  };

  //executado sempre assim que o compomente aparece em tela
  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if(techs){
      this.setState({ techs: JSON.parse(techs)})
    }
  };

  // executado sempre que houver alterações nas props ou estado
  componentDidUpdate(_, prevState) {
    // this.props, this.state sempre que houver alterações
    if(prevState.techs !== this.state.techs){
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }


  };

  //   //executado quando o compomente deixa de existir
  // componentWillUnmount() {

  // };

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
