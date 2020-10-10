import React, { Component } from "react";
import { getGithubUser } from "../Redux/action";
import { connect } from "react-redux";

export class GithubUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleSubmit = async () => {
    const { getGithubUser } = this.props;
    let payload = { username: this.state.username };
    await getGithubUser(payload);
  };

  render() {
    const { githubUsers } = this.props;

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

        {githubUsers.map((item) => (
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
                alt="image"
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
