import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import Lanyard from './Lanyard';
import * as THREE from 'three';

const TeamShowcase = ({ team = [] }) => {
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ width: '100%', height: isMobile ? '700px' : '950px', cursor: 'grab' }}>
            <Canvas
                shadows
                dpr={[1, isMobile ? 1.5 : 2]}
                camera={{ position: [0, -5, 28], fov: 28 }}
                gl={{ alpha: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={Math.PI / 2} />

                    <Physics gravity={[0, -40, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
                        {team.map((member, i) => (
                            <Lanyard
                                key={i}
                                name={member.name}
                                role={member.role}
                                color={member.color}
                                position={member.pos}
                            />
                        ))}
                    </Physics>

                    <Environment blur={0.75}>
                        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[400, 0.1, 1]} />
                        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[200, 0.1, 1]} />
                        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[200, 0.1, 1]} />
                        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[200, 10, 1]} />
                    </Environment>
                </Suspense>
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    enableRotate={false}
                    minPolarAngle={Math.PI / 2.2}
                    maxPolarAngle={Math.PI / 2.2}
                />
            </Canvas>
        </div>
    );
};

export default TeamShowcase;
