import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { projects } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";

// Snow animation
const fall = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(100vh) rotate(360deg);
  }
`;

const Snowflake = styled.div`
  position: fixed;
  top: -10px;
  color: #fff;
  font-size: ${({ $size }) => $size}px;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
  animation: ${fall} ${({ $duration }) => $duration}s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  left: ${({ $left }) => $left}%;
  opacity: 0.8;
  pointer-events: none;
  z-index: 1000;
`;

const SnowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
  overflow: hidden;
`;

const Container = styled(motion.div)`
  padding: 100px 16px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  position: relative;
  z-index: 1;
`;

const Wrapper = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
`;

const Title = styled(motion.h1)`
  font-size: 42px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const BackButton = styled(motion(Link))`
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
`;

const FilterButton = styled(motion.button)`
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $active, theme }) => ($active ? "white" : theme.primary)};
  background: ${({ $active, theme }) => ($active ? theme.primary : "transparent")};
  border: 1.5px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const CardContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 28px;
  flex-wrap: wrap;
`;

const ProjectCount = styled(motion.div)`
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  margin-bottom: 20px;
`;

const CardWrapper = styled(motion.div)``;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const filterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const AllProjects = ({ openModal, setOpenModal }) => {
  const [filter, setFilter] = useState("all");
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Generate snowflakes
    const flakes = [];
    for (let i = 0; i < 50; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 10 + 8,
        duration: Math.random() * 5 + 8,
        delay: Math.random() * 10,
      });
    }
    setSnowflakes(flakes);
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SnowContainer>
        {snowflakes.map((flake) => (
          <Snowflake
            key={flake.id}
            $left={flake.left}
            $size={flake.size}
            $duration={flake.duration}
            $delay={flake.delay}
          >
            ❄
          </Snowflake>
        ))}
      </SnowContainer>
      <Wrapper>
        <Header variants={headerVariants}>
          <Title
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            All Projects
          </Title>
          <BackButton
            to="/"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Home
          </BackButton>
        </Header>

        <FilterContainer
          variants={filterVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { key: "all", label: `All (${projects.length})` },
            { key: "web app", label: `Web Apps (${projects.filter((p) => p.category === "web app").length})` },
            { key: "software", label: `Software (${projects.filter((p) => p.category === "software").length})` },
            { key: "others", label: `Others (${projects.filter((p) => p.category === "others").length})` },
          ].map((item, index) => (
            <FilterButton
              key={item.key}
              $active={filter === item.key}
              onClick={() => setFilter(item.key)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </FilterButton>
          ))}
        </FilterContainer>

        <ProjectCount
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
        </ProjectCount>

        <CardContainer
          layout
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {filteredProjects.map((project, index) => (
            <CardWrapper
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.05 }}
              layout
              whileHover={{ y: -10 }}
            >
              <ProjectCard
                project={project}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            </CardWrapper>
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default AllProjects;
