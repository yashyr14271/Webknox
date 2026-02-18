import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

const ComputerScene = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const bodyColor = isLight ? '#000000' : '#FFFFFF';

    return (
        <>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
            />
            <ambientLight intensity={isLight ? 2 : 1.5} />
            <pointLight position={[10, 10, 10]} intensity={2.5} color="#FF0000" />
            <pointLight position={[-10, 5, 5]} intensity={2} color={isLight ? "#FF0000" : "#FFFFFF"} />
            <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={3} color={isLight ? "#FF0000" : "#FFFFFF"} />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group position={[0, -0.5, 0]}>
                    {/* Monitor Screen Frame */}
                    <mesh position={[0, 0.5, 0]}>
                        <boxGeometry args={[4, 2.5, 0.1]} />
                        <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.5} />
                    </mesh>

                    {/* Screen Inner (The glowing part) */}
                    <mesh position={[0, 0.5, 0.06]}>
                        <planeGeometry args={[3.8, 2.3]} />
                        <meshStandardMaterial
                            color="#FFFFFF"
                            emissive="#FF0000"
                            emissiveIntensity={2}
                            toneMapped={false}
                        />
                    </mesh>

                    {/* Stand Column */}
                    <mesh position={[0, -1, -0.2]}>
                        <boxGeometry args={[0.3, 1, 0.3]} />
                        <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.5} />
                    </mesh>

                    {/* Stand Base */}
                    <mesh position={[0, -1.5, -0.2]}>
                        <boxGeometry args={[1.5, 0.1, 1]} />
                        <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.5} />
                    </mesh>

                    {/* Keyboard Area */}
                    <mesh position={[0, -1.45, 1.2]} rotation={[-0.1, 0, 0]}>
                        <boxGeometry args={[3, 0.1, 1.2]} />
                        <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.5} />
                    </mesh>

                    {/* Floating Tech Spheres for aesthetic */}
                    <Sphere args={[0.1, 16, 16]} position={[2.5, 1.5, 0.5]}>
                        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={3} />
                    </Sphere>
                    <Sphere args={[0.15, 16, 16]} position={[-2.5, -0.5, 0.8]}>
                        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={2} />
                    </Sphere>
                </group>
            </Float>
        </>
    );
};

const ComputerModel = () => {
    return (
        <div style={{ width: '100%', height: '400px', cursor: 'grab' }} className="computer-3d-container">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
                <ComputerScene />
            </Canvas>
        </div>
    );
};

export default ComputerModel;
