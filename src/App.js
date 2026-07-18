import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import StarCanvas from "./components/canvas/Stars";
import { AnimatePresence } from "framer-motion";
import Education from "./components/sections/Education";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import AllProjects from "./components/sections/AllProjects";
import Certifications from "./components/sections/Certifications";
import AllCertifications from "./components/sections/AllCertifications";
import Footer from "./components/sections/Footer";
import ProjectDetails from "./components/Dialog/ProjectDetails";
import EasterEgg from "./components/EasterEgg";
import { useState } from "react";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter basename="/Portfolio">
        <Navbar />
        <Body>
          <StarCanvas />
          <EasterEgg />
          <AnimatePresence>
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <Hero />
                    <Wrapper>
                      <Skills />
                      <Experience />
                    </Wrapper>
                    <Projects openModal={openModal} setOpenModal={setOpenModal} />
                    <Wrapper>
                      <Education />
                    </Wrapper>
                    <Certifications />
                    <Footer />
                  </div>
                }
              />
              <Route
                path="/all-projects"
                element={
                  <AllProjects openModal={openModal} setOpenModal={setOpenModal} />
                }
              />
              <Route
                path="/all-certifications"
                element={<AllCertifications />}
              />
            </Routes>
          </AnimatePresence>
          {openModal.state && (
            <ProjectDetails
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          )}
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
