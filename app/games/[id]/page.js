"use client";

import Styles from "./Game.module.css";
import { checkIfUsersVoted, getNormalizedGamesDataById, isResponseOk, removeJWT } from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";
import { useState, useEffect } from "react";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { GameNotFound } from "@/app/components/GameNotFound/GameNotFound";
import { getJWT, getMe } from "@/app/api/api-utils";
import { vote } from "@/app/api/api-utils";

export default function GamePage(props) {
  const [game, setGame] = useState(null);
  const [PreloaderVisible, setPreloaderVisible] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const game = await getNormalizedGamesDataById(
        endpoints.games,
        props.params.id
      );
      isResponseOk(game) ? setGame(game) : setGame(null);
      setPreloaderVisible(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const jwt = getJWT();
    if (jwt) {
      getMe(endpoints.me, jwt).then((userData) => {
        if (isResponseOk(userData)) {
          setIsAuthorized(true);
          setCurrentUser(userData);
        } else {
          setIsAuthorized(false);
          removeJWT();
        }
      });
    }
  }, []);



  const handleVote = async () => {
    const jwt = getJWT();
    let usersIdArray = game.users.length
      ? game.users.map((user) => user.id)
      : [];
    usersIdArray.push(currentUser.id);
    if (jwt) {
      const response = await vote(
        `${endpoints.games}/${game.id}`,
        jwt,
        usersIdArray
      );
      if (isResponseOk(response)) {
        setIsVoted(true);
        setGame({ ...game, users: [...game.users, currentUser] });
      }
    }
  };

  useEffect(() => {
    if (currentUser && game) {
      setIsVoted(checkIfUsersVoted(game, currentUser.id));
    }
  }, [currentUser]);


  return (
    <main className="main">
      {game ? (
        <>
          <section className={Styles["game"]}>
            <iframe
              className={Styles["game__iframe"]}
              src={game.link}></iframe>
          </section>
          <section className={Styles["about"]}>
            <h2 className={Styles["about__title"]}>{game.title}</h2>
            <div className={Styles["about__content"]}>
              <p className={Styles["about__description"]}>{game.description}</p>
              <div className={Styles["about__author"]}>
                <p>
                  Автор:
                  <span className={Styles["about__accent"]}>{game.developer}</span>
                </p>
              </div>
            </div>
            <div className={Styles["about__vote"]}>
              <p className={Styles["about__vote-amount"]}>
                За игру уже проголосовали:
                <span className={Styles["about__accent"]}>{game.users.length}</span>
              </p>
              <button
                disabled={!isAuthorized || isVoted} id="button"
                className={`button ${Styles["about__vote-button"]}`}
                onClick={handleVote}>
                {isVoted ? "Голос учтён" : "Голосовать"}
              </button>
            </div>
          </section>
        </>
      ) : PreloaderVisible ? (
        <Preloader />
      ) : (
        <GameNotFound />
      )
      }

    </main>
  );
}