import React, { Component } from "react";
import { getGithubUser } from "../Redux/action";
import { connect } from "react-redux";

export class GithubUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      activePage: 1,
      itemsPerPage:3
    };
  }
  handleChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleItemsPerPage = (e) => {
    this.setState({
      itemsPerPage:e.target.value
    })
  }

  handleSubmit = async () => {
    const { getGithubUser } = this.props;
    let payload = { username: this.state.username };
    await getGithubUser(payload);
  };

  handlePagination = (pageNumber) => {
    this.setState({
      activePage:Number(pageNumber)
    })
  }

  render() {
    const { githubUsers } = this.props;
    let totalPages = null;
    let low = null;
    let high = null;
    let pages = null;
    let pageData = null;
    if(githubUsers) {
      totalPages = Math.ceil(githubUsers.length / this.state.itemsPerPage)
      pages = new Array(totalPages).fill("page")
      low = (this.state.activePage - 1) * this.state.itemsPerPage
      high = (this.state.activePage) * this.state.itemsPerPage
      pageData = githubUsers.slice(low, high)
    }
     
    console.log(githubUsers)
    return (
      <div>
        <input
          style={{ marginTop: 50, marginLeft: 500 }}
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button className="btn bg-info text-white" onClick={this.handleSubmit}>
          Search
        </button>

        <div>
          <select name="itemsPerPage" onChange={(e)=>this.handleItemsPerPage(e)}>
            <option value = {5}>5</option>
            <option value = {10}>10</option>
            <option value = {15}>15</option>
            <option value = {20}>20</option>
          </select>
        </div>

        {pageData.map((item) => (
          <div
            className="shadow-lg"
            style={{
              display: "flex",
              flex: 2,
              marginLeft: 350,
              marginBottom: 20,
              width: 600,
              marginTop: 50,
            }}
          >
            <div style={{ float: "left" }}>
              <img
                src={item.avatar_url}
                alt="profile"
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginLeft: 10,
                }}
              />
            </div>
            <div
              style={{
                float: "left",
                marginLeft: 30,
                textAlign: "center",
              }}
            >
              <h3>{item.login}</h3>
              <button className="btn-info border-0">{item.url}</button>
            </div>
          </div>
        ))}
        <div style = {{"margin":"auto","textAlign":"center"}}>
          {pages && pages.length ? 
          pages.map((page, index) => {
            return (
              <span>
                <button 
                style = {(index + 1) === this.state.activePage ? {"backgroundColor":"green"} : null}
                onClick={()=>this.handlePagination(index + 1)}>{index + 1}</button>
              </span>
            )
          }):null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  githubUsers: state.githubUsers,
});

const mapDispatchToProps = (dispatch) => ({
  getGithubUser: (payload) => dispatch(getGithubUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GithubUsers);

