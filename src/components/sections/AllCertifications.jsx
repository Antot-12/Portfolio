import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { certifications } from "../../data/constants";

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

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const Header = styled.div`
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

const CertCount = styled(motion.div)`
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  margin-bottom: 30px;
`;

const CertGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  width: 100%;
`;

const CertCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.card_light};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const CertHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CertLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: contain;
  background: white;
  padding: 4px;
`;

const CertInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CertName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
  line-height: 1.3;
`;

const CertIssuer = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 4px;
`;

const CertDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary + "99"};
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const SkillTag = styled.span`
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 12px;
  background: ${({ theme }) => theme.primary + "20"};
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
`;

const ViewBadge = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: transparent;
  border: 1.5px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const AllCertifications = () => {
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
        <Header>
          <Title
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            All Certifications
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

        <CertCount
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Showing {certifications.length} certifications
        </CertCount>

        <CertGrid
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {certifications.map((cert, index) => (
            <CertCard
              key={cert.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <CertHeader>
                <CertLogo src={cert.logo} alt={cert.issuer} />
                <CertInfo>
                  <CertName>{cert.name}</CertName>
                  <CertIssuer>{cert.issuer}</CertIssuer>
                  <CertDate>{cert.date}</CertDate>
                </CertInfo>
              </CertHeader>
              {cert.skills && cert.skills.length > 0 && (
                <SkillTags>
                  {cert.skills.map((skill, i) => (
                    <SkillTag key={i}>{skill}</SkillTag>
                  ))}
                </SkillTags>
              )}
              {cert.link && (
                <ViewBadge href={cert.link} target="_blank" rel="noopener noreferrer">
                  View Certificate →
                </ViewBadge>
              )}
            </CertCard>
          ))}
        </CertGrid>
      </Wrapper>
    </Container>
  );
};

export default AllCertifications;
