import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { certifications } from "../../data/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 20px 0px 20px 0px;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  padding: 10px 0px 20px 0;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;
  padding: 0 20px;
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

const ViewAllButton = styled(Link)`
  margin-top: 30px;
  margin-bottom: 0;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Certifications = () => {
  const featuredCerts = certifications.filter((cert) => cert.featured);

  return (
    <Container id="Certifications">
      <Wrapper>
        <Title>Certifications & Badges</Title>
        <Desc>
          Professional certifications and achievements that validate my skills and expertise
        </Desc>
        <CertGrid>
          {featuredCerts.map((cert, index) => (
            <CertCard
              key={cert.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
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
                  {cert.skills.slice(0, 4).map((skill, i) => (
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
        <ViewAllButton to="/all-certifications">
          View All Certifications ({certifications.length})
        </ViewAllButton>
      </Wrapper>
    </Container>
  );
};

export default Certifications;
