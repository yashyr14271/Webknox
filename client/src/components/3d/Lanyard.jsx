/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { BallCollider, CuboidCollider, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

extend({ MeshLineGeometry, MeshLineMaterial });

const Lanyard = ({ position = [0, 0, 0], name, role, color = '#FF0000' }) => {
    const themeContext = useTheme();
    const theme = themeContext?.theme || 'dark';
    const { size } = useThree();
    const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

    const band = useRef();
    const fixed = useRef();
    const j1 = useRef();
    const j2 = useRef();
    const j3 = useRef();
    const card = useRef();

    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Vector3();
    const dir = new THREE.Vector3();

    const [curve] = useState(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
    ]));

    const [dragged, drag] = useState(false);
    const [hovered, hover] = useState(false);

    const segmentProps = {
        type: 'dynamic',
        canSleep: true,
        colliders: false,
        angularDamping: 4,
        linearDamping: 4
    };

    // Joints - following user's snippet logic
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 2.8, 0]]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => void (document.body.style.cursor = 'auto');
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z
            });
        }

        if (fixed.current && j1.current && j2.current && j3.current && card.current) {
            // Lerp logic from user's snippet for "wiggly" feel
            [j1, j2].forEach(ref => {
                if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
                ref.current.lerped.lerp(
                    ref.current.translation(),
                    delta * (10 + clampedDistance * 40) // speed range
                );
            });

            // Update curve points
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped || j2.current.translation());
            curve.points[2].copy(j1.current.lerped || j1.current.translation());
            curve.points[3].copy(fixed.current.translation());

            if (band.current) {
                band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
            }

            // Stabilize card rotation
            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        }
    });

    return (
        <group position={position}>
            {/* Physics Anchor & Segments - Centered at x=0 local to group */}
            <RigidBody ref={fixed} type="fixed" position={[0, 4, 0]} />

            <RigidBody position={[0, 3, 0]} ref={j1} {...segmentProps}>
                <BallCollider args={[0.1]} />
            </RigidBody>
            <RigidBody position={[0, 2, 0]} ref={j2} {...segmentProps}>
                <BallCollider args={[0.1]} />
            </RigidBody>
            <RigidBody position={[0, 1, 0]} ref={j3} {...segmentProps}>
                <BallCollider args={[0.1]} />
            </RigidBody>

            <RigidBody
                position={[0, 0, 0]}
                ref={card}
                {...segmentProps}
                type={dragged ? 'kinematicPosition' : 'dynamic'}
            >
                <CuboidCollider args={[1.6, 2.2, 0.05]} />
                <group
                    onPointerOver={() => hover(true)}
                    onPointerOut={() => hover(false)}
                    onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
                    onPointerDown={e => (
                        e.target.setPointerCapture(e.pointerId),
                        drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
                    )}
                >
                    {/* ID Card Border/Backplate */}
                    <mesh position={[0, 0, -0.01]}>
                        <boxGeometry args={[3.25, 4.45, 0.05]} />
                        <meshStandardMaterial color={theme === 'dark' ? '#333333' : '#cccccc'} />
                    </mesh>

                    {/* Theme-aware Shadow/Glow */}
                    <mesh position={[0, 0, -0.06]}>
                        <planeGeometry args={[3.6, 4.8]} />
                        <meshBasicMaterial
                            color={theme === 'dark' ? '#ffffff' : '#000000'}
                            transparent
                            opacity={theme === 'dark' ? 0.2 : 0.4}
                        />
                    </mesh>

                    {/* The Main ID Card Visuals */}
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[3.2, 4.4, 0.05]} />
                        <meshPhysicalMaterial
                            color="white"
                            clearcoat={1}
                            clearcoatRoughness={0.15}
                            roughness={0.3}
                            metalness={0.2}
                        />
                    </mesh>

                    <group position={[0, 0, 0.03]}>
                        <mesh position={[0, 0.9, 0]}>
                            <circleGeometry args={[0.7, 32]} />
                            <meshStandardMaterial color="#EEEEEE" />
                        </mesh>
                        <Text position={[0, -0.4, 0]} fontSize={0.28} fontWeight="bold" color="#000000" anchorX="center" anchorY="middle">{name}</Text>
                        <Text position={[0, -0.9, 0]} fontSize={0.15} color="#666666" anchorX="center" anchorY="middle">{role}</Text>
                        <Text position={[0, -1.6, 0]} fontSize={0.22} fontWeight="bold" color={color} anchorX="center" anchorY="middle">WEBKNOX</Text>
                    </group>

                    <mesh position={[0, 2.4, 0]}>
                        <boxGeometry args={[0.6, 0.8, 0.2]} />
                        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
                    </mesh>
                </group>
            </RigidBody>

            {/* The Strap Mesh positioned local to the group coords used for setPoints */}
            <mesh ref={band} position={[-position[0], -position[1], -position[2]]}>
                <meshLineGeometry />
                <meshLineMaterial
                    color={color}
                    transparent
                    opacity={1}
                    lineWidth={0.5}
                    depthTest={false}
                    depthWrite={false}
                    resolution={[size.width, size.height]}
                />
            </mesh>
        </group>
    );
};

export default Lanyard;
