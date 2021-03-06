import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    Button,
} from 'react-native';
import { connect } from "react-redux";


import { logInUserAsync } from '../business/user';
import { updateTokenThunk, setUserThunk, resetUserThunk } from '../state/actions/users';

export class AuthScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      isFetching: false,
    }
  }

  fetchUser = async () => {
    this.setState({isFetching: true});
    const {token, user} = await logInUserAsync({username: this.state.username, password: this.state.password});
    token && this.props.dispatch(resetUserThunk())
    .then(this.props.dispatch(updateTokenThunk(token)))
    .then(() => this.props.dispatch(setUserThunk(user)));
    !token && this.setState({isFetching: false})
  }

  render() {
      return (
        <ScrollView style={{padding: 20}}>
          {this.props.user.full_name ?
            <Text
              style={{fontSize: 10}}
            >
              {`Last logged in as ${this.props.user.full_name}`}
            </Text> :
            null}
          <Text
            style={{fontSize: 27}}
          >
            Login
          </Text>
          <TextInput
            placeholder='Username'
            onChangeText={username => this.setState({username})}
          />
          <TextInput
            placeholder='Password'
            onChangeText={password => this.setState({password})}
            secureTextEntry
          />
          <View style={{margin:7}} />

          {this.state.isFetching ? (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <Button onPress={this.fetchUser} title="Submit" />
          )}
        </ScrollView>
          )
  }
}

const mapStateToProps = state => ({
  user: state.users,
});

export default connect(mapStateToProps)(AuthScreen);
