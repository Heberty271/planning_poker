import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router";
import { useRoom } from "../hooks/useRoom";
import { database } from '../services/firebase';

type Room = {
  name: string;
  createdAt: string;
}

type RoomParams = {
  id: string
}

export default function Room() {
  const { name, roomCode } = useRoom()
  
  if (!roomCode||!name) {
    return (
      <>
        <h1>Sala não encontrada</h1>
      </>
    )
  }


  return (
    <>
      <h1>{name} - {roomCode} </h1>

    </>
  )
}