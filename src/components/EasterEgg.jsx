import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
`;

const rainbow = keyframes`
  0% { color: #ff0000; }
  14% { color: #ff7f00; }
  28% { color: #ffff00; }
  42% { color: #00ff00; }
  57% { color: #0000ff; }
  71% { color: #4b0082; }
  85% { color: #9400d3; }
  100% { color: #ff0000; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Message = styled.h1`
  font-size: 48px;
  animation: ${rainbow} 2s linear infinite;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SubMessage = styled.p`
  color: #fff;
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const EmojiContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const FloatingEmoji = styled.span`
  font-size: 60px;
  animation: ${float} ${({ $delay }) => 2 + $delay * 0.2}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay * 0.3}s;
`;

const CloseButton = styled.button`
  margin-top: 40px;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SecretCode = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: rgba(255, 255, 255, 0.1);
  font-size: 10px;
  pointer-events: none;
  z-index: 1;
`;

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

const EasterEgg = () => {
  const [activated, setActivated] = useState(false);
  const [inputSequence, setInputSequence] = useState([]);
  const [showHint, setShowHint] = useState(false);

  const emojis = ["🚀", "💻", "🎮", "⭐", "🔥", "💡", "🎯", "🏆"];

  const handleKeyDown = useCallback((event) => {
    const key = event.key;

    setInputSequence((prev) => {
      const newSequence = [...prev, key].slice(-10);

      // Check if the sequence matches Konami code
      const isMatch = newSequence.every(
        (k, i) => k.toLowerCase() === KONAMI_CODE[i].toLowerCase()
      );

      if (isMatch && newSequence.length === 10) {
        setActivated(true);
        return [];
      }

      return newSequence;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Show hint after 30 seconds on the page
    const hintTimer = setTimeout(() => setShowHint(true), 30000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(hintTimer);
    };
  }, [handleKeyDown]);

  if (activated) {
    return (
      <Overlay onClick={() => setActivated(false)}>
        <Message>🎉 You Found The Secret! 🎉</Message>
        <SubMessage>
          You're a true developer! The Konami Code never gets old.
        </SubMessage>
        <EmojiContainer>
          {emojis.map((emoji, index) => (
            <FloatingEmoji key={index} $delay={index}>
              {emoji}
            </FloatingEmoji>
          ))}
        </EmojiContainer>
        <CloseButton onClick={() => setActivated(false)}>
          Awesome! Close This
        </CloseButton>
      </Overlay>
    );
  }

  return showHint ? (
    <SecretCode>↑↑↓↓←→←→BA</SecretCode>
  ) : null;
};

export default EasterEgg;
