import React, { useState, createContext, useEffect } from "react";
import { lightColor } from "./logic/LightColor";
import useSound from "use-sound";

import switchOnSfx from "../assets/sfx/light-switch-on.wav";
import switchOffSfx from "../assets/sfx/light-switch-off.wav";

const LightContext = createContext(null);

export const LightProvider = ({ children }) => {
	const [switchOnSound] = useSound(switchOnSfx);
	const [switchOffSound] = useSound(switchOffSfx);

	const [color, setColor] = useState("#000");

	const [redLight, setRedLight] = useState(0);
	const [blueLight, setBlueLight] = useState(0);
	const [greenLight, setGreenLight] = useState(0);

	useEffect(() => {
		setColor(lightColor(redLight, blueLight, greenLight));
		//switchOffSound();
	}, [redLight, blueLight, greenLight]);
	useEffect(() => {
		if (redLight === 1) {
			switchOffSound();
		} else {
			switchOnSound();
		}
	}, [redLight]);
	useEffect(() => {
		if (blueLight === 1) {
			switchOffSound();
		} else {
			switchOnSound();
		}
	}, [blueLight]);
	useEffect(() => {
		if (greenLight === 1) {
			switchOffSound();
		} else {
			switchOnSound();
		}
	}, [greenLight]);

	const toggleRed = () => {
		setRedLight((redLight + 1) % 2);
	};
	const toggleGreen = () => {
		setGreenLight((greenLight + 1) % 2);
	};

	const toggleBlue = () => {
		setBlueLight((blueLight + 1) % 2);
	};
	const values = {
		color,
		redLight,
		blueLight,
		greenLight,
		toggleRed,
		toggleBlue,
		toggleGreen,
	};

	return (
		<LightContext.Provider value={values}>{children}</LightContext.Provider>
	);
};

export default LightContext;
