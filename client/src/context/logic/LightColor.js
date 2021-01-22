export const lightColor = (red, blue, green) => {
	let hexColor = "#";
	hexColor += red === 1 ? "F" : "0";

	hexColor += green === 1 ? "F" : "0";
	hexColor += blue === 1 ? "F" : "0";

	return hexColor;
};
