import React, { useState, createContext, useEffect } from "react";
import { lightColor } from "./logic/LightColor";
import useSound from "use-sound";

import { subscribeNewState, toggledLight } from "../socket/socketMethods";

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

	const [onlinePeople, setPeople] = useState(0);
	useEffect(() => {
		subscribeNewState((a) => setInitialState(a));
	});
	useEffect(() => {
		setColor(lightColor(redLight, blueLight, greenLight));
		toggledLight({
			red: redLight,
			green: greenLight,
			blue: blueLight,
		});
	}, [redLight, blueLight, greenLight]);

	const setInitialState = (state) => {
		setRedLight(state.red);
		setGreenLight(state.green);
		setBlueLight(state.blue);
	};

	useEffect(() => {
		if (redLight === 1) {
			switchOffSound();
		} else {
			switchOnSound();
		}
	}, [redLight, switchOffSound, switchOnSound]);
	useEffect(() => {
		if (blueLight === 1) {
			switchOffSound();
		} else {
			switchOnSound();
		}
	}, [blueLight, switchOffSound, switchOnSound]);
	useEffect(() => {
		if (greenLight === 1) {
			switchOffSound();
		} else {
			switchOnSound();
		}
	}, [greenLight, switchOffSound, switchOnSound]);

	const toggleRed = () => {
		setRedLight((redLight + 1) % 2);
		// toggledLight({ red: redLight, green: greenLight, blue: blueLight });
	};
	const toggleGreen = () => {
		setGreenLight((greenLight + 1) % 2);

		// toggledLight({ red: redLight, green: greenLight, blue: blueLight });
	};

	const toggleBlue = () => {
		setBlueLight((blueLight + 1) % 2);
		// toggledLight({ red: redLight, green: greenLight, blue: blueLight });
	};
	const values = {
		color,
		redLight,
		blueLight,
		greenLight,
		toggleRed,
		toggleBlue,
		toggleGreen,
		onlinePeople,
		setPeople,
		setInitialState,
	};

	return (
		<LightContext.Provider value={values}>{children}</LightContext.Provider>
	);
};

export default LightContext;
