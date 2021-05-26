import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_DATA = gql`
  query {
    post(id: 1) {
      id
      title
      body
    }
  }
`;

const CREATE_DATA = gql`
  mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;
const UPDATE_DATA = gql`
  mutation($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      body
    }
  }
`;
const DELETE_DATA = gql`
  mutation($id: ID!) {
    deletePost(id: $id)
  }
`;

export default function Home() {
  const [input, setInput] = useState("hello");
  const [update, setUpdate] = useState("");
  const [create, setCreate] = useState("");
  const [del, setDel] = useState("");
  const stuff = useQuery(GET_DATA);
  const { data } = stuff;
  const [createData] = useMutation(CREATE_DATA);
  const [updateData] = useMutation(UPDATE_DATA);
  const [deleteData] = useMutation(DELETE_DATA);

  async function handleUpdateData() {
    const { data } = await updateData({
      variables: {
        id: 1,
        input: {
          body: "Some updated content.",
        },
      },
      refetchQueries: [{ query: GET_DATA }],
    });
    setUpdate(data.updatePost);
    console.log(data.updatePost);
  }

  async function handleCreateData() {
    const { data } = await createData({
      variables: {
        input: {
          title: input,
          body: "Some interesting content.",
        },
      },
      refetchQueries: [{ query: GET_DATA }],
    });
    setCreate(data.createPost);
    console.log(data.createPost);
  }
  async function handleDeleteData() {
    const { data } = await deleteData({
      variables: { id: 10 },
      refetchQueries: [{ query: GET_DATA }],
    });
    setDel(data.deletePost);
    console.log(data);
  }

  return (
    <div>
      <button onClick={handleCreateData}>Create</button>
      <button onClick={handleUpdateData}>Update</button>
      <button onClick={handleDeleteData}>Delete</button>
      <div className="mt-20">
        <h1>{update.id}</h1>
        <p>{update.body}</p>
      </div>
      <div className="mt-20">
        <h1>{create.id}</h1>
        <h1>{create.title}</h1>
        <p>{create.body}</p>
      </div>
      <div>{del ? <p>Sucessfully deleted!</p> : null}</div>
    </div>
  );
}
