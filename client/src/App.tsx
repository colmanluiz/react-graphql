import { useState } from "react";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({});

  const {
    data: getUserData,
    error: getUserError,
    loading: getUserLoading,
  } = useQuery(GET_USERS);

  const [createUser] = useMutation(CREATE_USER);

  if (getUserLoading) return <p> Data loading...</p>;

  if (getUserError) return <p> Error: {getUserError.message} </p>;

  const handleCreateUser = async () => {
    console.log(newUser);
    createUser({
      variables: {
        name: newUser.name,
        age: newUser.age,
        isMarried: false,
      },
    });
  };
  return (
    <div>
      <div>
        <input
          placeholder="Name..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          placeholder="Age..."
          type="number"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: Number(e.target.value) }))
          }
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>

      <h1>Users</h1>
      <div>
        {getUserData.getUsers.map((user) => (
          <div>
            <p> Name: {user.name} </p>
            <p> Age: {user.age} </p>
            <p> Is this user married?: {user.isMarried ? "Yes" : "No"} </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
