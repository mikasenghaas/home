import * as React from "react";

import { clear } from "console";
import next from "next";

enum Phase {
  Typing,
  Pausing,
  Deleting,
}

const randomInInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (min - max + 1)) + min;

export function useTypewriter({
  message,
  initialDelay = 1000,
  typing_interval_min = 75,
  typing_interval_max = 100,
}: {
  message: string;
  initialDelay?: number;
  typing_interval_min?: number;
  typing_interval_max?: number;
}) {
  const [firstRender, setFirstRender] = React.useState(true);
  const [typed, setTyped] = React.useState("");

  React.useEffect(() => {
    if (firstRender) {
      const timeout = setTimeout(() => {
        setFirstRender(false);
      }, initialDelay);

      return () => clearTimeout(timeout);
    }
    const next = message.slice(0, typed.length + 1);
    const timeout = setTimeout(
      () => {
        setTyped(next);
      },
      randomInInterval(typing_interval_min, typing_interval_max),
    );

    return () => clearTimeout(timeout);
  }, [
    message,
    typed,
    firstRender,
    initialDelay,
    typing_interval_min,
    typing_interval_max,
  ]);

  return { message: typed };
}

export function useTypewriters({
  messages,
  initial_delay = 1000,
  typing_interval_min = 75,
  typing_interval_max = 100,
  deleting_speed = 40,
  typing_pausing_interval = 3000,
  deleting_pausing_interval = 1000,
}: {
  messages: string[];
  initial_delay?: number;
  typing_interval_min?: number;
  typing_interval_max?: number;
  deleting_speed?: number;
  typing_pausing_interval?: number;
  deleting_pausing_interval?: number;
}) {
  const [firstRender, setFirstRender] = React.useState(true);
  const [phase, setPhase] = React.useState(Phase.Typing);
  const [message, setMessage] = React.useState("");
  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    if (firstRender) {
      const timeout = setTimeout(() => {
        setFirstRender(false);
      }, initial_delay);

      return () => clearTimeout(timeout);
    }
    switch (phase) {
      case Phase.Typing: {
        if (message === messages[messageIndex]) {
          setPhase(Phase.Pausing);
          const timeout = setTimeout(() => {
            setPhase(Phase.Deleting);
          }, typing_pausing_interval);

          return () => clearTimeout(timeout);
        }

        const nextMessage = messages[messageIndex].slice(0, message.length + 1);
        const timeout = setTimeout(
          () => {
            setMessage(nextMessage);
          },
          randomInInterval(typing_interval_min, typing_interval_max),
        );

        return () => clearTimeout(timeout);
      }

      case Phase.Deleting: {
        // check if end of current messsage
        if (!message) {
          const timeout = setTimeout(() => {
            const nextIndex = messageIndex + 1;
            setMessageIndex(messages[nextIndex] ? nextIndex : 0);
            setPhase(Phase.Typing);
          }, deleting_pausing_interval);
          return () => clearTimeout(timeout);
        }

        const nextMessage = messages[messageIndex].slice(0, message.length - 1);

        const timeout = setTimeout(() => {
          setMessage(nextMessage);
        }, deleting_speed);

        return () => clearTimeout(timeout);
      }

      case Phase.Pausing:
      default:
        const timeout = setTimeout(() => {
          setPhase(Phase.Deleting);
        }, typing_pausing_interval);

        return () => clearTimeout(timeout);
    }
  }, [
    messages,
    message,
    phase,
    messageIndex,
    initial_delay,
    firstRender,
    typing_interval_min,
    typing_interval_max,
    typing_pausing_interval,
    deleting_speed,
    deleting_pausing_interval,
  ]);

  return { message, selectedMessage: messages[messageIndex] };
}
