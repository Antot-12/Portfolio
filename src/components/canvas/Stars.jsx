import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import styled from "styled-components";

const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
`;

const Stars = (props) => {
  const ref = useRef();
  const refBig = useRef();

  // Small stars
  const [sphere] = useState(() => {
    const positions = new Float32Array(1500 * 3);
    random.inSphere(positions, { radius: 1.2 });
    for (let i = 0; i < positions.length; i++) {
      if (Number.isNaN(positions[i])) {
        positions[i] = 0;
      }
    }
    return positions;
  });

  // Big stars
  const [bigSphere] = useState(() => {
    const positions = new Float32Array(500 * 3);
    random.inSphere(positions, { radius: 1.2 });
    for (let i = 0; i < positions.length; i++) {
      if (Number.isNaN(positions[i])) {
        positions[i] = 0;
      }
    }
    return positions;
  });

  // Slower rotation for smoother animation on slow devices
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }
    if (refBig.current) {
      refBig.current.rotation.x -= delta / 25;
      refBig.current.rotation.y -= delta / 35;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Small stars */}
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      {/* Medium stars */}
      <Points ref={refBig} positions={bigSphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StyledStarsCanvas = () => {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    // Use lower pixel ratio on slow devices (cap at 1.5)
    setDpr(Math.min(window.devicePixelRatio, 1.5));
  }, []);

  return (
    <StyledCanvasWrapper>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={dpr}
        gl={{
          antialias: false,
          powerPreference: "low-power",
          alpha: true,
          failIfMajorPerformanceCaveat: false,
        }}
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </StyledCanvasWrapper>
  );
};

export default StyledStarsCanvas;
