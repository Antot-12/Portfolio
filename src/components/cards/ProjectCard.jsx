import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Card = styled(motion.div)`
  width: 330px;
  height: 490px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  position: relative;
  z-index: 2;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.card_light}33 25%,
    ${({ theme }) => theme.card_light}66 50%,
    ${({ theme }) => theme.card_light}33 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  object-fit: cover;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  filter: ${({ $loaded }) => ($loaded ? 'none' : 'blur(10px)')};
`;
const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;
const Tag = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + 15};
  padding: 2px 8px;
  border-radius: 10px;
`;
const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
  flex: 1;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  overflow: hidden;
  margin-top: 8px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`;

const Button = styled(motion.a)`
  flex: 1;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: ${({ $primary, theme }) => $primary ? theme.primary : "transparent"};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary};
  }
`;

const ProjectCard = ({ project, setOpenModal }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = (e) => {
    // Don't open modal if clicking on buttons
    if (e.target.closest('a')) return;
    if (setOpenModal) {
      setOpenModal({ state: true, project: project });
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      whileHover={{
        y: -10,
        boxShadow: "0 0 50px 4px rgba(0, 0, 0, 0.6)",
        filter: "brightness(1.1)"
      }}
      transition={{ duration: 0.3 }}
    >
      <ImageContainer>
        <Image
          src={project.image}
          alt={project.title}
          $loaded={imageLoaded}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </ImageContainer>
      <Tags>
        {project.tags?.map((tag, index) => (
          <Tag key={`tag-${index}`}>{tag}</Tag>
        ))}
      </Tags>
      <Details>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>
      </Details>
      <ButtonGroup>
        <Button
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub /> Code
        </Button>
        {project.webapp && (
          <Button
            $primary
            href={project.webapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt /> Demo
          </Button>
        )}
      </ButtonGroup>
    </Card>
  );
};

export default ProjectCard;
